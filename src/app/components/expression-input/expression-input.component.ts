import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Operators } from 'src/app/misc/enums';
import { ExpressionService } from 'src/app/services/expression.service';

@Component({
  selector: 'tt-expression-input',
  templateUrl: './expression-input.component.html',
  styleUrls: ['./expression-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpressionInputComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('input') input!: ElementRef;

  expression = '';

  private inputSub!: Subscription;

  constructor(private expr: ExpressionService,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const elem = this.input.nativeElement as HTMLInputElement;
    elem.focus();

    this.inputSub = this.expr.operatorInput$.subscribe(char => this.insertChar(char, elem));
  }

  ngOnDestroy(): void {
    this.inputSub?.unsubscribe();
  }

  compute() {
    const expr = this.expr.parse(this.expression);
  }

  private insertChar(char: Operators, elem: HTMLInputElement) {
    const selectionIndex = elem.selectionStart || 0;
    this.expression = [
      this.expression.slice(0, selectionIndex),
      char,
      this.expression.slice(selectionIndex)
    ].join('');

    elem.focus();
    this.cd.detectChanges();
    setTimeout(() => elem.setSelectionRange(selectionIndex + 1, selectionIndex + 1));
  }

}
