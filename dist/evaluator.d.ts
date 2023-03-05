import AST from "./ast";
import { ColorSpace, LabSpace } from "./colorSpace";
export declare class Evaluator {
    readonly color: AST.Color;
    constructor(color: AST.Color);
    evaluate(): ColorSpace;
    private _evalValueNode;
    private _evalNamedColorNode;
    private _evalHexNode;
    private _evalRGBANode;
    private _evalHSLANode;
    private _evalHWBNode;
    private _evalXYZNode;
    _evalLabNode(node: AST.Node): LabSpace;
}
//# sourceMappingURL=evaluator.d.ts.map