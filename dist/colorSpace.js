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
export class RGBASpace {
    constructor(r, g, b, alpha = 1) {
        this.update = (arg) => {
            this.r = (typeof arg.r !== "undefined") ? arg.r : this.r;
            this.g = (typeof arg.g !== "undefined") ? arg.g : this.g;
            this.b = (typeof arg.b !== "undefined") ? arg.b : this.b;
            this.alpha = (typeof arg.alpha !== "undefined") ? arg.alpha : this.alpha;
            return this;
        };
        this.copyWith = (arg) => {
            return new RGBASpace((typeof arg.r !== "undefined") ? arg.r : this.r, (typeof arg.g !== "undefined") ? arg.g : this.g, (typeof arg.b !== "undefined") ? arg.b : this.b, (typeof arg.alpha !== "undefined") ? arg.alpha : this.alpha);
        };
        this.toRGBA = () => {
            return this;
        };
        this.toString = () => {
            const result = `rgb(${this.r},${this.g},${this.b},${this.alpha})`;
            return result;
        };
        this.r = r;
        this.g = g;
        this.b = b;
        this.alpha = alpha;
    }
    toHSLA() {
        let r = this.r / 255;
        let g = this.g / 255;
        let b = this.b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        let h = 0;
        let s = 0;
        let l = 0;
        l = (max + min) / 2;
        if (diff === 0) {
            h = 0;
        }
        else if (max === r) {
            h = ((g - b) / diff) % 6;
        }
        else if (max === g) {
            h = (b - r) / diff + 2;
        }
        else {
            h = (r - g) / diff + 4;
        }
        switch (max) {
            case r:
                h = (g - b) / diff + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / diff + 2;
                break;
            case b:
                h = (r - g) / diff + 4;
                break;
        }
        h /= 6;
        h *= 360;
        s = (diff === 0) ? 0 : diff / (1 - Math.abs(2 * l - 1));
        return new HSLASpace({ value: (isNaN(h) ? 0 : h), unit: "", }, s, l, this.alpha);
    }
    toHWB() {
        const max = Math.max(this.r, this.g, this.b);
        const min = Math.min(this.r, this.g, this.b);
        const diff = max - min;
        let h = 0;
        let w = 0;
        let b = 0;
        if (diff === 0) {
            h = 0;
        }
        switch (max) {
            case this.r:
                h = (this.g - this.b) / diff + (this.g < this.b ? 6 : 0);
                break;
            case this.g:
                h = (this.b - this.r) / diff + 2;
                break;
            case this.b:
                h = (this.r - this.g) / diff + 4;
                break;
        }
        h /= 6;
        h *= 360;
        w = min / 255;
        b = 1 - max / 255;
        return new HWBSpace({ value: (isNaN(h) ? 0 : h), unit: "", }, w, b, this.alpha);
    }
    toXYZ() {
        const converter = [
            [0.4124564, 0.3575761, 0.1804375],
            [0.2126729, 0.7151522, 0.0721750],
            [0.0193339, 0.1191920, 0.9503041],
        ];
        const f = (v) => (v > 0.04045) ? ((v + 0.055) / 1.055) ** 2.4 : v / 12.92;
        const [r, g, b] = converter.map((v) => v[0] * f(this.r / 255) + v[1] * f(this.g / 255) + v[2] * f(this.b / 255));
        return new XYZSpace(r, g, b, this.alpha);
    }
    toLab() {
        return this.toXYZ().toLab();
    }
}
RGBASpace.getZero = () => {
    return new RGBASpace(0, 0, 0, 0);
};
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
export class HSLASpace {
    constructor(h, s, l, alpha = 1) {
        this.update = (arg) => {
<<<<<<< HEAD
            return new HSLASpace(arg.h || this.h, arg.s || this.s, arg.l || this.l, arg.alpha || this.alpha);
        };
        this.copyWith = (arg) => {
            return new HSLASpace(arg.h || this.h, arg.s || this.s, arg.l || this.l, arg.alpha || this.alpha);
=======
            this.h = (typeof arg.h !== "undefined") ? arg.h : this.h;
            this.s = (typeof arg.s !== "undefined") ? arg.s : this.s;
            this.l = (typeof arg.l !== "undefined") ? arg.l : this.l;
            this.alpha = (typeof arg.alpha !== "undefined") ? arg.alpha : this.alpha;
            return this;
        };
        this.copyWith = (arg) => {
            return new HSLASpace((typeof arg.h !== "undefined") ? arg.h : this.h, (typeof arg.s !== "undefined") ? arg.s : this.s, (typeof arg.l !== "undefined") ? arg.l : this.l, (typeof arg.alpha !== "undefined") ? arg.alpha : this.alpha);
>>>>>>> release/1.1.1
        };
        this.h = h;
        this.s = s;
        this.l = l;
        this.alpha = alpha;
    }
    removeUnit() {
        this.h = { value: HSLASpace.convertValueToDegree(this.h), unit: "" };
        return this;
    }
    toString() {
        return `hsl(${this.h.value}${this.h.unit} ${this.s * 100}% ${this.l * 100}% / ${this.alpha} )`;
    }
    toRGBA() {
        const h = HSLASpace.convertValueToDegree(this.h);
        const c = (1 - Math.abs(2 * this.l - 1)) * this.s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = this.l - c / 2;
        let r = 0;
        let g = 0;
        let b = 0;
        if (h < 60) {
            r = c;
            g = x;
            b = 0;
        }
        else if (h < 120) {
            r = x;
            g = c;
            b = 0;
        }
        else if (h < 180) {
            r = 0;
            g = c;
            b = x;
        }
        else if (h < 240) {
            r = 0;
            g = x;
            b = c;
        }
        else if (h < 300) {
            r = x;
            g = 0;
            b = c;
        }
        else {
            r = c;
            g = 0;
            b = x;
        }
        return new RGBASpace(Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255), this.alpha);
    }
    toHSLA() {
        return this;
    }
    toHWB() { return this.toRGBA().toHWB(); }
    toXYZ() { return this.toRGBA().toXYZ(); }
    toLab() { return this.toRGBA().toLab(); }
}
HSLASpace.convertValueToDegree = (v) => {
    switch (v.unit) {
        case "turn":
            return HSLASpace.roundDegree(v.value * 360);
        case "rad":
            return HSLASpace.roundDegree((180 / Math.PI) * v.value);
        case "grad":
            return HSLASpace.roundDegree(v.value * 0.9);
        default:
            return HSLASpace.roundDegree(v.value);
    }
};
HSLASpace.roundDegree = (v) => {
    const v1 = (v) % 360;
    return v1 >= 0 ? v1 : v1 + 360;
};
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
export class HWBSpace {
    constructor(h, w, b, alpha = 1) {
        this.update = (arg) => {
<<<<<<< HEAD
            return new HWBSpace(arg.h || this.h, arg.w || this.w, arg.b || this.b, arg.alpha || this.alpha);
        };
        this.copyWith = (arg) => {
            return new HWBSpace(arg.h || this.h, arg.w || this.w, arg.b || this.b, arg.alpha || this.alpha);
=======
            this.h = (typeof arg.h !== "undefined") ? arg.h : this.h;
            this.w = (typeof arg.w !== "undefined") ? arg.w : this.w;
            this.b = (typeof arg.b !== "undefined") ? arg.b : this.b;
            this.alpha = (typeof arg.alpha !== "undefined") ? arg.alpha : this.alpha;
            return this;
        };
        this.copyWith = (arg) => {
            return new HWBSpace((typeof arg.h !== "undefined") ? arg.h : this.h, (typeof arg.w !== "undefined") ? arg.w : this.w, (typeof arg.b !== "undefined") ? arg.b : this.b, (typeof arg.alpha !== "undefined") ? arg.alpha : this.alpha);
>>>>>>> release/1.1.1
        };
        this.h = h;
        this.w = w;
        this.b = b;
        this.alpha = alpha;
    }
    toString() {
        return `hwb(${this.h.value}${this.h.unit} ${this.w * 100}% ${this.b * 100}% / ${this.alpha} )`;
    }
    toRGBA() {
        const rgb = new HSLASpace(this.h, 1, 0.5).toRGBA();
        let [c_r, c_g, c_b] = [rgb.r, rgb.g, rgb.b].map((v) => v / 255);
        c_r *= 1 - this.w - this.b;
        c_g *= 1 - this.w - this.b;
        c_b *= 1 - this.w - this.b;
        c_r += this.w;
        c_g += this.w;
        c_b += this.w;
        return new RGBASpace(Math.round(c_r * 255), Math.round(c_g * 255), Math.round(c_b * 255), this.alpha);
    }
    toHSLA() { return this.toRGBA().toHSLA(); }
    toHWB() { return this; }
    toXYZ() { return this.toRGBA().toXYZ(); }
    toLab() { return this.toRGBA().toLab(); }
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
export class XYZSpace {
    constructor(x, y, z, alpha = 1) {
        this.update = (arg) => {
<<<<<<< HEAD
            return new XYZSpace(arg.x || this.x, arg.y || this.y, arg.z || this.z, arg.alpha || this.alpha);
        };
        this.copyWith = (arg) => {
            return new XYZSpace(arg.x || this.x, arg.y || this.y, arg.z || this.z, arg.alpha || this.alpha);
=======
            this.x = (typeof arg.x !== "undefined") ? arg.x : this.x;
            this.y = (typeof arg.y !== "undefined") ? arg.y : this.y;
            this.z = (typeof arg.z !== "undefined") ? arg.z : this.z;
            this.alpha = (typeof arg.alpha !== "undefined") ? arg.alpha : this.alpha;
            return this;
        };
        this.copyWith = (arg) => {
            return new XYZSpace((typeof arg.x !== "undefined") ? arg.x : this.x, (typeof arg.y !== "undefined") ? arg.y : this.y, (typeof arg.z !== "undefined") ? arg.z : this.z, (typeof arg.alpha !== "undefined") ? arg.alpha : this.alpha);
>>>>>>> release/1.1.1
        };
        this.x = x;
        this.y = y;
        this.z = z;
        this.alpha = alpha;
    }
    toString() { return this.toRGBA().toString(); }
    static whitePoint() {
        return new XYZSpace(.95047, 1.00000, 1.08883); // simulate D65/2deg : sunlight at noon
    }
    toRGBA() {
        const converter = [
            [3.2404542, -1.5371385, -0.4985314],
            [-0.9692660, 1.8760108, 0.0415560],
            [0.0556434, -0.2040259, 1.0572252],
        ];
        let [r, g, b] = converter.map((row) => row[0] * this.x + row[1] * this.y + row[2] * this.z);
        const f = (v) => (v > 0.0031308 ? 1.055 * Math.pow(v, 1 / 2.4) - 0.055 : 12.92 * v);
        r = Math.max(0, Math.min(255, f(r) * 255));
        g = Math.max(0, Math.min(255, f(g) * 255));
        b = Math.max(0, Math.min(255, f(b) * 255));
        return new RGBASpace(r, g, b, this.alpha);
    }
    toHSLA() { return this.toRGBA().toHSLA(); }
    toHWB() { return this.toRGBA().toHWB(); }
    toXYZ() { return this; }
    toLab() {
        const whitePoint = XYZSpace.whitePoint();
        const x = this.x / whitePoint.x;
        const y = this.y / whitePoint.y;
        const z = this.z / whitePoint.z;
        const f = (t) => t > 0.008856 ? t ** (1 / 3) : (7.787 * t) + (16 / 116);
        const l = Math.max(0, Math.min(100, 116 * f(y) - 16));
        const a = Math.max(-128, Math.min(128, 500 * (f(x) - f(y))));
        const b = Math.max(-128, Math.min(128, 200 * (f(y) - f(z))));
        return new LabSpace(l, a, b, this.alpha);
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
 * @param {number} l luminance: 0 - 100
 * @param {number} a green-red: -128 - 127
 * @param {number} b blue-yellow: -128 - 127
 * @param {number} [alpha=1] alpha: 0-1
 */
export class LabSpace {
    constructor(l, a, b, alpha = 1) {
        this.update = (arg) => {
<<<<<<< HEAD
            return new LabSpace(arg.l || this.l, arg.a || this.a, arg.b || this.b, arg.alpha || this.alpha);
        };
        this.copyWith = (arg) => {
            return new LabSpace(arg.l || this.l, arg.a || this.a, arg.b || this.b, arg.alpha || this.alpha);
=======
            this.l = (typeof arg.l !== "undefined") ? arg.l : this.l;
            this.a = (typeof arg.a !== "undefined") ? arg.a : this.a;
            this.b = (typeof arg.b !== "undefined") ? arg.b : this.b;
            this.alpha = (typeof arg.alpha !== "undefined") ? arg.alpha : this.alpha;
            return this;
        };
        this.copyWith = (arg) => {
            return new LabSpace((typeof arg.l !== "undefined") ? arg.l : this.l, (typeof arg.a !== "undefined") ? arg.a : this.a, (typeof arg.b !== "undefined") ? arg.b : this.b, (typeof arg.alpha !== "undefined") ? arg.alpha : this.alpha);
>>>>>>> release/1.1.1
        };
        this.l = l;
        this.a = a;
        this.b = b;
        this.alpha = alpha;
    }
    toString() {
        return this.toRGBA().toString();
    }
    toRGBA() {
        return this.toXYZ().toRGBA();
    }
    toHSLA() { return this.toRGBA().toHSLA(); }
    toHWB() { return this.toRGBA().toHWB(); }
    toXYZ() {
        const whitePoint = XYZSpace.whitePoint();
        const fy = (this.l + 16) / 116;
        const fx = fy + (this.a / 500);
        const fz = fy - (this.b / 200);
        const g = (t) => t > 0.206893034 ? t ** 3 : (t - 16 / 116) / 7.787;
        const x = g(fx) * whitePoint.x;
        const y = g(fy) * whitePoint.y;
        const z = g(fz) * whitePoint.z;
        return new XYZSpace(x, y, z, this.alpha);
    }
    toLab() { return this; }
}
//# sourceMappingURL=colorSpace.js.map