export declare enum TokenType {
    ILLEGAL = 0,
    EOS = 1,
    SHARP = 2,
    LPAREN = 3,
    RPAREN = 4,
    DOT = 5,
    COMMA = 6,
    PERCENTAGE = 7,
    COLON = 8,
    SEMICOLON = 9,
    SLASH = 10,
    SPACE = 11,
    NUMBER = 12,
    NAMEDCOLOR = 13,
    RGBA = 14,
    HSLA = 15,
    HWB = 16,
    LCH = 17,
    XYZ = 18,
    LAB = 19,
    TURN = 20,
    DEG = 21,
    RAD = 22,
    GRAD = 23,
    STRING = 24
}
export declare class Token {
    private _type;
    get type(): TokenType;
    set type(type: TokenType);
    private _literal;
    get literal(): string;
    set literal(litral: string);
    constructor(type: TokenType, literal: string);
}
export declare const lookupTokenType: (liteal: string) => TokenType;
//# sourceMappingURL=token.d.ts.map