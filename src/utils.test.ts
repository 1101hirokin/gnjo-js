import { isNumeric } from "./utils"

describe("test utils", () => {
  describe("isNumeric(str) test", () => {
    describe("correct", () => {
      it(`"1234567" is numeric`, () => {
        const result = isNumeric("1234567")
        expect(result).toBe(true)
      })
      it(`"01234567" is numeric`, () => {
        const result = isNumeric("01234567")
        expect(result).toBe(true)
      })
      it(`"0.1234567" is numeric`, () => {
        const result = isNumeric("0.1234567")
        expect(result).toBe(true)
      })
      it(`"1.234567" is numeric`, () => {
        const result = isNumeric("1.234567")
        expect(result).toBe(true)
      })
      it(`"1.2.34567" is numeric`, () => {
        const result = isNumeric("1.2.34567")
        expect(result).toBe(true) // parse result = 1.2
      })
    })
    describe("incorrect", () => {
      it(`"abcdef" is NOT numeric`, () => {
        const result = isNumeric("abcdef")
        expect(result).toBe(false)
      })
      it(`"abcdef" is NOT numeric`, () => {
        const result = isNumeric("abcdef")
        expect(result).toBe(false)
      })
    })
  })
})