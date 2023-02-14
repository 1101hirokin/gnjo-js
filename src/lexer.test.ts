import { Lexer } from "./lexer"
import { Token, TokenType } from "./token"

describe("lexical analyzing", () => {
  describe("string", () => {
    describe("correct syntax", () => {
      it("lorem ipsum", () => {
        const lexer = new Lexer("lorem ipsum")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.STRING, "lorem"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.STRING, "ipsum"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("lorem          ipsum", () => {
        const lexer = new Lexer("lorem          ipsum")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.STRING, "lorem"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.STRING, "ipsum"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("     lorem          ipsum     ", () => {
        const lexer = new Lexer("     lorem          ipsum     ")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.STRING, "lorem"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.STRING, "ipsum"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("          <space x 10>", () => {
        const lexer = new Lexer("          ")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("#).(,%%/../()", () => {
        const lexer = new Lexer("#).(,%%/../()")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.SHARP, "#"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.DOT, "."),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.SLASH, "/"),
          new Token(TokenType.DOT, "."),
          new Token(TokenType.DOT, "."),
          new Token(TokenType.SLASH, "/"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })

  describe("number", () => {
    describe("correct syntax", () => {
      it("123456789", () => {
        const lexer = new Lexer("1234567890")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.NUMBER, "1234567890"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("1.23456789", () => {
        const lexer = new Lexer("1.23456789")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.NUMBER, "1.23456789"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it(".123456789", () => {
        const lexer = new Lexer(".123456789")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.NUMBER, ".123456789"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("002", () => {
        const lexer = new Lexer("002")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.NUMBER, "002"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
    describe("incorrect syntax", () => {
      it("1..23456789", () => {
        const lexer = new Lexer("1..23456789")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.STRING, "1..23456789"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("1.23.456789", () => {
        const lexer = new Lexer("1.23.456789")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.STRING, "1.23.456789"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it(".1.23456789", () => {
        const lexer = new Lexer(".1.23456789")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.STRING, ".1.23456789"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it(".1..23456789", () => {
        const lexer = new Lexer(".1..23456789")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.STRING, ".1..23456789"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })

  describe("named color", () => {
    describe("correct syntax", () => {
      it("black", () => {
        const lexer = new Lexer("black")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.NAMEDCOLOR, "black"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("lavenderblush", () => {
        const lexer = new Lexer("lavenderblush")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.NAMEDCOLOR, "lavenderblush"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("mediumaquamarine", () => {
        const lexer = new Lexer("mediumaquamarine")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.NAMEDCOLOR, "mediumaquamarine"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("transparent", () => {
        const lexer = new Lexer("transparent")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.NAMEDCOLOR, "transparent"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
    describe("incorrect syntax", () => {
      it("blackblackblack", () => {
        const lexer = new Lexer("blackblackblack")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.STRING, "blackblackblack"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })

  describe("hex color", () => {
    describe("correct syntax", () => {
      it("#abcdef", () => {
        const lexer = new Lexer("#abcdef")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.SHARP, "#"),
          new Token(TokenType.STRING, "abcdef"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("#000000", () => {
        const lexer = new Lexer("#000000")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.SHARP, "#"),
          new Token(TokenType.NUMBER, "000000"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("#a1b2c3", () => {
        const lexer = new Lexer("#a1b2c3")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.SHARP, "#"),
          new Token(TokenType.STRING, "a"),
          new Token(TokenType.NUMBER, "1"),
          new Token(TokenType.STRING, "b"),
          new Token(TokenType.NUMBER, "2"),
          new Token(TokenType.STRING, "c"),
          new Token(TokenType.NUMBER, "3"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("#9z8y7x", () => {
        const lexer = new Lexer("#9z8y7x")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.SHARP, "#"),
          new Token(TokenType.NUMBER, "9"),
          new Token(TokenType.STRING, "z"),
          new Token(TokenType.NUMBER, "8"),
          new Token(TokenType.STRING, "y"),
          new Token(TokenType.NUMBER, "7"),
          new Token(TokenType.STRING, "x"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })

  describe("rgba color", () => {
    describe("correct syntax", () => {
      it("rgb(255,255,255)", () => {
        const lexer = new Lexer("rgb(255,255,255)")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.RGBA, "rgb"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.NUMBER, "255"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.NUMBER, "255"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.NUMBER, "255"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("rgb  (  255   ,  30   ,  4   )", () => {
        const lexer = new Lexer("rgb  (  255   ,  30   ,  4   )")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.RGBA, "rgb"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "255"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "30"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "4"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("rgba(123,0,45);", () => {
        const lexer = new Lexer("rgba(123,0,45);")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.RGBA, "rgba"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.NUMBER, "123"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.NUMBER, "0"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.NUMBER, "45"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.SEMICOLON, ";"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("rgba(128,128,128,   0.3)", () => {
        const lexer = new Lexer("rgba(128,128,128,  0.3)")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.RGBA, "rgba"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.NUMBER, "128"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.NUMBER, "128"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.NUMBER, "128"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "0.3"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("rgb(1,2,3,.31234)", () => {
        const lexer = new Lexer("rgb(128,128,128,.31234)")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.RGBA, "rgb"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.NUMBER, "128"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.NUMBER, "128"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.NUMBER, "128"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.NUMBER, ".31234"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("rgb(1,2,3 / 30%)", () => {
        const lexer = new Lexer("rgb(1,2,3 / 30%)")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.RGBA, "rgb"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.NUMBER, "1"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.NUMBER, "2"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.NUMBER, "3"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.SLASH, "/"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "30"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })

  describe("hsla color", () => {
    describe("correct syntax", () => {

      it("hsl(255, 60%,  0%)", () => {
        const lexer = new Lexer("hsl(255, 60%,  0%)")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.HSLA, "hsl"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.NUMBER, "255"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "60"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "0"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("hsl(1, 60%,  77% / .12345)", () => {
        const lexer = new Lexer("hsl(1, 60%,  77% / .12345)")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.HSLA, "hsl"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.NUMBER, "1"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "60"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "77"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.SLASH, "/"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, ".12345"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("hsla(5.34turn, 2%,  0 / 0.12345)", () => {
        const lexer = new Lexer("hsla(5.34turn, 2%,  0 / 0.12345)")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.HSLA, "hsla"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.NUMBER, "5.34"),
          new Token(TokenType.TURN, "turn"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "2"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "0"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.SLASH, "/"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "0.12345"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("hsla(60deg 100% 100% / 1)", () => {
        const lexer = new Lexer("hsla(60deg 100% 100% / 1)")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.HSLA, "hsla"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.NUMBER, "60"),
          new Token(TokenType.DEG, "deg"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "100"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "100"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.SLASH, "/"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "1"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })

  describe("hwb color", () => {
    describe("correct syntax", () => {
      it("hwb(255, 60%,  0%)", () => {
        const lexer = new Lexer("hwb(255, 60%,  0%)")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.HWB, "hwb"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.NUMBER, "255"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "60"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "0"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("hwb(1, 60%,  77% /    .12345)", () => {
        const lexer = new Lexer("hwb(1, 60%,  77% /    .12345)")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.HWB, "hwb"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.NUMBER, "1"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "60"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "77"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.SLASH, "/"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, ".12345"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("hwb(100.0rad, 2%,  0 / 20%)", () => {
        const lexer = new Lexer("hwb(100.0rad, 2%,  0 / 20%)")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.HWB, "hwb"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.NUMBER, "100.0"),
          new Token(TokenType.RAD, "rad"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "2"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "0"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.SLASH, "/"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "20"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("hwb(60deg 100% 100% / 1)", () => {
        const lexer = new Lexer("hwb(60deg 100% 100% / 1)")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.HWB, "hwb"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.NUMBER, "60"),
          new Token(TokenType.DEG, "deg"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "100"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "100"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.SLASH, "/"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "1"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })

  describe("lab color", () => {
    describe("correct syntax <experimental>", () => {
      it("lab(12.345678%,60%,  0.2%)", () => {
        const lexer = new Lexer("lab(12.345678%,60%,  0.2%)")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.LAB, "lab"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.NUMBER, "12.345678"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.NUMBER, "60"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "0.2"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("lab(  0%, 0%,  0% / .1234)", () => {
        const lexer = new Lexer("lab(  0%, 0%,  0% / .1234)")
        const result = lexer.analyze()

        const expected: Token[] = [
          new Token(TokenType.LAB, "lab"),
          new Token(TokenType.LPAREN, "("),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "0"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "0"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.COMMA, ","),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, "0"),
          new Token(TokenType.PERCENTAGE, "%"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.SLASH, "/"),
          new Token(TokenType.SPACE, " "),
          new Token(TokenType.NUMBER, ".1234"),
          new Token(TokenType.RPAREN, ")"),
          new Token(TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })
})
