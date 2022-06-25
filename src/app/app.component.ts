import { Component } from '@angular/core';
import { LogicalExpression } from './misc/logical-expression';

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  expression: LogicalExpression | null = null;

  constructor() {
  }

  onExpressionChange(expression: LogicalExpression) {
    this.expression = expression;
  }
}
