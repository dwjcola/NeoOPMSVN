/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var rpcParser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,5],$V2=[1,10],$V3=[1,14],$V4=[1,16],$V5=[1,11,23,26,29],$V6=[23,28],$V7=[16,23,28],$V8=[1,41],$V9=[1,23],$Va=[1,58],$Vb=[2,34],$Vc=[1,59],$Vd=[32,37],$Ve=[26,29];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"contend":3,"head":4,"services":5,"mulnote":6,"pkgname":7,"ID":8,"syntaxname":9,"syntax":10,"KEY_SYNTAX":11,"=":12,"QUOTE":13,"COLON":14,"package":15,"KEY_PKG":16,"imports":17,"service":18,"import":19,"fname":20,".":21,"KEY_IMPORT":22,"KEY_SERVICE":23,"{":24,"methods":25,"}":26,"method":27,"NOTE":28,"KEY_RPC":29,"(":30,"params":31,")":32,"return":33,"KEY_RETURN":34,"TYPE_IN":35,"param":36,",":37,"$accept":0,"$end":1},
terminals_: {2:"error",8:"ID",11:"KEY_SYNTAX",12:"=",13:"QUOTE",14:"COLON",16:"KEY_PKG",21:".",22:"KEY_IMPORT",23:"KEY_SERVICE",24:"{",26:"}",28:"NOTE",29:"KEY_RPC",30:"(",32:")",34:"KEY_RETURN",35:"TYPE_IN",37:","},
productions_: [0,[3,2],[3,3],[3,3],[3,4],[7,1],[9,1],[10,6],[15,3],[4,2],[4,3],[4,3],[5,1],[5,2],[17,1],[17,2],[20,1],[20,3],[19,5],[18,5],[18,6],[18,7],[18,6],[25,1],[25,2],[6,1],[6,2],[27,7],[27,8],[33,1],[33,4],[33,4],[31,1],[31,3],[31,0],[36,1],[36,1],[36,2],[36,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1: case 2:
this.$=new RootNode();this.$.imports=$$[$0-1].imports;this.$.services=$$[$0];this.$.pkg=$$[$0-1].pkg;this.$.syntax=$$[$0-1].syntax;return this.$
break;
case 3: case 4:
this.$=new RootNode();this.$.imports=$$[$0-2].imports;this.$.services=$$[$0];this.$.pkg=$$[$0-2].pkg;this.$.syntax=$$[$0-2].syntax;return this.$
break;
case 5: case 6: case 16:
this.$=$$[$0]
break;
case 7:
this.$=$$[$0-2]
break;
case 8:
this.$=$$[$0-1]
break;
case 9:
this.$=new HeadNode($$[$0-1],$$[$0])
break;
case 10:
this.$=new HeadNode($$[$0-2],$$[$0-1],$$[$0])
break;
case 11:
this.$=new HeadNode($$[$0-2],$$[$0],$$[$0-1])
break;
case 12: case 32:
this.$=new Array();this.$.unshift($$[$0])
break;
case 13:
this.$=$$[$0]; this.$.unshift($$[$0-1])
break;
case 14:
this.$ = new Array();this.$.unshift($$[$0])
break;
case 15:
this.$=$$[$0];this.$.unshift($$[$0-1])
break;
case 17:
this.$=$$[$0-2]+$$[$0-1]+$$[$0]
break;
case 18:
this.$ = new ImportNode($$[$0-2]) 
break;
case 19:
this.$ = new ServiceNode($$[$0-3]);this.$.methods = $$[$0-1]
break;
case 20: case 22:
this.$ = new ServiceNode($$[$0-4]);this.$.methods = $$[$0-1]
break;
case 21:
this.$ = new ServiceNode($$[$0-5]);this.$.methods = $$[$0-2]
break;
case 23:
 this.$=new Array(); this.$.unshift($$[$0]);
break;
case 24:
 this.$=$$[$0];$$[$0].unshift($$[$0-1]);
break;
case 25:
this.$=new Array(); this.$.unshift($$[$0]);
break;
case 26:
this.$=$$[$0];$$[$0].unshift($$[$0-1]);
break;
case 27:
   this.$=new MethodNode($$[$0-5],$$[$0-3],$$[$0-1]);
break;
case 28:
   this.$=new MethodNode($$[$0-6],$$[$0-4],$$[$0-2],$$[$0][0]);
break;
case 29:
 this.$=null 
break;
case 30:
 this.$=new TypeNode(TypeEnum.PB, $$[$0-1])
break;
case 31:
 this.$=new TypeNode(TypeEnum.BuiltIn, $$[$0-1])
break;
case 33:
 this.$=$$[$0];this.$.unshift($$[$0-2]) 
break;
case 34:
this.$=new Array()
break;
case 35:
 this.$ = new ParamNode( new TypeNode( TypeEnum.PB, $$[$0]) );
break;
case 36:
 this.$ = new ParamNode( new TypeNode( TypeEnum.BuiltIn,$$[$0])  );
break;
case 37:
 this.$ = new ParamNode( new TypeNode( TypeEnum.PB, $$[$0-1]),$$[$0]);
break;
case 38:
 this.$ = new ParamNode( new TypeNode( TypeEnum.BuiltIn,$$[$0-1]) ,$$[$0]);
break;
}
},
table: [{3:1,4:2,6:3,10:4,11:$V0,28:$V1},{1:[3]},{5:7,6:8,18:9,23:$V2,28:$V1},{4:11,10:4,11:$V0},{15:12,16:$V3,17:13,19:15,22:$V4},o($V5,[2,25],{6:17,28:$V1}),{12:[1,18]},{1:[2,1]},{5:19,18:9,23:$V2},{1:[2,12],5:20,18:9,23:$V2},{8:[1,21]},{5:22,6:23,18:9,23:$V2,28:$V1},o($V6,[2,9],{19:15,17:24,22:$V4}),{15:25,16:$V3},{7:26,8:[1,27]},o($V7,[2,14],{19:15,17:28,22:$V4}),{13:[1,29]},o($V5,[2,26]),{13:[1,30]},{1:[2,3]},{1:[2,13]},{24:[1,31]},{1:[2,2]},{5:32,18:9,23:$V2},o($V6,[2,10]),o($V6,[2,11]),{14:[1,33]},{14:[2,5]},o($V7,[2,15]),{8:[1,35],20:34},{8:[1,37],9:36},{6:39,25:38,27:40,28:$V1,29:$V8},{1:[2,4]},o([22,23,28],[2,8]),{13:[1,42]},{13:[2,16],21:[1,43]},{13:[1,44]},{13:[2,6]},{26:[1,45]},{25:46,27:40,29:$V8},{25:47,26:[2,23],27:40,29:$V8},{8:[1,48]},{14:[1,49]},{8:[1,50]},{14:[1,51]},o($V9,[2,19],{6:52,28:$V1}),{26:[1,53]},{26:[2,24]},{30:[1,54]},o([16,22,23,28],[2,18]),{13:[2,17]},o([16,22],[2,7]),o($V9,[2,22]),o($V9,[2,20],{6:55,28:$V1}),{8:$Va,31:56,32:$Vb,35:$Vc,36:57},o($V9,[2,21]),{32:[1,60]},{32:[2,32],37:[1,61]},o($Vd,[2,35],{8:[1,62]}),o($Vd,[2,36],{8:[1,63]}),{33:64,34:[1,65]},{8:$Va,31:66,32:$Vb,35:$Vc,36:57},o($Vd,[2,37]),o($Vd,[2,38]),{14:[1,67]},{14:[2,29],30:[1,68]},{32:[2,33]},o($Ve,[2,27],{6:69,28:$V1}),{8:[1,70],35:[1,71]},o($Ve,[2,28]),{32:[1,72]},{32:[1,73]},{14:[2,30]},{14:[2,31]}],
defaultActions: {7:[2,1],19:[2,3],20:[2,13],22:[2,2],27:[2,5],32:[2,4],37:[2,6],47:[2,24],50:[2,17],66:[2,33],72:[2,30],73:[2,31]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

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

/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 28
break;
case 1:/* skip whitespace */
break;
case 2:   
     //return new TYPE_IN(yy_.yytext)
     return 35
     
break;
case 3:  return 23
break;
case 4:return 22
break;
case 5:return 29
break;
case 6:return 34
break;
case 7:return 16
break;
case 8:return 11
break;
case 9:return 14
break;
case 10:return 13
break;
case 11:return 8
break;
case 12:return yy_.yytext[0]
break;
case 13://{ return 'EOF'; }
break;
}
},
rules: [/^(?:\/\/.*)/,/^(?:\s+)/,/^(?:int32|int64|string|json|float\b)/,/^(?:service\b)/,/^(?:import\b)/,/^(?:rpc\b)/,/^(?:returns\b)/,/^(?:package\b)/,/^(?:syntax\b)/,/^(?:;)/,/^(?:['"])/,/^(?:[a-zA-Z_][a-zA-Z_0-9]*)/,/^(?:[-/+*(){}=,_.])/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = rpcParser;
exports.Parser = rpcParser.Parser;
exports.parse = function () { return rpcParser.parse.apply(rpcParser, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}