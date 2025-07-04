import { afterRenderEffect, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, DestroyRef, ElementRef, inject, output, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LogicalExpression } from 'src/app/classes/logical-expression';
import { ExpressionService } from 'src/app/services/expression.service';
import { OPERATOR_INPUT_TOKEN } from '../../tokens/operator-input.token';

@Component({
    selector: 'tt-expression-input',
    templateUrl: './expression-input.component.html',
    styleUrls: ['./expression-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
    providers: [ExpressionService],
})
export class ExpressionInputComponent {
  public textbox = viewChild.required<ElementRef<HTMLInputElement>>('textbox');

  public expressionChange = output<LogicalExpression>();
  public expression = '';

  private readonly allowedCharsRegex = new RegExp('^[a-zA-Z()]$');

  private textboxHtml = computed(() => this.textbox().nativeElement);
  private operatorInput = inject(OPERATOR_INPUT_TOKEN);

  constructor(
    private expressionService: ExpressionService,
    private destroyRef: DestroyRef,
    private cd: ChangeDetectorRef
  ) {
    afterRenderEffect(() => {
      this.subscribeToOperationSelection();
    });
  }

  public compute(): void {
    const expr = this.expressionService.parse(this.expression);
    this.expressionChange.emit(expr);
  }

  public keydown(event: KeyboardEvent): void {
    const char = event.key;
    if (char.length !== 1) {
      return;
    }
    event.preventDefault();

    if (this.allowedCharsRegex.test(char)) {
      this.insertChar(char.toUpperCase());
    }
  }

  private insertChar(char: string): void {
    const elem = this.textboxHtml();
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

  private subscribeToOperationSelection(): void {
    this.textboxHtml().focus();

    this.operatorInput.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((char) => {
      this.insertChar(char);
    });
  }
}
