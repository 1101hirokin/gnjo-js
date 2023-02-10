import { RGBASpace, calcContrast } from "./colorSpace"

describe("color space", () => {
  describe("RGBA color space", () => {
    describe("calc WCAG color contrast", () => {
      it("FG:rgb(0,0,0) : BG:rgb(255,255,255)", () => {
        const background = new RGBASpace(
          255,
          255,
          255,
          1,
        )
        const foreground = new RGBASpace(
          0,
          0,
          0,
          1,
        )

        const result = calcContrast(background, foreground)
        expect(result).toBeCloseTo(21, 1)
      })
      it("FG:rgb(0,0,255) : BG:rgb(255,255,255)", () => {
        const background = new RGBASpace(
          255,
          255,
          255,
          1,
        )
        const foreground = new RGBASpace(
          0,
          0,
          255,
          1,
        )

        const result = calcContrast(background, foreground)
        expect(result).toBeCloseTo(8.59, 1)
      })
      it("FG:rgb(34, 155, 74) : BG:rgb(254, 118, 118)", () => {
        const background = new RGBASpace(
          254,
          118,
          118,
          1,
        )
        const foreground = new RGBASpace(
          34,
          155,
          74,
          1,
        )

        const result = calcContrast(background, foreground)


        expect(result).toBeCloseTo(1.37, 1)
      })
    })
  })
})