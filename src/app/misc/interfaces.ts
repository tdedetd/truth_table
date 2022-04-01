import { Operators } from './enums';

export interface IOperator {
  char: Operators;
  name: string;
  priority: number;
  solve: (operands: boolean[]) => boolean;
}
