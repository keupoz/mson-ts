import type { ZodType } from 'zod';

import { z } from 'zod';

import type { Tuple } from '../../utils/tuple';

export function maybeArray<T extends ZodType<unknown>, N extends number>(
  schema: T,
  length: N,
  defaultValue: T['_output'],
) {
  type V = T['_output'];

  const singleTransformed = schema.transform((value) => {
    return Array.from({ length }).fill(value) as Tuple<V, N>;
  });

  const arrayTransformed = z
    .array(schema)
    .max(length)
    .transform((value) => {
      for (let i = 0; i < length; i++) {
        value[i] ??= defaultValue;
      }

      return value as Tuple<V, N>;
    });

  return singleTransformed.or(arrayTransformed).default([]);
}
