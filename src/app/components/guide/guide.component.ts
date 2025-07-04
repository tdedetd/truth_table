import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Operators } from 'src/app/models/operators.enum';
import { OPERATORS } from 'src/app/utils/constants/operators';
import { OPERATOR_INPUT_TOKEN } from '../../tokens/operator-input.token';

@Component({
    selector: 'tt-guide',
    templateUrl: './guide.component.html',
    styleUrls: ['./guide.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class GuideComponent {
  public readonly operators = OPERATORS.toSorted((a, b) => a.priority - b.priority);
  private operatorInput = inject(OPERATOR_INPUT_TOKEN);

  public onOperationClick(char: Operators): void {
    this.operatorInput.next(char);
  }

}
