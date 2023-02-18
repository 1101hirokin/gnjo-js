import * as Gnjo from './dist';

const [rgba, errors] = Gnjo.parseStringToColorSpace('rgba(255, 255, 255, 1)');

const [AAResult, AAAResult] = Gnjo.testContrastRatio(rgba, rgba, "graphical")


const isLight = Gnjo.isLight(rgba)

const steppedColors = Gnjo.getLightenedColor(rgba, .3)