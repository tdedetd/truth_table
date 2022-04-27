import { Component } from '@angular/core';
import { LogicalExpression } from './misc/logical-expression';
import { ExpressionService } from './services/expression.service';

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
