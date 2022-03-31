import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Operators } from '../misc/enums';
import { LogicalExpression } from '../misc/logical-expression';
import { OPERATORS } from '../misc/operators';

@Injectable()
export class ExpressionService {

  readonly operatorInput$: Subject<Operators> = new Subject();

  getVariables(expr: LogicalExpression): string[] {
    return Array.from(new Set(this.getVariablesRecursively(expr)));
  }

  parse(exprString: string): LogicalExpression {
    return new LogicalExpression(OPERATORS[2], [
      'a',
      new LogicalExpression(OPERATORS[0], ['b'])
    ]);
  }

  private getVariablesRecursively(expr: LogicalExpression): string[] {
    let res: string[] = [];

    expr.operands.forEach(op => {
      if (op instanceof LogicalExpression) {
        res.push(...this.getVariablesRecursively(op));
      } else if (typeof op === 'string') {
        res.push(op);
      }
    });

    return res;
  }
}
