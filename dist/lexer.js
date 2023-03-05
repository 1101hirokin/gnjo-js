import { Token, TokenType, lookupTokenType } from "./token";
export class Lexer {
    get tokens() { return this._tokens; }
    constructor(colorString) {
        this._tokens = [];
        this._pos = 0;
        this._readPos = 0;
        this._ch = '';
        this.input = colorString;
        this._readChar();
    }
    _readChar() {
        if (this._readPos >= this.input.length) {
            this._ch = '';
        }
        else {
            this._ch = this.input[this._readPos];
        }
        this._pos = this._readPos;
        this._readPos += 1;
    }
    _peekChar() {
        if (this._readPos >= this.input.length) {
            return '';
        }
        else {
            return this.input[this._readPos];
        }
    }
    _stepBack() {
        this._pos -= 1;
        this._readPos -= 1;
    }
    _isLetter(ch) { return (/[a-zA-Z]/).test(ch); }
    _readLiteral() {
        const pos = this._pos;
        while (this._isLetter(this._ch)) {
            this._readChar();
        }
        const result = this.input.substring(pos, this._pos);
        this._stepBack();
        return result;
    }
    _isDigit(ch) { return (/[0-9]/).test(ch); }
    _readNumber() {
        const pos = this._pos;
        let dotCount = 0;
        while (this._isDigit(this._ch) || this._ch == '.') {
            if (this._ch === '.') {
                dotCount++;
            }
            this._readChar();
        }
        const result = this.input.substring(pos, this._pos);
        this._stepBack();
        return [result, dotCount === 1, dotCount <= 1];
    }
    _isWhitespace(ch) { return (/[\s]/.test(ch)); }
    _skipWhitespace() {
        while (this._isWhitespace(this._ch)) {
            this._readChar();
        }
        this._stepBack();
    }
    analyzeToken() {
        let t = new Token(TokenType.ILLEGAL, "");
        switch (this._ch) {
            case "#":
                t = new Token(TokenType.SHARP, this._ch);
                break;
            case "(":
                t = new Token(TokenType.LPAREN, this._ch);
                break;
            case ")":
                t = new Token(TokenType.RPAREN, this._ch);
                break;
            case ",":
                t = new Token(TokenType.COMMA, this._ch);
                break;
            case "%":
                t = new Token(TokenType.PERCENTAGE, this._ch);
                break;
            case "/":
                t = new Token(TokenType.SLASH, this._ch);
                break;
            case ":":
                t = new Token(TokenType.COLON, this._ch);
                break;
            case ";":
                t = new Token(TokenType.SEMICOLON, this._ch);
                break;
            case ".":
                t = new Token(TokenType.DOT, this._ch);
                if (this._isDigit(this._peekChar())) {
                    const ch = this._ch;
                    this._readChar();
                    const [num, isFloat, isValid] = this._readNumber();
                    t.literal = ch + num;
                    t.type = TokenType.NUMBER;
                    if (isFloat || !isValid) {
                        t.type = TokenType.STRING;
                    }
                }
                break;
            case "":
                t = new Token(TokenType.EOS, this._ch);
                break;
            default:
                if (this._isWhitespace(this._ch)) {
                    t.literal = this._ch;
                    t.type = TokenType.SPACE;
                    if (this._isWhitespace(this._peekChar())) {
                        this._readChar();
                        this._skipWhitespace();
                    }
                    break;
                }
                else if (this._isLetter(this._ch)) {
                    t.literal = this._readLiteral();
                    t.type = lookupTokenType(t.literal);
                    break;
                }
                else if (this._isDigit(this._ch)) {
                    const [literal, , isValid] = this._readNumber();
                    t.literal = literal;
                    t.type = TokenType.NUMBER;
                    if (!isValid) {
                        t.type = TokenType.STRING;
                    }
                    break;
                }
                t = new Token(TokenType.ILLEGAL, this._ch);
                break;
        }
        this._readChar();
        return t;
    }
    analyze() {
        const tokens = [];
        let token;
        do {
            token = this.analyzeToken();
            tokens.push(token);
        } while (token.type != TokenType.EOS);
        return tokens;
    }
}
//# sourceMappingURL=lexer.js.map