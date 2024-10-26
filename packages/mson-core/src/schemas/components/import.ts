import { z } from 'zod'
import { LocalsSchema } from '../locals'

export const ImportSchema = z.object({
  name: z.string().optional(),
  data: z.string(),
  locals: LocalsSchema.optional(),
})
