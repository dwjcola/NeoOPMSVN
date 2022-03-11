%lex

// NUMBER                      [1-9][0-9]+|[0-9]
// CHAR                        [a-zA-Z0-9_]

%%

'/''/'.*                /* skip whitespace */
\s+                     /* skip whitespace */
var          	 	return 'KEY_RPC_RETURN'
';'              	return 'COLON'
[a-zA-Z_][a-zA-Z_0-9]*  return 'ID'
\"[a-zA-Z_0-9]+\.txt\"      return 'PARAM_FILE'
[-/+*(){}=,_.]    	return yytext[0]
<<EOF>>     //{ return 'EOF'; }

/lex


%{

class tCodeRootNode{
    constructor(){
        this.statements = new Array()
    }
}

class StatementNode{
    constructor(retVariable,rpcName,paramFile){
	this.retVariable = retVariable
        this.rpcName = rpcName
        this.paramFile = paramFile
    }
}

%}

%left '+' '-'
%left '*' '/'
%start contend
%%



contend : statements 
        {$$=new tCodeRootNode();$$.statements=$1;return $$}
        ;

statements : statement
	   {$$ = new Array();$$.unshift($1)}
	   | statement statements
	   {$$=$2;$$.unshift($1)}
	   ;

statement : KEY_RPC_RETURN ID '=' ID '(' paramFile ')' COLON 
        {$$ = new StatementNode($2,$4,$6);}
        | ID '(' paramFile ')' COLON 
        {$$ = new StatementNode(null,$1,$3);}
        ;

paramFile : PARAM_FILE
	  {$$ = $1.substr(1,$1.length-2);}
	  |
	  {$$ = null;}
	  ;
