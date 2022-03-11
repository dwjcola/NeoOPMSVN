//@ts-check
/*$$
 *@Author: libl
 *@Date: 2020-12-16 09:57:25
 *@LastEditors: libl
 *@Description: 
*/

const fs = require('fs')
const readline=require('readline')
const path=require('path')
const {ExtensionContext,languages,window,Location,Uri,Position,CompletionItem,CompletionItemKind} = require('vscode')
const vscode  = require('vscode')


class TypePos{
    constructor(fname,line){
        this.fname=fname
        this.line =line
    }
}

/**
 * 描述
 * @date 2020-12-17
 * @param {string} fpath
 * @param {Map<string,TypePos>} types
 * @param {Array<CompletionItem>} cplItem
 * @returns {any}
 */
function loadPbType(fpath,types,cplItem){ 
    if(!fs.existsSync(fpath)){
        return false
    }

    // fs.readFile(fpath,{encoding:'utf8'},(err,data)=>{        
    //     let reg=/\bmessage\s+(\w+)/g;

    //     let ret ;//= reg.exec(data)
    //     while( ret =reg.exec(data) ){
    //         console.log("msg:",ret[1],reg.lastIndex)
    //         types.set(ret[1],fpath)
    //     }

    // })

    const rl = readline.createInterface({input:fs.createReadStream(fpath)})
    let lineNumber=0
    rl.on('line',(line)=>{
        let reg=/\bmessage\s+(\w+)/g;
        let ret
        if( ret= reg.exec(line) ){
            types.set(ret[1],new TypePos(fpath,lineNumber)) 
            cplItem.push( new CompletionItem(ret[1],CompletionItemKind.Class))
            //console.log("msg:%s line:%d len:%d",ret[1],lineNumber,ret[1].length)
        }
        lineNumber++
    })

    


    return true
}

/**
 * 描述
 * @date 2020-12-16
 * @param {ExtensionContext} context
 * @param {Map<string,TypePos>}types 
 */
function loadRpc(context,types,cplItem){
    //console.log("loadPB:",)
    let fname = window.activeTextEditor.document.fileName
    let dirname =path.dirname(fname)


    fs.readFile(fname,{encoding:'utf8'},(err,data)=>{
        //let reg = new RegExp('\bimport\b\\s+\"(.*)\"')
        //let reg = new RegExp('import')
        let reg=/\bimport\s+(?:"|')(.*)(?:"|')/g;

        let ret ;//= reg.exec(data)
        while( ret =reg.exec(data) ){
            let fpath = path.join(dirname,ret[1])
            let suc=loadPbType(fpath,types,cplItem)
            //console.log("load:",fpath,suc,reg.source)
        }

    });


}

/**
 * 描述
 * @date 2020-12-16
 * @param {ExtensionContext} context
 * @returns {any}
 */
function activate(context){

    /** @type {Map<string,TypePos>} */
    let pbTypes = new Map()

    /** @type {Array<CompletionItem>} */
    let cplItem = new Array()

    loadRpc(context,pbTypes,cplItem)
    //let cplItems=[...pbTypes.keys()].map((val)=>new CompletionItem(val,CompletionItemKind.Class))
 
    //console.log("............. active..............")
    vscode.window.onDidChangeActiveTextEditor( (e)=>{
        //console.log('----------- change ------------',e.document.fileName)
        if( e.document.fileName.endsWith('.rpc')){
            pbTypes.clear()
            cplItem = new Array()
            loadRpc(context,pbTypes,cplItem)
        }
    })
    //vscode.window.onDidChangeTextEditorOptions


    const jumpProvider=languages.registerDefinitionProvider('rpc',{
        provideDefinition(doc,pos,token){
            let word= doc.getText( doc.getWordRangeAtPosition(pos) )

            let gname = doc.fileName
            let gpos =pos
            if(pbTypes.has(word)){
                let typeInfo = pbTypes.get(word)
                gname = typeInfo.fname
                gpos = new Position(typeInfo.line,0)
            }else{
                console.log("not found:%s len:%d",word,word.length)
            }
            return new Location(Uri.file(gname),gpos) 
        }
    })


    const cmpProvider = languages.registerCompletionItemProvider('rpc',{
        provideCompletionItems(doc,pos,token,ctx){
            //const linePrefix = doc.lineAt(pos).text.substr(0, pos.character);
            //console.log("linePrefix:",linePrefix)
            return  cplItem        
        }
    })

    context.subscriptions.push(jumpProvider)
}


module.exports={
    activate
}