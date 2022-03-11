%lex

// NUMBER                      [1-9][0-9]+|[0-9]
// CHAR                        [a-zA-Z0-9_]

%%

'/''/'.*                 return 'NOTE'      //注释只可在 service 区添加
\s+                      /* skip whitespace */

int32|int64|string|json|float  {   
     //return new TYPE_IN(yytext)
     return 'TYPE_IN'
     }
service          {  return 'KEY_SERVICE'}
import           return 'KEY_IMPORT'
rpc              return 'KEY_RPC'
returns          return 'KEY_RETURN'
package          return 'KEY_PKG'
syntax           return 'KEY_SYNTAX'
';'              return 'COLON'
['"]             return 'QUOTE'

//[0-9]           return 'NUMBER'
//[a-zA-Z_]        return 'CHAR'
[a-zA-Z_][a-zA-Z_0-9]*     return 'ID'


//[:print:]+     return 'STRLIT'

//[./\a-zA-Z-_]+     return 'FNAME'



[-/+*(){}=,_.]    return yytext[0]
<<EOF>>     //{ return 'EOF'; }

/lex


%{
const TypeEnum={
    BuiltIn:0,
    PB:1
}

class ServiceNode{
    constructor(name){
        this.name = name
        this.methods=new Map()
    }
}

class MethodNode{
    constructor(name,params,ret,note){
        this.name = name
        this.params = params
        this.return = ret
        this.note = note
    }

}

class ParamNode{
    constructor(type,name){
        this.type  = type 
        this.name  = name
    }
}

class TypeNode{
    constructor(type,name){
        this.type = type
        this.name = name
    }
}

class ImportNode{
    constructor(path){
        this.path = path
    }

}

class RootNode{
    constructor(){
        this.imports  = new Array()
        this.services = new Array()
        this.pkg = null
    }
}

class HeadNode{
    constructor(syntax,pkg,imports){
        this.pkg=pkg
        this.imports= imports||new Array()
        this.syntax= syntax
    }
}

%}

%left '+' '-'
%left '*' '/'
%start contend
%%



contend : head services
        {$$=new RootNode();$$.imports=$1.imports;$$.services=$2;$$.pkg=$1.pkg;$$.syntax=$1.syntax;return $$}
        | mulnote head services
        {$$=new RootNode();$$.imports=$2.imports;$$.services=$3;$$.pkg=$2.pkg;$$.syntax=$2.syntax;return $$}
        | head mulnote services
        {$$=new RootNode();$$.imports=$1.imports;$$.services=$3;$$.pkg=$1.pkg;$$.syntax=$1.syntax;return $$}
        | mulnote head  mulnote services
        {$$=new RootNode();$$.imports=$2.imports;$$.services=$4;$$.pkg=$2.pkg;$$.syntax=$2.syntax;return $$}
        ;



pkgname  : ID
        {$$=$1}
;

syntaxname: ID
        {$$=$1}
        ;
syntax   : KEY_SYNTAX '=' QUOTE syntaxname QUOTE COLON
        {$$=$4}
        ;
package  : KEY_PKG pkgname COLON 
         {$$=$2}
         ;

head   : syntax package
        {$$=new HeadNode($1,$2)}
        | syntax package imports
        {$$=new HeadNode($1,$2,$3)} 
        | syntax imports package 
        {$$=new HeadNode($1,$3,$2)}  
        ;

services : service 
        {$$=new Array();$$.unshift($1)}
        | service services
        {$$=$2; $$.unshift($1)}
        ;

imports : import
        {$$ = new Array();$$.unshift($1)}
        | import imports
        {$$=$2;$$.unshift($1)}
        ;

// str : ID
//     {$$=$1}
//     | FNAME
//     {$$=$1}
//     ;
fname  : ID
        {$$=$1}
        | ID '.' ID
        {$$=$1+$2+$3}
        ;

import : KEY_IMPORT QUOTE fname QUOTE COLON
        {$$ = new ImportNode($3) }
        ;


service : KEY_SERVICE ID  '{'  methods '}'  
        {$$ = new ServiceNode($2);$$.methods = $4}
        | KEY_SERVICE ID  '{'  mulnote methods '}'  
        {$$ = new ServiceNode($2);$$.methods = $5}
        | KEY_SERVICE ID  '{' mulnote methods '}'  mulnote
        {$$ = new ServiceNode($2);$$.methods = $5}
        | KEY_SERVICE ID  '{'  methods '}'  mulnote
        {$$ = new ServiceNode($2);$$.methods = $5}
        ;


methods : method 
         { $$=new Array(); $$.unshift($1);}
        | method methods
        { $$=$2;$2.unshift($1);}
    
        ;

mulnote : NOTE 
        {$$=new Array(); $$.unshift($1);}
        | NOTE  mulnote
        {$$=$2;$2.unshift($1);}
        ;

method  : KEY_RPC ID '(' params ')' return COLON
        {   $$=new MethodNode($2,$4,$6);}
        | KEY_RPC ID '(' params ')' return COLON mulnote
        {   $$=new MethodNode($2,$4,$6,$8[0]);}
        
        ;

return : KEY_RETURN 
        { $$=null }
        | KEY_RETURN '(' ID ')'
        { $$=new TypeNode(TypeEnum.PB, $3)}
        | KEY_RETURN '(' TYPE_IN ')'
        { $$=new TypeNode(TypeEnum.BuiltIn, $3)}
        ;

params : param
        {$$=new Array();$$.unshift($1)}
        | param ',' params
        { $$=$3;$$.unshift($1) }
        |
        {$$=new Array()}
        ;

param : ID 
        { $$ = new ParamNode( new TypeNode( TypeEnum.PB, $1) );}
        | TYPE_IN
        { $$ = new ParamNode( new TypeNode( TypeEnum.BuiltIn,$1)  );} 
        |ID ID 
        { $$ = new ParamNode( new TypeNode( TypeEnum.PB, $1),$2);}  
        |TYPE_IN ID 
        { $$ = new ParamNode( new TypeNode( TypeEnum.BuiltIn,$1) ,$2);}
        ;
      
// ID : CHAR ID
//     {$$=$1+$2;console.log("ID:",$$)}
//     // | CHAR NUMBER ID
//     // {$$=$1+$2+$3; console.log("ID:",$$)}
//     | NUMBER ID 
//     {$$=$1;  console.log("ID:",$$)}
//     | BLANK
//     ;

// varname :id
//     {$$=$1}
//     ;

// id : CHAR id0
//     {$$=$1+$2; }
//     ;

// id0 : CHAR id0
//     {$$ = $1 + $2}
//     | NUMBER id0
//     {$$ = $1 + $2}
//     |CHAR
//     {$$ = $1;}
//     |NUMBER 
//     {$$ = $1}
//     ;

// S   :   S E EOF        { console.log("ans", $1,$2,$$); }
//     |   /* empty */     { /* empty */ }
//     ;

// E   :   E '+' E         { $$ = Number($1) + Number($3); }
//     |   E '-' E         { $$ = $1 - $3; }
//     |   E '*' E         { $$ = $1 * $3; }
//     |   E '/' E         { $$ = $1 / $3; }
//     |   NUMBER          { $$ = $1; }
//     |   '(' E ')'       { $$ = $2; }
//     ;
