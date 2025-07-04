import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LogicalExpression } from 'src/app/classes/logical-expression';
import { Variables } from 'src/app/models/variables.type';

@Component({
    selector: 'tt-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TableComponent {
  public expression = input.required<LogicalExpression>();

  public childExpressions = computed(() => this.getExpressions(this.expression()).reverse());
  public variables = computed(() => this.expression().getVariables());
  public combinations = computed(() => this.getCombinations(this.variables()));

  private getCombinations(variables: string[]): Variables[] {
    const combinations = [];

    for (let i = 0; i < 2 ** variables.length; i++) {
      const bin = i.toString(2).padStart(variables.length, '0');

      const comb: Variables = {};
      variables.forEach((variable, j) => {
        comb[variable] = Boolean(Number(bin[j]));
      });
      combinations.push(comb);
    }
    return combinations;
  }

  private getExpressions(expression: LogicalExpression): LogicalExpression[] {
    return [
      expression,
      ...expression.operands
        .filter((operand) => operand instanceof LogicalExpression)
        .filter((expression) => expression.operator)
        .map((expression) => new LogicalExpression(expression.operator, expression.operands))
        .map((expression) => this.getExpressions(expression))
        .flat(),
    ];
  }
}
