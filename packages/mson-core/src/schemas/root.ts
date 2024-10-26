import { z } from 'zod'
import { LocalsSchema } from './locals'
import { TextureSchema } from './texture'

export type Root = z.infer<typeof RootSchema>
export type Component = z.infer<typeof ComponentSchema>
export type ComponentObject = z.infer<typeof ComponentObjectSchema>

export const ComponentObjectSchema = z
  .object({
    type: z.string().optional(),
  })
  .passthrough()

export const ComponentSchema = z.string().or(ComponentObjectSchema)

export const RootSchema = z.object({
  parent: z.string().optional(),
  locals: LocalsSchema.optional(),
  texture: TextureSchema.optional(),
  data: z.record(ComponentSchema).optional(),
})
