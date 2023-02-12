/**
 * Color space interface
 */
export interface ColorSpace {
  toRGBA(): RGBASpace // convert to sRGB color space
  toString(): string
}

export type ValueWithAngleUnit = {
  value: number
  unit: "" | "deg" | "turn" | "rad" | "grad"
}


const calcRelLumMember = (value: number): number => {
  const ratio = (value / 255)
  return (ratio <= .03928) ? (ratio / 12.92) : ((ratio + .055) / 1.055) ** 2.4
}

/**
 * @param colorSpace 
 * @returns relative luminance
 */
export const calcRelLum = (colorSpace: ColorSpace): number => {
  const cs = colorSpace.toRGBA()
  const R = calcRelLumMember(cs.r)
  const G = calcRelLumMember(cs.g)
  const B = calcRelLumMember(cs.b)

  const converter = [
    .2126, .7152, .0722
  ]

  return converter[0] * R + converter[1] * G + converter[2] * B
}

/**
 * @param firstColor 
 * @param secondColor 
 * @returns color contrast
 */
export const calcContrast = (firstColor: ColorSpace, secondColor: ColorSpace): number => {
  const first = firstColor.toRGBA()
  const second = secondColor.toRGBA()

  const relLum_1st = calcRelLum(first)
  const relLum_2nd = calcRelLum(second)

  return (relLum_1st >= relLum_2nd) ? ((relLum_1st + .05) / (relLum_2nd + .05)) : ((relLum_2nd + .05) / (relLum_1st + .05))
}


/**
 * sRGB color space
 * https://en.wikipedia.org/wiki/SRGB
 * https://www.w3.org/TR/css-color-4/#srgb
 * 
 * @export
 * @class RGBASpace
 * @implements {ColorSpace}
 * @param {number} r - red
 * @param {number} g - green
 * @param {number} b - blue
 * @param {number} [alpha=1] - alpha
 * @returns {RGBASpace}
  */
export class RGBASpace implements ColorSpace {

  public r: number
  public g: number
  public b: number
  public alpha: number

  constructor(r: number, g: number, b: number, alpha: number = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.alpha = alpha
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
      [0.4124564, 0.3575761, 0.1804375],
      [0.2126729, 0.7151522, 0.0721750],
      [0.0193339, 0.1191920, 0.9503041],
    ]
    const f = (v: number) => (v > 0.04045) ? ((v + 0.055) / 1.055) ** 2.4 : v / 12.92
    const [r, g, b] = converter.map((v) => v[0] * f(this.r / 255) + v[1] * f(this.g / 255) + v[2] * f(this.b / 255))

    return new XYZSpace(r, g, b, this.alpha)
  }

  public toLab(): LabSpace {
    return this.toXYZ().toLab()
  }

  public toHSLA(): HSLASpace {
    let r = this.r / 255
    let g = this.g / 255
    let b = this.b / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const diff = max - min

    let h = 0
    let s = 0
    let l = (max + min) / 2

    if (diff === 0) {
      h = 0
      s = 0
    }
    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / diff + 2
        break
      case b:
        h = (r - g) / diff + 4
        break
    }
    h /= 6
    s = (diff === 0) ? 0 : diff / (1 - Math.abs(2 * l - 1))

    return new HSLASpace(
      { value: h * 360, unit: "", },
      s,
      l,
      this.alpha,
    )

  }
  public toHWB(): HWBSpace {
    const max = Math.max(this.r, this.g, this.b)
    const min = Math.min(this.r, this.g, this.b)
    const diff = max - min
    let h = 0
    let w = 0
    let b = 0
    if (diff === 0) {
      h = 0
    }
    switch (max) {
      case this.r:
        h = (this.g - this.b) / diff + (this.g < this.b ? 6 : 0)
        break
      case this.g:
        h = (this.b - this.r) / diff + 2
        break
      case this.b:
        h = (this.r - this.g) / diff + 4
        break
    }
    h /= 6
    w = min / 255
    b = 1 - max / 255
    return new HWBSpace(
      { value: h * 360, unit: "", },
      w,
      b,
      this.alpha,
    )
  }
}

/**
 * HSLA color space
 * https://en.wikipedia.org/wiki/HSL_and_HSV
 * https://www.w3.org/TR/css-color-4/#hsl-color
 * 
 * @export
 * @class HSLASpace
 * @implements {ColorSpace}
 * @param {ValueWithAngleUnit} h - hue
 * @param {number} s - saturation
 * @param {number} l - lightness
 * @param {number} [alpha=1] - alpha
 * @returns {HSLASpace}
 */
export class HSLASpace implements ColorSpace {
  public h: ValueWithAngleUnit
  public s: number
  public l: number
  public alpha: number
  constructor(h: ValueWithAngleUnit, s: number, l: number, alpha: number = 1) {
    this.h = h
    this.s = s
    this.l = l
    this.alpha = alpha
  }

  public static convertValueToDegree = (v: ValueWithAngleUnit): number => {
    switch (v.unit) {
      case "turn":
        return HSLASpace.roundDegree(v.value * 360)
      case "rad":
        return HSLASpace.roundDegree((180 / Math.PI) * v.value)
      case "grad":
        return HSLASpace.roundDegree(v.value * 0.9)
      default:
        return HSLASpace.roundDegree(v.value)
    }
  }
  public static roundDegree = (v: number) => {
    const v1 = (v) % 360
    return v1 >= 0 ? v1 : v1 + 360
  }
  public toRGBA(): RGBASpace {
    const h = HSLASpace.convertValueToDegree(this.h)
    const c = (1 - Math.abs(2 * this.l - 1)) * this.s
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = this.l - c / 2
    let r = 0
    let g = 0
    let b = 0
    if (h < 60) {
      r = c
      g = x
      b = 0
    } else if (h < 120) {
      r = x
      g = c
      b = 0
    } else if (h < 180) {
      r = 0
      g = c
      b = x
    } else if (h < 240) {
      r = 0
      g = x
      b = c
    } else if (h < 300) {
      r = x
      g = 0
      b = c
    } else {
      r = c
      g = 0
      b = x
    }
    return new RGBASpace(
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255),
      this.alpha,
    )
  }

  public toString(): string {
    return `hsl(${this.h.value}${this.h.unit} ${this.s * 100}% ${this.l * 100}% / ${this.alpha} )`
  }
}

/**
 * HWB color space
 * https://en.wikipedia.org/wiki/HWB_color_model
 * https://www.w3.org/TR/css-color-4/#hwb-notation
 * 
 * @export
 * @class HWBSpace
 * @implements {ColorSpace}
 * @param {ValueWithAngleUnit} h - hue
 * @param {number} w - whiteness
 * @param {number} b - blackness
 * @param {number} [alpha=1] - alpha
 * @returns {HWBSpace}
*/
export class HWBSpace implements ColorSpace {
  public h: ValueWithAngleUnit
  public w: number
  public b: number
  public alpha: number

  constructor(h: ValueWithAngleUnit, w: number, b: number, alpha: number = 1) {
    this.h = h
    this.w = w
    this.b = b
    this.alpha = alpha
  }

  public toRGBA(): RGBASpace {
    const rgb = new HSLASpace(this.h, 1, 0.5).toRGBA()

    let [c_r, c_g, c_b] = [rgb.r, rgb.g, rgb.b].map((v) => v / 255)
    c_r *= 1 - this.w - this.b
    c_g *= 1 - this.w - this.b
    c_b *= 1 - this.w - this.b

    c_r += this.w
    c_g += this.w
    c_b += this.w

    return new RGBASpace(Math.round(c_r * 255), Math.round(c_g * 255), Math.round(c_b * 255), this.alpha)
  }

  public toString(): string {
    return `hwb(${this.h.value}${this.h.unit} ${this.w * 100}% ${this.b * 100}% / ${this.alpha} )`
  }
}

/**
 * XYZ color space
 * https://en.wikipedia.org/wiki/CIE_1931_color_space
 * https://www.w3.org/TR/css-color-4/#xyz-notation
 * 
 * @export
 * @class XYZSpace
 * @implements {ColorSpace}
 * @param {number} x - x
 * @param {number} y - y
 * @param {number} z - z
 * @param {number} [alpha=1] - alpha
 * @returns {XYZSpace}
 * 
 */
export class XYZSpace implements ColorSpace {
  public x: number // 0 - 0.95047
  public y: number // 0 - 0.100000
  public z: number // 0 - 0.108883
  public alpha: number
  constructor(x: number, y: number, z: number, alpha: number = 1) {
    this.x = x
    this.y = y
    this.z = z
    this.alpha = alpha
  }

  public toRGBA(): RGBASpace {
    const converter = [
      [3.2404542, -1.5371385, -0.4985314],
      [-0.9692660, 1.8760108, 0.0415560],
      [0.0556434, -0.2040259, 1.0572252],
    ]

    let [r, g, b] = converter.map((row) => row[0] * this.x + row[1] * this.y + row[2] * this.z)

    const f = (v: number) => (v > 0.0031308 ? 1.055 * Math.pow(v, 1 / 2.4) - 0.055 : 12.92 * v)

    r = Math.max(0, Math.min(255, f(r) * 255))
    g = Math.max(0, Math.min(255, f(g) * 255))
    b = Math.max(0, Math.min(255, f(b) * 255))

    return new RGBASpace(r, g, b, this.alpha)

  }
  public toString(): string { return this.toRGBA().toString() }
  public static whitePoint(): XYZSpace {
    return new XYZSpace(.95047, 1.00000, 1.08883) // simulate D65/2deg : sunlight at noon
  }
  public toLab(): LabSpace {
    const whitePoint = XYZSpace.whitePoint()

    const x = this.x / whitePoint.x
    const y = this.y / whitePoint.y
    const z = this.z / whitePoint.z

    const f = (t: number) => t > 0.008856 ? t ** (1 / 3) : (7.787 * t) + (16 / 116)

    const l = Math.max(0, Math.min(100, 116 * f(y) - 16))
    const a = Math.max(-128, Math.min(128, 500 * (f(x) - f(y))))
    const b = Math.max(-128, Math.min(128, 200 * (f(y) - f(z))))

    return new LabSpace(l, a, b, this.alpha)
  }
}

/**
 * Lab color space
 * https://en.wikipedia.org/wiki/CIELAB_color_space
 * https://www.w3.org/TR/css-color-4/#lab-notation
 * 
 * @export
 * @class LabSpace
 * @implements {ColorSpace}
 * @param {number} l - l
 * @param {number} a - green-red
 * @param {number} b - blue-yellow
 * @param {number} [alpha=1] - alpha
 * @returns {LabSpace}
 */
export class LabSpace implements ColorSpace {
  public l: number // 0 - 100
  public a: number // -128 - 127
  public b: number // -128 - 127
  public alpha: number
  constructor(l: number, a: number, b: number, alpha: number = 1) {
    this.l = l
    this.a = a
    this.b = b
    this.alpha = alpha
  }

  public toXYZ(): XYZSpace {
    const whitePoint = XYZSpace.whitePoint()

    const fy = (this.l + 16) / 116
    const fx = fy + (this.a / 500)
    const fz = fy - (this.b / 200)

    const g = (t: number) => t > 0.206893034 ? t ** 3 : (t - 16 / 116) / 7.787

    const x = g(fx) * whitePoint.x
    const y = g(fy) * whitePoint.y
    const z = g(fz) * whitePoint.z

    return new XYZSpace(x, y, z, this.alpha)
  }
  public toRGBA(): RGBASpace {
    return this.toXYZ().toRGBA()
  }
  public toString(): string {
    return this.toRGBA().toString()
  }
}