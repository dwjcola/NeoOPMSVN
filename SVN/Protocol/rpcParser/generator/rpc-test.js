const protobuf   = require('protobufjs');
const parser = require('../parser/testCode-parser')
const path = require('path')
const fs = require('fs')
const {RootNode,MethodNode,ParamNode,TypeNode,TypeEnum} = require('../parser/ast-def')
const defalutRepeatedLength = 3
const genTestCode = require('../testCode/genTestCode/genTestCode')

/**
 * @class
 */
class tCodeRootNode{
    constructor(){
        /** @type {Array}*/
        this.statements = new Array()
    }
}
/**
 * @class
 */
class StatementNode{
    constructor(retVariable,rpcName,paramFile){
        /** @type {string} */
	    this.retVariable = retVariable
        /** @type {string} */
        this.rpcName = rpcName
        /** @type {string} */
        this.paramFile = paramFile
    }
}

var isSimpleType = function(type){
    let simpleType = ['double','float','int32','int64','uint32','uint64','sint32','sint64','fixed32','fixed64','sfixed32','sfixed64','bool','string','bytes']
    if(simpleType.indexOf(type)!=-1){
        return true
    }
    else{
        return false
    }
}

var getOutFileDataType = function(protoType){
    let int = ['int32','int64','uint32','uint64']
    let dou = ['double','float']
    if(int.indexOf(protoType)!=-1){
        return 'int'
    }
    else if(dou.indexOf(protoType)!=-1){
        return 'double'
    }
    else{
        return 'string'
    }
}

var setFirstCharUpper = function(str){
    str = str.split('\r')[0]
    let tempArr = str.split('.')
    for(let i=0;i<tempArr.length;i++){
        tempArr[i] = tempArr[i][0].toUpperCase() + tempArr[i].substr(1)
    }
    str = tempArr.join('.')
    return str
}

var genProtoVal = function(type,val){
    type =type.split('\r')[0]

    if(val[0]=='$'){       //变量 特殊处理
        
        let tempArr = val.split('.')
        for(let i=1;i<tempArr.length;i++){
            tempArr[i] = tempArr[i][0].toUpperCase() + tempArr[i].substr(1)
        }
        val = tempArr.join('.')
        return val
    }
    if(type=='int'){
        return parseInt(val)
    }
    else if(type == 'string'){
        return val.toString()
    }
    else{
        console.error("genProtoVal err",type,val)
        return val
    }
}

var genCsPropertyVal = function(type,val){
    type =type.split('\r')[0]
    val = val.split('\r')[0]
    if(type == 'int'){
        return val
    }
    else if(type== 'string'){
        return '"'+val+'"'
    }
}

let protoMap = {}
let rpcMap = {}

/**
 * 
 * @param {Array<string>} protoFiles 
 * @param {Array<RootNode>} rpcTree
 */
var resolveAll = function(protoFiles,rpcTree,cb){
    let protoRoot = new protobuf.Root()
    let opertion={
        alternateCommentMode:true,
        preferTrailingComment:true
    }
    let ns =protoRoot.loadSync(protoFiles,opertion).resolveAll()
    protoMap = ns.nested.SLG.nested                              //TODO  判断proto类型

    //解析rpc
    rpcMap = {}
    for(let ast of rpcTree){
        if(!ast){
            break; 
        }
        for(let service of ast.services){
            if( !IsHandlerService(service.name) ){
                continue
            }
            for (let rpc of service.methods){
                rpc.serviceName = service.name
                rpcMap[rpc.serviceName+'_'+rpc.name] = rpc
            }
            
        }
    }

    //异步方法，需要等待
    genTestCode.initGenTools()
    setTimeout(() => {
        cb&&cb()
    }, 3000);
    
}
/**
 * 
 * @param {string} outdir 
 */
 var genConfigFiles=function(outdir){
    
    let testCode = "./testCode/testCode.tcode"
    let fstr = fs.readFileSync( testCode,{encoding:'utf8'})
    let tcodes = parser.parse(fstr).statements 
    
    for (let lineId in tcodes){
        let statement = tcodes[lineId]
        let thisRpc = rpcMap[statement.rpcName]
        if(!thisRpc){
            console.error("rpcName err on line ",lineId)
            continue
        }

        let outFileFields = new Array()
        let outFileDataTypes = new Array()
        
        var genOutFileField = function(proto,savedName){
            if(!proto){
                console.error("rpc param err ")
                return
            }
            for(let fieldName in proto.fields){
                let thisField = proto.fields[fieldName]
                let filedType = thisField.type
                let filedName = thisField.name
                if(isSimpleType(filedType)){            //基本类型
                    if(thisField.repeated){
                        outFileFields.push(savedName + filedName +'.count')
                        outFileDataTypes.push('int')
                        for(let i=0;i<defalutRepeatedLength;i++){
                            outFileFields.push( savedName + filedName+'['+i+']')
                            outFileDataTypes.push(getOutFileDataType(filedType))
                        }
                    }
                    else{
                        outFileFields.push(savedName + filedName)
                        outFileDataTypes.push(getOutFileDataType(filedType))
                    }
                }
                else{                                    //proto类型
                    let thisProto = protoMap[filedType]
                    if(thisField.repeated){
                        outFileFields.push(savedName + filedName +'.count')
                        outFileDataTypes.push('int')
                        for(let i=0;i<defalutRepeatedLength;i++){
                            genOutFileField(thisProto,savedName +filedName +'['+ i +'].')
                        }
                    }
                    else{
                        genOutFileField(thisProto,savedName +filedName + '.')
                    }
                }
            }
        }

        outFileFields.push('id')
        outFileDataTypes.push('int')

        //rpc的参数
        if(thisRpc.params.length==1 && thisRpc.params[0].type.type==TypeEnum.PB){
            let thisProtoName = thisRpc.params[0].type.name
            let thisProto = protoMap[thisProtoName]
            outFileFields.push('rpcParam')
            outFileDataTypes.push('string')
            genOutFileField(thisProto,'') 
        }
        else{

        }


        //rpc的返回值
        if(thisRpc.return.type == TypeEnum.PB){
            let thisProtoName = thisRpc.return.name
            let thisProto = protoMap[thisProtoName]
            outFileFields.push('rpcReturn')
            outFileDataTypes.push('string')
            genOutFileField(thisProto,'') 
        }
        else{
            
        }


        let fileContent = ''
        for(let fieldname of outFileFields){
            fileContent+=fieldname+'\t'
        }
        fileContent+='\n'
        for(let dataType of outFileDataTypes){
            fileContent+=dataType+'\t'
        }
        let fpath=path.join(outdir,thisRpc.name+'param.txt');
        console.log("generate rpc test config file,",fpath)
        fs.writeFileSync( fpath,fileContent)
    }

    //console.log("-----------------",JSON.stringify(tree))
}
/**
 * 
 * @param {string} outdir 
 */
var genCSFiles = function(outdir){

    let testCode = "./testCode/testCode.tcode"
    let fstr = fs.readFileSync( testCode,{encoding:'utf8'})
    let tcodes = parser.parse(fstr).statements 
    
    //顺序执行
    for (let lineId=0;lineId<tcodes.length;lineId++){

        /** @type {StatementNode} */
        let statement = tcodes[lineId]      
        let rpcName = statement.rpcName       
        let rpcParam = {}       //rpc参数
        let rpcReturnName = statement.retVariable

        let thisRpc = rpcMap[rpcName]             //相当于检测是否有函数定义
        if(!thisRpc){
            console.error("rpcName err on line ",lineId)
            continue
        }
       
        let paramPath = './testCode/param/' + statement.paramFile
        if(!fs.existsSync(paramPath)){
            console.error("no param file:")
            process.exit(0)
        }
        let fileContend =fs.readFileSync(paramPath,{encoding:'utf8'})
        let lines = fileContend.split('\n')
        let paramIndex = lines[0].split('\t').indexOf('rpcParam')           //从此开始是rpc参数
        let returnIndex = lines[0].split('\t').indexOf('rpcReturn')+1         //从此开始是预测返回值
        let propertyNames = lines[0].split('\t')
        let valTypes = lines[1].split('\t')
        let lineData = lines[2].split('\t')
        if(lineData.length<=1)
            continue
        if(statement.paramFile){
            
            //中间过程rpc
            if(lineId!=tcodes.length-1){
                let lineDataIndex = paramIndex+1
                //深度优先遍历proto
                var parseConfigFile = function(proto,protoObj){
                if(!proto){
                        console.error("rpc param err ")
                        return
                    }
                    for(let fieldName in proto.fields){
                        let thisField = proto.fields[fieldName]
                        let filedType = thisField.type
                        let filedName = thisField.name
                        if(isSimpleType(filedType)){            //基本类型
                            if(thisField.repeated){
                                let count = parseInt(lineData[lineDataIndex++])
                                protoObj[filedName] = new Array(count)
                                for(let i=0;i<count;i++){
                                    protoObj[filedName].push( genProtoVal(valTypes[lineDataIndex],lineData[lineDataIndex++]))
                                }
                            }
                            else{
                                protoObj[filedName] = genProtoVal(valTypes[lineDataIndex],lineData[lineDataIndex++])
                            }
                        }
                        else{                                    //proto类型
                            let thisProto = protoMap[filedType]
                            if(thisField.repeated){
                                let count = parseInt(lineData[lineDataIndex++])
                                protoObj[filedName] = new Array(count)
                                for(let i=0;i<count;i++){
                                    protoObj[filedName][i] = parseConfigFile(thisProto,{})
                                }
                            }
                            else{
                                protoObj[filedName] = parseConfigFile(thisProto,{})
                            }
                        }
                    }
                    return protoObj
                }

                let thisProtoName = thisRpc.params[0].type.name
                let thisProto = protoMap[thisProtoName]
                rpcParam = parseConfigFile(thisProto,{})
                console.log(rpcParam)
                //解析完一行参数
            }
            
        }
        let checkString = ''
        if(rpcReturnName){ 
            for(let i=returnIndex;i<lineData.length;i++){
                let proName = setFirstCharUpper(propertyNames[i])
                checkString += `
            if(${rpcReturnName}.${proName} != ${genCsPropertyVal(valTypes[i],lineData[i++])})
            {
                Console.WriteLine("RPC return Check Err,${rpcReturnName}.${propertyNames[i]}=",${rpcReturnName}.${proName});
                return true;
            }
                `;
                
            }
        }

        let obj = {
            rpcName:rpcName,
            paramValue:rpcParam,
            returnVarName:rpcReturnName,
            checkString:checkString
        }
        genTestCode.genCodeForOneParam(obj)
        console.log("---------gen tCode one line----------")
        //console.log("parse rpc param file,",fpath)
    }
    genTestCode.finishTools()
}

// //将 channelRecords_0_cKey_cKey 转成 channelRecords[0].cKey.cType
// var convertToCheckStr = function(varName,typeName){
//     varName = 'Vae'
//     typeName = 'channelRecords_0_cKey_cKey'
//     let arr = typeName.split('_')
//     let i=0
//     let retArr = []
//     while(i<arr.length){
//         if(!isNaN(arr[i])){
//             retArr.push('[')
//             retArr.push(arr[i])
//             retArr.push(']')
//         }
//         if(isNaN(arr[i+1])){
//             retArr.push('.')
//         }
//         i++
//     }
//     return retArr.join('')
// }

/**
 * 描述
 * @date 2021-3-22
 * @param {string} name
 * @returns {boolean}
 */
 function IsHandlerService(name){
    return name.toLowerCase().endsWith('handler')
}


module.exports = {
    resolveAll:resolveAll,
    genConfigFiles:genConfigFiles,
    genCSFiles:genCSFiles
};