import { z } from 'zod'
import { ComponentObjectSchema, ComponentSchema } from '../root'
import { ParentSchema } from './parent'

export const CompoundSchema = ParentSchema.extend({
  children: z.record(ComponentSchema).optional(),
  cubes: z.array(ComponentObjectSchema).optional(),
})
