import { IOperator } from './interfaces';

export type Operand = LogicalExpression | boolean | string;

export class LogicalExpression {

  constructor(public readonly operator: IOperator | null,
              public readonly operands: [Operand] | [Operand, Operand],
              public readonly brackets = false) { }

  solve(values: { [key: string]: boolean }): boolean {
    if (!this.operator && typeof this.operands[0] === 'string') return values[this.operands[0]];

    const operands: boolean[] = this.operands.map(op => {
      if (op instanceof LogicalExpression) return op.solve(values);
      if (typeof op === 'string') return values[op];
      return op;
    });

    return (this.operator as IOperator).solve(operands);
  }

  toString(): string {
    if (!this.operator) return String(this.operands[0]);

    let str: string[] = [];
    const operands = this.operands.map(op => {
      if (op instanceof LogicalExpression) return op.toString();
      if (typeof op === 'boolean') return String(op);
      return op;
    }) as [string] | [string, string];

    if (operands.length === 1) str = [this.operator.char, operands[0]];
    if (operands.length === 2) str = [operands[0], this.operator.char, operands[1]];

    if (this.brackets) str = ['(', ...str, ')'];

    return str.join('');
  }
}
