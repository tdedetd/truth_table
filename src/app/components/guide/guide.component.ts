import { Component, OnInit } from '@angular/core';
import { Operators } from 'src/app/misc/enums';
import { IOperator } from 'src/app/misc/interfaces';
import { OPERATORS } from 'src/app/misc/operators';
import { ExpressionService } from 'src/app/services/expression.service';

@Component({
  selector: 'tt-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {

  readonly operators: IOperator[] = OPERATORS;

  constructor(private expr: ExpressionService) { }

  ngOnInit(): void {
  }

  onOperationClick(char: Operators) {
    this.expr.operatorInput$.next(char);
  }

}
