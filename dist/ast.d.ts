import { Token } from "./token";
declare namespace AST {
    class Color {
        node: Node;
        constructor(node: Node);
    }
    type NodeType = "value" | "namedColor" | "hex" | "rgba" | "hsla" | "hwb" | "lab" | "xyz";
    interface Node {
        getTokenLiteral(): string;
        toString(): string;
        getType(): NodeType;
    }
    class ValueNode implements Node {
        readonly token: Token;
        getTokenLiteral(): string;
        getType(): NodeType;
        value: string;
        unit: string;
        constructor(token: Token, value: string, unit?: string);
        toString(): string;
        static getEmpty(token: Token): ValueNode;
    }
    class NamedColorNode implements Node {
        readonly token: Token;
        getTokenLiteral(): string;
        getType(): NodeType;
        value: string;
        constructor(token: Token);
        toString(): string;
        static getEmpty(token: Token): NamedColorNode;
    }
    class HEXNode implements Node {
        readonly token: Token;
        getTokenLiteral(): string;
        getType(): NodeType;
        r: string;
        g: string;
        b: string;
        alpha?: string;
        constructor(token: Token, r: string, g: string, b: string, alpha?: string);
        toString(): string;
        static getEmpty(token: Token): HEXNode;
    }
    class RGBANode implements Node {
        readonly token: Token;
        getTokenLiteral(): string;
        getType(): NodeType;
        r: ValueNode;
        g: ValueNode;
        b: ValueNode;
        alpha?: ValueNode;
        constructor(token: Token, r: ValueNode, g: ValueNode, b: ValueNode, alpha?: ValueNode);
        toString(): string;
        static getEmpty(token: Token): RGBANode;
    }
    class HSLANode implements Node {
        readonly token: Token;
        getTokenLiteral(): string;
        getType(): NodeType;
        h: ValueNode;
        s: ValueNode;
        l: ValueNode;
        alpha?: ValueNode;
        constructor(token: Token, h: ValueNode, s: ValueNode, l: ValueNode, alpha?: ValueNode);
        toString(): string;
        static getEmpty(token: Token): HSLANode;
    }
    class HWBNode implements Node {
        readonly token: Token;
        getTokenLiteral(): string;
        getType(): NodeType;
        h: ValueNode;
        w: ValueNode;
        b: ValueNode;
        alpha?: ValueNode;
        constructor(token: Token, h: ValueNode, w: ValueNode, b: ValueNode, alpha?: ValueNode);
        toString(): string;
        static getEmpty(token: Token): HWBNode;
    }
    class XYZNode implements Node {
        readonly token: Token;
        getTokenLiteral(): string;
        getType(): NodeType;
        x: ValueNode;
        y: ValueNode;
        z: ValueNode;
        alpha?: ValueNode;
        constructor(token: Token, x: ValueNode, y: ValueNode, z: ValueNode, alpha?: ValueNode);
        toString(): string;
        static getEmpty(token: Token): XYZNode;
    }
    class LabNode implements Node {
        readonly token: Token;
        getTokenLiteral(): string;
        getType(): NodeType;
        l: ValueNode;
        a: ValueNode;
        b: ValueNode;
        alpha?: ValueNode;
        constructor(token: Token, l: ValueNode, a: ValueNode, b: ValueNode, alpha?: ValueNode);
        toString(): string;
        static getEmpty(token: Token): LabNode;
    }
}
export default AST;
//# sourceMappingURL=ast.d.ts.map