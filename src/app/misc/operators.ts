import { Operators } from './enums';
import { IOperator } from './interfaces';

export const OP_NOT: IOperator = {
  char: Operators.Not,
  name: 'Negation (NOT)',
  priority: 1,
  solve: operands => !operands[0]
};

export const OPERATORS: IOperator[] = [
  OP_NOT,
  {
    char: Operators.And,
    name: 'Conjunction (AND)',
    priority: 2,
    solve: operands => operands[0] && operands[1]
  },
  {
    char: Operators.Or,
    name: 'Disjunction (OR)',
    priority: 3,
    solve: operands => operands[0] || operands[1]
  },
  {
    char: Operators.Implication,
    name: 'Implication',
    priority: 4,
    solve: operands => operands[1] || !operands[0] && !operands[1]
  },
  {
    char: Operators.Equality,
    name: 'Equality',
    priority: 5,
    solve: operands => operands[0] === operands[1]
  },
  {
    char: Operators.Xor,
    name: 'Exclusive disjunction (XOR)',
    priority: 3,
    solve: operands => operands[0] && !operands[1] || !operands[0] && operands[1]
  },
];
