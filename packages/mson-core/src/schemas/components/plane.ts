import { z } from 'zod';
import { maybeArray } from '../maybeArray';
import { TextureSchema } from '../texture';
import { TokenSchema } from '../token';

export type Face = z.infer<typeof FaceEnumSchema>;

const FaceEnumSchema = z.enum(['UP', 'DOWN', 'WEST', 'EAST', 'NORTH', 'SOUTH']);

export const FaceSchema = z
  .string()
  .transform(value => value.toUpperCase())
  .pipe(FaceEnumSchema);

export const PlaneSchema = z.object({
  position: maybeArray(TokenSchema, 3, 0),
  size: maybeArray(TokenSchema, 2, 0),
  texture: TextureSchema.optional(),
  mirror: maybeArray(z.boolean(), 2, false),
  dilate: maybeArray(TokenSchema, 3, 0),
  face: FaceSchema,
});
