namespace Gunjo {

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
    // STRING - string
    STRING,
  }
  export class Token {
    public readonly type: TokenType
    public readonly literal: string
    constructor(
      type: TokenType,
      literal: string
    ) {
      this.type = type
      this.literal = literal
    }
  }

  export class Lexer {
    public readonly input: string
    private _tokens: Token[] = []
    get tokens() { return this._tokens }

    constructor(colorString: string) {
      this.input = colorString
    }

    private pos = 0
    private readPos = 0
    private ch = ''

    private readChar() {
      if (this.readPos >= this.input.length) {
        this.ch = ''
      } else {
        this.ch = this.input[this.readPos]
      }
      this.pos = this.readPos
      this.readPos += 1
    }
    private peekChar(): string {
      if (this.readPos >= this.input.length) {
        return ''
      }
      else {
        return this.input[this.readPos]
      }
    }
  }

}

export default Gunjo