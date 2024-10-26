import type { CuboidInfo } from '../ModelFoundry'
import { createPlane } from '../3d/createPlane'
import { createComponentType } from '../ComponentRegistry'
import { PlaneSchema } from '../schemas/components/plane'

export const MsonPlane = createComponentType(
  'mson:plane',
  PlaneSchema,
  async (context, name, json) => {
    const position = context.resolve(json.position)
    const size = context.resolve(json.size)
    const texture = context.getTexture(json.texture)
    const dilate = context.getDilation(json.dilate)
    const mirror = json.mirror
    const face = json.face

    const quad = createPlane(face, position, size, dilate, mirror, texture)
    const result: CuboidInfo = { type: 'cuboid', name, quads: [quad] }

    return result
  },
)
