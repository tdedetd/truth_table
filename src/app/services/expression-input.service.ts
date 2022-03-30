import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ExpressionInputService {
  readonly operatorInput$: Subject<string> = new Subject();
}
