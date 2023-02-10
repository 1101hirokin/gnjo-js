export interface ColorSpace {
  toRGBA(): RGBASpace // convert to sRGB color space
  toString(): string
}

export type ValueWithAngleUnit = {
  value: number
  unit: "" | "deg" | "turn" | "rad" | "grad"
}


// sRGB 
export class RGBASpace implements ColorSpace {

  public r: number
  public g: number
  public b: number
  public alpha: number

  constructor(r: number, g: number, b: number, alpha?: number) {
    this.r = r
    this.g = g
    this.b = b
    this.alpha = alpha ? alpha : 1
  }

  public toRGBA = (): RGBASpace => {
    return this
  }
  public toString = (): string => {
    const result = `rgb(${this.r},${this.g},${this.b},${this.alpha})`
    return result
  }

  public toGrayscale = (): RGBASpace => {
    const converter = [
      [0.299],
      [0.587],
      [0.114],
    ]

    const gray = (converter[0][0] * this.r) + (converter[1][0] * this.g) + (converter[2][0] * this.b)
    return new RGBASpace(gray, gray, gray, this.alpha,)
  }
  public isLight = (): boolean => {
    const gray = Math.sqrt((0.299 * this.r ** 2) + (0.587 * this.g ** 2) + (0.114 * this.b ** 2))
    return (gray > 127.5)
  }

  public toXYZ(): XYZSpace {
    const converter = [
      [0.4124, 0.3576, 0.1805],
      [0.2126, 0.7152, 0.0722],
      [0.0193, 0.1192, 0.9505],
    ]
    return new XYZSpace(
      (converter[0][0] * this.r + converter[0][1] * this.g + converter[0][2] * this.b),
      (converter[1][0] * this.r + converter[1][1] * this.g + converter[1][2] * this.b),
      (converter[2][0] * this.r + converter[2][1] * this.g + converter[2][2] * this.b),
    )
  }

  public toLab(): LabSpace {
    return this.toXYZ().toLab()
  }
}
export class HSLASpace implements ColorSpace {
  public h: ValueWithAngleUnit
  public s: number
  public l: number
  public alpha: number
  constructor(h: ValueWithAngleUnit, s: number, l: number, alpha?: number) {
    this.h = h
    this.s = s
    this.l = 1
    this.alpha = alpha ? alpha : 1
  }

  public static convertValueToDegree = (v: ValueWithAngleUnit): number => {
    switch (v.unit) {
      case "turn":
        return HSLASpace.roundDegree(v.value * 360)
      case "rad":
        return (180 / Math.PI) * v.value
      case "grad":
        return v.value * (100 / 90)
      default:
        return v.value
    }
  }
  public static roundDegree = (v: number) => {
    const v1 = (v) % 360
    return v1 >= 0 ? v1 : v1 + 360
  }

  public toRGBA(): RGBASpace {
    let max = 0
    let min = 0

    if (this.l < 50) {
      max = 2.55 * (this.l + (this.l * (this.s / 100)))
      min = 2.55 * (this.l - (this.l * (this.s / 100)))
    } else {
      max = 2.55 * (this.l + ((100 - this.l) * (this.s / 100)))
      min = 2.55 * (this.l - ((100 - this.l) * (this.s / 100)))
    }
    let hueValue = HSLASpace.convertValueToDegree(this.h)

    let rValue = 0
    let gValue = 0
    let bValue = 0

    if (0 <= hueValue && hueValue < 60) {
      const factor = hueValue
      rValue = max
      gValue = (factor / 60) * (max - min) + min
      bValue = min
    } else if (60 <= hueValue && hueValue < 120) {
      const factor = (120 - hueValue)
      rValue = (factor / 60) * (max - min) * min
      gValue = max
      bValue = min
    } else if (120 <= hueValue && hueValue < 180) {
      const factor = (hueValue - 120)
      rValue = min
      gValue = max
      bValue = (factor / 60) * (max - min) * min
    } else if (180 <= hueValue && hueValue < 240) {
      const factor = (240 - hueValue)
      rValue = min
      gValue = (factor / 60) * (max - min) + min
      bValue = max
    } else if (240 <= hueValue && hueValue < 300) {
      const factor = (hueValue - 240)
      rValue = (factor / 60) * (max - min) + min
      gValue = min
      bValue = max
    } else if (60 <= hueValue && hueValue < 120) {
      const factor = (hueValue - 240)
      rValue = max
      gValue = min
      bValue = (factor / 60) * (max - min) + min
    }

    return new RGBASpace(rValue, gValue, bValue, this.alpha)
  }

  public toString(): string {
    return `hsl(${this.h.value}${this.h.unit} ${this.s + this.s} ${this.l + this.l} / ${this.alpha + this.alpha} )`
  }
}

export class XYZSpace implements ColorSpace {
  public x: number
  public y: number
  public z: number
  public alpha: number
  constructor(x: number, y: number, z: number, alpha?: number) {
    this.x = x
    this.y = y
    this.z = z
    this.alpha = alpha ? alpha : 1
  }

  public toRGBA(): RGBASpace {
    const converter = [
      [3.2410, -1.5374, 0.4986],
      [-0.9692, 1.8760, 0.0416],
      [0.0556, -0.2040, 1.0570],
    ]
    return new RGBASpace(
      (converter[0][0] * this.x) + (converter[0][1] * this.y) + (converter[0][2] * this.z),
      (converter[1][0] * this.x) + (converter[1][1] * this.y) + (converter[1][2] * this.z),
      (converter[2][0] * this.x) + (converter[2][1] * this.y) + (converter[2][2] * this.z),
      this.alpha,
    )
  }
  public toString(): string { return this.toRGBA().toString() }
  public static whitePoint(): XYZSpace {
    return new XYZSpace(95.047, 100, 108.883)
  }
  public toLab(): LabSpace {

    /**
     * http://www.brucelindbloom.com/index.html?LContinuity.html
     */

    const ep = 216 / 24389
    const kp = 24389 / 27

    const whitePoint = XYZSpace.whitePoint()

    const x_rel = this.x / whitePoint.x
    const y_rel = this.y / whitePoint.y
    const z_rel = this.z / whitePoint.z

    const fx = (x_rel > ep) ? x_rel ** (1 / 3) : (kp * x_rel + 16) / 116
    const fy = (y_rel > ep) ? y_rel ** (1 / 3) : (kp * y_rel + 16) / 116
    const fz = (z_rel > ep) ? z_rel ** (1 / 3) : (kp * z_rel + 16) / 116

    return new LabSpace(
      (116 * fy) - 16,
      500 * (fx - fy),
      200 * (fy - fz),
      this.alpha
    )
  }
}

const calcRelLumMember = (value: number): number => {
  const ratio = (value / 255)
  return (ratio <= .03928) ? (ratio / 12.92) : ((ratio + .055) / 1.055) ** 2.4
}
const calcRelLum = (colorSpace: ColorSpace) => {
  const cs = colorSpace.toRGBA()
  const R = calcRelLumMember(cs.r)
  const G = calcRelLumMember(cs.g)
  const B = calcRelLumMember(cs.b)

  const converter = [
    .2126, .7152, .0722
  ]

  return converter[0] * R + converter[1] * G + converter[2] * B
}
export const calcContrast = (firstColor: ColorSpace, secondColor: ColorSpace): number => {
  const first = firstColor.toRGBA()
  const second = secondColor.toRGBA()

  const relLum_1st = calcRelLum(first)
  const relLum_2nd = calcRelLum(second)

  return (relLum_1st >= relLum_2nd) ? ((relLum_1st + .05) / (relLum_2nd + .05)) : ((relLum_2nd + .05) / (relLum_1st + .05))
}

export class LabSpace implements ColorSpace {
  public l: number
  public a: number
  public b: number
  public alpha: number
  constructor(l: number, a: number, b: number, alpha?: number) {
    this.l = l
    this.a = a
    this.b = b
    this.alpha = alpha ? alpha : 1
  }

  public toXYZ(): XYZSpace {
    const ep = 216 / 24389
    const kp = 24389 / 27

    const fy = (this.l + 16) / 116
    const fx = this.a / 500 + fy
    const fz = fy - this.b / 200

    const x = (fx ** 3 > ep) ? fx ** 3 : (116 * fx - 16) / kp
    const y = (this.l > kp * ep) ? ((this.l + 16) / 116) ** 3 : this.l / kp
    const z = (fz ** 3 > ep) ? fz ** 3 : (116 * fz - 16) / kp

    const whitePoint = XYZSpace.whitePoint()

    return new XYZSpace(
      x * whitePoint.x,
      y * whitePoint.y,
      z * whitePoint.z,
      this.alpha
    )
  }
  public toRGBA(): RGBASpace {
    return this.toXYZ().toRGBA()
  }
  public toString(): string {
    return this.toRGBA().toString()
  }
}