import type { Face } from './plane'
import { z } from 'zod'
import { TokenSchema } from '../token'
import { CompoundSchema } from './compound'
import { FaceSchema } from './plane'

export type PlanarFace = z.infer<typeof PlanarFaceSchema>

export const PlanarFaceSchema = z
  .tuple([
    TokenSchema, // x
    TokenSchema, // y
    TokenSchema, // z

    TokenSchema, // width
    TokenSchema, // height
  ])
  .or(
    z.tuple([
      TokenSchema, // x
      TokenSchema, // y
      TokenSchema, // z

      TokenSchema, // width
      TokenSchema, // height

      TokenSchema, // texture u
      TokenSchema, // texture v
    ]),
  )
  .or(
    z.tuple([
      TokenSchema, // x
      TokenSchema, // y
      TokenSchema, // z

      TokenSchema, // width
      TokenSchema, // height

      TokenSchema, // texture u
      TokenSchema, // texture v

      z.boolean(), // mirror x
      z.boolean(), // mirror y
    ]),
  )

const PlanarFaceArraySchema = PlanarFaceSchema.transform(value => [value]).or(
  PlanarFaceSchema.array(),
)

const PlanarFacesSchema = z
  .record(FaceSchema.catch('' as Face), z.unknown())
  .transform((value) => {
    const entries = Object.entries(value).filter(([key]) => key.length)

    return Object.fromEntries(entries)
  })
  .pipe(z.record(z.string(), PlanarFaceArraySchema))

export const PlanarSchema = CompoundSchema.and(
  PlanarFacesSchema.transform((value) => {
    return { faces: value }
  }),
)
