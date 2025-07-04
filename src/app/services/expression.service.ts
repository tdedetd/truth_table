import { Injectable } from '@angular/core';
import { Operators } from '../models/operators.enum';
import { IOperator } from '../models/operator.interface';
import { LogicalExpression } from '../classes/logical-expression';
import { OPERATORS, OP_NOT } from '../utils/constants/operators';

@Injectable()
export class ExpressionService {
  readonly operatorsGrouped: IOperator[][];

  constructor() {
    const obj = OPERATORS
      .filter((operator) => operator.char !== Operators.Not)
      .reduce<Record<number, IOperator[]>>((acc, operator) => ({
        ...acc,
        [operator.priority]: acc[operator.priority] ? [...acc[operator.priority], operator] : [operator]
      }), {});

    this.operatorsGrouped = Object
      .entries(obj)
      .sort((a, b) => +b[0] - (+a[0]))
      .map<IOperator[]>(entry => entry[1]);
  }

  public parse(expr: string, brackets = false): LogicalExpression {
    expr = expr.trim();
    if (expr[0] === '(' && expr[expr.length - 1] === ')') {
      return this.parse(expr.slice(1, expr.length - 1), true);
    }

    let bracketsOpened = 0;
    for (const operators of this.operatorsGrouped) {
      for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') {
          bracketsOpened++;
          continue;
        } else if (expr[i] === ')') {
          bracketsOpened--;
          continue;
        }

        if (bracketsOpened !== 0) {
          continue;
        }

        const operator = operators.find(({ char }) => expr[i] === char);
        if (operator) {
          return new LogicalExpression(
            operator,
            [
              this.parse(expr.slice(0, i)),
              this.parse(expr.slice(i + 1, expr.length))
            ],
            brackets
          );
        }
      }
    }

    if (expr[0] === '!') {
      return new LogicalExpression(
        OP_NOT,
        [this.parse(expr.slice(1))],
        brackets
      );
    }

    return new LogicalExpression(null, [expr]);
  }
}
