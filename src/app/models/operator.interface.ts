import { Operators } from './operators.enum';

export interface IOperator {
  char: Operators;
  name: string;
  priority: number;
  solve: (operands: boolean[]) => boolean;
}
