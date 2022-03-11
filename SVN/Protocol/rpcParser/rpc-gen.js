//@ts-check
/*$$
 *@Author: libl
 *@Date: 2020-12-06 14:26:54
 *@LastEditors: libl
 *@Description: 
*/

const parser = require('./parser/rpc-ast')
const path = require('path')
const fs = require('fs')
const cmd = require('commander')
const jsGen = require('./generator/rpc-js-gen')
const pbJsGen= require('./generator/pb-js-gen')
const pbLuaGen= require('./generator/pb-lua-gen')
const csGen = require('./generator/rpc-cs-gen')
const luaGen=require('./generator/rpc-lua-gen')

const { exit } = require('process')
const { pathToFileURL } = require('url')


//const trees = parser.parse("..","ss")
cmd
.usage('[options] <file...>')
.version('0.1.0')
.option('-f, --files <value [,value]...>','rpc files',(val)=>{return val.split(',')})
.option(', --protos <value [,value]...>','proto files',(val)=>{return val.split(',')})
.option(', --pb_jsout <path>','protobuf js file outdir')
.option(', --js_out <path>','js file outdir')
.option(', --cs_out <path [,path2]...]>','cs file outdir',(val)=>{return val.split(',')})
.option(', --cs_robot_out <path [,path2]...]>','cs file outdir',(val)=>{return val.split(',')})
.option(', --lua_out <path>','js file outdir')
.option(', --cpp_out <path>','c++ file outdir')
.option(', --pb_luaout <path>','lua file outdir')
.parse( process.argv)

//GenRpcJs(cmd)
// function GenRpcJs(cmd){
//let trees = parser.parse(...cmd.files)    

// }

/**
 * 描述
 * @date 2020-12-17
 * @param {Array<string>} fileList
 * @returns {any}
 */
function listFiles(fileList){
    let lists=new Array()
    for(let file of fileList ){
        if( file.indexOf('*')>=0 ){


            let dirname =path.dirname(file)
            //
            let regStr = file.replace(".","\.").replace("*",".*")
            //let ss=".*\.rpc"
            let dirfiles = fs.readdirSync(dirname)
            let reg = new RegExp(regStr)
            for(let df of dirfiles){
                if(reg.test(df) && df.endsWith('.rpc')){
                    lists.push(df)
                }
            }

        }else{
            lists.push(file)
        }
    }
    return lists
}
if (cmd.files) {
    let files = listFiles(cmd.files)
    let trees = parser.parse(...files)
    if (!trees || trees.length == 0) {
        console.log("generate ast fail! proto files:", ...files)
        exit()
    }
    if (cmd.js_out) {
        jsGen(trees, cmd.js_out)
    }
    if (cmd.cs_out) {
        csGen(trees, cmd.cs_out)
    }
    if (cmd.cs_robot_out) {
        csGen(trees, cmd.cs_robot_out,true)  
    }
    if (cmd.lua_out) {
        luaGen(trees, cmd.lua_out)
    }
}


if( cmd.protos && cmd.pb_jsout){
    let pbFiles = cmd.protos
    pbJsGen(pbFiles,cmd.pb_jsout)
}

if( cmd.protos && cmd.pb_luaout){
    let pbFiles = cmd.protos
    pbLuaGen(pbFiles,cmd.pb_luaout)
}