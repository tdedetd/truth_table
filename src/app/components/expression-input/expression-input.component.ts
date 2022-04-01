import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpressionService } from 'src/app/services/expression.service';

@Component({
  selector: 'tt-expression-input',
  templateUrl: './expression-input.component.html',
  styleUrls: ['./expression-input.component.scss']
})
export class ExpressionInputComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('input') input!: ElementRef;

  expression = '';

  inputSubscription!: Subscription;

  constructor(private expr: ExpressionService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const elem = this.input.nativeElement as HTMLInputElement;
    elem.focus();

    this.inputSubscription = this.expr.operatorInput$.subscribe(char => {
      const selectionIndex = elem.selectionStart || 0;
      this.expression = this.expression.slice(0, selectionIndex) +
                        char +
                        this.expression.slice(selectionIndex);

      setTimeout(() => {
        elem.focus();
        elem.setSelectionRange(selectionIndex + 1, selectionIndex + 1);
      });
    });
  }

  ngOnDestroy(): void {
    this.inputSubscription?.unsubscribe();
  }

  onComputeClick() {
    const expr = this.expr.parse(this.expression);
    console.log(expr.toString());
    console.log(expr.solve({
      'A': true,
      'B': false,
      'C': false,
    }));
  }

}
