//@ts-check
/*$$
 *@Author: dwj
 *@Date: 2022-2-16
 *@LastEditors: dwj
 *@Description: 
*/
const fs=require('fs')
const path=require('path')

const  beautify = require('js-beautify').js



const protobuf   = require('protobufjs'),
    UglifyJS   = require("uglify-js"),
    espree     = require("espree"),
    escodegen  = require("escodegen"),
    estraverse = require("estraverse");
//const decodeGen = require('./pb-js-decode')

// @ts-ignore
//protobuf.decoder = decodeGen

const Type      = protobuf.Type,
    Service   = protobuf.Service,
    Enum      = protobuf.Enum,
    Namespace = protobuf.Namespace,
    util      = protobuf.util;


const safePropBackslashRe = /\\/g
const safePropQuoteRe     = /"/g
const camelCaseRe = /_([a-zA-Z])/g;

/**
 * Converts a string to camel case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.camelCase = function camelCase(str) {
    return str.substring(0, 1)
         + str.substring(1)
               .replace(camelCaseRe, function($0, $1) { return $1.toUpperCase(); });
};

    //覆盖
    // util.safeProp = function safeProp(prop) {
    //     let name
    //     if (!/^[$\w_]+$/.test(prop) || util.isReserved(prop)){
    //         name = "[\"" + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, "\\\"") + "\"]";
    //     }else{
    //         name = "." + prop;
    //     }
        
    //     return camelCase(name)

    // };

function upperEnumKeys(enm){
    let values={

    }
    Object.keys(enm.values).forEach(function(key) {
        values[ key.toUpperCase() ] = enm.values[key]
        //var val = config.forceEnumString ? key : enm.values[key];
        //comment.push((config.forceEnumString ? "@property {string} " : "@property {number} ") + key + "=" + val + " " + (enm.comments[key] || key + " value"));
    });
    enm.values = values
} 

module.exports = genCode;


function writeJsFile(fpath,contend){
    
    fs.writeFileSync(fpath, beautify(contend) )
}

var out = [];
var indent = 0;
var config = {};
var pkgName=''
var curproto

var tsout=[]
var indexOut=[]
var protoExist=new Set()
var pbExist=new Set()
var oneFileName='msg_pb'

/**
 * 描述
 * @date 2022-2-16
 * @param {Array<string>} files
 * @param {string} outdir
 * @returns {any}
 */
function genCode(files,outdir){
    


    let options={
        encode:true,
        decode:true,
        comments:true,
        beautify:true,
        forceMessage:true
    }
    config = options
    let root = new protobuf.Root()
    let ns =root.loadSync(files,{}).resolveAll()
    let outpath =path.join(outdir,`${oneFileName}.js`)


    indexOut.push(`let protobuf = require('protobufjs/minimal')`)
    indexOut.push('protobuf.util.Long = false')
    indexOut.push('protobuf.configure()')

    indexOut.push(`const msg_pb = require('./pb/${oneFileName}.js')`)

    indexOut.push('module.exports={')
    tsout.push(`import {Writer} from 'protobufjs/minimal'`)
    indexfile_gen(ns)

    indexOut.push('}')

    protobuf_gen(ns,options,(err,output)=>{

        if (err) {
           throw err;
        }

        fs.writeFileSync(outpath, output, { encoding: "utf8" });
    })

    let tsfile = path.join(outdir,'..','index.d.ts')
    let indexfile = path.join(outdir,'..','index.js')


    //fs.writeFileSync(tsfile,tsout.join('\n'))
    writeJsFile(tsfile,tsout.join('\n'))
    writeJsFile(indexfile,indexOut.join('\n'))


}


/**
 * 描述
 * @date 2022-2-16
 * @param {protobuf.Namespace} ns 
 * @returns {any}
 */
function indexfile_gen(ns){

    procNode([],ns)
}

/**
 * 描述
 * @date 2022-2-16
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


    }else if(ns instanceof Enum){
        procEnum(ref,ns)
    }
    else if(ns instanceof Namespace){
        pkgName = ns.name
        // if(pkgName.length>0){
        //     ref = [pkgName]
        // }
        ns.nestedArray.forEach(function(nested) {
            procNode(ref,nested)
        }); 
    }else{
        console.log("do not know type:",ns.name)
    }



}


/**
 * 描述
 * @date 2022-2-16
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

    for(let refns of ref){
        tsout.push( `export namespace ${refns}{`)
    }
    tsout.push(`export class ${message.name}{`)

    if( message.parent.name == pkgName){
        //indexOut.push(`${message.name} : ${path.basename(message.filename,'.proto')}.${message.name},`)
        indexOut.push(`${message.name} : ${oneFileName}.${message.name},`)

    }

    message.fieldsArray.forEach(function(field) {
        field.resolve();
        var prop = util.safeProp(field.name);
        tsout.push(`${ field.name}?:${toJsType(field,pkgName)}`)
 
        //console.log("field:",escapeName(field.name),toJsType(field),field.resolvedType instanceof Type,field.repeated,field.map,field.long,field.bytes )

    }); 

    tsout.push(`static encode(msg:${message.name}):Writer`)
    tsout.push(`static decode(buf:Uint8Array):${message.name}`)



    tsout.push('}')
    for(let refns of ref){
        tsout.push( '}')
    }


}


/**
 * 描述
 * @date 2022-2-16
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
        

    
    if( enode.parent.name == pkgName){
        //indexOut.push(`${message.name} : ${path.basename(message.filename,'.proto')}.${message.name},`)
        indexOut.push(`${enode.name} : ${oneFileName}.${enode.name},`)
    }

    for(let refns of ref){
        tsout.push( `export namespace ${refns}{`)
    }
    tsout.push(`export enum ${enode.name}{`)

    Object.keys(enode.values).forEach((key)=>{
        tsout.push(`${key}=${enode.values[key]},`)
        //var val = config.forceEnumString ? key : enm.values[key];
        //comment.push((config.forceEnumString ? "@property {string} " : "@property {number} ") + key + "=" + val + " " + (enm.comments[key] || key + " value"));
    });

    tsout.push('}')
    for(let refns of ref){
        tsout.push( '}')
    }
}






/**
 * 描述
 * @date 2022-2-16
 * @param {protobuf.Namespace} root
 * @param {any} options
 * @param {any} callback
 * @returns {any}
 */
function protobuf_gen(root, options, callback) {
    config = options;
    try {
        var aliases = [];
        out.push(`var $protobuf = require("protobufjs/minimal");`)
        if (config.decode)
            aliases.push("Reader");
        if (config.encode)
            aliases.push("Writer");
        aliases.push("util");
        if (aliases.length) {
            if (config.comments)
                push("// Common aliases");
            push((config.es6 ? "const " : "var ") + aliases.map(function(name) { return "$" + name + " = $protobuf." + name; }).join(", ") + ";");
            push("");
        }
        if (config.comments) {
            if (root.comment) {
                pushComment("@fileoverview " + root.comment);
                push("");
            }
            push("// Exported root namespace");
        }
        var rootProp = util.safeProp(config.root || "default");
        push((config.es6 ? "const" : "var") + " $root = $protobuf.roots" + rootProp + " || ($protobuf.roots" + rootProp + " = {});");
        out.push('$util.Long = false')
        buildNamespace(null, root);
        let nsname=(!!pkgName&&pkgName.length>0)?`.${pkgName}`:""
        out.push(`module.exports = $root${nsname}`)
        return callback(null, out.join("\n"));
    } catch (err) {
        return callback(err);
    } finally {
        out = [];
        indent = 0;
        config = {};
    }
}

function push(line) {
    if (line === "")
        return out.push("");
    var ind = "";
    for (var i = 0; i < indent; ++i)
        ind += "    ";
    return out.push(ind + line);
}

function pushComment(lines) {
    if (!config.comments)
        return;
    var split = [];
    for (var i = 0; i < lines.length; ++i)
        if (lines[i] != null && lines[i].substring(0, 8) !== "@exclude")
            Array.prototype.push.apply(split, lines[i].split(/\r?\n/g));
    push("/**");
    split.forEach(function(line) {
        if (line === null)
            return;
        push(" * " + line.replace(/\*\//g, "* /"));
    });
    push(" */");
}

function exportName(object, asInterface) {
    if (asInterface) {
        if (object.__interfaceName)
            return object.__interfaceName;
    } else if (object.__exportName)
        return object.__exportName;
    var parts = object.fullName.substring(1).split("."),
        i = 0;
    while (i < parts.length)
        parts[i] = escapeName(parts[i++]);
    if (asInterface)
        parts[i - 1] = "I" + parts[i - 1];
    return object[asInterface ? "__interfaceName" : "__exportName"] = parts.join(".");
}

function escapeName(name) {
    if (!name)
        return "$root";
    return util.isReserved(name) ? name + "_" : name;
}

function aOrAn(name) {
    return ((/^[hH](?:ou|on|ei)/.test(name) || /^[aeiouAEIOU][a-z]/.test(name)) && !/^us/i.test(name)
        ? "an "
        : "a ") + name;
}

function buildNamespace(ref, ns) {
    if (!ns)
        return;

    // if( ns.filename != null){
    //     let f1 = path.basename(ns.filename)
    //     let f2 = path.basename(curproto)
    //     if( f1 != f2){
    //         console.log("return:",f1,f2)
    //         return 
    //     }
    //     console.log("fname:",f1)
    // }

    if (ns.name !== "") {
        push("");
        if (!ref && config.es6)
            push("export const " + escapeName(ns.name) + " = " + escapeName(ref) + "." + escapeName(ns.name) + " = (() => {");
        else
            push(escapeName(ref) + "." + escapeName(ns.name) + " = (function() {");
        ++indent;
    }
    

    if (ns instanceof Type) {
        buildType(undefined, ns);
    } else if (ns instanceof Service)
        buildService(undefined, ns);
    else if (ns.name !== "") {
        push("");
        pushComment([
            ns.comment || "Namespace " + ns.name + ".",
            ns.parent instanceof protobuf.Root ? "@exports " + escapeName(ns.name) : "@memberof " + exportName(ns.parent),
            "@namespace"
        ]);
        push((config.es6 ? "const" : "var") + " " + escapeName(ns.name) + " = {};");
    }

    ns.nestedArray.forEach(function(nested) {
        if (nested instanceof Enum)
            buildEnum(ns.name, nested);
        else if (nested instanceof Namespace)
            buildNamespace(ns.name, nested);
    });
    if (ns.name !== "") {
        push("");
        push("return " + escapeName(ns.name) + ";");
        --indent;
        push("})();");
    }
}

var reduceableBlockStatements = {
    IfStatement: true,
    ForStatement: true,
    WhileStatement: true
};

var shortVars = {
    "r": "reader",
    "w": "writer",
    "m": "message",
    "t": "tag",
    "l": "length",
    "c": "end", "c2": "end2",
    "k": "key",
    "ks": "keys", "ks2": "keys2",
    "e": "error",
    "f": "impl",
    "o": "options",
    "d": "object",
    "n": "long",
    "p": "properties"
};

function beautifyCode(code) {
    // Add semicolons
    code = UglifyJS.minify(code, {
        compress: false,
        mangle: false,
        output: { beautify: true }
    }).code;
    // Properly beautify
    var ast = espree.parse(code);
    estraverse.replace(ast, {
        enter: function(node, parent) {
            // rename short vars
            // @ts-ignore
            if (node.type === "Identifier" && (parent.property !== node || parent.computed) && shortVars[node.name])
                return {
                    "type": "Identifier",
                    "name": shortVars[node.name]
                };
            // replace var with let if es6
            if (config.es6 && node.type === "VariableDeclaration" && node.kind === "var") {
                node.kind = "let";
                return undefined;
            }
            // remove braces around block statements with a single child
            if (node.type === "BlockStatement" && reduceableBlockStatements[parent.type] && node.body.length === 1)
                return node.body[0];
            return undefined;
        }
    });
    code = escodegen.generate(ast, {
        format: {
            newline: "\n",
            quotes: "double"
        }
    });
    // Add id, wireType comments
    if (config.comments)
        code = code.replace(/\.uint32\((\d+)\)/g, function($0, $1) {
            var id = $1 >>> 3,
                wireType = $1 & 7;
            return ".uint32(/* id " + id + ", wireType " + wireType + " =*/" + $1 + ")";
        });
    return code;
}

var renameVars = {
    "Writer": "$Writer",
    "Reader": "$Reader",
    "util": "$util"
};

function buildFunction(type, functionName, gen, scope) {
    var code = gen.toString(functionName)
        .replace(/((?!\.)types\[\d+])(\.values)/g, "$1"); // enums: use types[N] instead of reflected types[N].values

    var ast = espree.parse(code);
    /* eslint-disable no-extra-parens */
    estraverse.replace(ast, {
        enter: function(node, parent) {
            // rename vars
            if (
                node.type === "Identifier" && renameVars[node.name]
                && (
                    (parent.type === "MemberExpression" && parent.object === node)
                 || (parent.type === "BinaryExpression" && parent.right === node)
                )
            )
                return {
                    "type": "Identifier",
                    "name": renameVars[node.name]
                };
            // replace this.ctor with the actual ctor
            if (
                node.type === "MemberExpression"
             && node.object.type === "ThisExpression"
             && node.property.type === "Identifier" && node.property.name === "ctor"
            )
                return {
                    "type": "Identifier",
                    "name": "$root" + type.fullName
                };
            // replace types[N] with the field's actual type
            if (
                node.type === "MemberExpression"
             && node.object.type === "Identifier" && node.object.name === "types"
             && node.property.type === "Literal"
            )
                return {
                    "type": "Identifier",
                    // @ts-ignore
                    "name": "$root" + type.fieldsArray[node.property.value].resolvedType.fullName
                };
            return undefined;
        }
    });
    /* eslint-enable no-extra-parens */
    code = escodegen.generate(ast, {
        format: {
            newline: "\n",
            quotes: "double"
        }
    });

    if (config.beautify)
        code = beautifyCode(code);

    code = code.replace(/ {4}/g, "\t");

    var hasScope = scope && Object.keys(scope).length,
        isCtor = functionName === type.name;

    if (hasScope) // remove unused scope vars
        Object.keys(scope).forEach(function(key) {
            if (!new RegExp("\\b(" + key + ")\\b", "g").test(code))
                delete scope[key];
        });

    var lines = code.replace("$root\.","").split(/\n/g);
    if (isCtor) // constructor
        push(lines[0]);
    else if (hasScope) // enclose in an iife
        push(escapeName(type.name) + "." + escapeName(functionName) + " = (function(" + Object.keys(scope).map(escapeName).join(", ") + ") { return " + lines[0]);
    else
        push(escapeName(type.name) + "." + escapeName(functionName) + " = " + lines[0]);
    lines.slice(1, lines.length - 1).forEach(function(line) {
        var prev = indent;
        var i = 0;
        while (line.charAt(i++) === "\t")
            ++indent;
        push(line.trim());
        indent = prev;
    });
    if (isCtor)
        push("}");
    else if (hasScope)
        push("};})(" + Object.keys(scope).map(function(key) { return scope[key]; }).join(", ") + ");");
    else
        push("};");
}

function toJsType(field,pkgName) {
    let type='';

    switch (field.type) {
        case "double":
        case "float":
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
            type = "number";
            break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
            type = config.forceLong ? "Long" : config.forceNumber ? "number" : "number|Long";
            break;
        case "bool":
            type = "boolean";
            break;
        case "string":
            type = "string";
            break;
        case "bytes":
            type = "Uint8Array";
            break;
        default:
            if (field.resolve().resolvedType){
                //console.log("resolved:",field.name, field.resolvedType.fullName)
                type = exportName(field.resolvedType, !(field.resolvedType instanceof protobuf.Enum || config.forceMessage));
            }
            else
                type = "*"; // should not happen
            
            if( !!pkgName && type.startsWith(pkgName)){
                type=type.substr(pkgName.length+1)
            }
            break;
    }
    if (field.map)
        return "Map<string," + type + ">";
    if (field.repeated)
        return "Array<" + type + ">";
    return type;
}

function buildType(ref, type) {

    if (config.comments) {
        var typeDef = [
            "Properties of " + aOrAn(type.name) + ".",
            type.parent instanceof protobuf.Root ? "@exports " + escapeName("I" + type.name) : "@memberof " + exportName(type.parent),
            "@interface " + escapeName("I" + type.name)
        ];
        type.fieldsArray.forEach(function(field) {
            var prop = util.safeProp(field.name); // either .name or ["name"]
            prop = prop.substring(1, prop.charAt(0) === "[" ? prop.length - 1 : prop.length);
            var jsType = toJsType(field);
            if (field.optional)
                jsType = jsType + "|null";
            typeDef.push("@property {" + jsType + "} " + (field.optional ? "[" + prop + "]" : prop) + " " + (field.comment || type.name + " " + field.name));
        });
        push("");
        pushComment(typeDef);
    }

    // constructor
    push("");
    pushComment([
        "Constructs a new " + type.name + ".",
        type.parent instanceof protobuf.Root ? "@exports " + escapeName(type.name) : "@memberof " + exportName(type.parent),
        "@classdesc " + (type.comment || "Represents " + aOrAn(type.name) + "."),
        config.comments ? "@implements " + escapeName("I" + type.name) : null,
        "@constructor",
        "@param {" + exportName(type, true) + "=} [" + (config.beautify ? "properties" : "p") + "] Properties to set"
    ]);
    buildFunction(type, type.name, Type.generateConstructor(type));

    // default values
    var firstField = true;
    type.fieldsArray.forEach(function(field) {
        field.resolve();
        var prop = util.safeProp(field.name);
        if (config.comments) {
            push("");
            var jsType = toJsType(field);
            if (field.optional && !field.map && !field.repeated && field.resolvedType instanceof Type)
                jsType = jsType + "|null|undefined";
            pushComment([
                field.comment || type.name + " " +  field.name + ".",
                "@member {" + jsType + "} " + field.name,
                "@memberof " + exportName(type),
                "@instance"
            ]);
        } else if (firstField) {
            push("");
            firstField = false;
        }
        if (field.repeated)
            push(escapeName(type.name) + ".prototype" + prop + " = $util.emptyArray;"); // overwritten in constructor
        else if (field.map)
            push(escapeName(type.name) + ".prototype" + prop + " = $util.emptyObject;"); // overwritten in constructor
        else if (field.long)
            push(escapeName(type.name) + ".prototype" + prop + " = $util.Long ? $util.Long.fromBits("
                    + JSON.stringify(field.typeDefault.low) + ","
                    + JSON.stringify(field.typeDefault.high) + ","
                    + JSON.stringify(field.typeDefault.unsigned)
                + ") : " + field.typeDefault.toNumber(field.type.charAt(0) === "u") + ";");
        else if (field.bytes) {
            push(escapeName(type.name) + ".prototype" + prop + " = $util.newBuffer(" + JSON.stringify(Array.prototype.slice.call(field.typeDefault)) + ");");
        } else
            push(escapeName(type.name) + ".prototype" + prop + " = " + JSON.stringify(field.typeDefault) + ";");
    });

    // virtual oneof fields
    var firstOneOf = true;
    type.oneofsArray.forEach(function(oneof) {
        if (firstOneOf) {
            firstOneOf = false;
            push("");
            if (config.comments)
                push("// OneOf field names bound to virtual getters and setters");
            push((config.es6 ? "let" : "var") + " $oneOfFields;");
        }
        oneof.resolve();
        push("");
        pushComment([
            oneof.comment || type.name + " " + oneof.name + ".",
            "@member {" + oneof.oneof.map(JSON.stringify).join("|") + "|undefined} " + escapeName(oneof.name),
            "@memberof " + exportName(type),
            "@instance"
        ]);
        push("Object.defineProperty(" + escapeName(type.name) + ".prototype, " + JSON.stringify(oneof.name) +", {");
        ++indent;
            push("get: $util.oneOfGetter($oneOfFields = [" + oneof.oneof.map(JSON.stringify).join(", ") + "]),");
            push("set: $util.oneOfSetter($oneOfFields)");
        --indent;
        push("});");
    });

    if (config.create) {
        push("");
        pushComment([
            "Creates a new " + type.name + " instance using the specified properties.",
            "@function create",
            "@memberof " + exportName(type),
            "@static",
            "@param {" + exportName(type, true) + "=} [properties] Properties to set",
            "@returns {" + exportName(type) + "} " + type.name + " instance"
        ]);
        push(escapeName(type.name) + ".create = function create(properties) {");
            ++indent;
            push("return new " + escapeName(type.name) + "(properties);");
            --indent;
        push("};");
    }

    if (config.encode) {
        push("");
        pushComment([
            "Encodes the specified " + type.name + " message. Does not implicitly {@link " + exportName(type) + ".verify|verify} messages.",
            "@function encode",
            "@memberof " + exportName(type),
            "@static",
            "@param {" + exportName(type, !config.forceMessage) + "} " + (config.beautify ? "message" : "m") + " " + type.name + " message or plain object to encode",
            "@param {$protobuf.Writer} [" + (config.beautify ? "writer" : "w") + "] Writer to encode to",
            "@returns {$protobuf.Writer} Writer"
        ]);
        buildFunction(type, "encode", protobuf.encoder(type));

        if (config.delimited) {
            push("");
            pushComment([
                "Encodes the specified " + type.name + " message, length delimited. Does not implicitly {@link " + exportName(type) + ".verify|verify} messages.",
                "@function encodeDelimited",
                "@memberof " + exportName(type),
                "@static",
                "@param {" + exportName(type, !config.forceMessage) + "} message " + type.name + " message or plain object to encode",
                "@param {$protobuf.Writer} [writer] Writer to encode to",
                "@returns {$protobuf.Writer} Writer"
            ]);
            push(escapeName(type.name) + ".encodeDelimited = function encodeDelimited(message, writer) {");
            ++indent;
            push("return this.encode(message, writer).ldelim();");
            --indent;
            push("};");
        }
    }

    if (config.decode) {
        push("");
        pushComment([
            "Decodes " + aOrAn(type.name) + " message from the specified reader or buffer.",
            "@function decode",
            "@memberof " + exportName(type),
            "@static",
            "@param {$protobuf.Reader|Uint8Array} " + (config.beautify ? "reader" : "r") + " Reader or buffer to decode from",
            "@param {number} [" + (config.beautify ? "length" : "l") + "] Message length if known beforehand",
            "@returns {" + exportName(type) + "} " + type.name,
            "@throws {Error} If the payload is not a reader or valid buffer",
            "@throws {$protobuf.util.ProtocolError} If required fields are missing"
        ]);
        buildFunction(type, "decode", protobuf.decoder(type));

        if (config.delimited) {
            push("");
            pushComment([
                "Decodes " + aOrAn(type.name) + " message from the specified reader or buffer, length delimited.",
                "@function decodeDelimited",
                "@memberof " + exportName(type),
                "@static",
                "@param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from",
                "@returns {" + exportName(type) + "} " + type.name,
                "@throws {Error} If the payload is not a reader or valid buffer",
                "@throws {$protobuf.util.ProtocolError} If required fields are missing"
            ]);
            push(escapeName(type.name) + ".decodeDelimited = function decodeDelimited(reader) {");
            ++indent;
                push("if (!(reader instanceof $Reader))");
                ++indent;
                    push("reader = new $Reader(reader);");
                --indent;
                push("return this.decode(reader, reader.uint32());");
            --indent;
            push("};");
        }
    }

    if (config.verify) {
        push("");
        pushComment([
            "Verifies " + aOrAn(type.name) + " message.",
            "@function verify",
            "@memberof " + exportName(type),
            "@static",
            "@param {Object.<string,*>} " + (config.beautify ? "message" : "m") + " Plain object to verify",
            "@returns {string|null} `null` if valid, otherwise the reason why it is not"
        ]);
        buildFunction(type, "verify", protobuf.verifier(type));
    }

    if (config.convert) {
        push("");
        pushComment([
            "Creates " + aOrAn(type.name) + " message from a plain object. Also converts values to their respective internal types.",
            "@function fromObject",
            "@memberof " + exportName(type),
            "@static",
            "@param {Object.<string,*>} " + (config.beautify ? "object" : "d") + " Plain object",
            "@returns {" + exportName(type) + "} " + type.name
        ]);
        buildFunction(type, "fromObject", protobuf.converter.fromObject(type));

        push("");
        pushComment([
            "Creates a plain object from " + aOrAn(type.name) + " message. Also converts values to other types if specified.",
            "@function toObject",
            "@memberof " + exportName(type),
            "@static",
            "@param {" + exportName(type) + "} " + (config.beautify ? "message" : "m") + " " + type.name,
            "@param {$protobuf.IConversionOptions} [" + (config.beautify ? "options" : "o") + "] Conversion options",
            "@returns {Object.<string,*>} Plain object"
        ]);
        buildFunction(type, "toObject", protobuf.converter.toObject(type));

        push("");
        pushComment([
            "Converts this " + type.name + " to JSON.",
            "@function toJSON",
            "@memberof " + exportName(type),
            "@instance",
            "@returns {Object.<string,*>} JSON object"
        ]);
        push(escapeName(type.name) + ".prototype.toJSON = function toJSON() {");
        ++indent;
            push("return this.constructor.toObject(this, $protobuf.util.toJSONOptions);");
        --indent;
        push("};");
    }
}

function buildService(ref, service) {

    push("");
    pushComment([
        "Constructs a new " + service.name + " service.",
        service.parent instanceof protobuf.Root ? "@exports " + escapeName(service.name) : "@memberof " + exportName(service.parent),
        "@classdesc " + (service.comment || "Represents " + aOrAn(service.name)),
        "@extends $protobuf.rpc.Service",
        "@constructor",
        "@param {$protobuf.RPCImpl} rpcImpl RPC implementation",
        "@param {boolean} [requestDelimited=false] Whether requests are length-delimited",
        "@param {boolean} [responseDelimited=false] Whether responses are length-delimited"
    ]);
    push("function " + escapeName(service.name) + "(rpcImpl, requestDelimited, responseDelimited) {");
    ++indent;
    push("$protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);");
    --indent;
    push("}");
    push("");
    push("(" + escapeName(service.name) + ".prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = " + escapeName(service.name) + ";");

    if (config.create) {
        push("");
        pushComment([
            "Creates new " + service.name + " service using the specified rpc implementation.",
            "@function create",
            "@memberof " + exportName(service),
            "@static",
            "@param {$protobuf.RPCImpl} rpcImpl RPC implementation",
            "@param {boolean} [requestDelimited=false] Whether requests are length-delimited",
            "@param {boolean} [responseDelimited=false] Whether responses are length-delimited",
            "@returns {" + escapeName(service.name) + "} RPC service. Useful where requests and/or responses are streamed."
        ]);
        push(escapeName(service.name) + ".create = function create(rpcImpl, requestDelimited, responseDelimited) {");
            ++indent;
            push("return new this(rpcImpl, requestDelimited, responseDelimited);");
            --indent;
        push("};");
    }

    service.methodsArray.forEach(function(method) {
        method.resolve();
        var lcName = protobuf.util.lcFirst(method.name),
            cbName = escapeName(method.name + "Callback");
        push("");
        pushComment([
            "Callback as used by {@link " + exportName(service) + "#" + escapeName(lcName) + "}.",
            // This is a more specialized version of protobuf.rpc.ServiceCallback
            "@memberof " + exportName(service),
            "@typedef " + cbName,
            "@type {function}",
            "@param {Error|null} error Error, if any",
            "@param {" + exportName(method.resolvedResponseType) + "} [response] " + method.resolvedResponseType.name
        ]);
        push("");
        pushComment([
            method.comment || "Calls " + method.name + ".",
            "@function " + lcName,
            "@memberof " + exportName(service),
            "@instance",
            "@param {" + exportName(method.resolvedRequestType, !config.forceMessage) + "} request " + method.resolvedRequestType.name + " message or plain object",
            "@param {" + exportName(service) + "." + cbName + "} callback Node-style callback called with the error, if any, and " + method.resolvedResponseType.name,
            "@returns {undefined}",
            "@variation 1"
        ]);
        push("Object.defineProperty(" + escapeName(service.name) + ".prototype" + util.safeProp(lcName) + " = function " + escapeName(lcName) + "(request, callback) {");
            ++indent;
            push("return this.rpcCall(" + escapeName(lcName) + ", $root." + exportName(method.resolvedRequestType) + ", $root." + exportName(method.resolvedResponseType) + ", request, callback);");
            --indent;
        push("}, \"name\", { value: " + JSON.stringify(method.name) + " });");
        if (config.comments)
            push("");
        pushComment([
            method.comment || "Calls " + method.name + ".",
            "@function " + lcName,
            "@memberof " + exportName(service),
            "@instance",
            "@param {" + exportName(method.resolvedRequestType, !config.forceMessage) + "} request " + method.resolvedRequestType.name + " message or plain object",
            "@returns {Promise<" + exportName(method.resolvedResponseType) + ">} Promise",
            "@variation 2"
        ]);
    });
}

function buildEnum(ref, enm) {

    push("");
    var comment = [
        enm.comment || enm.name + " enum.",
        enm.parent instanceof protobuf.Root ? "@exports " + escapeName(enm.name) : "@name " + exportName(enm),
        config.forceEnumString ? "@enum {string}" : "@enum {number}",
    ];

    upperEnumKeys(enm)

    Object.keys(enm.values).forEach(function(key) {
        var val = config.forceEnumString ? key : enm.values[key];
        comment.push((config.forceEnumString ? "@property {string} " : "@property {number} ") + key + "=" + val + " " + (enm.comments[key] || key + " value"));
    });
    pushComment(comment);
    if (!ref && config.es6)
        push("export const " + escapeName(enm.name) + " = " + escapeName(ref) + "." + escapeName(enm.name) + " = (() => {");
    else
        push(escapeName(ref) + "." + escapeName(enm.name) + " = (function() {");
    ++indent;
        push((config.es6 ? "const" : "var") + " valuesById = {}, values = Object.create(valuesById);");
        var aliased = [];
        Object.keys(enm.values).forEach(function(key) {
            var valueId = enm.values[key];
            var val = config.forceEnumString ? JSON.stringify(key) : valueId;
            if (aliased.indexOf(valueId) > -1)
                push("values[" + JSON.stringify(key) + "] = " + val + ";");
            else {
                push("values[valuesById[" + valueId + "] = " + JSON.stringify(key) + "] = " + val + ";");
                aliased.push(valueId);
            }
        });
        push("return values;");
    --indent;
    push("})();");
}