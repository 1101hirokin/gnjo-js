import AST from "./ast";
import { Token, TokenType } from "./token";
import { isNumeric } from "./utils";
export class Parser {
    constructor(lexer) {
        this.errors = [];
        this.curToken = new Token(TokenType.ILLEGAL, "");
        this.peekToken = new Token(TokenType.ILLEGAL, "");
        this.lexer = lexer;
        this.stepNextToken();
        this.stepNextToken();
    }
    stepNextToken() {
        this.curToken = this.peekToken;
        this.peekToken = this.lexer.analyzeToken();
        if (this.currentTokenIs(TokenType.SPACE)) {
            this.stepNextToken();
        }
    }
    skipTokens(type) {
        while (this.currentTokenIs(type)) {
            this.stepNextToken();
        }
    }
    currentTokenIs(type) {
        return this.curToken.type === type;
    }
    peekingTokenIs(type) {
        return this.peekToken.type === type;
    }
    parseNamedColor() {
        const t = this.curToken;
        this.stepNextToken();
        return new AST.NamedColorNode(t);
    }
    parseHEXColor() {
        const node = AST.HEXNode.getEmpty(this.curToken);
        let value = "";
        this.stepNextToken();
        while (this.currentTokenIs(TokenType.STRING) ||
            this.currentTokenIs(TokenType.NUMBER)) {
            value += this.curToken.literal;
            this.stepNextToken();
        }
        if (value.length === 6 || value.length === 8) {
            node.r = value[0] + value[1];
            node.g = value[2] + value[3];
            node.b = value[4] + value[5];
            if (value.length === 8) {
                node.alpha = value[6] + value[7];
            }
        }
        else if (value.length === 3 || value.length === 4) {
            node.r = value[0] + value[0];
            node.g = value[1] + value[1];
            node.b = value[2] + value[2];
            if (value.length === 4) {
                node.alpha = value[3] + value[3];
            }
        }
        else {
            this.errors.push(new ParseError("invalid HEX value length", ParseErrorCategory.HEX_PARSING));
            node.r = "00";
            node.g = "00";
            node.b = "00";
        }
        return node;
    }
    parseRGBAColor() {
        const node = AST.RGBANode.getEmpty(this.curToken);
        if (!this.currentTokenIs(TokenType.RGBA)) {
            let found = false;
            do {
                this.stepNextToken();
                if (this.currentTokenIs(TokenType.RGBA)) {
                    found = true;
                    break;
                }
            } while (!this.currentTokenIs(TokenType.RGBA) && !this.currentTokenIs(TokenType.EOS));
            if (!found) {
                this.errors.push(new ParseError("invalid RGBA syntax. rgb(a) not found", ParseErrorCategory.RGBA_PARSING));
            }
        }
        this.stepNextToken();
        if (this.currentTokenIs(TokenType.LPAREN)) {
            this.stepNextToken();
            const nodes = [];
            while (!this.currentTokenIs(TokenType.RPAREN)) {
                switch (this.curToken.type) {
                    case TokenType.NUMBER:
                        nodes.push(this.parseValue());
                        break;
                    case TokenType.COMMA:
                        this.stepNextToken();
                        if (this.currentTokenIs(TokenType.COMMA)) {
                            this.errors.push(new ParseError(`invalid RGBA syntax. too many commas. `, ParseErrorCategory.RGBA_PARSING));
                            this.skipTokens(TokenType.COMMA);
                        }
                        break;
                    default:
                        this.stepNextToken();
                        break;
                }
                if (this.currentTokenIs(TokenType.EOS)) {
                    this.errors.push(new ParseError("invalid RGBA syntax. ) not found.", ParseErrorCategory.RGBA_PARSING));
                    break;
                }
            }
            if (nodes.length === 3 || nodes.length === 4) {
                node.r = nodes[0];
                node.g = nodes[1];
                node.b = nodes[2];
                if (nodes.length === 4) {
                    node.alpha = nodes[3];
                }
            }
            else {
                this.errors.push(new ParseError("invalid RGBA syntax. invalid number of values", ParseErrorCategory.RGBA_PARSING));
            }
        }
        else {
            this.errors.push(new ParseError("invalid RGBA value.", ParseErrorCategory.RGBA_PARSING));
        }
        this.stepNextToken();
        return node;
    }
    parseHSLAColor() {
        const node = AST.HSLANode.getEmpty(this.curToken);
        if (!this.currentTokenIs(TokenType.HSLA)) {
            let found = false;
            do {
                this.stepNextToken();
                if (this.currentTokenIs(TokenType.HSLA)) {
                    found = true;
                    break;
                }
            } while (!this.currentTokenIs(TokenType.HSLA) && !this.currentTokenIs(TokenType.EOS));
            if (!found) {
                this.errors.push(new ParseError("invalid HSLA syntax. hsl(a) not found", ParseErrorCategory.HSLA_PARSING));
            }
        }
        this.stepNextToken();
        if (this.currentTokenIs(TokenType.LPAREN)) {
            this.stepNextToken();
            const nodes = [];
            while (!this.currentTokenIs(TokenType.RPAREN)) {
                switch (this.curToken.type) {
                    case TokenType.NUMBER:
                        nodes.push(this.parseValue());
                        break;
                    case TokenType.COMMA:
                        this.stepNextToken();
                        if (this.currentTokenIs(TokenType.COMMA)) {
                            this.errors.push(new ParseError(`invalid HSLA syntax. too many commas. `, ParseErrorCategory.HSLA_PARSING));
                            this.skipTokens(TokenType.COMMA);
                        }
                        break;
                    default:
                        this.stepNextToken();
                        break;
                }
                if (this.currentTokenIs(TokenType.EOS)) {
                    this.errors.push(new ParseError("invalid HSLA syntax. ) not found.", ParseErrorCategory.HSLA_PARSING));
                    break;
                }
            }
            if (nodes.length === 3 || nodes.length === 4) {
                node.h = nodes[0];
                node.s = nodes[1];
                node.l = nodes[2];
                if (nodes.length === 4) {
                    node.alpha = nodes[3];
                }
            }
            else {
                this.errors.push(new ParseError("invalid HSLA syntax. invalid number of values", ParseErrorCategory.HSLA_PARSING));
            }
        }
        else {
            this.errors.push(new ParseError("invalid HSLA value.", ParseErrorCategory.HSLA_PARSING));
        }
        this.stepNextToken();
        return node;
    }
    parseHWBColor() {
        const node = AST.HWBNode.getEmpty(this.curToken);
        if (!this.currentTokenIs(TokenType.HWB)) {
            let found = false;
            do {
                this.stepNextToken();
                if (this.currentTokenIs(TokenType.HWB)) {
                    found = true;
                    break;
                }
            } while (!this.currentTokenIs(TokenType.HWB) && !this.currentTokenIs(TokenType.EOS));
            if (!found) {
                this.errors.push(new ParseError("invalid HWB syntax. hwb not found", ParseErrorCategory.HWB_PARSING));
            }
        }
        this.stepNextToken();
        if (this.currentTokenIs(TokenType.LPAREN)) {
            this.stepNextToken();
            const nodes = [];
            while (!this.currentTokenIs(TokenType.RPAREN)) {
                switch (this.curToken.type) {
                    case TokenType.NUMBER:
                        nodes.push(this.parseValue());
                        break;
                    case TokenType.COMMA:
                        this.stepNextToken();
                        if (this.currentTokenIs(TokenType.COMMA)) {
                            this.errors.push(new ParseError(`invalid HWB syntax. too many commas. `, ParseErrorCategory.HWB_PARSING));
                            this.skipTokens(TokenType.COMMA);
                        }
                        break;
                    default:
                        this.stepNextToken();
                        break;
                }
                if (this.currentTokenIs(TokenType.EOS)) {
                    this.errors.push(new ParseError("invalid HWB syntax. ) not found.", ParseErrorCategory.HWB_PARSING));
                    break;
                }
            }
            if (nodes.length === 3 || nodes.length === 4) {
                node.h = nodes[0];
                node.w = nodes[1];
                node.b = nodes[2];
                if (nodes.length === 4) {
                    node.alpha = nodes[3];
                }
            }
            else {
                this.errors.push(new ParseError("invalid HWB syntax. invalid number of values", ParseErrorCategory.HWB_PARSING));
            }
        }
        else {
            this.errors.push(new ParseError("invalid HWB value.", ParseErrorCategory.HWB_PARSING));
        }
        this.stepNextToken();
        return node;
    }
    parseXYZColor() {
        const node = AST.XYZNode.getEmpty(this.curToken);
        if (!this.currentTokenIs(TokenType.XYZ)) {
            let found = false;
            do {
                this.stepNextToken();
                if (this.currentTokenIs(TokenType.XYZ)) {
                    found = true;
                    break;
                }
            } while (!this.currentTokenIs(TokenType.XYZ) && !this.currentTokenIs(TokenType.EOS));
            if (!found) {
                this.errors.push(new ParseError("invalid XYZ syntax. xyz not found", ParseErrorCategory.XYZ_PARSING));
            }
        }
        this.stepNextToken();
        if (this.currentTokenIs(TokenType.LPAREN)) {
            this.stepNextToken();
            const nodes = [];
            while (!this.currentTokenIs(TokenType.RPAREN)) {
                switch (this.curToken.type) {
                    case TokenType.NUMBER:
                        nodes.push(this.parseValue());
                        break;
                    case TokenType.COMMA:
                        this.stepNextToken();
                        if (this.currentTokenIs(TokenType.COMMA)) {
                            this.errors.push(new ParseError(`invalid XYZ syntax. too many commas. `, ParseErrorCategory.XYZ_PARSING));
                            this.skipTokens(TokenType.COMMA);
                        }
                        break;
                    default:
                        this.stepNextToken();
                        break;
                }
                if (this.currentTokenIs(TokenType.EOS)) {
                    this.errors.push(new ParseError("invalid XYZ syntax. ) not found.", ParseErrorCategory.XYZ_PARSING));
                    break;
                }
            }
            if (nodes.length === 3) {
                node.x = nodes[0];
                node.y = nodes[1];
                node.z = nodes[2];
            }
            else {
                this.errors.push(new ParseError("invalid XYZ syntax. invalid number of values", ParseErrorCategory.XYZ_PARSING));
            }
        }
        else {
            this.errors.push(new ParseError("invalid XYZ value.", ParseErrorCategory.XYZ_PARSING));
        }
        this.stepNextToken();
        return node;
    }
    parseLabColor() {
        const node = AST.LabNode.getEmpty(this.curToken);
        if (!this.currentTokenIs(TokenType.LAB)) {
            let found = false;
            do {
                this.stepNextToken();
                if (this.currentTokenIs(TokenType.LAB)) {
                    found = true;
                    break;
                }
            } while (!this.currentTokenIs(TokenType.LAB) && !this.currentTokenIs(TokenType.EOS));
            if (!found) {
                this.errors.push(new ParseError("invalid Lab syntax. lab not found", ParseErrorCategory.LAB_PARSING));
            }
        }
        this.stepNextToken();
        if (this.currentTokenIs(TokenType.LPAREN)) {
            this.stepNextToken();
            const nodes = [];
            while (!this.currentTokenIs(TokenType.RPAREN)) {
                let commaCount = 0;
                switch (this.curToken.type) {
                    case TokenType.NUMBER:
                        nodes.push(this.parseValue());
                        break;
                    case TokenType.COMMA:
                        this.stepNextToken();
                        if (this.currentTokenIs(TokenType.COMMA)) {
                            this.errors.push(new ParseError(`invalid Lab syntax. too many commas. `, ParseErrorCategory.LAB_PARSING));
                            this.skipTokens(TokenType.COMMA);
                        }
                        break;
                    default:
                        this.stepNextToken();
                        break;
                }
                if (2 <= commaCount) {
                    this.errors.push(new ParseError(`invalid Lab syntax. too many commas. ${commaCount} commas found `, ParseErrorCategory.LAB_PARSING));
                }
                if (this.currentTokenIs(TokenType.EOS)) {
                    this.errors.push(new ParseError("invalid Lab syntax. ) not found.", ParseErrorCategory.LAB_PARSING));
                    break;
                }
            }
            if (nodes.length === 3 || nodes.length === 4) {
                node.l = nodes[0];
                node.a = nodes[1];
                node.b = nodes[2];
                if (nodes.length === 4) {
                    node.alpha = nodes[3];
                }
            }
            else {
                this.errors.push(new ParseError("invalid Lab syntax. invalid number of values", ParseErrorCategory.LAB_PARSING));
            }
        }
        else {
            this.errors.push(new ParseError("invalid Lab value.", ParseErrorCategory.LAB_PARSING));
        }
        this.stepNextToken();
        return node;
    }
    parseValue() {
        const node = AST.ValueNode.getEmpty(this.curToken);
        if (this.currentTokenIs(TokenType.NUMBER)) {
            if (isNumeric(this.curToken.literal)) {
                node.value = this.curToken.literal;
            }
            else {
                this.errors.push(new ParseError(`the value: ${this.curToken.literal} is not numeric`, ParseErrorCategory.VALUE_PARSING));
            }
            this.stepNextToken();
        }
        if (this.currentTokenIs(TokenType.PERCENTAGE) ||
            this.currentTokenIs(TokenType.TURN) ||
            this.currentTokenIs(TokenType.DEG) ||
            this.currentTokenIs(TokenType.RAD) ||
            this.currentTokenIs(TokenType.GRAD)) {
            node.unit = this.curToken.literal;
            this.stepNextToken();
        }
        return node;
    }
    parse() {
        let nodes = [];
        while (!this.currentTokenIs(TokenType.EOS)) {
            switch (this.curToken.type) {
                case TokenType.NAMEDCOLOR:
                    nodes.push(this.parseNamedColor());
                    break;
                case TokenType.SHARP:
                    nodes.push(this.parseHEXColor());
                    break;
                case TokenType.RGBA:
                    nodes.push(this.parseRGBAColor());
                    break;
                case TokenType.HSLA:
                    nodes.push(this.parseHSLAColor());
                    break;
                case TokenType.HWB:
                    nodes.push(this.parseHWBColor());
                    break;
                case TokenType.XYZ:
                    nodes.push(this.parseXYZColor());
                    break;
                case TokenType.LAB:
                    nodes.push(this.parseLabColor());
                    break;
                default:
                    this.stepNextToken();
                    break;
            }
        }
        if (nodes.length === 1) {
            return [new AST.Color(nodes[0]), this.errors];
        }
        else if (nodes.length < 1) {
            this.errors.push(new ParseError("invalid syntax: too short number of nodes.", ParseErrorCategory.TOO_SHORT_NODES));
            return [null, this.errors];
        }
        else {
            this.errors.push(new ParseError("invalid syntax: too many number of nodes.", ParseErrorCategory.TOO_MANY_NODES));
            return [null, this.errors];
        }
    }
}
export class ParseError {
    constructor(message, category) {
        this.name = "Parse Error";
        this.message = message;
        this.category = category;
    }
}
export var ParseErrorCategory;
(function (ParseErrorCategory) {
    ParseErrorCategory[ParseErrorCategory["UNKNOWN"] = 0] = "UNKNOWN";
    ParseErrorCategory[ParseErrorCategory["VALUE_PARSING"] = 1] = "VALUE_PARSING";
    ParseErrorCategory[ParseErrorCategory["NAMED_COLOR_PRASING"] = 2] = "NAMED_COLOR_PRASING";
    ParseErrorCategory[ParseErrorCategory["HEX_PARSING"] = 3] = "HEX_PARSING";
    ParseErrorCategory[ParseErrorCategory["RGBA_PARSING"] = 4] = "RGBA_PARSING";
    ParseErrorCategory[ParseErrorCategory["HSLA_PARSING"] = 5] = "HSLA_PARSING";
    ParseErrorCategory[ParseErrorCategory["HWB_PARSING"] = 6] = "HWB_PARSING";
    ParseErrorCategory[ParseErrorCategory["XYZ_PARSING"] = 7] = "XYZ_PARSING";
    ParseErrorCategory[ParseErrorCategory["LAB_PARSING"] = 8] = "LAB_PARSING";
    ParseErrorCategory[ParseErrorCategory["TOO_SHORT_NODES"] = 9] = "TOO_SHORT_NODES";
    ParseErrorCategory[ParseErrorCategory["TOO_MANY_NODES"] = 10] = "TOO_MANY_NODES";
})(ParseErrorCategory || (ParseErrorCategory = {}));
//# sourceMappingURL=parser.js.map