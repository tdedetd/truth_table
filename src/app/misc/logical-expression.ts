import { IOperator } from './interfaces';

type Operand = LogicalExpression | boolean | string;

export class LogicalExpression {

  constructor(public readonly operator: IOperator,
              public readonly operands: Operand[]) { }

  solve(values: { [key: string]: boolean }): boolean {
    const operands: boolean[] = this.operands.map(op => {
      if (op instanceof LogicalExpression) return op.solve(values);
      if (typeof op === 'string') return values[op];
      return op;
    });

    return this.operator.solve(operands);
  }
}
