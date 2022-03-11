//@ts-check
/*$$
 *@Author: dwj
 *@Date: 2022-2-16
 *@LastEditors: dwj
 *@Description: 
*/

const path = require('path')
const fs   = require('fs')
const {RootNode,MethodNode,ParamNode,TypeNode,TypeEnum} = require('../parser/ast-def')
const { 
    findTagContend, 
    extractServiceInfo, 
    replaceTagContend,
    IsHandlerService,
    IsRemoteService,
    IsClientService,
    getLangType,
    LangEnum
} = require('./util')

module.exports = GeneratorCs


/*test*/
const  beautify = require('js-beautify').js
function writeCSFile(fpath,contend){

    fs.writeFileSync(fpath, beautify(contend) )
}


const TypeMap={
    "int32":["int", 4 ,"ReadInt32BE","WriteInt32BE"],
    "int64":["long", 8 , "ReadInt64BE","WriteInt64BE"],
    "string":["string",(name)=>`${name}.Length` , "toString",""],
    "json"  :["JsonData","var","",""]
}

/**
 * 描述
 * @date 2022-2-16
 * @param {Array<RootNode>} trees
 * @param {Array<string>} outdirs
 * @param {boolean} [isRobotCode]  测试程序和机器人使用的非单例 pomeloclient
 * @returns {any}
 */
function GeneratorCs(trees,outdirs,isRobotCode){
    for(let outdir of outdirs){
        genRPC(trees,outdir,isRobotCode)
        genPushEvent(trees,outdir,isRobotCode)
    }
}



/**
 * 描述
 * @date 2022-2-16
 * @param {MethodNode} method
 * @param {boolean} isRobotCode
 * @returns {string}
 */
function genRpcMethod(method,isRobotCode){
    let methodStr=''
    let paramStr=''
    /**  @type {Array<string>} */
    let paramName=[]
    // if(method.params.length>0){
    //     paramName = method.params[0].name||'args'
    //     paramStr=`${method.params[0].type.name} ${paramName}`
    // }
    let clientIns='PomeloClient.Instance'
    
    let params = method.params.map((param,idx)=>`${getLangType(param.type,LangEnum.CSharp)} ${!!param.name?param.name:'arg'+idx}`  )
    if(isRobotCode){
        clientIns ='pomeloClient'
        params.push('PomeloClient pomeloClient')
    }
    paramStr=params.join(',')
    paramName=method.params.map((param,idx)=>`${!!param.name?param.name:'arg'+idx}`  );//.join(',')
    
    if(!!method.return){
        let typeInfo = TypeMap[method.return.name]
        let retDecode='';
        let retType = getLangType(method.return,LangEnum.CSharp)
        if( method.return.type == TypeEnum.PB){
            retDecode =`${method.return.name} ret = MsgProtocol.decode<${method.return.name}>(bytes, offset);
            r.SetResult(ret);`
        }else {
            if( method.return.name == 'string'){
                retDecode = `
                string ret=System.Text.Encoding.UTF8.GetString(bytes, offset,bytes.Length - offset);
                r.SetResult(ret);`

            }else{
                retDecode = `
                ${retType} ret=MsgProtocol.${typeInfo[2]}(bytes, offset);
                r.SetResult(ret);`
            }
        }


        if( method.params.length>1 || (method.params.length==1 && method.params[0].type.type!=TypeEnum.PB) ){
            //基本类型
            let paramEncode='';

            let bufLen =[]
            method.params.forEach( (val,index)=>{
                let typeInfo = TypeMap[val.type.name]
                if( val.type.name == 'string'){
                    bufLen.push(`${paramName[index]}.Length`)
                    bufLen.push(2) 

                    paramEncode += `MsgProtocol.WriteInt16BE(buff, index, ${paramName[index]}.Length);
                    index += 2;
                    for(int idx = 0; idx < ${paramName[index]}.Length; idx++)
                    {
                        buff[index + idx] = (byte)${paramName[index]}[idx];
                    }
                    index += ${paramName[index]}.Length;`
 
                }else if(val.type.name == 'json'){

                }else{
                    bufLen.push(typeInfo[1])
                    paramEncode += `MsgProtocol.${typeInfo[3]}(buff,index,${paramName[index]});
                    index +=${typeInfo[1]};`
                }


            })

            methodStr=`
            public static Task<${retType}> ${method.name}(${paramStr})
            {
                TaskCompletionSource<${retType}> r = new TaskCompletionSource<${retType}>();

                byte[] buff = new byte[${bufLen.join('+')}];
                int index = 0;
                ${paramEncode}
                ${clientIns}.request((uint)ServiceId.${method.name}, buff,(bytes,offset) =>
                {
                    ${retDecode}
                });
                return r.Task;
            }
            `
        }else{
            
            let encodeStr=""
            if(paramName.length>0){
                encodeStr=`byte[] buff = MsgProtocol.encode(${paramName[0]});` 
            }
            methodStr=`
            public static Task<${retType}> ${method.name}(${paramStr})
            {
                TaskCompletionSource<${retType}> r = new TaskCompletionSource<${retType}>();
                ${encodeStr}
                ${clientIns}.request((uint)ServiceId.${method.name}, ${paramName.length>0?"buff,":""}(bytes, offset) =>
                {
                    ${retDecode}
                });
                return r.Task;
            }
            `
        }
   }else{
        methodStr=`
        public static void ${method.name}(${paramStr})
        {
            ${clientIns}.notify((uint)ServiceId.${method.name},  ${paramName} );
        }
        `

    }

    return methodStr
}


/**
 * 描述
 * @date 2022-2-16
 * @param {Array<RootNode>} trees
 * @param {string} outdir
 * @param {boolean} isRobotCode
 * @returns {any}
 */
function genRPC(trees,outdir,isRobotCode){
    let fpath=path.join(outdir,"Rpc.cs")
    let pkg;
    let serviceId=0

    let classStr=''
    for(let ast of trees){
        pkg = ast.pkg
        
        for(let service of ast.services){
            if( !IsHandlerService(service.name)){
                continue
            }

            let methodStr=''
            let enumStr=''
            for(let method of service.methods){
                methodStr+=genRpcMethod(method,isRobotCode)
                enumStr+=`${method.name} = ${serviceId},\n`

                serviceId++
            }
            let [server,module] = extractServiceInfo(service.name)
            let classname=server+"_"+module+"Handler"
            classStr+=`
            public static class ${classname} 
            {
                enum ServiceId
                {
                    ${enumStr}
                }                

                ${methodStr}
            }
            `

        }
    }

    let contend =`
    using LitJson;
    using Pomelo.DotNetClient;
    using ${pkg};
    using System.Threading.Tasks; 
    namespace Rpc
    {
        ${classStr}
    }
    `

    writeCSFile(fpath,contend)
}


/**
 * 描述
 * @date 2022-2-16
 * @param {MethodNode} method
 * @param {string} fileContend 
 * @returns {string}
 */
function genPushEventMethod(method,fileContend){
    let reserved = findTagContend(fileContend,method.name,"\t\t\t")
    let methodStr="";
    if(method.params.length>0){
        let param=method.params[0];
        if(param.type.type==TypeEnum.PB){
            methodStr=
`    client.on<${param.type.name}>(${method.name},(args)=>
    {
        ${reserved}
    });`
        }
        else{
            let typeInfo = TypeMap[param.type.name]
            methodStr=
`    client.on(${method.name},(buffer,offset)=>
    {
        ${typeInfo[0]} ret=MsgProtocol.${typeInfo[2]}(buffer,offset);
        ${reserved}
    });`
        }
    }
    let contend = `
    #region ${method.name}
    ${methodStr}
    #endregion
    `
    return contend

}

/**
 * 描述
 * @date 2022-2-16
 * @param {Array<RootNode>} trees
 * @param {string} outdir
 * @param {boolean} [isRobotCode]   
 * @returns {any}
 */
function genPushEvent(trees,outdir,isRobotCode){
    let fname="PushEvent.cs"
    let fpath = path.join(outdir,fname)
    let methodStr=''
    let enumStr=''
    let eventId=0
    let fileContend =fs.existsSync(fpath)?fs.readFileSync(fpath,{encoding:'utf8'}):""
    let pkg
    for(let ast of trees){
        pkg=ast.pkg
        for(let service of ast.services){
            if( !IsClientService(service.name)){
                continue
            }

            for(let method of service.methods){
                methodStr+=genPushEventMethod(method,fileContend)
                enumStr+=`public const uint ${method.name}=${eventId};\n`
                eventId++
            }
        }
    }
    let robotParam = ''
    if(isRobotCode){
        robotParam=', IRobot robot'
    }
    let headReserved = findTagContend(fileContend,"@Head","")
    let contend =`
    using LitJson;
    using Pomelo.DotNetClient;
    using ${pkg};
    ${headReserved}
    namespace Rpc
    {
        public static class PushEvent
        {
            ${enumStr}
            public static void Init(PomeloClient client${robotParam})
            {
                ${methodStr}
            }

        }
    }`

    writeCSFile(fpath,contend)

}