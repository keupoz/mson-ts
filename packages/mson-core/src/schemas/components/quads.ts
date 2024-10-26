import { z } from 'zod'

export const QuadsVertexSchema = z
  .tuple([
    z.number(), // x
    z.number(), // y
    z.number(), // z

    z.number().int(), // u
    z.number().int(), // v
  ])
  .or(
    z.object({
      x: z.number().default(0),
      y: z.number().default(0),
      z: z.number().default(0),
      u: z.number().int().default(0),
      v: z.number().int().default(0),
    }),
  )

export const QuadsQuadSchema = z.object({
  x: z.number().int().default(0),
  y: z.number().int().default(0),
  w: z.number().int().default(0),
  h: z.number().int().default(0),
  vertices: z.array(z.number().int()).min(4),
})

export const QuadsSchema = z.object({
  u: z.number().int(),
  v: z.number().int(),
  vertices: QuadsVertexSchema.array(),
  quads: QuadsQuadSchema.array(),
})
