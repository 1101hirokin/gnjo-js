import { ColorSpace } from "./colorSpace";
/**
 * parse color string to color space
 *
 * @param colorStr color string (e.g. "rgb(255, 255, 255)", "hsl(0, 0%, 100%)", "lab(100, 0, 0)", "midnightblue", "#00008b")
 * @returns {[ColorSpace, Error[]]} [color space, errors]
 */
export declare const parse: <T = ColorSpace>(colorStr: string) => [ColorSpace, Error[]];
/**
 * @deprecated use parse(string) instead
 */
export declare const parseStringToRGBA: <T = ColorSpace>(colorStr: string) => [ColorSpace, Error[]];
/**
 * calculate relative luminance
 *
 * @param colorSpace
 * @returns {number} relative luminance
 */
export declare const calcRelLum: (colorSpace: ColorSpace) => number;
/**
 * calculate color contrast ratio
 *
 * @param firstColor
 * @param secondColor
 * @returns {number} color contrast
 */
export declare const calcContrastRatio: (firstColor: ColorSpace, secondColor: ColorSpace) => number;
type WCAGTestItem = 'text' | 'largeText' | 'ui' | 'graphical';
/**
 * test color contrast ratio with WCAG 2.0
 *
 * @param firstColor
 * @param secondColor
 * @param item test item
 * @returns {[boolean, boolean]} [AA success, AAA success]
 */
export declare const testContrastRatio: (firstColor: ColorSpace, secondColor: ColorSpace, item: WCAGTestItem) => [boolean, boolean];
/**
 * determine color is light or not
 *
 * @param color
 * @returns {boolean} is light color or not
 */
export declare const isLight: (color: ColorSpace) => boolean;
/**
 * split color to steps
 *
 * @param startColor step start color
 * @param endColor step end color
 * @param step step number
 * @returns {ColorSpace[]}
 */
export declare const getSteppedColors: (startColor: ColorSpace, endColor: ColorSpace, step: number) => ColorSpace[];
/**
 * rotate hue of color
 *
 * @param color
 * @param degree
 * @returns {ColorSpace} rotated color
 */
export declare const adjustHue: (color: ColorSpace, degree: number) => ColorSpace;
export declare const getHueAdjustedColor: (color: ColorSpace, degree: number) => ColorSpace;
/**
 * lighten color
 * if ratio is under 0, this function darkens the color.
 *
 * @param color color space
 * @param ratio ratio: -1.0 - 1.0
 * @returns {ColorSpace} lightened color
 */
export declare const lighten: (color: ColorSpace, ratio: number) => ColorSpace;
export declare const getLightenedColor: (color: ColorSpace, ratio: number) => ColorSpace;
/**
 * saturate color
 * if ratio is under 0, this function desaturates the color.
 *
 * @param color color space
 * @param ratio ratio: -1.0 - 1.0
 * @returns {ColorSpace} saturated color
 */
export declare const saturate: (color: ColorSpace, ratio: number) => ColorSpace;
export declare const getSaturatedColor: (color: ColorSpace, ratio: number) => ColorSpace;
/**
 * get grayscale color from color
 *
 * @param color
 * @returns {ColorSpace} gray scaled color
 */
export declare const grayScale: (color: ColorSpace) => ColorSpace;
export declare const getGrayScaledColor: (color: ColorSpace) => ColorSpace;
/**
 * invert color
 *
 * @param color
 * @returns {ColorSpace} inverted color
 */
export declare const invert: (color: ColorSpace) => ColorSpace;
export declare const getInvertedColor: (color: ColorSpace) => ColorSpace;
/**
 * get complementary color
 *
 * @param color
 * @returns {ColorSpace} complementary color
 */
export declare const complement: (color: ColorSpace) => ColorSpace;
export declare const getComplemetaryColor: (color: ColorSpace) => ColorSpace;
/**
 *
 * @param firstColor
 * @param secondColor
 * @param ratio default 0.5
 * @returns {ColorSpace} mixed color
 */
export declare const mix: (firstColor: ColorSpace, secondColor: ColorSpace, ratio?: number) => ColorSpace;
export declare const getMixedColor: (firstColor: ColorSpace, secondColor: ColorSpace, ratio?: number) => ColorSpace;
export {};
//# sourceMappingURL=colorProcessing.d.ts.map