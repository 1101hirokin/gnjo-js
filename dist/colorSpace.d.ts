/**
 * Color space interface
 *
 * @export
 * @interface ColorSpace
 *
 * @method toRGBA() convert to sRGB color space
 * @method toHSLA() convert to HSL color space
 * @method toHWB() convert to HWB color space
 * @method toXYZ() convert to XYZ color space
 * @method toLab() convert to LAB color space
 * @method toString() convert to string
 */
export interface ColorSpace {
    /**
     * convert to sRGB color space
     */
    toRGBA(): RGBASpace;
    /**
     * convert to HSL color space
     */
    toHSLA(): HSLASpace;
    /**
     * convert to HWB color space
     */
    toHWB(): HWBSpace;
    /**
     * convert to CIE XYZ color space
     */
    toXYZ(): XYZSpace;
    /**
     * convert to CIE L*a*b* color space
     */
    toLab(): LabSpace;
    /**
     * convert to string (css color string)
     *
     * `XYZSpace` and `LabSpace` will return `rgb()` string
     */
    toString(): string;
}
export type ValueWithAngleUnit = {
    value: number;
    unit: "" | "deg" | "turn" | "rad" | "grad";
};
/**
 * sRGB color space
 * https://en.wikipedia.org/wiki/SRGB
 * https://www.w3.org/TR/css-color-4/#srgb
 *
 * @export
 * @class RGBASpace
 * @implements {ColorSpace}
 * @param {number} r - red: 0-255
 * @param {number} g - green: 0-255
 * @param {number} b - blue: 0-255
 * @param {number} [alpha=1] - alpha: 0-1
 * @returns {RGBASpace}
  */
export declare class RGBASpace implements ColorSpace {
    r: number;
    g: number;
    b: number;
    alpha: number;
    constructor(r: number, g: number, b: number, alpha?: number);
    static getZero: () => RGBASpace;
    toRGBA: () => RGBASpace;
    toString: () => string;
    toHSLA(): HSLASpace;
    toHWB(): HWBSpace;
    toXYZ(): XYZSpace;
    toLab(): LabSpace;
}
/**
 * HSLA color space
 * https://en.wikipedia.org/wiki/HSL_and_HSV
 * https://www.w3.org/TR/css-color-4/#hsl-color
 *
 * @export
 * @class HSLASpace
 * @implements {ColorSpace}
 * @param {ValueWithAngleUnit} h hue: 0-360deg
 * @param {number} s saturation: 0-1
 * @param {number} l lightness: 0-1
 * @param {number} [alpha=1] alpha: 0-1
 * @returns {HSLASpace}
 */
export declare class HSLASpace implements ColorSpace {
    h: ValueWithAngleUnit;
    s: number;
    l: number;
    alpha: number;
    constructor(h: ValueWithAngleUnit, s: number, l: number, alpha?: number);
    removeUnit(): HSLASpace;
    static convertValueToDegree: (v: ValueWithAngleUnit) => number;
    static roundDegree: (v: number) => number;
    toString(): string;
    toRGBA(): RGBASpace;
    toHSLA(): HSLASpace;
    toHWB(): HWBSpace;
    toXYZ(): XYZSpace;
    toLab(): LabSpace;
}
/**
 * HWB color space
 * https://en.wikipedia.org/wiki/HWB_color_model
 * https://www.w3.org/TR/css-color-4/#hwb-notation
 *
 * @export
 * @class HWBSpace
 * @implements {ColorSpace}
 * @param {ValueWithAngleUnit} h hue: 0-360deg
 * @param {number} w whiteness: 0-1
 * @param {number} b blackness: 0-1
 * @param {number} [alpha=1] alpha: 0-1
*/
export declare class HWBSpace implements ColorSpace {
    h: ValueWithAngleUnit;
    w: number;
    b: number;
    alpha: number;
    constructor(h: ValueWithAngleUnit, w: number, b: number, alpha?: number);
    toString(): string;
    toRGBA(): RGBASpace;
    toHSLA(): HSLASpace;
    toHWB(): HWBSpace;
    toXYZ(): XYZSpace;
    toLab(): LabSpace;
}
/**
 * XYZ color space
 * https://en.wikipedia.org/wiki/CIE_1931_color_space
 * https://www.w3.org/TR/css-color-4/#xyz-notation
 *
 * @export
 * @class XYZSpace
 * @implements {ColorSpace}
 * @param {number} x x: 0 - 0.95047
 * @param {number} y y: 0 - 1.00000
 * @param {number} z z: 0 - 1.08883
 * @param {number} [alpha=1] alpha: 0-1
 *
 */
export declare class XYZSpace implements ColorSpace {
    x: number;
    y: number;
    z: number;
    alpha: number;
    constructor(x: number, y: number, z: number, alpha?: number);
    toString(): string;
    static whitePoint(): XYZSpace;
    toRGBA(): RGBASpace;
    toHSLA(): HSLASpace;
    toHWB(): HWBSpace;
    toXYZ(): XYZSpace;
    toLab(): LabSpace;
}
/**
 * Lab color space
 * https://en.wikipedia.org/wiki/CIELAB_color_space
 * https://www.w3.org/TR/css-color-4/#lab-notation
 *
 * @export
 * @class LabSpace
 * @implements {ColorSpace}
 * @param {number} l luminance: 0 - 100
 * @param {number} a green-red: -128 - 127
 * @param {number} b blue-yellow: -128 - 127
 * @param {number} [alpha=1] alpha: 0-1
 */
export declare class LabSpace implements ColorSpace {
    l: number;
    a: number;
    b: number;
    alpha: number;
    constructor(l: number, a: number, b: number, alpha?: number);
    toString(): string;
    toRGBA(): RGBASpace;
    toHSLA(): HSLASpace;
    toHWB(): HWBSpace;
    toXYZ(): XYZSpace;
    toLab(): LabSpace;
}
//# sourceMappingURL=colorSpace.d.ts.map