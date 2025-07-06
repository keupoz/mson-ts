import type { ComponentContext } from '../ComponentContext'
import type { CuboidInfo } from '../ModelFoundry'
import type { PlanarFace } from '../schemas/components/planar'
import type { Face } from '../schemas/components/plane'
import type { Tuple2 } from '../types/tuple'
import { createPlane } from '../3d/createPlane'
import { createComponentType } from '../ComponentRegistry'
import { PlanarSchema } from '../schemas/components/planar'
import { MsonCompound } from './compound'

export const MsonPlanar = createComponentType(
  'mson:planar',
  PlanarSchema,
  async (context, name, json) => {
    const compound = await MsonCompound.parse(context, name, json)

    const subContext = context.extend(
      {},
      json.texture ?? {},
      json.dilate,
      json.mirror,
    )

    for (const face in json.faces) {
      const value = json.faces[face]

      if (!value) {
        continue
      }

      value.forEach((faceJson, index) => {
        compound.cubes.push(createFace(subContext, faceJson, face as Face, `${name}_${face}_face${index}`))
      })
    }

    return compound
  },
)

function createFace(context: ComponentContext, json: PlanarFace, face: Face, name: string): CuboidInfo {
  const [x, y, z, width, height, u, v, mirrorX = false, mirrorY = false] = json

  const position = context.resolve([x, y, z] as const)
  const size = context.resolve([width, height] as const)

  let texture

  if (u === undefined || v === undefined) {
    texture = context.getTexture()
  } else {
    texture = context.getTexture({ u: context.ref(u), v: context.ref(v) })
  }

  const mirror: Tuple2<boolean> = [mirrorX, mirrorY]
  const quad = createPlane(face, size, context.getDilation([0, 0, 0]), mirror, texture)

  return {
    type: 'cuboid',
    name,
    position,
    quads: [quad],
  }
}
