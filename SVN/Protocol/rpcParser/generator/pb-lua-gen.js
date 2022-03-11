//@ts-check
/*$$
 *@Author: dongwj
 *@Date: 2021-12-16 15:48:37
 *@LastEditors: dongwj
 *@Description: 解析proto文件的内容，生成一个message.txt和一个messageEnum.txt
*/
const fs=require('fs')
const path=require('path')
const protobuf   = require('protobufjs');

const Type      = protobuf.Type,
    Enum      = protobuf.Enum,
    Namespace = protobuf.Namespace;

/**
 * 描述
 * @date 2022-12-16
 * @param {protobuf.Enum} enm
 */
function upperEnumKeys(enm){
    let values={}
    Object.keys(enm.values).forEach(function(key) {
        values[ key.toUpperCase() ] = enm.values[key]
    });
    enm.values = values
} 

module.exports = genCode;

var pkgName=''

var msgOut=[]///存储message
var msgEnumOut=[]//只有枚举

var msgindent = 0;//message的缩进
var enumindent = 0;//枚举的缩进

var protoExist=new Set()

/**
 * 描述
 * @date 2022-12-16
 * @param {string} line
 */
function pushMsg(line) {
    if (line === "")
        return msgOut.push("");
    var ind = "";
    for (var i = 0; i < msgindent; ++i)
        ind += "    ";
    return msgOut.push(ind + line);
}
/**
 * 描述
 * @date 2022-12-16
 * @param {string} line
 */
function pushEnum(line){
    if (line === "")
        return msgEnumOut.push("");
    var ind = "";
    for (var i = 0; i < enumindent; ++i)
        ind += "    ";
    return msgEnumOut.push(ind + line);
}
/**
 * 描述 入口
 * @date 2021-12-16
 * @param {Array<string>} files
 * @param {string} outdir
 * @returns {any}
 */
function genCode(files,outdir){
    let root = new protobuf.Root()
    let opertion={
        alternateCommentMode:true,
        preferTrailingComment:true
    }
    let ns =root.loadSync(files,opertion).resolveAll()

    pushMsg(`syntax = "proto3";`)
    pushEnum(`--枚举\nMsgEnum={}`)
    indexfile_gen(ns)

    let msgFile = path.join(outdir,'Message.txt')
    let msgEnumFile = path.join(outdir,'MessageEnum.txt')

    fs.writeFileSync(msgFile, msgOut.join("\n"), { encoding: "utf8" });

    fs.writeFileSync(msgEnumFile, msgEnumOut.join("\n"), { encoding: "utf8" });
}

/**
 * 描述
 * @date 2021-12-16
 * @param {protobuf.Namespace} ns 
 * @returns {any}
 */
function indexfile_gen(ns){
    procNode([],ns)
}

/**
 * 描述
 * @date 2021-12-16
 * @param {Array<string>} ref
 * @param {protobuf.Namespace|protobuf.ReflectionObject} ns
 * @returns {any}
 */
function procNode(ref,ns){
    if( ns instanceof Type ){
        //procType()
        procType(ref,ns)
        //nested
        ns.nestedArray.forEach((nested)=>{
            procNode([...ref,ns.name],nested)
        })

        --msgindent;
        pushMsg('}')

    }else if(ns instanceof Enum){
        procEnum(ref,ns)
    }
    else if(ns instanceof Namespace){
        pkgName = ns.name
        ns.nestedArray.forEach(function(nested) {
            procNode(ref,nested)
        }); 
    }else{
        console.log("do not know type:",ns.name)
    }
}


/**
 * 描述
 * @date 2021-12-16
 * @param {Array<string>} ref
 * @param {protobuf.Type} message
 * @returns {any}
 */
function procType(ref,message){
    if( protoExist.has(message.fullName)){
        return
    }
    protoExist.add(message.fullName)

    console.log("proc:",ref,message.filename, message.name,message.parent.name)
    
    pushMsg(`message ${message.name} {`)
    ++msgindent

    message.fieldsArray.forEach(function(field) {
        field.resolve();
        pushMsg(`${toLuaType(field,pkgName)} ${UnderscoresToCamelCase(field.name,message.name)} = ${field.id};`)

    }); 
}

function UnderscoresToCamelCase(input,messageName){
    let cap_next_letter = true
    let preserve_period=false
    let result="";
    for(var i=0;i<input.length;i++){
        if('a'<=input[i]&&input[i]<='z'){
            if(cap_next_letter){
                result +=(input[i].toUpperCase());
            }else{
                result += input[i];
            }
            cap_next_letter=false;
        }else if('A'<=input[i]&&input[i]<='Z'){
            if(i==0&&!cap_next_letter){
                result+=(input[i].toLowerCase())
            }else{
                result+=input[i]
            }
            cap_next_letter=false
        }else if('0'<=input[i]&&input[i]<='9'){
            result+=input[i]
            cap_next_letter=true
        }else{
            cap_next_letter=true
            if(input[i]=='.'&&preserve_period){
                result+='.'
            }
        }
    }
    if(input.length>0&&input[input.length-1]=='#'){
        result+='_'
    }
    if(result==messageName||result=="Types"||result=="Descriptor"){
        result+='_'
    }
    return result
}

/**
 * 描述
 * @date 2020-12-22
 * @param {Array<string>} ref
 * @param {protobuf.Enum} enode 
 * @returns {any}
 */
function procEnum(ref,enode){

    upperEnumKeys(enode)

    if( protoExist.has(enode.fullName)){
        return
    }

    protoExist.add(enode.fullName)

    let enumTitle="MsgEnum."
    let enumtables="MsgEnum.";
    for(let refns of ref){
        enumtables+=refns;
        pushEnum(`${enumtables}={}`);
        enumTitle+=`${refns}.`
        enumtables+=`.`
    }
    enumTitle+=`${enode.name} ={`;
    if(enode.comment){
        pushEnum(`--[[${enode.comment}]]`)
    }
    pushEnum(enumTitle);
    ++enumindent

    pushMsg(`enum ${enode.name} {`)
    ++msgindent

    Object.keys(enode.values).forEach((key)=>{
        pushEnum(`${key}=${enode.values[key]},${enode.comment?`--[[${enode.comment}]]`:''}`)
        pushMsg(`${key}=${enode.values[key]};`)
    });
    --enumindent
    pushEnum('}')

    --msgindent
    pushMsg('}')
}


function toLuaType(field,pkgName) {
    let type=field.type;
    if( !!pkgName && type.startsWith(pkgName)){
        type=type.substr(pkgName.length+1)
    }
    if (field.map)
        return "map " + type;
    if (field.repeated)
        return "repeated " + type;
    return type;
}
