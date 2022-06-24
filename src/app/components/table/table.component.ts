import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { LogicalExpression } from 'src/app/misc/logical-expression';
import { Variables } from 'src/app/misc/types';
import { ExpressionService } from 'src/app/services/expression.service';

@Component({
  selector: 'tt-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnChanges {

  @Input() expression: LogicalExpression | null = null;

  childExpressions: LogicalExpression[] | null = null;

  combinations: Variables[] = [];

  variables: string[] = [];

  constructor(private exprService: ExpressionService) { }

  ngOnChanges(): void {
    if (this.expression) {
      this.variables = this.exprService.getVariables(this.expression);
      this.combinations = this.getCombinations(this.variables);
      this.childExpressions = this.getExpressions(this.expression).reverse();
    }
  }

  private getCombinations(variables: string[]): Variables[] {
    const combinations = [];

    for (let i = 0; i < 2 ** variables.length; i++) {
      const bin = i.toString(2).padStart(variables.length, '0');

      const comb: Variables = {};
      variables.forEach((variable, j) => {
        comb[variable] = Boolean(+bin[j]);
      });
      combinations.push(comb);
    }
    return combinations;
  }

  private getExpressions(expression: LogicalExpression): LogicalExpression[] {
    let res: LogicalExpression[] = [expression];

    expression.operands
      .filter(op => op instanceof LogicalExpression && op.operator)
      .map(op => op as LogicalExpression)
      .map(exp => new LogicalExpression(exp.operator, exp.operands))
      .forEach(exp => res = [...res, ...this.getExpressions(exp as LogicalExpression)]);

    return res;
  }

}
