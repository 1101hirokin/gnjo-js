import { HSLASpace, HWBSpace, LabSpace, RGBASpace, XYZSpace } from "./colorSpace"

describe("color space testing", () => {
  describe("RGBA color space", () => {
    describe("convert to other color space", () => {
      describe("convert rgb(255, 255, 255) to ...", () => {
        it("case HSL: should be hsl(0, 0%, 100%)", () => {
          const color = new RGBASpace(255, 255, 255)
          const result = color.toHSLA()

          const expected = new HSLASpace({ value: 0, unit: "deg" }, 0, 1)

          expect(result.h.value).toBeCloseTo(expected.h.value, 1)
          expect(result.s).toBeCloseTo(expected.s, 1)
          expect(result.l).toBeCloseTo(expected.l, 1)
        })
        it("case HWB: should be hwb(0, 100%, 0%)", () => {
          const color = new RGBASpace(255, 255, 255)
          const result = color.toHWB()

          const expected = new HWBSpace({ value: 0, unit: "deg" }, 1, 0)

          expect(result.h.value).toBeCloseTo(expected.h.value, 1)
          expect(result.w).toBeCloseTo(expected.w, 1)
          expect(result.b).toBeCloseTo(expected.b, 1)
        })
        it("case XYZ: should be xyz(.9505, 1, 1.0891)", () => {
          const color = new RGBASpace(255, 255, 255)
          const result = color.toXYZ()

          const expected = XYZSpace.whitePoint()

          expect(result.x).toBeCloseTo(expected.x, 1)
          expect(result.y).toBeCloseTo(expected.y, 1)
          expect(result.z).toBeCloseTo(expected.z, 1)
        })
        it("case Lab: should be lab(100, 0, 0)", () => {
          const color = new RGBASpace(255, 255, 255)
          const result = color.toLab()

          const expected = XYZSpace.whitePoint().toLab()

          expect(result.l).toBeCloseTo(expected.l, 1)
          expect(result.a).toBeCloseTo(expected.a, 1)
          expect(result.b).toBeCloseTo(expected.b, 1)
        })
      })
      describe("convert rgb(0, 0, 0) to ...", () => {
        it("case HSL: should be hsl(0, 0%, 0%)", () => {
          const color = new RGBASpace(0, 0, 0)
          const result = color.toHSLA()

          const expected = new HSLASpace({ value: 0, unit: "deg" }, 0, 0)

          expect(result.h.value).toBeCloseTo(expected.h.value, 1)
          expect(result.s).toBeCloseTo(expected.s, 1)
          expect(result.l).toBeCloseTo(expected.l, 1)
        })
        it("case HWB: should be hwb(0, 0%, 100%)", () => {
          const color = new RGBASpace(0, 0, 0)
          const result = color.toHWB()

          const expected = new HWBSpace({ value: 0, unit: "deg" }, 0, 1)

          expect(result.h.value).toBeCloseTo(expected.h.value, 1)
          expect(result.w).toBeCloseTo(expected.w, 1)
          expect(result.b).toBeCloseTo(expected.b, 1)
        })
        it("case XYZ: should be xyz(0, 0, 0)", () => {
          const color = new RGBASpace(0, 0, 0)
          const result = color.toXYZ()

          const expected = new XYZSpace(0, 0, 0)

          expect(result.x).toBeCloseTo(expected.x, 1)
          expect(result.y).toBeCloseTo(expected.y, 1)
          expect(result.z).toBeCloseTo(expected.z, 1)
        })
        it("case Lab: should be lab(0, 0, 0)", () => {
          const color = new RGBASpace(0, 0, 0)
          const result = color.toLab()

          const expected = new LabSpace(0, 0, 0)

          expect(result.l).toBeCloseTo(expected.l, 1)
          expect(result.a).toBeCloseTo(expected.a, 1)
          expect(result.b).toBeCloseTo(expected.b, 1)
        })
      })
    })

    describe("update color", () => {

      describe("update r", () => {
        it("should be rgb(0, 255, 255)", () => {
          const color = new RGBASpace(255, 255, 255)

          color.update({r: 0})

          expect(color.r).toBe(0)
          expect(color.g).toBe(255)
          expect(color.b).toBe(255)
        })
        it("should be rgb(90, 255, 255)", () => {
          const color = new RGBASpace(255, 255, 255)

          color.update({r: 90})

          expect(color.r).toBe(90)
          expect(color.g).toBe(255)
          expect(color.b).toBe(255)
        })
      })

      describe("update g", () => {
        it("should be rgb(255, 0, 255)", () => {
          const color = new RGBASpace(255, 255, 255)

          color.update({g: 0})

          expect(color.r).toBe(255)
          expect(color.g).toBe(0)
          expect(color.b).toBe(255)
        })
        it("should be rgb(255, 90, 255)", () => {
          const color = new RGBASpace(255, 255, 255)

          color.update({g: 90})

          expect(color.r).toBe(255)
          expect(color.g).toBe(90)
          expect(color.b).toBe(255)
        })
      })

      describe("update b", () => {
        it("should be rgb(255, 255, 0)", () => {
          const color = new RGBASpace(255, 255, 255)

          color.update({b: 0})

          expect(color.r).toBe(255)
          expect(color.g).toBe(255)
          expect(color.b).toBe(0)
        })
        it("should be rgb(255, 255, 90)", () => {
          const color = new RGBASpace(255, 255, 255)

          color.update({b: 90})

          expect(color.r).toBe(255)
          expect(color.g).toBe(255)
          expect(color.b).toBe(90)
        })
      })

      describe("update alpha", () => {
        it("should be rgba(255, 255, 255, 0)", () => {
          const color = new RGBASpace(255, 255, 255)

          color.update({alpha: 0})

          expect(color.r).toBe(255)
          expect(color.g).toBe(255)
          expect(color.b).toBe(255)
          expect(color.alpha).toBe(0)

          expect(color.toRGBA().toString()).toBe("rgb(255,255,255,0)")
        })
        it("should be rgba(255, 255, 255, 0.5)", () => {
          const color = new RGBASpace(255, 255, 255)

          color.update({alpha: 0.5})

          expect(color.r).toBe(255)
          expect(color.g).toBe(255)
          expect(color.b).toBe(255)
          expect(color.alpha).toBe(0.5)
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