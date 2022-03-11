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

const  beautify = require('js-beautify').js

function writeJsFile(fpath,contend){

    fs.writeFileSync(fpath, beautify(contend) )
}

/**
 * 描述
 * @date 2022-2-16
 * @param {Array<RootNode>} trees
 * @param {string} outdir
 * @returns {any}
 */
function GeneratorJs(trees,outdir){
    genEnum(trees,outdir)
    genHandlerFiles(trees,outdir)
    genRemoteFiles(trees,outdir)
    genRemoteProxyFiles(trees,outdir)
    genPushEvent(trees,outdir)
    genRemoteDts(trees,outdir)
    //console.log(sname,mname,file)
    //console.log(p)

}



//js [jsType, size, decode, encode]
const TypeMap={
    "int32":["number", ()=>4 ,
            (bufname,vname)=>`let ${vname} = ${bufname}.readInt32BE($offset)\n`+
                            `$offset+=4\n`,
            (bufname,vname)=>`${bufname}.writeInt32BE(${vname},$offset)\n`+
            `$offset+=4`],

    "int64":["number", ()=>8 ,
            (bufname,vname)=>`let ${vname} = ${bufname}.readInt64BE($offset)\n`+
                            `$offset+=8\n`,
            (bufname,vname)=>`${bufname}.writeInt64BE(${vname},$offset)\n`+
            `$offset+=8`],

    "string":["string", 
                (vname)=>`${vname}.length + 2`, 
                (bufname,vname)=>{
                    return `let $${vname}Len=${bufname}.readInt16BE($offset)\n`+
                    `$offset+=2\n`+
                    `let ${vname} = ${bufname}.toString('utf8',$offset,$offset+$${vname}Len)\n`+
                    `$offset+=$${vname}Len`
                },
                (bufname,vname)=>{
                    return `${bufname}.writeInt16BE(${vname}.length,$offset)\n`+
                    `$offset+=2\n`+
                    `${bufname}.fill(${vname},$offset)\n`+
                    `$offset+=${vname.length}\n`
                }],
    "json"  :["any",(vname)=>`${vname}.length`,"",""]
}


/**
 * 描述
 * @date 2022-2-16
 * @param {Array<ParamNode>} params
 * @returns {string}
 */
function genEncode(params){

    let lines=[]
    //let typeInfo = TypeMap[method.return.name]
    let paramName=params.map((param,index)=>!!param.name?param.name:"arg"+index)

    let lenStr = params.map((param,idx)=>{
        if(param.type.type == TypeEnum.BuiltIn ){
            let typeInfo = TypeMap[param.type.name]
            return typeInfo[1]( paramName[idx] )
        }else{
            //error
            return 'err'
        }
    }).join('+')
    params.forEach((param,index)=>{
        if(param.type.type == TypeEnum.PB){
            lines.push(`let $buf = ${param.type.name}.encode(${paramName[index]}).finish()`)
        }else{
            let typeInfo = TypeMap[param.type.name] 
            if(index==0){
                lines.push('let $offset=0')
                lines.push(`let $buf = Buffer.alloc(${lenStr})`)
            }
            lines.push(typeInfo[3]("$buf",paramName[index]))
        }
    })
    if(lines.length>0)
        lines.push('return $buf')
    else
        lines.push('return []')

    return lines.join('\n')
}

/**
 * 描述
 * @date 2022-2-16
 * @param {Array<ParamNode>} params
 * @param {string} bufname
 * @returns {string}
 */
function genDecode(params,bufname){
    let lines=[]
    let paramName=params.map((param,index)=>!!param.name?param.name:"arg"+index)
    params.forEach((param,index)=>{
        if(param.type.type == TypeEnum.PB){
            lines.push(`let ${paramName[index]} = ${param.type.name}.decode(${bufname})`)
        }else{
            let typeInfo = TypeMap[param.type.name] 
            if(index==0){
                lines.push('let $offset=0')
            }
            console.log("type... :",param.type.name)
            lines.push(typeInfo[2](bufname,paramName[index]))
        }
    })
    lines.push(`return [${paramName.join(',')}]`)
    return lines.join('\n') 
}


/**
 * 描述
 * @date 2022-2-16
 * @param {MethodNode} method
 * @param {string} fileContend
 * @returns {string}
 */
function genHandlerMethod(method,fileContend){

    let reserved = findTagContend(fileContend, method.name,"\t");


    //let args = method.params.map( (param,index)=>(!!param.name)?param.name:"arg"+(index+1) ).join(",")
    let args=""
    let argsComment=""
    let comments=[]

    if( method.params.length ==1 ){
        let param = method.params[0]
        let paramName = (!!param.name)?param.name:"args"
        args+=`,${paramName}` 
        comments.push(`* @param  {${getLangType(param.type,LangEnum.JS)}} ${paramName}`)

    }else{
        for(let idx=0;idx<method.params.length;idx++){
            let param = method.params[idx]
            let paramName = (!!param.name)?param.name:"arg"+(idx)
            args+=`,${paramName}`
            //argsComment +=`* @param  {${getJsType(param.type)}} ${paramName}\n`
            comments.push(`* @param  {${getLangType(param.type,LangEnum.JS)}} ${paramName}`)
        }
    }

    argsComment=comments.join('\n')

    let retType=!!method.return?method.return.name:'void';
   
    let contend=`
    /**
     * @param  {any} session
     ${argsComment}
     * @returns {Promise<${getLangType(method.return,LangEnum.JS)}>}
     */
    async ${method.name}(session${args}){
    ${reserved}
    }
    `
    return contend
}


const HandlerFileSufix="Handler.js"
const HandlerDir="Handler"

const RemoteFileSufix="Remote.js"
const RemoteDir="Remote"
const RemoteProxyDir="RemoteProxy"


/**
 * 描述
 * @date 2022-2-16
 * @param {MethodNode} method
 * @param {Set<string>} protoMsg
 * @returns {void}
 */
function addProtoUsed(method,protoMsg){
    method.params.forEach((param,idx)=>{ 
        if(param.type.type == TypeEnum.PB){
            protoMsg.add(param.type.name) 
        }
    })
    if(!!method.return && method.return.type == TypeEnum.PB){
        protoMsg.add(method.return.name)
    } 
}


/**
 * 描述
 * @date 2022-2-16
 * @param {MethodNode} method
 * @returns {string}
 */
function genHandlerParamDecode(method){
    return `(buff,offset)=>{
        let $msgBuf = Buffer.from(buff.buffer, buff.byteOffset + offset, buff.byteLength - offset)
        ${genDecode(method.params,"$msgBuf")}
    }`
    if(method.params.length == 0){
        return `
        (buff, offset) => {
           return []
        }`
    }
    if( method.params.length==1 && method.params[0].type.type == TypeEnum.PB ){
        return `
        (buff, offset) => {
            let msgBuf = Buffer.from(buff.buffer, buff.byteOffset + offset, buff.byteLength - offset)
            let arg0 = ${method.params[0].type.name}.decode(msgBuf)
            return [arg0]
        }`
    }else{

        let str=""
        method.params.forEach((param,index)=>{
            let typeInfo = TypeMap[param.type.name]
            if( typeInfo[0] == 'string'){
                str+=`let len${index} = msgBuf.readUInt16BE(index);
                index+=2;
                let arg${index} = msgBuf.toString('utf8',index,index+len${index})
                index+=len${index}
                ` 
            }else if( typeInfo[0] == 'any'){

            }else{
                str+=`let arg${index} = msgBuf.${typeInfo[2]}(index)
                    index += ${typeInfo[1]}`
            }

        })

        return `
        (buff, offset) => {
            let msgBuf = Buffer.from(buff.buffer, buff.byteOffset + offset, buff.byteLength - offset)
            let index= 0
            ${str}
            return [ ${method.params.map((val,index)=>'arg'+index).join(',')}]
        }`

    }
}

/**
 * 描述
 * @date 2022-2-16
 * @param {MethodNode} method
 * @returns {string}
 */
function genHandlerRetEncode(method){
    let encodeStr='null'
    if(!!method.return ){
        let retname='retVal'
        encodeStr=`(${retname})=>{
            ${genEncode([new ParamNode(method.return,retname)])}
        }`

        // if(method.return.type == TypeEnum.PB){
        //     encodeStr = `(msg)=>{
        //         let array = ${method.return.name}.encode(msg).finish()
        //         return array
        //         }`
        // } else {
        //     //to do
        //     if( method.return.name == 'string'){
        //         encodeStr = `(msg)=>{
        //             return Buffer.from(msg)
        //         }`
        //     }else{
        //         let typeInfo = TypeMap[method.return.name]
        //         encodeStr = `(msg)=>{
        //             let buf = Buffer.alloc(${typeInfo[1]})
        //             buf.${typeInfo[3]}(msg)
        //             return buf
        //             }`
        //     }

        // }
    } 
    return encodeStr
}



/**
 * 描述
 * @date 2022-2-16
 * @param {Array<RootNode>} trees
 * @param {string} outdir
 * @returns {any}
 */
function genHandlerFiles(trees,outdir){
    for(let ast of trees){

        for(let service of ast.services){
            if( !IsHandlerService(service.name) ){
                continue
            }
            let [servername,modulename] = extractServiceInfo(service.name)
            if(!servername){
                console.log("service name error! name:%s",service.name)
                return
            }
            let fname =modulename+HandlerFileSufix;
            let fpath = path.join(outdir,servername,HandlerDir,fname)
            //make dir
            fs.mkdirSync(path.dirname(fpath),{recursive:true})

            let fileContend = fs.existsSync(fpath)?fs.readFileSync(fpath,{encoding:'utf8'}):"";
            let methodStr =""
            let protoMsg = new Set()
            let constructStr=""

            
            for(let method of service.methods){

                methodStr+=genHandlerMethod(method,fileContend)
                let decodeStr=genHandlerParamDecode(method)
                let encodeStr=genHandlerRetEncode(method)
                addProtoUsed(method,protoMsg)
      

                constructStr+=`
                    this.maps[ServiceEnum.${servername}_${modulename+HandlerDir}_${method.name}] = [this.${method.name}.bind(this),
                    ${decodeStr},
                    ${encodeStr}]
                    `
            }

            let protoImportStr =[...protoMsg].join(',')
            // final contend. write to file
            let headReserved = findTagContend(fileContend, "@Head","");
            let contend = `
                //@ts-check
                const {ServiceEnum} = require('../../ServiceEnum')
                const {${protoImportStr}} =  require("Protos")
                const Hades = GlobalHades
                ${headReserved}
                class Handler{
                    ${methodStr}

                    //auto generated.[handler, paramDecode, returnEncode ]
                    maps  = {}
                    constructor(){
                    ${constructStr}
                    }
                }
                module.exports = new Handler() 
                `
            writeJsFile( fpath,contend)

        }
    }
}



/**
 * 描述
 * @date 2022-2-16
 * @param {MethodNode} method
 * @param {string} fileContend
 * @returns {string}
 */
function genRemoteMethod(method,fileContend){
    let reserved = findTagContend(fileContend,method.name,"\t")
    let retStr=getLangType(method.return,LangEnum.JS) 

    //let args=method.params.map( (param,idx)=>(!!param.name)?param.name:"arg"+(idx) ).join(',')
    let argsComment=""
    let args=''

    if( method.params.length ==1 ){
        let param = method.params[0]
        let paramName = (!!param.name)?param.name:"args"
        args =`${paramName}` 
        argsComment =`* @param  {${ getLangType(param.type,LangEnum.JS)}} ${paramName}` 
    }else{
        args=method.params.map( (param,idx)=>(!!param.name)?param.name:"arg"+(idx) ).join(',') 

        for(let idx=0;idx<method.params.length;idx++){
            let param = method.params[idx]
            let paramName = (!!param.name)?param.name:"arg"+(idx)
            argsComment +=`* @param  {${ getLangType(param.type,LangEnum.JS)}} ${paramName} \n`
        }
    }

    let contend=`
    /**
     ${argsComment}
     * @returns {Promise<${retStr}>}
     */
    async ${method.name}(${args}){
        ${reserved}
    }
    `
    return contend
}


/**
 * 描述
 * @date 2022-2-16
 * @param {Array<RootNode>} trees
 * @param {string} outdir
 * @returns {any}
 */
function genRemoteFiles(trees,outdir){
    for(let ast of trees){
        for(let service of ast.services){
            if( !IsRemoteService(service.name) ){
                continue
            }

            let [servername,modulename] = extractServiceInfo(service.name)
            if(!servername){
                console.log("service name error! name:%s",service.name)
                return
            }
            let fname = modulename+RemoteFileSufix
            let fpath = path.join(outdir,servername,RemoteDir,fname)
            //make dir
            fs.mkdirSync(path.dirname(fpath),{recursive:true})

            let fileContend = fs.existsSync(fpath)?fs.readFileSync(fpath,{encoding:'utf8'}):"";
            let protoMsg = new Set()
            let methodStr=''

            for(let method of service.methods){
                methodStr+=genRemoteMethod(method,fileContend)                
                addProtoUsed(method,protoMsg)
            }
            //write file
            let protoMsgstr = [...protoMsg].join(',')
            let headReserved = findTagContend(fileContend, "@Head","");
            let contend =`
                //auto generated
                //@ts-check
                const {${protoMsgstr}} =  require("Protos")
                const Hades = GlobalHades
                ${headReserved}
                class Remote{
                    ${methodStr}
                }   
                module.exports = new Remote()`
            writeJsFile(fpath,contend)
        }
    }
}


/**
 * 描述
 * @date 2022-2-16
 * @param {MethodNode} method
 * @returns {string}
 */
function genRemoteProxyMethod(method){
    let retStr=''
    if(!!method.return){
        if(method.return.type == TypeEnum.PB){
            retStr=`
                let args = ${method.return.name}.decode( buf )
                return args 
            `
        }else{
            retStr=`
            `
        }
    }else{
        retStr='return []'
    }
    let paramName=method.params.map((param,index)=>!!param.name?param.name:"arg"+index)
    let retName = 'retVal'
    let retNode = !!method.return?[new ParamNode(method.return,retName)]:[]

    let contend=`
    ${method.name}:{
        encodeParam:function(${paramName.join(',')}){
            ${genEncode(method.params)}
        },
        decodeParam:function($buff){
            ${genDecode(method.params,"$buff")}
        },
        encodeReturn:function(${retName}){
            ${genEncode(retNode)}
        },
        decodeReturn:function($buff){
            ${genDecode(retNode,"$buff")}
        }
    },
    `
    return contend
    
}

/**
 * 描述
 * @date 2022-2-16
 * @param {Array<RootNode>} trees
 * @param {string} outdir
 * @returns {any}
 */
function genRemoteProxyFiles(trees,outdir){
    for(let ast of trees){
        for(let service of ast.services){
            if( !IsRemoteService(service.name) ){
                continue
            }

            let [servername,modulename] = extractServiceInfo(service.name)
            if(!servername){
                console.log("service name error! name:%s",service.name)
                return
            }
            let fname = modulename+RemoteFileSufix
            let fpath = path.join(outdir,servername,RemoteProxyDir,fname)
            //make dir
            fs.mkdirSync(path.dirname(fpath),{recursive:true})
            let protoMsg = new Set()
            let methodStr=''

            for(let method of service.methods){
                methodStr +=genRemoteProxyMethod(method)
                addProtoUsed(method,protoMsg)
            }
            let protoStr=[...protoMsg].join(',')
            let contend = `
            //auto generated
            //@ts-check
            const {${protoStr}} =  require("Protos")
            const RemoteProxy = {
                ${methodStr}
            } 
            module.exports = RemoteProxy`
            writeJsFile(fpath,contend)
        }
    }

}
    
/**
 * 描述
 * @date 2022-2-16
 * @param {Array<RootNode>} trees
 * @param {string} outdir
 * @returns {any}
 */
function genRemoteDts(trees,outdir){
    let tsName="../../Hades/Hades.d.ts"
    //tsName="Hades.d.ts"
    let fpath = path.join(outdir,tsName)
    let fileContend = fs.existsSync(fpath)?fs.readFileSync(fpath,{encoding:'utf8'}):""

    /** @type {Map<string,Map<string,Array<MethodNode> >>} */
    let remotes = new Map()
    let protoMsg = new Set()
    for(let ast of trees){
        for(let service of ast.services){
            if( !IsRemoteService(service.name) ){
                continue
            }
            let [servername,module] = extractServiceInfo(service.name)
            if(!remotes.has(servername)){
                remotes.set( servername,new Map() )
            }
            let mname =module+ RemoteDir
            let modules = remotes.get(servername)
            if( !modules.has(mname)){
                modules.set(mname,new Array())
            }
            let methods = modules.get(mname)
            service.methods.forEach((method)=>{ methods.push(method); addProtoUsed(method,protoMsg) })
        }
    }
    
    //
    let serverStr=''
    for(let [server,module] of remotes){
        let moduleStr=''
        for(let [mname,methods] of module){
            let methodStr=''
            for(let method of methods){
                let argsStr=`args:${method.params[0].type.name}`
                let retStr = getLangType(method.return,LangEnum.JS) //!!method.return?method.return.name:'any'
                methodStr+=`${method.name}(${argsStr}):Promise<${retStr}>;\n`
            }
            moduleStr +=`${mname}:{${methodStr}}`
        }
        serverStr+=`${server}:{${moduleStr}}`
    }
    let remoteStr=`Remote:{${serverStr}},`
    let headStr =`import {${[...protoMsg].join(',')}} from "../Project/node_modules/Protos"`
    //
    let contend = replaceTagContend(fileContend,"@Head",headStr)
    contend = replaceTagContend(contend,"Remote",remoteStr)
    writeJsFile(fpath,contend)

}
/**
 * 描述
 * @date 2022-2-16
 * @param {MethodNode} method
 * @returns {string}
 */
function genEventMethod(method){
    let contend =`
    /**
     * @param  {${method.params[0].type.name}} args
     * @param  {Array<PushUserInfo>} pushUserInfo 
     * @returns {Promise<Buffer>}
     */
    async ${method.name}(args,pushUserInfo){
        return Hades.App.pushToClientByUids(PushEventEnum.${method.name},args,pushUserInfo);
    }
    `
    return contend
}

/**
 * 描述
 * @date 2022-2-16
 * @param {Array<RootNode>} trees
 * @param {string} outdir
 * @returns {any}
 */
function genPushEvent(trees,outdir){

    let fpath = path.join(outdir,"PushEvent.js")
    let enumStr='';
    let conStr='';
    let methodStr='';
    let eventId=0

    let protoMsg=new Set()
    for(let ast of trees){
        for(let service of ast.services){
            if( !IsClientService(service.name) ){
                continue
            } 

            for(let method of service.methods){
                enumStr += `   ${method.name} : ${eventId},\n`
                conStr+=`
                this.#encoder[PushEventEnum.${method.name}] = (msg)=>{
                    let array = ${method.params[0].type.name}.encode(msg).finish()
                    return array
                }
                `
                methodStr+=genEventMethod(method);
                addProtoUsed(method,protoMsg)
                eventId++;
            }
        }
    }
    let protoStr=[...protoMsg].join(',')
    let contend =`
        //auto generated
        //@ts-check
        const Hades = GlobalHades
        const {${protoStr}} =  require("Protos")
        const PushEventEnum = {
            ${enumStr}
        }
        class PushUserInfo{
            /**
            * @param {number} uid
            * @param {string} sid
            */
            constructor(uid,sid){
                this.uid = uid
                this.sid = sid
            }
        }

        class PushEncoder{
            #encoder=new Map()
            constructor(){
                ${conStr}
            }
            encode(id,msg){
                return this.#encoder[id](msg)
            }
        }

        class PushEvent{
            ${methodStr}
        }
        module.exports = {
            pushEncoder:new PushEncoder(),
            pushEvent : new PushEvent(),
            PushUserInfo : PushUserInfo 
        }`

    writeJsFile(fpath,contend)
}


/**
 * 描述
 * @date 2022-2-16
 * @param {Array<RootNode>} trees
 * @param {string} outdir
 * @returns {any}
 */
function genEnum(trees,outdir){
    let servicedId =0


    let providerStr=''
    let enumStr = ''
    for(let ast of trees){
        for(let service of ast.services){
            if( !IsHandlerService(service.name)){
                continue
            }

            let [server,module] =extractServiceInfo(service.name)
            let mname=module+HandlerDir
            for(let method of service.methods){
                let key = `${server}_${mname}_${method.name}`
                providerStr+=`ServiceProvider[ServiceEnum.${key}] = "${server}"`
                enumStr +=` ${key} : ${servicedId},\n`
                servicedId++
            }
        }
    }
    enumStr += `    _Total_Number : ${servicedId}, ` 
    let contend =`
        //@ts-check
        const ServiceEnum = {
            ${enumStr}
        }
        const ServiceProvider= {}
        ${providerStr}
        module.exports = {
            ServiceEnum,
            ServiceProvider
        }
        `
    let fpath = path.join(outdir,"ServiceEnum.js")
    //fs.writeFileSync( fpath,contend) 
    writeJsFile(fpath,contend)
    let fpath1 = path.join(outdir,"../../../Tools/GenTestCode/ServiceEnum.js")
    writeJsFile(fpath1,contend)

}




module.exports = GeneratorJs