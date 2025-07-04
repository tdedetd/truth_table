import { IOperator } from '../models/operator.interface';
import { Variables } from '../models/variables.type';

export type Operand = LogicalExpression | boolean | string;

export class LogicalExpression {

  constructor(
    public readonly operator: IOperator | null,
    public readonly operands: [Operand] | [Operand, Operand],
    public readonly brackets = false
  ) { }

  private static getVariablesRecursively(expr: LogicalExpression): string[] {
    return expr.operands
      .filter((operand) => typeof operand !== 'boolean')
      .map((operand) => operand instanceof LogicalExpression
        ? LogicalExpression.getVariablesRecursively(operand)
        : operand
      )
      .flat(1000);
  }

  public getVariables(): string[] {
    return Array.from(new Set(LogicalExpression.getVariablesRecursively(this)));
  }

  public solve(values: Variables): boolean {
    if (!this.operator && typeof this.operands[0] === 'string') {
      return values[this.operands[0]];
    }

    const operands = this.operands.map((operand) => {
      if (operand instanceof LogicalExpression) {
        return operand.solve(values);
      }
      if (typeof operand === 'string') {
        return values[operand];
      }
      return operand;
    });

    return (this.operator as IOperator).solve(operands);
  }

  public toString(): string {
    if (!this.operator) {
      return String(this.operands[0]);
    }

    const operands = this.operands.map((operand) => {
      if (operand instanceof LogicalExpression) {
        return operand.toString();
      }
      if (typeof operand === 'boolean') {
        return String(operand);
      }
      return operand;
    }) as [string] | [string, string];

    let str: string[] = [];
    if (operands.length === 1) {
      str = [this.operator.char, operands[0]];
    }
    if (operands.length === 2) {
      str = [operands[0], this.operator.char, operands[1]];
    }
    if (this.brackets) {
      str = ['(', ...str, ')'];
    }

    return str.join('');
  }
}
