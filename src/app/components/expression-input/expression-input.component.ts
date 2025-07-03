import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Operators } from 'src/app/misc/enums';
import { LogicalExpression } from 'src/app/misc/logical-expression';
import { ExpressionService } from 'src/app/services/expression.service';

@Component({
    selector: 'tt-expression-input',
    templateUrl: './expression-input.component.html',
    styleUrls: ['./expression-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ExpressionInputComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('textbox') textbox!: ElementRef;

  @Output() expressionChange: EventEmitter<LogicalExpression> = new EventEmitter();

  expression = '';

  private inputSub!: Subscription;

  private readonly allowedCharsRegex = new RegExp('^[a-zA-Z()]$');

  constructor(private expr: ExpressionService,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const elem = this.textbox.nativeElement as HTMLInputElement;
    elem.focus();

    this.inputSub = this.expr.operatorInput$.subscribe(char => this.insertOperation(char, elem));
  }

  ngOnDestroy(): void {
    this.inputSub?.unsubscribe();
  }

  compute() {
    const expr = this.expr.parse(this.expression);
    this.expressionChange.emit(expr);
  }

  keydown(event: KeyboardEvent) {
    const char = event.key;
    if (char.length !== 1) return;
    event.preventDefault();

    if (this.allowedCharsRegex.test(char)) {
      this.insertChar(char.toUpperCase(), event.target as HTMLInputElement);
    }
  }

  private insertChar(char: string, elem: HTMLInputElement) {
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

  private insertOperation(char: Operators, elem: HTMLInputElement) {
    this.insertChar(char, elem);
  }

}
