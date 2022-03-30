import { Component, OnInit } from '@angular/core';
import { ExpressionInputService } from 'src/app/services/expression-input.service';

interface IOperator {
  char: string;
  name: string;
}

@Component({
  selector: 'tt-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {

  readonly operators: IOperator[] = [
    { char: '!', name: 'Negation' },
    { char: '∧', name: 'Conjunction (AND)' },
    { char: 'v', name: 'Disjunction (OR)' },
    { char: '→', name: 'Implication' },
    { char: '↔', name: 'Equality' },
    { char: '⊕', name: 'Exclusive disjunction (XOR)' },
  ];

  constructor(private exprInput: ExpressionInputService) { }

  ngOnInit(): void {
  }

  onOperationClick(char: string) {
    this.exprInput.operatorInput$.next(char);
  }

}
