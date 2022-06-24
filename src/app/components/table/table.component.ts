import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { LogicalExpression } from 'src/app/misc/logical-expression';
import { Variables } from 'src/app/misc/types';
import { ExpressionService } from 'src/app/services/expression.service';

@Component({
  selector: 'tt-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnChanges {

  @Input() expression: LogicalExpression | null = null;

  combinations: Variables[] = [];

  variables: string[] = [];

  constructor(private exprService: ExpressionService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.expression) {
      this.variables = this.exprService.getVariables(this.expression);
      this.combinations = this.getCombinations(this.variables);
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

}
