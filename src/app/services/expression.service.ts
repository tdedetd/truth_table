import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Operators } from '../misc/enums';
import { IOperator } from '../misc/interfaces';
import { LogicalExpression } from '../misc/logical-expression';
import { OPERATORS, OP_NOT } from '../misc/operators';

@Injectable()
export class ExpressionService {

  readonly operatorInput$: Subject<Operators> = new Subject();

  readonly operatorsGrouped: IOperator[][];

  constructor() {

    const obj = OPERATORS
      .filter(op => op.char !== Operators.Not)
      .reduce((acc: any, cur) => ({
        ...acc,
        [cur.priority]: acc[cur.priority] ? [...acc[cur.priority], cur] : [cur]
      }), {}) as { [i: number]: IOperator[] };

    this.operatorsGrouped = Object
      .entries(obj)
      .sort((a, b) => +b[0] - (+a[0]))
      .map<IOperator[]>(entry => entry[1]);
  }

  getVariables(expr: LogicalExpression): string[] {
    return Array.from(new Set(this.getVariablesRecursively(expr)));
  }

  parse(expr: string, brackets = false): LogicalExpression {
    expr = expr.trim();
    if (expr[0] === '(' && expr[expr.length - 1] === ')') {
      return this.parse(expr.slice(1, expr.length - 1), true);
    }

    let bracketsOpened = 0;
    for (const ops of this.operatorsGrouped) {
      for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') {
          bracketsOpened++;
          continue;
        } else if (expr[i] === ')') {
          bracketsOpened--;
          continue;
        }

        if (bracketsOpened !== 0) continue;

        for (const op of ops) {
          if (expr[i] === op.char) return new LogicalExpression(
            op,
            [
              this.parse(expr.slice(0, i)),
              this.parse(expr.slice(i + 1, expr.length))
            ],
            brackets
          );
        }
      }
    }

    if (expr[0] === '!') return new LogicalExpression(
      OP_NOT,
      [this.parse(expr.slice(1))],
      brackets
    );

    return new LogicalExpression(null, [expr]);
  }

  private getVariablesRecursively(expr: LogicalExpression): string[] {
    let res: string[] = [];

    expr.operands.forEach(op => {
      if (op instanceof LogicalExpression) res.push(...this.getVariablesRecursively(op));
      else if (typeof op === 'string') res.push(op);
    });

    return res;
  }
}
