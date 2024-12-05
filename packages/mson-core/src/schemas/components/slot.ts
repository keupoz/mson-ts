import { z } from 'zod'
import { LocalsSchema } from '../locals'
import { RootSchema } from '../root'
import { TextureSchema } from '../texture'

export const SlotSchema = z.object({
  name: z.string().optional(),
  data: z.string().or(RootSchema.shape.data),
  implementation: z.string().optional(),
  texture: TextureSchema.optional(),
  locals: LocalsSchema.optional(),
})
