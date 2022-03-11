//@ts-check
/*$$
 *@Author: libl
 *@Date: 2020-12-06 14:17:00
 *@LastEditors: libl
 *@Description: 
*/
class ServiceNode{
    constructor(name){
        /** @type {string} */   
        this.name = name
        /** @type {Array<MethodNode>} */   
        this.methods=new Array()
    }
}

class MethodNode{
    constructor(name,params,ret,note){
        /** @type {string} */    
        this.name = name
        /** @type {Array<ParamNode>} */    
        this.params = params
        /** @type {TypeNode} */    
        this.return = ret 
        /** @type {string} */
        this.note = note
    }

}

class ParamNode{
    constructor(type,name){
        /** @type {TypeNode} */  
        this.type  = type 
        /** @type {string} */   
        this.name  = name
    }
}

class TypeNode{
    constructor(type,name){
        /** @type {number} */  
        this.type = type

        /** @type {string} */  
        this.name = name
    }
}

class ImportNode{
    constructor(path){
        /** @type {string} */ 
        this.path = path
    }

}

class RootNode{
    constructor(){
        /** @type {Array<ImportNode>} */
        this.imports  = new Array()
        /** @type {Array<ServiceNode>} */ 
        this.services = new Array()
        this.pkg = null
    }
}
const TypeEnum={
    BuiltIn:0,
    PB:1
}

module.exports={
    RootNode,
    ImportNode,
    TypeNode,
    ParamNode,
    MethodNode,
    ServiceNode,
    TypeEnum
}