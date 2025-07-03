import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, output, viewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogicalExpression } from 'src/app/misc/logical-expression';
import { ExpressionService } from 'src/app/services/expression.service';

@Component({
    selector: 'tt-expression-input',
    templateUrl: './expression-input.component.html',
    styleUrls: ['./expression-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ExpressionInputComponent implements AfterViewInit, OnDestroy {

  public textbox = viewChild<ElementRef<HTMLInputElement>>('textbox');

  public expressionChange = output<LogicalExpression>();
  public expression = '';

  private inputSub?: Subscription;
  private readonly allowedCharsRegex = new RegExp('^[a-zA-Z()]$');

  constructor(
    private expr: ExpressionService,
    private cd: ChangeDetectorRef
  ) { }

  public ngAfterViewInit(): void {
    const elem = this.textbox()?.nativeElement;
    elem?.focus();

    this.inputSub = this.expr.operatorInput$.subscribe((char) => {
      if (elem) {
        this.insertChar(char, elem);
      }
    });
  }

  public ngOnDestroy(): void {
    this.inputSub?.unsubscribe();
  }

  public compute(): void {
    const expr = this.expr.parse(this.expression);
    this.expressionChange.emit(expr);
  }

  public keydown(event: KeyboardEvent): void {
    const char = event.key;
    if (char.length !== 1) return;
    event.preventDefault();

    if (this.allowedCharsRegex.test(char)) {
      this.insertChar(char.toUpperCase(), event.target as HTMLInputElement);
    }
  }

  private insertChar(char: string, elem: HTMLInputElement): void {
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
