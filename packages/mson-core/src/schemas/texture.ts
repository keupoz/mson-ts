import { z } from 'zod'

export type Texture = z.infer<typeof TextureSchema>

export const TextureSchema = z
  .object({
    u: z.number().int(),
    v: z.number().int(),
    w: z.number().int(),
    h: z.number().int(),
  })
  .partial()
