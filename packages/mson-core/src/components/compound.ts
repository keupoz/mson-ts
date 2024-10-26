import type { ModelPartInfo } from '../ModelFoundry'
import type { Tuple3 } from '../types/tuple'
import { createComponentType } from '../ComponentRegistry'
import { CompoundSchema } from '../schemas/components/compound'
import { deg2Rad } from '../utils/degToRad'

export const MsonCompound = createComponentType(
  'mson:compound',
  CompoundSchema,
  async (context, name, json) => {
    const result: ModelPartInfo = {
      type: 'part',
      name: json.name ?? name,
      visible: json.visible,
      position: context.resolve(json.pivot),
      rotation: context.resolve(json.rotate).map(deg2Rad) as Tuple3<number>,
      children: [],
      cubes: [],
    }

    const subContext = context.extend(
      {},
      json.texture ?? {},
      json.dilate,
      json.mirror,
    )

    if (json.children) {
      for (const name in json.children) {
        const raw = json.children[name]

        if (!raw) {
          continue
        }

        const child = await context.loader.resolveModelPart(
          subContext,
          name,
          raw,
          json.children,
        )

        if (child) {
          result.children.push(child)
        }
      }
    }

    if (json.cubes) {
      let i = 0

      for (const raw of json.cubes) {
        const cubeName = `${name}_cube${i++}`
        const cube = await context.loader.resolveCuboid(
          subContext,
          cubeName,
          raw,
        )

        if (cube) {
          result.cubes.push(cube)
        }
      }
    }

    return result
  },
)
