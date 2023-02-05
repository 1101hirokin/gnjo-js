import * as Gnjo from "./main"

describe("parsing", () => {
  describe("invalid values", () => {
    it("          <space x 10>", () => {
      const lexer = new Gnjo.Lexer("          ")
      const parser = new Gnjo.Parser(lexer)
      const [color, errors] = parser.parse()
      expect(color).toBe(null)
      expect(errors.length).toBe(1)
      expect(errors[0].category).toBe(Gnjo.ParseErrorCategory.TOO_SHORT_NODES)
    })
    it("oaejigb320", () => {
      const lexer = new Gnjo.Lexer("oaejigb320")
      const parser = new Gnjo.Parser(lexer)
      const [color, errors] = parser.parse()
      expect(color).toBe(null)
      expect(errors.length).toBe(1)
      expect(errors[0].category).toBe(Gnjo.ParseErrorCategory.TOO_SHORT_NODES)
    })
    it("#238t4g0#rho'()'!1ba", () => {
      const lexer = new Gnjo.Lexer("#238t4g0#rho'()'!1ba")
      const parser = new Gnjo.Parser(lexer)
      const [color, errors] = parser.parse()
      expect(color).toBe(null)
      expect(errors.length).toBe(3)
      expect(errors[0].category).toBe(Gnjo.ParseErrorCategory.HEX_PARSING)
      expect(errors[1].category).toBe(Gnjo.ParseErrorCategory.HEX_PARSING)
      expect(errors[2].category).toBe(Gnjo.ParseErrorCategory.TOO_MANY_NODES)
    })
  })
  describe("named color", () => {
    describe("correct", () => {
      it("fuchsia", () => {
        const lexer = new Gnjo.Lexer("fuchsia")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()
        expect(color?.node.toString()).toBe("fuchsia")
        expect(color?.node.getTokenLiteral()).toBe("fuchsia")
        expect(errors.length).toBe(0)
      })
      it("orange", () => {
        const lexer = new Gnjo.Lexer("orange")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()
        expect(color?.node.toString()).toBe("orange")
        expect(color?.node.getTokenLiteral()).toBe("orange")
        expect(errors.length).toBe(0)
      })
    })
  })
  describe("hex", () => {
    describe("correct", () => {
      it("#000000", () => {
        const lexer = new Gnjo.Lexer("#000000")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()
        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("#000000")
      })
      it("#2b1aaa", () => {
        const lexer = new Gnjo.Lexer("#2b1aaa")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()
        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("#2b1aaa")
      })
      it("#fbfb120a", () => {
        const lexer = new Gnjo.Lexer("#fbfb120a")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()
        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("#fbfb120a")
      })
    })
    describe("incorrect", () => {
      it("#0000000", () => {
        const lexer = new Gnjo.Lexer("#0000000")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()
        expect(errors.length).toBe(1)
        expect(errors[0].category).toBe(Gnjo.ParseErrorCategory.HEX_PARSING)
        expect(color?.node.toString()).toBe("#000000")
      })
    })
  })
  describe("rgba", () => {
    describe("correct", () => {
      it("rgb(255,30,4)", () => {
        const lexer = new Gnjo.Lexer("rgb(255,30,4)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("rgb(255,30,4)")
      })
      it("rgb  (  255   ,  30   ,  4   )", () => {
        const lexer = new Gnjo.Lexer("rgb  (  255   ,  30   ,  4   )")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("rgb(255,30,4)")
      })
      it("rgba  (  255   ,  30   ,  4   , .8)", () => {
        const lexer = new Gnjo.Lexer("rgba  (  255   ,  30   ,  4   , .8)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("rgba(255,30,4,.8)")
      })
    })
    describe("incorrect", () => {
      it("rgb  (  255   ,  30   ,  4   , .8, 10)", () => {
        const lexer = new Gnjo.Lexer("rgba  (  255   ,  30   ,  4   , .8,10)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(1)
        expect(errors[0].category).toBe(Gnjo.ParseErrorCategory.RGBA_PARSING)
        expect(color?.node.toString()).toBe("rgba(0,0,0)")
      })
      it("hoge(255,30,4)", () => {
        const lexer = new Gnjo.Lexer("hoge(255,30,4)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(1)
        expect(errors[0].category).toBe(Gnjo.ParseErrorCategory.TOO_SHORT_NODES)
        expect(color).toBe(null)
      })
      it("rgb(255,30,4,.2", () => {
        const lexer = new Gnjo.Lexer("rgb(255,30,4,.2")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(1)
        expect(errors[0].category).toBe(Gnjo.ParseErrorCategory.RGBA_PARSING)
        expect(color?.node.toString()).toBe("rgb(255,30,4,.2)")
      })
      it("rgba(128,128,,,,,,128)", () => {
        const lexer = new Gnjo.Lexer("rgba(128,128,,,,,,128)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(1)
        expect(errors[0].category).toBe(Gnjo.ParseErrorCategory.RGBA_PARSING)
        expect(color?.node.toString()).toBe("rgba(128,128,128)")
      })
    })
  })
  describe("hsla", () => {
    describe("correct", () => {
      it("hsl(30deg,50%,1%)", () => {
        const lexer = new Gnjo.Lexer("hsl(30deg,50%,1%)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("hsl(30deg,50%,1%)")
      })
      it("hsl(0.4turn,100%,40%,.98765)", () => {
        const lexer = new Gnjo.Lexer("hsl(0.4turn,100%,40%,.98765)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("hsl(0.4turn,100%,40%,.98765)")
      })
      it("hsl(0.4turn 100% 40% / .98765)", () => {
        const lexer = new Gnjo.Lexer("hsl(0.4turn 100% 40% / .98765)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("hsl(0.4turn,100%,40%,.98765)")
      })
    })
    describe("incorrect", () => {
      it("hsla(255,255,255,1,10)", () => {
        const lexer = new Gnjo.Lexer("hsla(255,255,255,1,10)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(1)
        expect(errors[0].category).toBe(Gnjo.ParseErrorCategory.HSLA_PARSING)
        expect(color?.node.toString()).toBe("hsla(0,0,0)")
      })
    })
  })
  describe("hwb", () => {
    describe("correct", () => {
      it("hwb(30deg,50%,1%)", () => {
        const lexer = new Gnjo.Lexer("hwb(30deg,50%,1%)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("hwb(30deg,50%,1%)")
      })
      it("hwb(0.4turn,100%,40%,.98765)", () => {
        const lexer = new Gnjo.Lexer("hwb(0.4turn,100%,40%,.98765)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("hwb(0.4turn,100%,40%,.98765)")
      })
      it("hwb(0.4turn 100% 40% / .98765)", () => {
        const lexer = new Gnjo.Lexer("hwb(0.4turn 100% 40% / .98765)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("hwb(0.4turn,100%,40%,.98765)")
      })
    })
    describe("incorrect", () => {
      it("hwb(255,255,255,1,10)", () => {
        const lexer = new Gnjo.Lexer("hwb(255,255,255,1,10)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(1)
        expect(errors[0].category).toBe(Gnjo.ParseErrorCategory.HWB_PARSING)
        expect(color?.node.toString()).toBe("hwb(0,0,0)")
      })
    })
  })
  describe("lab", () => {
    describe("correct", () => {
      it("lab(30deg,50%,1%)", () => {
        const lexer = new Gnjo.Lexer("lab(30deg,50%,1%)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("lab(30deg,50%,1%)")
      })
      it("lab(0.4turn,100%,40%,.98765)", () => {
        const lexer = new Gnjo.Lexer("lab(0.4turn,100%,40%,.98765)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("lab(0.4turn,100%,40%,.98765)")
      })
      it("lab(0.4turn 100% 40% / .98765)", () => {
        const lexer = new Gnjo.Lexer("lab(0.4turn 100% 40% / .98765)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(0)
        expect(color?.node.toString()).toBe("lab(0.4turn,100%,40%,.98765)")
      })
    })
    describe("incorrect", () => {
      it("lab(255,255,255,1,10)", () => {
        const lexer = new Gnjo.Lexer("lab(255,255,255,1,10)")
        const parser = new Gnjo.Parser(lexer)
        const [color, errors] = parser.parse()

        expect(errors.length).toBe(1)
        expect(errors[0].category).toBe(Gnjo.ParseErrorCategory.LAB_PARSING)
        expect(color?.node.toString()).toBe("lab(0,0,0)")
      })
    })
  })
})