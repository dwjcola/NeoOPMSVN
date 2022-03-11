//@ts-check
/*$$
 *@Author: libl
 *@Date: 2020-12-03 14:08:16
 *@LastEditors: libl
 *@Description: 
*/

const fs = require('fs')
const path = require('path')
const pb = require('protobufjs')
const parser = require('./rpc-parser')


const {RootNode,ServiceNode,MethodNode,TypeEnum} = require('./ast-def')

/**
 * 描述
 * @date 2020-12-03
 * @param {string} fname
 * @returns {RootNode}
 * 
 */
function getRpcAst(fname){
    if (!fs.existsSync(fname)) {
        console.log("%s not found!", fname)
        return null
    }
    let fstr = fs.readFileSync(fname,{encoding:'utf8'})
    let ast = parser.parse(fstr) 
    return ast
}


function getPbRoot(pbfile){
    if (!fs.existsSync(pbfile)) {
        console.log("%s not found!", pbfile)
        return null 
    }
    let fstr = fs.readFileSync(pbfile,{encoding:'utf8'})
 
    let ret = pb.parse(fstr)
    //console.log(".....ret:")
    let root = ret.root
    //let jobj = root.toJSON()
    //let lr = root.lookupType("LoginRet");
    //console.log(lr)
    return root
}


/**
 * 描述
 * @date 2020-12-06
 * @param {RootNode} ast
 * @param {Array<pb.Root>} pbs
 * @returns {boolean}
 */
function checkType(ast,pbs){
    for(let service of ast.services){
        let mcache = new Set()
        for(let method of service.methods){



            if(mcache.has(method.name)){
                console.log("method(%s) in service(%s) is redefined!",method.name,service.name)
                return false
            }
            mcache.add(method.name)
            for(let param of method.params){
                if(param.type.type == TypeEnum.PB ){
                    let ret=pbs.some((root)=>{
                        let ptype = root.lookup(param.type.name)
                        if(!ptype){
                            return false
                        }
                        return true
                    })
                    if( !ret){
                        console.log("Could not found protobuf type:%s",param.type.name)
                        return false
                    }
                }
            }

            if( !!method.return && method.return.type == TypeEnum.PB){
                let ret = pbs.some((root) => {
                    let ptype = root.lookup(method.return.name)
                    if (!ptype) {
                        return false
                    }
                    return true
                })
                if(!ret){
                    console.log("Could not found protobuf type:%s", method.return.name)
                    return false
                }

            }

        }
    }
    return true 
}


/**
 * 描述
 * @date 2020-12-06
 * @param {Array<string>} protofiles
 * @returns {Array<RootNode>}
 */
function parse(...protofiles){
    //let pbCache = new Map() 
    let trees = new Array()
    for(let f of protofiles){

        console.log("parse file:",f)
        let ast = getRpcAst(f)
 
        if(!ast){
            console.log("parse file fail:",f)
            return null;
        }
        //console.log(ast.)
        let pbroot = new Array()
        for(let imnode of ast.imports){
            let pbPath = path.join(path.dirname(f),imnode.path )
            let root = getPbRoot(pbPath)
            if( !root){
                console.log("import pb fail:",pbPath)
                return null
            }
            pbroot.push(root)
        }
        //check type
        if(!checkType(ast,pbroot)){
            console.log("pb type not found!");
            return null
        }
        trees.push(ast)
    }
    //return null
    return trees
}

module.exports = {
    parse
}

//parse("a.proto","rpc.proto")