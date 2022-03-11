//@ts-check
/*$$
 *@Author: dongwj
 *@Date: 2021-12-16 15:48:37
 *@LastEditors: dongwj
 *@Description: 
*/

const path = require('path')
const fs   = require('fs')
const {RootNode,MethodNode,ParamNode,TypeNode,TypeEnum} = require('../parser/ast-def')
const {findTagContend,extractServiceInfo} = require('./util')
const HandlerFileSufix="RPCLUA.txt"
const EventFileSufix="PushEventLUA.txt"


/**
 * 描述 入口
 * @date 2021-12-16
 * @param {Array<RootNode>} trees
 * @param {string} output
 * @returns {any}
 */
function GeneratorLua(trees,output){
    genHandlerFiles(trees,output)
}
/**
 * 描述
 * @date 2021-12-16
 * @param {Array<RootNode>} trees
 * @param {string} output
 * @returns {any}
 */
function genHandlerFiles(trees,output){
    genRpcFile(trees,output);
    genPushEventFile(trees,output);
}


/**
 * 描述 标记开始
 * @date 2020-12-16
 * @param {string} name
 * @returns {string}
 */
function getStartTag(name) {
    let kStartTag = `--===== ${name} start============================================================`;
    return kStartTag
}
/**
 * 描述 标记结束
 * @date 2020-12-16
 * @param {string} name
 * @returns {string}
 */
function getEndTag(name) {
    let kEndTag = `--===== ${name} end==============================================================`;
    return kEndTag 
}
/**
 * 描述 解析fmt编码
 * @date 2020-12-16
 * @param {string} typeStr 
 */
function CheckTypeMap(typeStr){
    switch (typeStr){
        case "bool":return "B";
        case "bytes":
        case "string":
                return "s2";
        case "int32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
                return "i4";
        case "int64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
                return "i8";
        case "uint32":return "I4";
        case "uint64":return "I8";
        case "double":return "d";
        case "float":return "f";
    }
}
/**
 * 描述 获取自定义代码部分
 * @date 2020-12-16
 * @param {string} contend
 * @param {string} name
 * @param {string} prefix
 * @returns {string}
 */
function FindTagContend(contend,name,prefix){
    let startTag = getStartTag(name);
    let endTag = getEndTag(name);

    let sIdx = contend.indexOf(startTag);
    if (sIdx >=0 ) {
        let eIdx = contend.indexOf(endTag);
        if (eIdx >=0 && eIdx > sIdx) {
            return contend.substr(sIdx, eIdx - sIdx + endTag.length );
        }
    }
    return startTag + "\n" + prefix + endTag;
}
/**
 * 描述
 * @date 2020-12-16
 * @param {string} name
 * @returns {boolean}
 */
function IsHandlerService(name){
    return name.toLowerCase().endsWith('handler')
}
/**
 * 描述
 * @date 2020-12-16
 * @param {string} name
 * @returns {boolean}
 */
function IsPushService(name){
    return name.toLowerCase().startsWith('client')
}


/**
 * @param {string} name
 */
function IsJson(name){
    return name=="JsonData"||name=="JsonObject"||name.toLowerCase()=="json"
}
/**
 * 描述
 * @date 2020-12-16
 * @param {string} name
 * @returns {boolean}
 */
function IsClientService(name){
    return name.toLowerCase().endsWith('client')
}


/**
 * 描述 生成RPC文件
 * @date 2020-12-16
 * @param {Array<RootNode>} trees
 * @param {string} output
 */
function genRpcFile(trees,output){
    
    let fileDesc=""
for(let ast of trees){
    if(!ast){
        break; 
    }
    for(let service of ast.services){
        /*if( !IsHandlerService(service.name) ){
            continue
        }*/
        if( IsPushService(service.name) ){
            continue
        }
        let arrTemp = service.name.split('_')
        let serviceid=arrTemp[arrTemp.length-1];
        let serviceName = service.name.substr(0,service.name.length-serviceid.length - 2)
        fileDesc+=`
RPCLUA.${serviceName}={};\n`
        for(let method of service.methods){
            let methodStr="";
            let HasParam=method.params.length>0;
            let ParamPB=false;
            let ParamJson=false;
            let paramNameStr=""
            let luafmt=">"
            method.params.forEach((param,idx)=>{ 
                if(param.type.type == TypeEnum.PB){
                    ParamPB=true;
                    paramNameStr+=`"${param.type.name}",`
                }else if(IsJson(param.type.name)){
                    ParamJson=true
                }
                else{ 
                    paramNameStr+=`"${param.type.name}",`
                    luafmt+=CheckTypeMap(param.type.name);
                }
            })
            if(!!method.return){ 
                let returnPbFunStr=`
    PomeloCLUA.pomeloClient:request(${serviceid},reqMsg,function (buffer,offset)
                --ans 是 ${method.return.name} 结构得 luatable
                local ans=PomeloCLUA:PBDecode("${method.return.name}",buffer,offset);
                callback(backTable,ans);
            end);`
                let returnJsonFunc=`
    PomeloCLUA.pomeloClient:request(${serviceid},reqMsg,function (buffer,offset)
            --ans 是 luatable，json格式
                local ans=PomeloCLUA:JsonDecode(buffer,offset);
                callback(backTable,ans);
            end);`
                let returnBuiltInFunc=`
    PomeloCLUA.pomeloClient:request(${serviceid},reqMsg,function (buffer,offset)
                --ans 是 ${method.return.name}
                local ans=PomeloCLUA:${method.return.name=="string"?"StringDecode":"BuiltInDecode"}(${method.return.name=="string"?"":`">${CheckTypeMap(method.return.name)}",`}buffer, offset)
                callback(backTable,ans);
            end);`

                let paramPBStr=`    local  reqMsg = PomeloCLUA:PBEncode(${paramNameStr} requstMsg)`
                let paramJsonStr=`  local  reqMsg = PomeloCLUA:JsonEncode(requstMsg)`
                let paramBuiltInStr=`   local reqMsg = PomeloCLUA:BuiltInEncode("${luafmt}", requstMsg);`
                if(!HasParam){///无参
                    if(IsJson(method.return.name)){
                        methodStr+=`
    PomeloCLUA:JsonRequest(${serviceid}, nil,callback,backTable);`
                    }
                    else if(method.return.type==TypeEnum.PB){
                       methodStr=`
    PomeloCLUA:PbRequest(${serviceid},nil,nil,"${ method.return.name}",callback,backTable);`
                    }else{
                        methodStr=`
    PomeloCLUA.pomeloClient:request(${serviceid},nil,function (buffer,offset)
                --ans 是 ${method.return.name}
                local ans=PomeloCLUA:${method.return.name=="string"?"StringDecode":"BuiltInDecode"}(${method.return.name=="string"?"":`">${CheckTypeMap(method.return.name)}",`}buffer, offset)
                callback(backTable,ans);
            end);`
                    }
            methodStr=`
-- requstMsg:无参
function RPCLUA.${serviceName}.${method.name}(callback,backTable)--
${methodStr}
end`
                }else{
                if(ParamPB){///参数是pb，返回值分别是json、pb,builtIn
                    if(IsJson(method.return.name)){
                        methodStr=paramPBStr+returnJsonFunc;
                    }
                    else if(method.return.type==TypeEnum.PB){
                        methodStr=`
    PomeloCLUA:PbRequest(${serviceid}, ${paramNameStr}requstMsg,"${ method.return.name}",callback,backTable);`
                    }else{
                        methodStr=paramPBStr+returnBuiltInFunc;
                    }
            methodStr=`
-- requstMsg:${paramNameStr}结构的luatable 、
function RPCLUA.${serviceName}.${method.name}(requstMsg,callback,backTable)--
${methodStr}
end`
                }else if(ParamJson){///参数是json，返回值分别是json、pb,builtIn
                    if(IsJson(method.return.name)){
                        methodStr+=`
    PomeloCLUA:JsonRequest(${serviceid}, requstMsg,callback,backTable);`
                    }
                    else if(method.return.type==TypeEnum.PB){
                        methodStr+=paramJsonStr+returnPbFunStr;
                    }else{
                        methodStr+=paramJsonStr+returnBuiltInFunc;
                    }
            methodStr=`
-- requstMsg:luatable 、
function RPCLUA.${serviceName}.${method.name}(requstMsg,callback,backTable)--
${methodStr}
end`
                }else{//参数是基本类型，返回值分别是json、pb,builtIn
                    if(IsJson(method.return.name)){
                        methodStr+=paramBuiltInStr+returnJsonFunc
                    }
                    else if(method.return.type==TypeEnum.PB){
                        methodStr+=paramBuiltInStr+returnPbFunStr
                    }else{
                        methodStr+=paramBuiltInStr+returnBuiltInFunc
                    }
            methodStr=`
-- requstMsg:luatable 依次是${paramNameStr}
function RPCLUA.${serviceName}.${method.name}(requstMsg,callback,backTable)--
${methodStr}
end`
                }
            }}else{
                if(!HasParam){///无参
                    methodStr=`
-- requstMsg:无参
function RPCLUA.${serviceName}.${method.name}()
    PomeloCLUA.pomeloClient:notify(${serviceid});
end`
                }else{
                if(ParamPB){
                    methodStr+=`
function RPCLUA.${serviceName}.${method.name}(requstMsg)
    PomeloCLUA:PBNotify(${serviceid},${paramNameStr}requstMsg)
end`
                }else if(ParamJson){
                    methodStr+=`
function RPCLUA.${serviceName}.${method.name}(requstMsg)
    PomeloCLUA:Notify(${serviceid},requstMsg)
end`
                }else{
                    methodStr+=`
     -- requstMsg:luatable 依次是${paramNameStr}
function RPCLUA.${serviceName}.${method.name}(requstMsg)
    local reqMsg = PomeloCLUA:BuiltInEncode("${luafmt}", requstMsg);
    PomeloCLUA.pomeloClient:LuaPBNotify(${serviceid},reqMsg)
end`  
                }
            }}
            fileDesc+=methodStr
            serviceid++;
        }
    }

}
    let fpath=path.join(output,HandlerFileSufix);
    fs.mkdirSync(path.dirname(fpath),{recursive:true})
    let fileContend = fs.existsSync(fpath)?fs.readFileSync(fpath,{encoding:'utf8'}):"";
    
    let headReserved = FindTagContend(fileContend, "@Head","");

    let RpcTitle=`${headReserved}
RPCLUA={};
${fileDesc}
return RPCLUA;
` 
    
    fs.writeFileSync( fpath,RpcTitle)
}

/**
 *  * 描述 解析pushEvent
 * @date 2020-12-16
 * @param {Array<RootNode>} trees
 * @param {string} output
 */
function genPushEventFile(trees,output)
{
    let fpath=path.join(output,EventFileSufix);
    //make dir
    fs.mkdirSync(path.dirname(fpath),{recursive:true})

    let fileContend = fs.existsSync(fpath)?fs.readFileSync(fpath,{encoding:'utf8'}):"";
    //let serviceid=0;
    let eventStr="";
    let serviceEnum=""
    for(let ast of trees){
        if(!ast){
            break; 
        }
        for(let service of ast.services){
            /*if( !IsClientService(service.name) ){
                continue
            }*/
            if( !IsPushService(service.name) ){
                continue
            }
            let arrTemp = service.name.split('_')
            let serviceid=arrTemp[arrTemp.length-1];
            for(let method of service.methods){
                serviceEnum+=`${method.name}=${serviceid};\n`;
                serviceid++;
                let luafmt=">"
                let reserved = FindTagContend(fileContend, method.name,"\t\t");
                if(method.params.length>0){
                    let param=method.params[0]
                    if(IsJson(param.type.name)){
                        eventStr+=`
        self.${method.name}=PomeloCLUA:JsonOnEvent(self.serviceId.${method.name},function(niltable,${(!!param.name)?param.name:("arg0")})
            ${reserved}
        end);`
                    }else if(param.type.type==TypeEnum.PB){
                        eventStr+=`
        self.${method.name}=PomeloCLUA:PBOnEvent(self.serviceId.${method.name},"${param.type.name}",function(niltable,${(!!param.name)?param.name:("arg0")})
            ${reserved}
        end);`
                    }else{
                        luafmt+=CheckTypeMap(param.type.name);
                        eventStr+=`
        self.${method.name}=PomeloCLUA:BuiltInOn(self.serviceId.${method.name},"${luafmt}",${param.type.name=="string"},function(niltable,${(!!param.name)?param.name:("arg0")})
            ${reserved}
        end);`
                    }
                }else{
                    eventStr+=`
        self.${method.name}=PomeloCLUA:BuiltInOn(self.serviceId.${method.name},nil,false,function()
            ${reserved}
        end);`
                }
            }
        }
    }



    let headReserved = FindTagContend(fileContend, "@Head","");
        let PushEventStr=`${headReserved}
PushEventLUA={ serviceId={
${serviceEnum}
};}
function PushEventLUA:InitOn()
${eventStr}
end
return PushEventLUA;`
    fs.writeFileSync( fpath,PushEventStr)
}
module.exports = GeneratorLua