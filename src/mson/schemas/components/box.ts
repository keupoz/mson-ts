import { z } from 'zod';

import { TextureSchema } from '../texture';
import { maybeArray } from '../utils/maybeArray';
import { TokenSchema } from '../utils/token';

export const BoxSchema = z.object({
  from: maybeArray(TokenSchema, 3, 0),
  size: maybeArray(TokenSchema, 3, 0),
  texture: TextureSchema.optional(),
  mirror: z.boolean().optional(),
  dilate: maybeArray(TokenSchema, 3, 0),
});
