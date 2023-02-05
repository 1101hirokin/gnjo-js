import { Token, TokenType } from "./token"

namespace AST {
  export class Color {
    public node: Node
    constructor(node: Node) {
      this.node = node
    }
  }

  export interface Node {
    getTokenLiteral(): string
    toString(): string
  }
  export class ValueNode implements Node {
    public readonly token: Token // should have NUMBER token type
    getTokenLiteral(): string { return this.token.literal }

    public value: string
    public unit: string | null
    constructor(token: Token, value: string, unit?: string) {
      this.token = token
      this.value = value
      this.unit = (unit) ? unit : null
    }
    public toString(): string {
      return `${this.value ? this.value : 0}${this.unit ? this.unit : ''}`
    }
    public static getEmpty(token: Token): ValueNode {
      return new ValueNode(token, "")
    }
  }

  export class NamedColorNode implements Node {
    public readonly token: Token // should have NAMEDCOLOR token type
    public getTokenLiteral(): string { return this.token.literal }

    public value: string

    constructor(token: Token) {
      this.token = token
      this.value = token.literal
    }

    public toString(): string {
      return this.value
    }
    public static getEmpty(token: Token): NamedColorNode {
      return new NamedColorNode(token)
    }
  }

  export class HEXNode implements Node {
    public readonly token: Token // should have SHARP token type
    public getTokenLiteral(): string { return this.token.literal }

    public r: string
    public g: string
    public b: string
    public alpha?: string

    constructor(token: Token, r: string, g: string, b: string, alpha?: string,) {
      this.token = token
      this.r = r
      this.g = g
      this.b = b
      this.alpha = alpha
    }

    public toString(): string {
      const a = (this.alpha) ? this.alpha : ''
      return `${this.token.literal}${this.r}${this.g}${this.b}${a}`
    }
    public static getEmpty(token: Token): HEXNode {
      return new HEXNode(token, "", "", "",)
    }
  }
  export class RGBANode implements Node {
    public readonly token: Token // should have RGBA token type
    getTokenLiteral(): string { return this.token.literal }
    public r: ValueNode
    public g: ValueNode
    public b: ValueNode
    public alpha?: ValueNode

    constructor(
      token: Token,
      r: ValueNode,
      g: ValueNode,
      b: ValueNode,
      alpha?: ValueNode,
    ) {
      this.token = token
      this.r = r
      this.g = g
      this.b = b
      this.alpha = alpha
    }

    public toString(): string {
      let str = `${this.getTokenLiteral()}(${this.r.toString()},${this.g.toString()},${this.b.toString()}`
      if (this.alpha) {
        str += `,${this.alpha.toString()}`
      }
      str += ")"
      return str
    }
    public static getEmpty(token: Token): RGBANode {
      return new RGBANode(
        token,
        new ValueNode(new Token(TokenType.ILLEGAL, ""), ""),
        new ValueNode(new Token(TokenType.ILLEGAL, ""), ""),
        new ValueNode(new Token(TokenType.ILLEGAL, ""), ""),
      )
    }
  }
  export class HSLANode implements Node {
    public readonly token: Token // should have HSL token type
    getTokenLiteral(): string { return this.token.literal }
    public h: ValueNode
    public s: ValueNode
    public l: ValueNode
    public alpha?: ValueNode

    constructor(
      token: Token,
      h: ValueNode,
      s: ValueNode,
      l: ValueNode,
      alpha?: ValueNode,
    ) {
      this.token = token
      this.h = h
      this.s = s
      this.l = l
      this.alpha = alpha
    }

    public toString(): string {
      let str = `${this.getTokenLiteral()}(${this.h.toString()},${this.s.toString()},${this.l.toString()}`
      if (this.alpha) {
        str += `,${this.alpha.toString()}`
      }
      str += ")"
      return str
    }
    public static getEmpty(token: Token): HSLANode {
      return new HSLANode(
        token,
        new ValueNode(new Token(TokenType.ILLEGAL, ""), ""),
        new ValueNode(new Token(TokenType.ILLEGAL, ""), ""),
        new ValueNode(new Token(TokenType.ILLEGAL, ""), ""),
      )
    }
  }
  export class HWBNode implements Node {
    public readonly token: Token // should have HWB token type
    getTokenLiteral(): string { return this.token.literal }
    public h: ValueNode
    public w: ValueNode
    public b: ValueNode
    public alpha?: ValueNode

    constructor(
      token: Token,
      h: ValueNode,
      w: ValueNode,
      b: ValueNode,
      alpha?: ValueNode,
    ) {
      this.token = token
      this.h = h
      this.w = w
      this.b = b
      this.alpha = alpha
    }

    public toString(): string {
      let str = `${this.getTokenLiteral()}(${this.h.toString()},${this.w.toString()},${this.b.toString()}`
      if (this.alpha) {
        str += `,${this.alpha.toString()}`
      }
      str += ")"
      return str
    }
    public static getEmpty(token: Token): HWBNode {
      return new HWBNode(
        token,
        new ValueNode(new Token(TokenType.ILLEGAL, ""), ""),
        new ValueNode(new Token(TokenType.ILLEGAL, ""), ""),
        new ValueNode(new Token(TokenType.ILLEGAL, ""), ""),
      )
    }
  }
  export class LabNode implements Node {
    public readonly token: Token // should have LAB token type 
    getTokenLiteral(): string { return this.token.literal }

    public l: ValueNode
    public a: ValueNode
    public b: ValueNode
    public alpha?: ValueNode

    constructor(
      token: Token,
      l: ValueNode,
      a: ValueNode,
      b: ValueNode,
      alpha?: ValueNode
    ) {
      this.token = token
      this.l = l
      this.a = a
      this.b = b
      this.alpha = alpha
    }

    public toString(): string {
      let str = `${this.getTokenLiteral()}(${this.l.toString()},${this.a.toString()},${this.b.toString()}`
      if (this.alpha) {
        str += `,${this.alpha.toString()}`
      }
      str += ")"
      return str
    }

    public static getEmpty(token: Token): LabNode {
      return new LabNode(
        token,
        new ValueNode(new Token(TokenType.ILLEGAL, ""), ""),
        new ValueNode(new Token(TokenType.ILLEGAL, ""), ""),
        new ValueNode(new Token(TokenType.ILLEGAL, ""), ""),
      )
    }
  }
}

export default AST