# Gnjo JS

Gnjo JS is a Pure TypeScript library that provides utility functions for parsing, tokenizing, and evaluating color strings and converting them to JavaScript object representations of color spaces. It also allows for conversion between color spaces, obtaining complementary and opposite colors, and performing WCAG2.0 tests.

You can use this library in **JavaScript** / **TypeScript** project

## Installation

You can install Gnjo JS via [npm]() or [Yarn]()

```bash
# using npm
npm install gnjo-js

# using Yarn
yarn add gnjo-js
```

## Usage

### Get RGBA Object from string

You can easily obtain RGBA data from string!

```ts
import * as Gnjo from 'gnjo-js'

/** 
 * You can parse string to RGBA.
 * (input string should be conforms to CSS specifications)
 * 
 * @returns {RGBASpace} extends {ColorSpace}
*/
const [rgba, errors] = Gnjo.parseStringToColorSpace('rgba(255, 255, 255, .8)')

// you can get `r`, `g`, `b` and `alpha`
const red = rgba.r // 255
const green = rgba.g // 255
const blue = rgba.b // 255
const alpha = rgba.alpha // .8

// ... and you can create new RGBA object
import { RGBASpace } from 'gnjo-js/colorSpace';

const myRgba = new RGBASpace(128, 128, 128, .8)
```

### Convert color space

You can convert color space into other color space.

```ts
/**
 * You can get {RGBASpace}
 */
const [rgba, errors] = Gnjo.parseStringToColorSpace('rgba(255, 255, 255, .8)')
// const rgba = new RGBASpace(128, 128, 128, .8)

/**
 * and convert it into HSL color space: {HSLASpace}
*/
const hsla = rgba.toHSLA()

/**
 * and HWB color space: {HWBSpace}
*/
const hsl = rgba.toHWB()

/**
 * CIE XYZ color space: {XYZSpace}
*/
const xyz = rgba.toXYZ()

/**
 * CIE L*a*b color space: {LabSpace}
*/
const lab = rgba.toLab()

// You can get string for styling HTML from any color space.
// {ColorSpace} interface has `toString()` method.
const str = hsla.toString()
```

### Use utility color functions

You can use utility functions to process color

```ts
const color_1 = new RGBASpace(128, 128, 128)
const color_2 = new RGBASpace(255, 255, 255)

/**
 * You can test WCAG 2.0 color contrast.
 * for
 *  - `text`: Text
 *  - `largetext`: Large text
 *  - `ui`: UI 
 *  - `graphcal`: Graphical content
*/
const [isAAPassed, isAAAPassed] = Gnjo.testContrastRatio(rgba, rgba, "text")


/**
 * get the color is light or not
*/
const isLight = Gnjo.isLight(rgba)

/**
 * rotate it's hue.
*/
const rotated = Gnjo.getHueAdjustedColor(color_1, 30)

/**
 * lighten (darken) it
*/
const lightened = Gnjo.getLightenedColor(color_1, .3)

/**
 * saturate it
*/
const saturated = Gnjo.getSaturatedColor(color_1, .3)

/**
 * grayscale it
*/
const grayscaled = Gnjo.getGrayScaledColor(color_1)

/**
 * invert it
*/
const inverted = Gnjo.getInvertedColor(color_1)

/**
 * get it's complementary color
*/
const inverted = Gnjo.getComplemetaryColor(color_1)

/**
 * mix them
*/
const mixed = Gnjo.getMixedColor(color_1, color_2, .5)

/**
 * and get stepped colors from color to another one
*/
const steppedColors = Gnjo.getSteppedColors(color_1, color_2, 10)

```

### *Mannualy* get ColorSpace Object from string

You can also obtain color space from string mannualy.

```js
import * as Gnjo from 'gnjo-js'

const lexer = new Gnjo.Lexer("rgba(255, 255, 255, 1)");
const parser = new Gnjo.Parser(lexer);
const [ast, errors] = parser.parse();
if (errors.length > 0) { /* handle errors */ }
if (ast === null) {/* when ast is null */ }

const evaluator = new Gnjo.Evaluator(ast!)

// You can use this in the same way.
const colorSpace = evaluator.evaluate()
```