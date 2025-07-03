import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Operators } from 'src/app/misc/enums';
import { OPERATORS } from 'src/app/misc/operators';
import { ExpressionService } from 'src/app/services/expression.service';

@Component({
    selector: 'tt-guide',
    templateUrl: './guide.component.html',
    styleUrls: ['./guide.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class GuideComponent {
  public readonly operators = OPERATORS.toSorted((a, b) => a.priority - b.priority);

  constructor(private expr: ExpressionService) { }

  public onOperationClick(char: Operators): void {
    this.expr.operatorInput$.next(char);
  }

}
