import { HSLASpace, HWBSpace, LabSpace, RGBASpace, XYZSpace, calcContrast } from "./colorSpace"

describe("color space testing", () => {
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
        expect(result).toBeCloseTo(21)
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
        expect(result).toBeCloseTo(8.59)
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

    describe("convert to other color space", () => {
      describe("convert rgb(128, 50, 200) to hsl", () => {
        it("should be hsl(268, .60, .49)", () => {
          const color = new RGBASpace(128, 50, 200)
          const result = color.toHSLA()

          const expected = new HSLASpace({ value: 271.2, unit: "" }, .60, .49)

          expect(result.h.value).toEqual(expected.h.value)
          expect(result.h.unit).toEqual(expected.h.unit)
          expect(result.s).toBeCloseTo(expected.s, 1)
          expect(result.l).toBeCloseTo(expected.l, 1)
        })
      })
      describe("convert rgb(128, 50, 200) to hwb", () => {
        it("should be hwb(271.2, .20, .22)", () => {
          const color = new RGBASpace(128, 50, 200)
          const result = color.toHWB()

          const expected = new HWBSpace({ value: 271.2, unit: "" }, .20, .22)

          //expect(result.h.value).toEqual(expected.h.value)
          expect(result.h.unit).toEqual(expected.h.unit)
          expect(result.w).toBeCloseTo(expected.w, 1)
          expect(result.b).toBeCloseTo(expected.b, 1)
        })
      })
      describe("convert rgb(128, 50, 200) to xyz", () => {
        it("should be xyz(20.5%, 11.0%, 55.7%)", () => {
          const color = new RGBASpace(128, 50, 200)
          const result = color.toXYZ()

          const expected = new XYZSpace(.20468016117143293, .1104052929770536, .5569583234228841)

          expect(result.x).toBeCloseTo(expected.x, 1)
          expect(result.y).toBeCloseTo(expected.y, 1)
          expect(result.z).toBeCloseTo(expected.z, 1)
        })
      })
      describe("convert rgb(128, 50, 200) to lab", () => {
        it("should be lab(31.6, 50.7, -40.1)", () => {
          const color = new RGBASpace(128, 50, 200)
          const result = color.toLab()

          const expected = new LabSpace(39.64864841701541, 59.83217357092047, -64.00403899478016)

          expect(result.l).toBeCloseTo(expected.l, 1)
          expect(result.a).toBeCloseTo(expected.a, 1)
          expect(result.b).toBeCloseTo(expected.b, 1)
        })
      })
      describe("convert rgb(255, 0, 128) to lab", () => {
        it("should be lab(53.2, 80.1, 67.2)", () => {
          const color = new RGBASpace(255, 0, 128)
          const result = color.toLab()

          const expected = new LabSpace(54.88490601846087, 84.55248925023889, 4.065582338377061)

          expect(result.l).toBeCloseTo(expected.l, 1)
          expect(result.a).toBeCloseTo(expected.a, 1)
          expect(result.b).toBeCloseTo(expected.b, 1)
        })
      })
      describe("convert rgb(0,0, 84) to lab", () => {
        it("should be lab(5.782, 34.262, -47.676)", () => {
          const color = new RGBASpace(0, 0, 84)
          const result = color.toLab()

          const expected = new LabSpace(5.782, 34.262, -47.676)

          expect(result.l).toBeCloseTo(expected.l, 1)
          expect(result.a).toBeCloseTo(expected.a, 1)
          expect(result.b).toBeCloseTo(expected.b, 1)
        })
      })
    })
  })

  describe("HSLA color space", () => {
    describe("convert to other color space", () => {
      describe("convert hsl(0.08333333turn, 80%, 19%) to rgb", () => {
        it("should be rgb(87, 48, 10)", () => {
          const color = new HSLASpace({ value: 0.08333333, unit: "turn" }, .80, .19)
          const result = color.toRGBA()

          const expected = new RGBASpace(87, 48, 10)

          expect(result.r).toBeCloseTo(expected.r, 1)
          expect(result.g).toBeCloseTo(expected.g, 1)
          expect(result.b).toBeCloseTo(expected.b, 1)
        })
      })
    })
  })

  describe("HWB color space", () => {
    describe("convert to other color space", () => {
      describe("convert hwb(240, 33%, 5%) to rgb", () => {
        it("should be rgb(84, 84, 242)", () => {
          const color = new HWBSpace({ value: 240, unit: "deg" }, .33, .05)
          const result = color.toRGBA()

          const expected = new RGBASpace(84, 84, 242)

          expect(result.r).toBeCloseTo(expected.r, 1)
          expect(result.g).toBeCloseTo(expected.g, 1)
          expect(result.b).toBeCloseTo(expected.b, 1)
        })
      })
    })
  })

  describe("XYZ color space", () => {
    describe("convert to other color space", () => {
      describe("convert xyz(.205, .110, .557) to rgb", () => {
        it("should be rgb(128, 50, 200)", () => {
          const color = new XYZSpace(0.205, 0.110, 0.557)
          const result = color.toRGBA()

          const expected = new RGBASpace(128, 49, 200)

          expect(result.r).toBeCloseTo(expected.r, 0)
          expect(result.g).toBeCloseTo(expected.g, 0)
          expect(result.b).toBeCloseTo(expected.b, 0)
        })
      })
    })
  })

  describe("Lab color space", () => {
    describe("convert to other color space", () => {

      describe("convert lab(66, 9, -80) to xyz", () => {
        it("should be xyz(.3611, .3532, 1.4552)", () => {
          const color = new LabSpace(66, 9, -80)
          const result = color.toXYZ()

          const expected = new XYZSpace(0.3611, 0.3532, 1.4552)

          expect(result.x).toBeCloseTo(expected.x, 1)
          expect(result.y).toBeCloseTo(expected.y, 1)
          expect(result.z).toBeCloseTo(expected.z, 1)
        })
      })
      describe("convert lab(66, 9, -80) to rgb", () => {
        it("should be rgb(0, 164, 255)", () => {
          const color = new LabSpace(66, 9, -80)
          const result = color.toRGBA()

          console.log(color.toString())

          const expected = new RGBASpace(0, 164, 255)

          expect(result.r).toBeCloseTo(expected.r, 0)
          expect(result.g).toBeCloseTo(expected.g, 0)
          expect(result.b).toBeCloseTo(expected.b, 0)
        })
      })
      describe("convert lab(100, 128, 128) to rgb", () => {
        it("should be rgb(255, 65, 0)", () => {
          const color = new LabSpace(100, 128, 128)
          const result = color.toRGBA()

          const expected = new RGBASpace(255, 65, 0)

          expect(result.r).toBeCloseTo(expected.r, 0)
          expect(result.g).toBeCloseTo(expected.g, 0)
          expect(result.b).toBeCloseTo(expected.b, 0)
        })
      })
      describe("convert lab(100, -128, 44) to rgb", () => {
        it("should be rgb(0, 255, 163)", () => {
          const color = new LabSpace(100, -128, 44)
          const result = color.toRGBA()

          const expected = new RGBASpace(0, 255, 163)

          expect(result.r).toBeCloseTo(expected.r, 0)
          expect(result.g).toBeCloseTo(expected.g, 0)
          expect(result.b).toBeCloseTo(expected.b, 0)
        })
      })
      describe("convert lab(100, 0,0) to rgb", () => {
        it("should be rgb(255, 255, 255)", () => {
          const color = new LabSpace(100, 0, 0)
          const result = color.toRGBA()

          const expected = new RGBASpace(255, 255, 255)

          expect(result.r).toBeCloseTo(expected.r, 0)
          expect(result.g).toBeCloseTo(expected.g, 0)
          expect(result.b).toBeCloseTo(expected.b, 0)
        })
      })
    })
  })
})