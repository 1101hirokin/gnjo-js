import { Lexer } from './lexer'
import { Parser } from './parser'
import { HSLASpace, HWBSpace, LabSpace, RGBASpace, XYZSpace } from './colorSpace'
import { Evaluator } from './evaluator'

describe("evaluator", () => {
  it("eval rgba(12,34,56,0.5)", () => {
    const input = "rgba(12,34,56,0.5)"

    const expected = new RGBASpace(12, 34, 56, 0.5)

    const lexer = new Lexer(input)
    const parser = new Parser(lexer)
    const [color, errors] = parser.parse()
    expect(errors.length).toBe(0)
    expect(color).not.toBeNull()

    const evaluator = new Evaluator(color!)
    const result = (evaluator.evaluate() as RGBASpace)
    expect(result.r).toEqual(expected.r)
    expect(result.g).toEqual(expected.g)
    expect(result.b).toEqual(expected.b)
    expect(result.alpha).toEqual(expected.alpha)
  })
  it("eval hsla(30turn, 100%, 50%, 0.5)", () => {
    const input = "hsla(30turn, 100%, 50%, 0.5)"

    const lexer = new Lexer(input)
    const parser = new Parser(lexer)
    const [color, errors] = parser.parse()
    expect(errors.length).toBe(0)
    expect(color).not.toBeNull()

    const evaluator = new Evaluator(color!)
    const result = (evaluator.evaluate() as HSLASpace)

    const expected = new HSLASpace({ value: 30, unit: "turn" }, 100, 50, 0.5)
    expect(result.h.value).toEqual(expected.h.value)
    expect(result.h.unit).toEqual(expected.h.unit)
    expect(result.s).toEqual(expected.s)
    expect(result.l).toEqual(expected.l)
    expect(result.alpha).toEqual(expected.alpha)
  })
  it("eval hwb(30rad, 100%, 50%, 0.5)", () => {
    const input = "hwb(30rad, 100%, 50%, 0.5)"


    const lexer = new Lexer(input)
    const parser = new Parser(lexer)
    const [color, errors] = parser.parse()
    expect(errors.length).toBe(0)
    expect(color).not.toBeNull()

    const evaluator = new Evaluator(color!)
    const result = (evaluator.evaluate() as HWBSpace)

    const expected = new HWBSpace({ value: 30, unit: "rad" }, 100, 50, 0.5)
    expect(result.h.value).toEqual(expected.h.value)
    expect(result.h.unit).toEqual(expected.h.unit)
    expect(result.w).toEqual(expected.w)
    expect(result.b).toEqual(expected.b)
    expect(result.alpha).toEqual(expected.alpha)
  })
  it("eval #ff8800", () => {
    const input = "#ff8800"

    const lexer = new Lexer(input)
    const parser = new Parser(lexer)
    const [color, errors] = parser.parse()
    expect(errors.length).toBe(0)
    expect(color).not.toBeNull()

    const evaluator = new Evaluator(color!)
    const result = (evaluator.evaluate() as RGBASpace)

    const expected = new RGBASpace(255, 136, 0)
    expect(result.r).toEqual(expected.r)
    expect(result.g).toEqual(expected.g)
    expect(result.b).toEqual(expected.b)
  })
  it("eval royalblue", () => {
    const input = "royalblue"

    const lexer = new Lexer(input)
    const parser = new Parser(lexer)
    const [color, errors] = parser.parse()
    expect(errors.length).toBe(0)
    expect(color).not.toBeNull()

    const evaluator = new Evaluator(color!)
    const result = (evaluator.evaluate() as RGBASpace)

    const expected = new RGBASpace(65, 105, 225)
    expect(result.r).toEqual(expected.r)
    expect(result.g).toEqual(expected.g)
    expect(result.b).toEqual(expected.b)
  })
  it("eval lab(100,120, 120)", () => {
    const input = "lab(100,120, 120)"
    const lexer = new Lexer(input)
    const parser = new Parser(lexer)
    const [color, errors] = parser.parse()
    expect(errors.length).toBe(0)
    expect(color).not.toBeNull()

    const evaluator = new Evaluator(color!)
    const result = (evaluator.evaluate() as LabSpace)

    const expected = new LabSpace(100, 120, 120)
    expect(result.l).toEqual(expected.l)
    expect(result.a).toEqual(expected.a)
    expect(result.b).toEqual(expected.b)

  })
})