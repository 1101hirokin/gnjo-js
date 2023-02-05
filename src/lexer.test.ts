import * as Gnjo from "./main";

describe("lexical analyzing", () => {
  describe("string", () => {
    describe("correct syntax", () => {
      it("lorem ipsum", () => {
        const lexer = new Gnjo.Lexer("lorem ipsum")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.STRING, "lorem"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.STRING, "ipsum"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("lorem          ipsum", () => {
        const lexer = new Gnjo.Lexer("lorem          ipsum")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.STRING, "lorem"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.STRING, "ipsum"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("     lorem          ipsum     ", () => {
        const lexer = new Gnjo.Lexer("     lorem          ipsum     ")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.STRING, "lorem"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.STRING, "ipsum"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("          <space x 10>", () => {
        const lexer = new Gnjo.Lexer("          ")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("#).(,%%/../()", () => {
        const lexer = new Gnjo.Lexer("#).(,%%/../()")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.SHARP, "#"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.DOT, "."),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.SLASH, "/"),
          new Gnjo.Token(Gnjo.TokenType.DOT, "."),
          new Gnjo.Token(Gnjo.TokenType.DOT, "."),
          new Gnjo.Token(Gnjo.TokenType.SLASH, "/"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })

  describe("number", () => {
    describe("correct syntax", () => {
      it("123456789", () => {
        const lexer = new Gnjo.Lexer("1234567890")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "1234567890"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("1.23456789", () => {
        const lexer = new Gnjo.Lexer("1.23456789")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "1.23456789"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it(".123456789", () => {
        const lexer = new Gnjo.Lexer(".123456789")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.NUMBER, ".123456789"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("002", () => {
        const lexer = new Gnjo.Lexer("002")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "002"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
    describe("incorrect syntax", () => {
      it("1..23456789", () => {
        const lexer = new Gnjo.Lexer("1..23456789")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.STRING, "1..23456789"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("1.23.456789", () => {
        const lexer = new Gnjo.Lexer("1.23.456789")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.STRING, "1.23.456789"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it(".1.23456789", () => {
        const lexer = new Gnjo.Lexer(".1.23456789")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.STRING, ".1.23456789"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it(".1..23456789", () => {
        const lexer = new Gnjo.Lexer(".1..23456789")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.STRING, ".1..23456789"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })

  describe("named color", () => {
    describe("correct syntax", () => {
      it("black", () => {
        const lexer = new Gnjo.Lexer("black")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.NAMEDCOLOR, "black"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("lavenderblush", () => {
        const lexer = new Gnjo.Lexer("lavenderblush")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.NAMEDCOLOR, "lavenderblush"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("mediumaquamarine", () => {
        const lexer = new Gnjo.Lexer("mediumaquamarine")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.NAMEDCOLOR, "mediumaquamarine"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("transparent", () => {
        const lexer = new Gnjo.Lexer("transparent")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.NAMEDCOLOR, "transparent"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
    describe("incorrect syntax", () => {
      it("blackblackblack", () => {
        const lexer = new Gnjo.Lexer("blackblackblack")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.STRING, "blackblackblack"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })

  describe("hex color", () => {
    describe("correct syntax", () => {
      it("#abcdef", () => {
        const lexer = new Gnjo.Lexer("#abcdef")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.SHARP, "#"),
          new Gnjo.Token(Gnjo.TokenType.STRING, "abcdef"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("#000000", () => {
        const lexer = new Gnjo.Lexer("#000000")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.SHARP, "#"),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "000000"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("#a1b2c3", () => {
        const lexer = new Gnjo.Lexer("#a1b2c3")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.SHARP, "#"),
          new Gnjo.Token(Gnjo.TokenType.STRING, "a"),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "1"),
          new Gnjo.Token(Gnjo.TokenType.STRING, "b"),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "2"),
          new Gnjo.Token(Gnjo.TokenType.STRING, "c"),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "3"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("#9z8y7x", () => {
        const lexer = new Gnjo.Lexer("#9z8y7x")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.SHARP, "#"),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "9"),
          new Gnjo.Token(Gnjo.TokenType.STRING, "z"),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "8"),
          new Gnjo.Token(Gnjo.TokenType.STRING, "y"),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "7"),
          new Gnjo.Token(Gnjo.TokenType.STRING, "x"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })

  describe("rgba color", () => {
    describe("correct syntax", () => {
      it("rgb(255,255,255)", () => {
        const lexer = new Gnjo.Lexer("rgb(255,255,255)")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.RGBA, "rgb"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "255"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "255"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "255"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("rgb  (  255   ,  30   ,  4   )", () => {
        const lexer = new Gnjo.Lexer("rgb  (  255   ,  30   ,  4   )")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.RGBA, "rgb"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "255"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "30"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "4"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("rgba(123,0,45);", () => {
        const lexer = new Gnjo.Lexer("rgba(123,0,45);")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.RGBA, "rgba"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "123"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "0"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "45"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.SEMICOLON, ";"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("rgba(128,128,128,   0.3)", () => {
        const lexer = new Gnjo.Lexer("rgba(128,128,128,  0.3)")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.RGBA, "rgba"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "128"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "128"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "128"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "0.3"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("rgb(1,2,3,.31234)", () => {
        const lexer = new Gnjo.Lexer("rgb(128,128,128,.31234)")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.RGBA, "rgb"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "128"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "128"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "128"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, ".31234"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("rgb(1,2,3 / 30%)", () => {
        const lexer = new Gnjo.Lexer("rgb(1,2,3 / 30%)")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.RGBA, "rgb"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "1"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "2"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "3"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.SLASH, "/"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "30"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })

  describe("hsla color", () => {
    describe("correct syntax", () => {

      it("hsl(255, 60%,  0%)", () => {
        const lexer = new Gnjo.Lexer("hsl(255, 60%,  0%)")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.HSLA, "hsl"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "255"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "60"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "0"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("hsl(1, 60%,  77% / .12345)", () => {
        const lexer = new Gnjo.Lexer("hsl(1, 60%,  77% / .12345)")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.HSLA, "hsl"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "1"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "60"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "77"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.SLASH, "/"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, ".12345"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("hsla(5.34turn, 2%,  0 / 0.12345)", () => {
        const lexer = new Gnjo.Lexer("hsla(5.34turn, 2%,  0 / 0.12345)")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.HSLA, "hsla"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "5.34"),
          new Gnjo.Token(Gnjo.TokenType.TURN, "turn"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "2"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "0"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.SLASH, "/"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "0.12345"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("hsla(60deg 100% 100% / 1)", () => {
        const lexer = new Gnjo.Lexer("hsla(60deg 100% 100% / 1)")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.HSLA, "hsla"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "60"),
          new Gnjo.Token(Gnjo.TokenType.DEG, "deg"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "100"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "100"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.SLASH, "/"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "1"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })

  describe("hwb color", () => {
    describe("correct syntax", () => {
      it("hwb(255, 60%,  0%)", () => {
        const lexer = new Gnjo.Lexer("hwb(255, 60%,  0%)")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.HWB, "hwb"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "255"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "60"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "0"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("hwb(1, 60%,  77% /    .12345)", () => {
        const lexer = new Gnjo.Lexer("hwb(1, 60%,  77% /    .12345)")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.HWB, "hwb"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "1"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "60"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "77"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.SLASH, "/"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, ".12345"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("hwb(100.0rad, 2%,  0 / 20%)", () => {
        const lexer = new Gnjo.Lexer("hwb(100.0rad, 2%,  0 / 20%)")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.HWB, "hwb"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "100.0"),
          new Gnjo.Token(Gnjo.TokenType.RAD, "rad"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "2"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "0"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.SLASH, "/"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "20"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })

      it("hwb(60deg 100% 100% / 1)", () => {
        const lexer = new Gnjo.Lexer("hwb(60deg 100% 100% / 1)")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.HWB, "hwb"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "60"),
          new Gnjo.Token(Gnjo.TokenType.DEG, "deg"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "100"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "100"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.SLASH, "/"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "1"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })

  describe("lab color", () => {
    describe("correct syntax <experimental>", () => {
      it("lab(12.345678%,60%,  0.2%)", () => {
        const lexer = new Gnjo.Lexer("lab(12.345678%,60%,  0.2%)")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.LAB, "lab"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "12.345678"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "60"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "0.2"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
      it("lab(  0%, 0%,  0% / .1234)", () => {
        const lexer = new Gnjo.Lexer("lab(  0%, 0%,  0% / .1234)")
        const result = lexer.analyze()

        const expected: Gnjo.Token[] = [
          new Gnjo.Token(Gnjo.TokenType.LAB, "lab"),
          new Gnjo.Token(Gnjo.TokenType.LPAREN, "("),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "0"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "0"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.COMMA, ","),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, "0"),
          new Gnjo.Token(Gnjo.TokenType.PERCENTAGE, "%"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.SLASH, "/"),
          new Gnjo.Token(Gnjo.TokenType.SPACE, " "),
          new Gnjo.Token(Gnjo.TokenType.NUMBER, ".1234"),
          new Gnjo.Token(Gnjo.TokenType.RPAREN, ")"),
          new Gnjo.Token(Gnjo.TokenType.EOS, ""),
        ]

        expect(result).toEqual(expected)
      })
    })
  })
})
