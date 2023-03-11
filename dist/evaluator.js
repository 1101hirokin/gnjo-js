import { HSLASpace, HWBSpace, LabSpace, RGBASpace, XYZSpace } from "./colorSpace";
export class Evaluator {
    constructor(color) {
        this.color = color;
    }
    evaluate() {
        switch (this.color.node.getType()) {
            case "namedColor":
                return this._evalNamedColorNode(this.color.node);
            case "hex":
                return this._evalHexNode(this.color.node);
            case "rgba":
                return this._evalRGBANode(this.color.node);
            case "hsla":
                return this._evalHSLANode(this.color.node);
            case "hwb":
                return this._evalHWBNode(this.color.node);
            case "xyz":
                return this._evalXYZNode(this.color.node);
            case "lab":
                return this._evalLabNode(this.color.node);
            default:
                throw new Error(`Unknown node type: ${this.color.node.getType()}`);
        }
    }
    _evalValueNode(node) {
        switch (node.unit) {
            case "deg":
                return { value: Number(node.value), unit: "deg" };
            case "grad":
                return { value: Number(node.value), unit: "grad" };
            case "rad":
                return { value: Number(node.value), unit: "rad" };
            case "turn":
                return { value: Number(node.value), unit: "turn" };
            default:
                return { value: Number(node.value), unit: "" };
        }
    }
    _evalNamedColorNode(node) {
        const namedColor = node;
        switch (namedColor.value) {
            /**
             * CSS Lv.1
             */
            case "black":
                return new RGBASpace(0, 0, 0);
            case "silver":
                return new RGBASpace(192, 192, 192);
            case "gray":
                return new RGBASpace(128, 128, 128);
            case "white":
                return new RGBASpace(255, 255, 255);
            case "maroon":
                return new RGBASpace(128, 0, 0);
            case "red":
                return new RGBASpace(255, 0, 0);
            case "purple":
                return new RGBASpace(128, 0, 128);
            case "fuchsia":
                return new RGBASpace(255, 0, 255);
            case "green":
                return new RGBASpace(0, 128, 0);
            case "lime":
                return new RGBASpace(0, 255, 0);
            case "olive":
                return new RGBASpace(128, 128, 0);
            case "yellow":
                return new RGBASpace(255, 255, 0);
            case "navy":
                return new RGBASpace(0, 0, 128);
            case "blue":
                return new RGBASpace(0, 0, 255);
            case "teal":
                return new RGBASpace(0, 128, 128);
            case "aqua":
                return new RGBASpace(0, 255, 255);
            /**
             * CSS Lv.2
             */
            case "orange":
                return new RGBASpace(255, 165, 0);
            /**
             * CSS Lv.3
             */
            case "aliceblue":
                return new RGBASpace(240, 248, 255);
            case "antiquewhite":
                return new RGBASpace(250, 235, 215);
            case "aquamarine":
                return new RGBASpace(127, 255, 212);
            case "azure":
                return new RGBASpace(240, 255, 255);
            case "beige":
                return new RGBASpace(245, 245, 220);
            case "bisque":
                return new RGBASpace(255, 228, 196);
            case "blanchedalmond":
                return new RGBASpace(255, 235, 205);
            case "blueviolet":
                return new RGBASpace(138, 43, 226);
            case "brown":
                return new RGBASpace(165, 42, 42);
            case "burlywood":
                return new RGBASpace(222, 184, 135);
            case "cadetblue":
                return new RGBASpace(95, 158, 160);
            case "chartreuse":
                return new RGBASpace(127, 255, 0);
            case "chocolate":
                return new RGBASpace(210, 105, 30);
            case "coral":
                return new RGBASpace(255, 127, 80);
            case "cornflowerblue":
                return new RGBASpace(100, 149, 237);
            case "cornsilk":
                return new RGBASpace(255, 248, 220);
            case "crimson":
                return new RGBASpace(220, 20, 60);
            case "cyan":
                return new RGBASpace(0, 255, 255);
            case "darkblue":
                return new RGBASpace(0, 0, 139);
            case "darkcyan":
                return new RGBASpace(0, 139, 139);
            case "darkgoldenrod":
                return new RGBASpace(184, 134, 11);
            case "darkgray":
                return new RGBASpace(169, 169, 169);
            case "darkgreen":
                return new RGBASpace(0, 100, 0);
            case "darkgrey":
                return new RGBASpace(169, 169, 169);
            case "darkkhaki":
                return new RGBASpace(189, 183, 107);
            case "darkmagenta":
                return new RGBASpace(139, 0, 139);
            case "darkolivegreen":
                return new RGBASpace(85, 107, 47);
            case "darkorange":
                return new RGBASpace(255, 140, 0);
            case "darkorchid":
                return new RGBASpace(153, 50, 204);
            case "darkred":
                return new RGBASpace(139, 0, 0);
            case "darksalmon":
                return new RGBASpace(233, 150, 122);
            case "darkseagreen":
                return new RGBASpace(143, 188, 143);
            case "darkslateblue":
                return new RGBASpace(72, 61, 139);
            case "darkslategray":
                return new RGBASpace(47, 79, 79);
            case "darkslategrey":
                return new RGBASpace(47, 79, 79);
            case "darkturquoise":
                return new RGBASpace(0, 206, 209);
            case "darkviolet":
                return new RGBASpace(148, 0, 211);
            case "deeppink":
                return new RGBASpace(255, 20, 147);
            case "deepskyblue":
                return new RGBASpace(0, 191, 255);
            case "dimgray":
                return new RGBASpace(105, 105, 105);
            case "dimgrey":
                return new RGBASpace(105, 105, 105);
            case "dodgerblue":
                return new RGBASpace(30, 144, 255);
            case "firebrick":
                return new RGBASpace(178, 34, 34);
            case "floralwhite":
                return new RGBASpace(255, 250, 240);
            case "forestgreen":
                return new RGBASpace(34, 139, 34);
            case "gainsboro":
                return new RGBASpace(220, 220, 220);
            case "ghostwhite":
                return new RGBASpace(248, 248, 255);
            case "gold":
                return new RGBASpace(255, 215, 0);
            case "goldenrod":
                return new RGBASpace(218, 165, 32);
            case "greenyellow":
                return new RGBASpace(173, 255, 47);
            case "grey":
                return new RGBASpace(128, 128, 128);
            case "honeydew":
                return new RGBASpace(240, 255, 240);
            case "hotpink":
                return new RGBASpace(255, 105, 180);
            case "indianred":
                return new RGBASpace(205, 92, 92);
            case "indigo":
                return new RGBASpace(75, 0, 130);
            case "ivory":
                return new RGBASpace(255, 255, 240);
            case "khaki":
                return new RGBASpace(240, 230, 140);
            case "lavender":
                return new RGBASpace(230, 230, 250);
            case "lavenderblush":
                return new RGBASpace(255, 240, 245);
            case "lawngreen":
                return new RGBASpace(124, 252, 0);
            case "lemonchiffon":
                return new RGBASpace(255, 250, 205);
            case "lightblue":
                return new RGBASpace(173, 216, 230);
            case "lightcoral":
                return new RGBASpace(240, 128, 128);
            case "lightcyan":
                return new RGBASpace(224, 255, 255);
            case "lightgoldenrodyellow":
                return new RGBASpace(250, 250, 210);
            case "lightgray":
                return new RGBASpace(211, 211, 211);
            case "lightgreen":
                return new RGBASpace(144, 238, 144);
            case "lightgrey":
                return new RGBASpace(211, 211, 211);
            case "lightpink":
                return new RGBASpace(255, 182, 193);
            case "lightsalmon":
                return new RGBASpace(255, 160, 122);
            case "lightseagreen":
                return new RGBASpace(32, 178, 170);
            case "lightskyblue":
                return new RGBASpace(135, 206, 250);
            case "lightslategray":
                return new RGBASpace(119, 136, 153);
            case "lightslategrey":
                return new RGBASpace(119, 136, 153);
            case "lightsteelblue":
                return new RGBASpace(176, 196, 222);
            case "lightyellow":
                return new RGBASpace(255, 255, 224);
            case "limegreen":
                return new RGBASpace(50, 205, 50);
            case "linen":
                return new RGBASpace(250, 240, 230);
            case "magenta":
                return new RGBASpace(255, 0, 255);
            case "mediumaquamarine":
                return new RGBASpace(102, 205, 170);
            case "mediumblue":
                return new RGBASpace(0, 0, 205);
            case "mediumorchid":
                return new RGBASpace(186, 85, 211);
            case "mediumpurple":
                return new RGBASpace(147, 112, 219);
            case "mediumseagreen":
                return new RGBASpace(60, 179, 113);
            case "mediumslateblue":
                return new RGBASpace(123, 104, 238);
            case "mediumspringgreen":
                return new RGBASpace(0, 250, 154);
            case "mediumturquoise":
                return new RGBASpace(72, 209, 204);
            case "mediumvioletred":
                return new RGBASpace(199, 21, 133);
            case "midnightblue":
                return new RGBASpace(25, 25, 112);
            case "mintcream":
                return new RGBASpace(245, 255, 250);
            case "mistyrose":
                return new RGBASpace(255, 228, 225);
            case "moccasin":
                return new RGBASpace(255, 228, 181);
            case "navajowhite":
                return new RGBASpace(255, 222, 173);
            case "oldlace":
                return new RGBASpace(253, 245, 230);
            case "olivedrab":
                return new RGBASpace(107, 142, 35);
            case "orange":
                return new RGBASpace(255, 165, 0);
            case "orangered":
                return new RGBASpace(255, 69, 0);
            case "orchid":
                return new RGBASpace(218, 112, 214);
            case "palegoldenrod":
                return new RGBASpace(238, 232, 170);
            case "palegreen":
                return new RGBASpace(152, 251, 152);
            case "paleturquoise":
                return new RGBASpace(175, 238, 238);
            case "palevioletred":
                return new RGBASpace(219, 112, 147);
            case "papayawhip":
                return new RGBASpace(255, 239, 213);
            case "peachpuff":
                return new RGBASpace(255, 218, 185);
            case "peru":
                return new RGBASpace(205, 133, 63);
            case "pink":
                return new RGBASpace(255, 192, 203);
            case "plum":
                return new RGBASpace(221, 160, 221);
            case "powderblue":
                return new RGBASpace(176, 224, 230);
            case "rosybrown":
                return new RGBASpace(188, 143, 143);
            case "royalblue":
                return new RGBASpace(65, 105, 225);
            case "saddlebrown":
                return new RGBASpace(139, 69, 19);
            case "salmon":
                return new RGBASpace(250, 128, 114);
            case "sandybrown":
                return new RGBASpace(244, 164, 96);
            case "seagreen":
                return new RGBASpace(46, 139, 87);
            case "seashell":
                return new RGBASpace(255, 245, 238);
            case "sienna":
                return new RGBASpace(160, 82, 45);
            case "skyblue":
                return new RGBASpace(135, 206, 235);
            case "slateblue":
                return new RGBASpace(106, 90, 205);
            case "slategray":
                return new RGBASpace(112, 128, 144);
            case "slategrey":
                return new RGBASpace(112, 128, 144);
            case "snow":
                return new RGBASpace(255, 250, 250);
            case "springgreen":
                return new RGBASpace(0, 255, 127);
            case "steelblue":
                return new RGBASpace(70, 130, 180);
            case "tan":
                return new RGBASpace(210, 180, 140);
            case "thistle":
                return new RGBASpace(216, 191, 216);
            case "tomato":
                return new RGBASpace(255, 99, 71);
            case "turquoise":
                return new RGBASpace(64, 224, 208);
            case "violet":
                return new RGBASpace(238, 130, 238);
            case "wheat":
                return new RGBASpace(245, 222, 179);
            case "whitesmoke":
                return new RGBASpace(245, 245, 245);
            case "yellowgreen":
                return new RGBASpace(154, 205, 50);
            default:
                return new RGBASpace(0, 0, 0);
        }
    }
    _evalHexNode(node) {
        const hex = node;
        return new RGBASpace(parseInt(hex.r, 16), parseInt(hex.g, 16), parseInt(hex.b, 16), hex.alpha ? parseFloat(hex.alpha) : undefined);
    }
    _evalRGBANode(node) {
        const rgb = node;
        if (rgb.r.unit !== "") {
            throw new Error("Invalid unit for red value");
        }
        if (rgb.g.unit !== "") {
            throw new Error("Invalid unit for green value");
        }
        if (rgb.b.unit !== "") {
            throw new Error("Invalid unit for blue value");
        }
        return new RGBASpace(this._evalValueNode(rgb.r).value, this._evalValueNode(rgb.g).value, this._evalValueNode(rgb.b).value, rgb.alpha ? this._evalValueNode(rgb.alpha).value : undefined);
    }
    _evalHSLANode(node) {
        const hsla = node;
        return new HSLASpace(this._evalValueNode(hsla.h), this._evalValueNode(hsla.s).value, this._evalValueNode(hsla.l).value, hsla.alpha ? this._evalValueNode(hsla.alpha).value : undefined);
    }
    _evalHWBNode(node) {
        const hwb = node;
        return new HWBSpace(this._evalValueNode(hwb.h), this._evalValueNode(hwb.w).value, this._evalValueNode(hwb.b).value, hwb.alpha ? this._evalValueNode(hwb.alpha).value : undefined);
    }
    _evalXYZNode(node) {
        const xyz = node;
        return new XYZSpace(this._evalValueNode(xyz.x).value, this._evalValueNode(xyz.y).value, this._evalValueNode(xyz.z).value, xyz.alpha ? this._evalValueNode(xyz.alpha).value : undefined);
    }
    _evalLabNode(node) {
        const lab = node;
        return new LabSpace(this._evalValueNode(lab.l).value, this._evalValueNode(lab.a).value, this._evalValueNode(lab.b).value, lab.alpha ? this._evalValueNode(lab.alpha).value : undefined);
    }
}
//# sourceMappingURL=evaluator.js.map