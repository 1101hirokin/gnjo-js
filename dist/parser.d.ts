import AST from "./ast";
import { Lexer } from "./lexer";
export declare class Parser {
    private lexer;
    constructor(lexer: Lexer);
    errors: ParseError[];
    private curToken;
    private peekToken;
    private stepNextToken;
    private skipTokens;
    private currentTokenIs;
    private peekingTokenIs;
    private parseNamedColor;
    private parseHEXColor;
    private parseRGBAColor;
    private parseHSLAColor;
    private parseHWBColor;
    private parseXYZColor;
    private parseLabColor;
    private parseValue;
    parse(): [AST.Color | null, ParseError[]];
}
export declare class ParseError implements Error {
    readonly name: string;
    readonly message: string;
    readonly category: ParseErrorCategory;
    constructor(message: string, category: ParseErrorCategory);
}
export declare enum ParseErrorCategory {
    UNKNOWN = 0,
    VALUE_PARSING = 1,
    NAMED_COLOR_PRASING = 2,
    HEX_PARSING = 3,
    RGBA_PARSING = 4,
    HSLA_PARSING = 5,
    HWB_PARSING = 6,
    XYZ_PARSING = 7,
    LAB_PARSING = 8,
    TOO_SHORT_NODES = 9,
    TOO_MANY_NODES = 10
}
//# sourceMappingURL=parser.d.ts.map