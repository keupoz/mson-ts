import type { ZodType } from 'zod';
import { z } from 'zod';
import type { Token } from './token';
import { TokenSchema } from './token';

export type Operator = z.infer<typeof OperatorSchema>;
export type Local = Expression | Token;
export type Expression = [Local, Operator, Local];

export type Locals = z.infer<typeof LocalsSchema>;

export const OperatorSchema = z.enum(['+', '-', '*', '/', '%', '^']);

// eslint-disable-next-line ts/no-use-before-define
export const LocalSchema = z.lazy(() => TokenSchema.or(ExpressionSchema));

export const ExpressionSchema: ZodType<Expression> = z.tuple([
  LocalSchema,
  OperatorSchema,
  LocalSchema,
]);

export const LocalsSchema = z.record(LocalSchema);
