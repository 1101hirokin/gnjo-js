export enum TokenType {
  // ILLEGAL - illegal token
  ILLEGAL,
  // EOS - end of string
  EOS,
  // SHARP - #
  SHARP,
  // LPAREN - (
  LPAREN,
  // RPAREN - )
  RPAREN,
  // DOT - .
  DOT,
  // COMMA - ,
  COMMA,
  // PERCENTAGE - %
  PERCENTAGE,
  // COLON - :
  COLON,
  // SEMICOLON - ;
  SEMICOLON,
  // SLASH - /
  SLASH,
  // SPACE - " "
  SPACE,
  // NUMBER - number
  NUMBER,
  // NAMEDCOLOR - named color
  NAMEDCOLOR,
  // RGBA - rgb(a)
  RGBA,
  // HSLA - hsl(a)
  HSLA,
  // HWB - hwb
  HWB,
  // LCH - lch
  LCH,
  // LAB - Lab
  LAB,
  // TURN - turn (hsl, hwb)
  TURN,
  // DEG - deg (hsl, hwb)
  DEG,
  // RAD - rad (hsl, hwb)
  RAD,
  // GRAD - grad (hsl, hwb)
  GRAD,
  // STRING - string
  STRING,
}
export class Token {
  private _type: TokenType
  get type(): TokenType { return this._type }
  set type(type: TokenType) { this._type = type }

  private _literal: string
  get literal() { return this._literal }
  set literal(litral: string) { this._literal = litral }
  constructor(
    type: TokenType,
    literal: string
  ) {
    this._type = type
    this._literal = literal
  }
}
export const lookupTokenType = (liteal: string): TokenType => {
  const type = keywords.get(liteal)
  return (typeof type === 'undefined') ? TokenType.STRING : type
}
const keywords = new Map<string, TokenType>([
  ["rgb", TokenType.RGBA],
  ["rgba", TokenType.RGBA],
  ["hsl", TokenType.HSLA],
  ["hsla", TokenType.HSLA],
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
])