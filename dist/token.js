export var TokenType;
(function (TokenType) {
    // ILLEGAL - illegal token
    TokenType[TokenType["ILLEGAL"] = 0] = "ILLEGAL";
    // EOS - end of string
    TokenType[TokenType["EOS"] = 1] = "EOS";
    // SHARP - #
    TokenType[TokenType["SHARP"] = 2] = "SHARP";
    // LPAREN - (
    TokenType[TokenType["LPAREN"] = 3] = "LPAREN";
    // RPAREN - )
    TokenType[TokenType["RPAREN"] = 4] = "RPAREN";
    // DOT - .
    TokenType[TokenType["DOT"] = 5] = "DOT";
    // COMMA - ,
    TokenType[TokenType["COMMA"] = 6] = "COMMA";
    // PERCENTAGE - %
    TokenType[TokenType["PERCENTAGE"] = 7] = "PERCENTAGE";
    // COLON - :
    TokenType[TokenType["COLON"] = 8] = "COLON";
    // SEMICOLON - ;
    TokenType[TokenType["SEMICOLON"] = 9] = "SEMICOLON";
    // SLASH - /
    TokenType[TokenType["SLASH"] = 10] = "SLASH";
    // SPACE - " "
    TokenType[TokenType["SPACE"] = 11] = "SPACE";
    // NUMBER - number
    TokenType[TokenType["NUMBER"] = 12] = "NUMBER";
    // NAMEDCOLOR - named color
    TokenType[TokenType["NAMEDCOLOR"] = 13] = "NAMEDCOLOR";
    // RGBA - rgb(a)
    TokenType[TokenType["RGBA"] = 14] = "RGBA";
    // HSLA - hsl(a)
    TokenType[TokenType["HSLA"] = 15] = "HSLA";
    // HWB - hwb
    TokenType[TokenType["HWB"] = 16] = "HWB";
    // LCH - lch
    TokenType[TokenType["LCH"] = 17] = "LCH";
    // XYZ - xyz
    TokenType[TokenType["XYZ"] = 18] = "XYZ";
    // LAB - Lab
    TokenType[TokenType["LAB"] = 19] = "LAB";
    // TURN - turn (hsl, hwb)
    TokenType[TokenType["TURN"] = 20] = "TURN";
    // DEG - deg (hsl, hwb)
    TokenType[TokenType["DEG"] = 21] = "DEG";
    // RAD - rad (hsl, hwb)
    TokenType[TokenType["RAD"] = 22] = "RAD";
    // GRAD - grad (hsl, hwb)
    TokenType[TokenType["GRAD"] = 23] = "GRAD";
    // STRING - string
    TokenType[TokenType["STRING"] = 24] = "STRING";
})(TokenType || (TokenType = {}));
export class Token {
    get type() { return this._type; }
    set type(type) { this._type = type; }
    get literal() { return this._literal; }
    set literal(litral) { this._literal = litral; }
    constructor(type, literal) {
        this._type = type;
        this._literal = literal;
    }
}
export const lookupTokenType = (liteal) => {
    const type = keywords.get(liteal);
    return (typeof type === 'undefined') ? TokenType.STRING : type;
};
const keywords = new Map([
    ["rgb", TokenType.RGBA],
    ["rgba", TokenType.RGBA],
    ["hsl", TokenType.HSLA],
    ["hsla", TokenType.HSLA],
    ["xyz", TokenType.XYZ],
    ["hwb", TokenType.HWB],
    ["lch", TokenType.LCH],
    ["lab", TokenType.LAB],
    ["turn", TokenType.TURN],
    ["deg", TokenType.DEG],
    ["rad", TokenType.RAD],
    ["grad", TokenType.GRAD],
    // named collors
    /**
     * CSS Lv.1
     */
    ["black", TokenType.NAMEDCOLOR],
    ["silver", TokenType.NAMEDCOLOR],
    ["gray", TokenType.NAMEDCOLOR],
    ["white", TokenType.NAMEDCOLOR],
    ["maroon", TokenType.NAMEDCOLOR],
    ["red", TokenType.NAMEDCOLOR],
    ["purple", TokenType.NAMEDCOLOR],
    ["fuchsia", TokenType.NAMEDCOLOR],
    ["green", TokenType.NAMEDCOLOR],
    ["lime", TokenType.NAMEDCOLOR],
    ["olive", TokenType.NAMEDCOLOR],
    ["yellow", TokenType.NAMEDCOLOR],
    ["navy", TokenType.NAMEDCOLOR],
    ["blue", TokenType.NAMEDCOLOR],
    ["teal", TokenType.NAMEDCOLOR],
    ["aqua", TokenType.NAMEDCOLOR],
    /**
     * CSS Lv.2
     */
    ["orange", TokenType.NAMEDCOLOR],
    /**
     * CSS Lv.3
     */
    ["aliceblue", TokenType.NAMEDCOLOR],
    ["antiquewhite", TokenType.NAMEDCOLOR],
    ["aquamarine", TokenType.NAMEDCOLOR],
    ["azure", TokenType.NAMEDCOLOR],
    ["beige", TokenType.NAMEDCOLOR],
    ["bisque", TokenType.NAMEDCOLOR],
    ["blanchedalmond", TokenType.NAMEDCOLOR],
    ["blueviolet", TokenType.NAMEDCOLOR],
    ["brown", TokenType.NAMEDCOLOR],
    ["burlywood", TokenType.NAMEDCOLOR],
    ["cadetblue", TokenType.NAMEDCOLOR],
    ["chartreuse", TokenType.NAMEDCOLOR],
    ["chocolate", TokenType.NAMEDCOLOR],
    ["coral", TokenType.NAMEDCOLOR],
    ["cornflowerblue", TokenType.NAMEDCOLOR],
    ["cornsilk", TokenType.NAMEDCOLOR],
    ["crimson", TokenType.NAMEDCOLOR],
    ["cyan", TokenType.NAMEDCOLOR],
    ["darkblue", TokenType.NAMEDCOLOR],
    ["darkcyan", TokenType.NAMEDCOLOR],
    ["darkgoldenrod", TokenType.NAMEDCOLOR],
    ["darkgray", TokenType.NAMEDCOLOR],
    ["darkgreen", TokenType.NAMEDCOLOR],
    ["darkkhaki", TokenType.NAMEDCOLOR],
    ["darkmagenta", TokenType.NAMEDCOLOR],
    ["darkolivegreen", TokenType.NAMEDCOLOR],
    ["darkorange", TokenType.NAMEDCOLOR],
    ["darkorchid", TokenType.NAMEDCOLOR],
    ["darkred", TokenType.NAMEDCOLOR],
    ["darksalmon", TokenType.NAMEDCOLOR],
    ["darkseagreen", TokenType.NAMEDCOLOR],
    ["darkslateblue", TokenType.NAMEDCOLOR],
    ["darkslategray", TokenType.NAMEDCOLOR],
    ["darkslategrey", TokenType.NAMEDCOLOR],
    ["darkturquoise", TokenType.NAMEDCOLOR],
    ["darkviolet", TokenType.NAMEDCOLOR],
    ["deeppink", TokenType.NAMEDCOLOR],
    ["deepskyblue", TokenType.NAMEDCOLOR],
    ["dimgray", TokenType.NAMEDCOLOR],
    ["dodgerblue", TokenType.NAMEDCOLOR],
    ["firebrick ", TokenType.NAMEDCOLOR],
    ["floralwhite", TokenType.NAMEDCOLOR],
    ["forestgreen", TokenType.NAMEDCOLOR],
    ["gainsboro", TokenType.NAMEDCOLOR],
    ["ghostwhite	", TokenType.NAMEDCOLOR],
    ["gold", TokenType.NAMEDCOLOR],
    ["goldenrod", TokenType.NAMEDCOLOR],
    ["greenyellow", TokenType.NAMEDCOLOR],
    ["honeydew", TokenType.NAMEDCOLOR],
    ["hotpink", TokenType.NAMEDCOLOR],
    ["indianred", TokenType.NAMEDCOLOR],
    ["indigo", TokenType.NAMEDCOLOR],
    ["ivory", TokenType.NAMEDCOLOR],
    ["khaki", TokenType.NAMEDCOLOR],
    ["lavender", TokenType.NAMEDCOLOR],
    ["lavenderblush", TokenType.NAMEDCOLOR],
    ["lawngreen", TokenType.NAMEDCOLOR],
    ["lemonchiffon", TokenType.NAMEDCOLOR],
    ["lightblue", TokenType.NAMEDCOLOR],
    ["lightcoral", TokenType.NAMEDCOLOR],
    ["lightcyan", TokenType.NAMEDCOLOR],
    ["lightgoldenrodyellow", TokenType.NAMEDCOLOR],
    ["lightgray", TokenType.NAMEDCOLOR],
    ["lightgreen", TokenType.NAMEDCOLOR],
    ["lightgrey", TokenType.NAMEDCOLOR],
    ["lightpink", TokenType.NAMEDCOLOR],
    ["lightsalmon", TokenType.NAMEDCOLOR],
    ["lightseagreen", TokenType.NAMEDCOLOR],
    ["lightskyblue", TokenType.NAMEDCOLOR],
    ["lightslategray", TokenType.NAMEDCOLOR],
    ["lightsteelblue", TokenType.NAMEDCOLOR],
    ["lightyellow", TokenType.NAMEDCOLOR],
    ["limegreen", TokenType.NAMEDCOLOR],
    ["linen", TokenType.NAMEDCOLOR],
    ["magenta", TokenType.NAMEDCOLOR],
    ["fuchsia", TokenType.NAMEDCOLOR],
    ["mediumaquamarine", TokenType.NAMEDCOLOR],
    ["mediumblue", TokenType.NAMEDCOLOR],
    ["mediumorchid", TokenType.NAMEDCOLOR],
    ["mediumpurple", TokenType.NAMEDCOLOR],
    ["mediumseagreen", TokenType.NAMEDCOLOR],
    ["mediumslateblue", TokenType.NAMEDCOLOR],
    ["mediumspringgreen", TokenType.NAMEDCOLOR],
    ["mediumturquoise", TokenType.NAMEDCOLOR],
    ["mediumvioletred", TokenType.NAMEDCOLOR],
    ["midnightblue", TokenType.NAMEDCOLOR],
    ["mintcream", TokenType.NAMEDCOLOR],
    ["mistyrose", TokenType.NAMEDCOLOR],
    ["moccasin", TokenType.NAMEDCOLOR],
    ["navajowhite", TokenType.NAMEDCOLOR],
    ["oldlace", TokenType.NAMEDCOLOR],
    ["olivedrab", TokenType.NAMEDCOLOR],
    ["orangered", TokenType.NAMEDCOLOR],
    ["orchid", TokenType.NAMEDCOLOR],
    ["palegoldenrod", TokenType.NAMEDCOLOR],
    ["palegreen", TokenType.NAMEDCOLOR],
    ["paleturquoise", TokenType.NAMEDCOLOR],
    ["palevioletred", TokenType.NAMEDCOLOR],
    ["papayawhip", TokenType.NAMEDCOLOR],
    ["peachpuff", TokenType.NAMEDCOLOR],
    ["peru", TokenType.NAMEDCOLOR],
    ["pink", TokenType.NAMEDCOLOR],
    ["plum", TokenType.NAMEDCOLOR],
    ["powderblue", TokenType.NAMEDCOLOR],
    ["rosybrown", TokenType.NAMEDCOLOR],
    ["royalblue", TokenType.NAMEDCOLOR],
    ["saddlebrown", TokenType.NAMEDCOLOR],
    ["salmon", TokenType.NAMEDCOLOR],
    ["sandybrown", TokenType.NAMEDCOLOR],
    ["seashell", TokenType.NAMEDCOLOR],
    ["seagreen", TokenType.NAMEDCOLOR],
    ["sienna", TokenType.NAMEDCOLOR],
    ["skyblue", TokenType.NAMEDCOLOR],
    ["slateblue", TokenType.NAMEDCOLOR],
    ["slategray", TokenType.NAMEDCOLOR],
    ["slategrey", TokenType.NAMEDCOLOR],
    ["snow", TokenType.NAMEDCOLOR],
    ["springgreen", TokenType.NAMEDCOLOR],
    ["steelblue", TokenType.NAMEDCOLOR],
    ["tan", TokenType.NAMEDCOLOR],
    ["thistle", TokenType.NAMEDCOLOR],
    ["tomato", TokenType.NAMEDCOLOR],
    ["transparent", TokenType.NAMEDCOLOR],
    ["turquoise", TokenType.NAMEDCOLOR],
    ["violet", TokenType.NAMEDCOLOR],
    ["wheat", TokenType.NAMEDCOLOR],
    ["whitesmoke", TokenType.NAMEDCOLOR],
    ["yellowgreen", TokenType.NAMEDCOLOR],
]);
//# sourceMappingURL=token.js.map