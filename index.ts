import * as Gnjo from './dist/main'

const [parsed, errors] = Gnjo.parseStringToColorSpace("#2b3aff")
const inverted = Gnjo.getInvertedColor(parsed)
console.log(inverted.toString())