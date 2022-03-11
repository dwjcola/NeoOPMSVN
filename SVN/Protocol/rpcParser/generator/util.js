//@ts-check
/*$$
 *@Author: dwj
 *@Date: 2022-2-16
 *@LastEditors: dwj
 *@Description: 
*/
const {RootNode,MethodNode,ParamNode,TypeNode,TypeEnum} = require('../parser/ast-def')

const LangEnum={
    JS:0,
    CSharp:1,
    LUA:2
}
module.exports ={
    findTagContend,
    extractServiceInfo,
    replaceTagContend,
    IsHandlerService,
    IsRemoteService,
    IsClientService,
    getJsType,
    getLangType,
    LangEnum
}





const TypeMapJs={
    "int32":"number",
    "int64":"number",
    "string":"string",
    "json"  :"any"
}

const TypeMapCs={
    "int32":"int",
    "int64":"long",
    "string":"string",
    "json"  :"JsonData"
}
const LangMap={
    [LangEnum.JS]:TypeMapJs,
    [LangEnum.CSharp]:TypeMapCs,

}
/**
 * 描述
 * @date 2022-2-16
 * @param {TypeNode} type
 * @returns {string}
 */
function getJsType(type){
    if(!type){
        return 'void'
    }else if(type.type == TypeEnum.PB){
        return type.name
    }else{
        let typename = TypeMapJs[type.name]
        return !typename?type.name:typename 
    }

}

/**
 * 描述
 * @date 2022-2-16
 * @param {TypeNode} type
 * @param {number} lang 
 * @returns {string}
 */
function getLangType(type,lang){
    if(!type){
        return 'void'
    }else if(type.type == TypeEnum.PB){
        return type.name
    }else{
        let langTypes = LangMap[lang] 
        let typename = langTypes&&langTypes[type.name]
        return !typename?type.name:typename 
    }

}

/**
 * 描述
 * @date 2022-2-16
 * @param {string} name
 * @returns {string}
 */
function getStartTag(name) {
    let kStartTag = `//===== ${name} start============================================================`;
    return kStartTag
}
/**
 * 描述
 * @date 2022-2-16
 * @param {string} name
 * @returns {string}
 */
function getEndTag(name) {
    let kEndTag = `//===== ${name} end==============================================================`;
    return kEndTag 
}


/**
 * 描述
 * @date 2022-2-16
 * @param {string} contend
 * @param {string} name
 * @param {string} prefix
 * @returns {string}
 */
function findTagContend(contend,name,prefix){
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
 * @date 2022-2-16
 * @param {string} contend
 * @param {string} tag
 * @param {string} tagContend
 * @returns {string}
 */
function replaceTagContend(contend,tag,tagContend) {

    let startTag = getStartTag(tag);
    let endTag = getEndTag(tag);

    let sIdx = contend.indexOf(startTag);
    if (sIdx >=0 ) {
        let eIdx = contend.indexOf(endTag);
        if (eIdx > sIdx) {

            let newContend = startTag + "\n" + tagContend + "\n" + endTag;
            return contend.substring(0,sIdx) + newContend + contend.substring(eIdx+endTag.length )

            //return contend.replace(sIdx,eIdx+endTag.length()-sIdx,newContend) ;

        }
    }
    return contend;
}

/**
 * 描述
 * @date 2022-2-16
 * @param {string} serviceName
 * @returns {Array<string>}
 */
function extractServiceInfo(serviceName){
    let sep='_';
    let pos = serviceName.indexOf(sep) 
    let server=null,module=''
    let stPos=0
    if(pos >0 ){
        server = serviceName.substr(stPos,pos-stPos)
        stPos = pos+1
        pos = serviceName.indexOf( sep,stPos );
        if( pos >0){
            module = serviceName.substr(stPos,pos-stPos)
        }
        // else{
        //     module = serviceType
        // }

    }
    return [server,module]
}

/**
 * 描述
 * @date 2022-2-16
 * @param {string} name
 * @returns {boolean}
 */
function IsHandlerService(name){
    return name.toLowerCase().endsWith('handler')
}

/**
 * 描述
 * @date 2022-2-16
 * @param {string} name
 * @returns {boolean}
 */
function IsRemoteService(name){
    return name.toLowerCase().endsWith('remote')
}

/**
 * 描述
 * @date 2022-2-16
 * @param {string} name
 * @returns {boolean}
 */
function IsClientService(name){
    return name.toLowerCase().endsWith('client')
}


