import { z } from 'zod';
import { maybeArray } from '../maybeArray';
import { TextureSchema } from '../texture';
import { TokenSchema } from '../token';

export const ParentSchema = z.object({
  name: z.string().optional(),
  texture: TextureSchema.optional(),
  visible: z.boolean().default(true),
  pivot: maybeArray(TokenSchema, 3, 0),
  dilate: maybeArray(TokenSchema, 3, 0),
  rotate: maybeArray(TokenSchema, 3, 0),
  mirror: maybeArray(z.boolean(), 3, false),
});
