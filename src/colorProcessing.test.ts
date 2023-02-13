import { calcContrastRatio } from "./colorProcessing"
import { RGBASpace } from "./colorSpace"

describe("calc WCAG color contrast", () => {
  it("FG:rgb(0,0,0) : BG:rgb(255,255,255)", () => {
    const background = new RGBASpace(255, 255, 255)
    const foreground = new RGBASpace(0, 0, 0)
    const result = calcContrastRatio(background, foreground)
    expect(result).toBeCloseTo(21)
  })
  it("FG:rgb(0,0,255) : BG:rgb(255,255,255)", () => {
    const background = new RGBASpace(255, 255, 255)
    const foreground = new RGBASpace(0, 0, 255)
    const result = calcContrastRatio(background, foreground)
    expect(result).toBeCloseTo(8.59)
  })
  it("FG:rgb(34, 155, 74) : BG:rgb(254, 118, 118)", () => {
    const background = new RGBASpace(254, 118, 118)
    const foreground = new RGBASpace(34, 155, 74)
    const result = calcContrastRatio(background, foreground)
    expect(result).toBeCloseTo(1.37, 1)
  })
})