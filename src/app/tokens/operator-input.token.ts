import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';
import { Operators } from '../models/operators.enum';

export const OPERATOR_INPUT_TOKEN = new InjectionToken<Subject<Operators>>(
  'Emits value when some operation was selected'
);
