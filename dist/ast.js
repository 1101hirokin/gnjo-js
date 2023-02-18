import { Token, TokenType } from "./token";
var AST;
(function (AST) {
    class Color {
        constructor(node) {
            this.node = node;
        }
    }
    AST.Color = Color;
    class ValueNode {
        getTokenLiteral() { return this.token.literal; }
        getType() { return "value"; }
        constructor(token, value, unit = "") {
            this.token = token;
            this.value = value;
            this.unit = unit;
        }
        toString() {
            return `${this.value ? this.value : 0}${this.unit}`;
        }
        static getEmpty(token) {
            return new ValueNode(token, "");
        }
    }
    AST.ValueNode = ValueNode;
    class NamedColorNode {
        getTokenLiteral() { return this.token.literal; }
        getType() { return "namedColor"; }
        constructor(token) {
            this.token = token;
            this.value = token.literal;
        }
        toString() {
            return this.value;
        }
        static getEmpty(token) {
            return new NamedColorNode(token);
        }
    }
    AST.NamedColorNode = NamedColorNode;
    class HEXNode {
        getTokenLiteral() { return this.token.literal; }
        getType() { return "hex"; }
        constructor(token, r, g, b, alpha) {
            this.token = token;
            this.r = r;
            this.g = g;
            this.b = b;
            this.alpha = alpha;
        }
        toString() {
            const a = (this.alpha) ? this.alpha : '';
            return `${this.token.literal}${this.r}${this.g}${this.b}${a}`;
        }
        static getEmpty(token) {
            return new HEXNode(token, "", "", "");
        }
    }
    AST.HEXNode = HEXNode;
    class RGBANode {
        getTokenLiteral() { return this.token.literal; }
        getType() { return "rgba"; }
        constructor(token, r, g, b, alpha) {
            this.token = token;
            this.r = r;
            this.g = g;
            this.b = b;
            this.alpha = alpha;
        }
        toString() {
            let str = `${this.getTokenLiteral()}(${this.r.toString()},${this.g.toString()},${this.b.toString()}`;
            if (this.alpha) {
                str += `,${this.alpha.toString()}`;
            }
            str += ")";
            return str;
        }
        static getEmpty(token) {
            return new RGBANode(token, new ValueNode(new Token(TokenType.ILLEGAL, ""), ""), new ValueNode(new Token(TokenType.ILLEGAL, ""), ""), new ValueNode(new Token(TokenType.ILLEGAL, ""), ""));
        }
    }
    AST.RGBANode = RGBANode;
    class HSLANode {
        getTokenLiteral() { return this.token.literal; }
        getType() { return "hsla"; }
        constructor(token, h, s, l, alpha) {
            this.token = token;
            this.h = h;
            this.s = s;
            this.l = l;
            this.alpha = alpha;
        }
        toString() {
            let str = `${this.getTokenLiteral()}(${this.h.toString()},${this.s.toString()},${this.l.toString()}`;
            if (this.alpha) {
                str += `,${this.alpha.toString()}`;
            }
            str += ")";
            return str;
        }
        static getEmpty(token) {
            return new HSLANode(token, new ValueNode(new Token(TokenType.ILLEGAL, ""), ""), new ValueNode(new Token(TokenType.ILLEGAL, ""), ""), new ValueNode(new Token(TokenType.ILLEGAL, ""), ""));
        }
    }
    AST.HSLANode = HSLANode;
    class HWBNode {
        getTokenLiteral() { return this.token.literal; }
        getType() { return "hwb"; }
        constructor(token, h, w, b, alpha) {
            this.token = token;
            this.h = h;
            this.w = w;
            this.b = b;
            this.alpha = alpha;
        }
        toString() {
            let str = `${this.getTokenLiteral()}(${this.h.toString()},${this.w.toString()},${this.b.toString()}`;
            if (this.alpha) {
                str += `,${this.alpha.toString()}`;
            }
            str += ")";
            return str;
        }
        static getEmpty(token) {
            return new HWBNode(token, new ValueNode(new Token(TokenType.ILLEGAL, ""), ""), new ValueNode(new Token(TokenType.ILLEGAL, ""), ""), new ValueNode(new Token(TokenType.ILLEGAL, ""), ""));
        }
    }
    AST.HWBNode = HWBNode;
    class XYZNode {
        getTokenLiteral() { return this.token.literal; }
        getType() { return "xyz"; }
        constructor(token, x, y, z, alpha) {
            this.token = token;
            this.x = x;
            this.y = y;
            this.z = z;
            this.alpha = alpha;
        }
        toString() {
            let str = `${this.getTokenLiteral()}(${this.x.toString()},${this.y.toString()},${this.z.toString()}`;
            if (this.alpha) {
                str += `,${this.alpha.toString()}`;
            }
            str += ")";
            return str;
        }
        static getEmpty(token) {
            return new XYZNode(token, new ValueNode(new Token(TokenType.ILLEGAL, ""), ""), new ValueNode(new Token(TokenType.ILLEGAL, ""), ""), new ValueNode(new Token(TokenType.ILLEGAL, ""), ""));
        }
    }
    AST.XYZNode = XYZNode;
    class LabNode {
        getTokenLiteral() { return this.token.literal; }
        getType() { return "lab"; }
        constructor(token, l, a, b, alpha) {
            this.token = token;
            this.l = l;
            this.a = a;
            this.b = b;
            this.alpha = alpha;
        }
        toString() {
            let str = `${this.getTokenLiteral()}(${this.l.toString()},${this.a.toString()},${this.b.toString()}`;
            if (this.alpha) {
                str += `,${this.alpha.toString()}`;
            }
            str += ")";
            return str;
        }
        static getEmpty(token) {
            return new LabNode(token, new ValueNode(new Token(TokenType.ILLEGAL, ""), ""), new ValueNode(new Token(TokenType.ILLEGAL, ""), ""), new ValueNode(new Token(TokenType.ILLEGAL, ""), ""));
        }
    }
    AST.LabNode = LabNode;
})(AST || (AST = {}));
export default AST;
//# sourceMappingURL=ast.js.map