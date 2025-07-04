import { Component } from '@angular/core';
import { LogicalExpression } from './classes/logical-expression';

@Component({
    selector: 'tt-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {

  public expression: LogicalExpression | null = null;

  public onExpressionChange(expression: LogicalExpression): void {
    this.expression = expression;
  }
}
