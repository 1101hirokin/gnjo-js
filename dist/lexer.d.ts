import { Token } from "./token";
export declare class Lexer {
    readonly input: string;
    private _tokens;
    get tokens(): Token[];
    constructor(colorString: string);
    private _pos;
    private _readPos;
    private _ch;
    private _readChar;
    private _peekChar;
    private _stepBack;
    private _isLetter;
    private _readLiteral;
    private _isDigit;
    private _readNumber;
    private _isWhitespace;
    private _skipWhitespace;
    analyzeToken(): Token;
    analyze(): Token[];
}
//# sourceMappingURL=lexer.d.ts.map