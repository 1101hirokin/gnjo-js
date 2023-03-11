import { RGBASpace } from "./colorSpace";
import { Evaluator } from "./evaluator";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
/**
 * parse color string to color space
 *
 * @param colorStr color string (e.g. "rgb(255, 255, 255)", "hsl(0, 0%, 100%)", "lab(100, 0, 0)", "midnightblue", "#00008b")
 * @returns {[ColorSpace, Error[]]} [color space, errors]
 */
export const parse = (colorStr) => {
    const lexer = new Lexer(colorStr);
    const parser = new Parser(lexer);
    const [color, errors] = parser.parse();
    if (errors.length > 0) {
        return [RGBASpace.getZero(), errors];
    }
    if (color === null) {
        return [RGBASpace.getZero(), [new Error("color is null")]];
    }
    const evaluator = new Evaluator(color);
    return [evaluator.evaluate(), []];
};
/**
 * @deprecated use parse(string) instead
 */
export const parseStringToRGBA = (colorStr) => {
    return parse(colorStr);
};
const calcRelLumMember = (value) => {
    const ratio = (value / 255);
    return (ratio <= .03928) ? (ratio / 12.92) : ((ratio + .055) / 1.055) ** 2.4;
};
/**
 * calculate relative luminance
 *
 * @param colorSpace
 * @returns {number} relative luminance
 */
export const calcRelLum = (colorSpace) => {
    const cs = colorSpace.toRGBA();
    const R = calcRelLumMember(cs.r);
    const G = calcRelLumMember(cs.g);
    const B = calcRelLumMember(cs.b);
    const converter = [
        .2126, .7152, .0722
    ];
    return converter[0] * R + converter[1] * G + converter[2] * B;
};
/**
 * calculate color contrast ratio
 *
 * @param firstColor
 * @param secondColor
 * @returns {number} color contrast
 */
export const calcContrastRatio = (firstColor, secondColor) => {
    const first = firstColor.toRGBA();
    const second = secondColor.toRGBA();
    const relLum_1st = calcRelLum(first);
    const relLum_2nd = calcRelLum(second);
    return (relLum_1st >= relLum_2nd) ? ((relLum_1st + .05) / (relLum_2nd + .05)) : ((relLum_2nd + .05) / (relLum_1st + .05));
};
/**
 * test color contrast ratio with WCAG 2.0
 *
 * @param firstColor
 * @param secondColor
 * @param item test item
 * @returns {[boolean, boolean]} [AA success, AAA success]
 */
export const testContrastRatio = (firstColor, secondColor, item) => {
    const contrast = calcContrastRatio(firstColor, secondColor);
    const test = {
        text: [4.5, 7],
        largeText: [3, 4.5],
        ui: [3, 4.5],
        graphical: [3, 4.5]
    };
    return [contrast >= test[item][0], contrast >= test[item][1]];
};
/**
 * determine color is light or not
 *
 * @param color
 * @returns {boolean} is light color or not
 */
export const isLight = (color) => {
    const rgba = color.toRGBA();
    const gray = Math.sqrt((0.299 * rgba.r ** 2) + (0.587 * rgba.g ** 2) + (0.114 * rgba.b ** 2));
    return (gray > 127.5);
};
/**
 * split color to steps
 *
 * @param startColor step start color
 * @param endColor step end color
 * @param step step number
 * @returns {ColorSpace[]}
 */
export const getSteppedColors = (startColor, endColor, step) => {
    const start = startColor.toRGBA();
    const end = endColor.toRGBA();
    const steps = [];
    for (let i = 0; i < step; i++) {
        const ratio = i / (step - 1);
        const r = start.r + (end.r - start.r) * ratio;
        const g = start.g + (end.g - start.g) * ratio;
        const b = start.b + (end.b - start.b) * ratio;
        const a = start.alpha + (end.alpha - start.alpha) * ratio;
        steps.push(new RGBASpace(r, g, b, a));
    }
    return steps;
};
/**
 * rotate hue of color
 *
 * @param color
 * @param degree
 * @returns {ColorSpace} rotated color
 */
export const adjustHue = (color, degree) => {
    const hsla = color.toHSLA().removeUnit();
    hsla.h.value = (hsla.h.value + degree) % 360;
    return hsla;
};
export const getHueAdjustedColor = (color, degree) => {
    const copy = color.toHSLA().copyWith();
    return adjustHue(copy, degree);
};
/**
 * lighten color
 * if ratio is under 0, this function darkens the color.
 *
 * @param color color space
 * @param ratio ratio: -1.0 - 1.0
 * @returns {ColorSpace} lightened color
 */
export const lighten = (color, ratio) => {
    const hsla = color.toHSLA().removeUnit();
    const lightness = hsla.l + ratio;
    hsla.l = (lightness > 1) ? 1 : (lightness < 0) ? 0 : lightness;
    return hsla;
};
export const getLightenedColor = (color, ratio) => {
    const copy = color.toHSLA().copyWith();
    return lighten(copy, ratio);
};
/**
 * saturate color
 * if ratio is under 0, this function desaturates the color.
 *
 * @param color color space
 * @param ratio ratio: -1.0 - 1.0
 * @returns {ColorSpace} saturated color
 */
export const saturate = (color, ratio) => {
    const hsla = color.toHSLA().removeUnit();
    const saturation = hsla.s * (1 + ratio);
    hsla.s = (saturation > 1) ? 1 : (saturation < 0) ? 0 : saturation;
    return hsla;
};
export const getSaturatedColor = (color, ratio) => {
    const copy = color.toHSLA().copyWith();
    return saturate(copy, ratio);
};
/**
 * get grayscale color from color
 *
 * @param color
 * @returns {ColorSpace} gray scaled color
 */
export const grayScale = (color) => {
    const rgba = color.toRGBA();
    const converter = [
        [0.299],
        [0.587],
        [0.114],
    ];
    const gray = (converter[0][0] * rgba.r) + (converter[1][0] * rgba.g) + (converter[2][0] * rgba.b);
    return rgba.update({ r: gray, g: gray, b: gray });
};
export const getGrayScaledColor = (color) => {
    const copy = color.toRGBA().copyWith();
    return grayScale(copy);
};
/**
 * invert color
 *
 * @param color
 * @returns {ColorSpace} inverted color
 */
export const invert = (color) => {
    const rgba = color.toRGBA();
    return rgba.update({ r: 255 - rgba.r, g: 255 - rgba.g, b: 255 - rgba.b });
};
export const getInvertedColor = (color) => {
    const copy = color.toRGBA().copyWith();
    return invert(copy);
};
/**
 * get complementary color
 *
 * @param color
 * @returns {ColorSpace} complementary color
 */
export const complement = (color) => {
    const cs = color.toHSLA().removeUnit();
    cs.h.value = (cs.h.value + 180) % 360;
    return cs;
};
export const getComplemetaryColor = (color) => {
    const copy = color.toHSLA().copyWith();
    return complement(copy);
};
/**
 *
 * @param firstColor
 * @param secondColor
 * @param ratio default 0.5
 * @returns {ColorSpace} mixed color
 */
export const mix = (firstColor, secondColor, ratio = 0.5) => {
    const first = firstColor.toRGBA();
    const second = secondColor.toRGBA();
    const r = first.r * ratio + second.r * (1 - ratio);
    const g = first.g * ratio + second.g * (1 - ratio);
    const b = first.b * ratio + second.b * (1 - ratio);
    const a = first.alpha * ratio + second.alpha * (1 - ratio);
    return new RGBASpace(r, g, b, a);
};
export const getMixedColor = (firstColor, secondColor, ratio = 0.5) => {
    // alias of mix()
    return mix(firstColor, secondColor, ratio);
};
//# sourceMappingURL=colorProcessing.js.map