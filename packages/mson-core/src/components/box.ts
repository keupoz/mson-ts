import { createComponentType } from '../ComponentRegistry'
import { BoxSchema } from '../schemas/components/box'
import { MsonCone } from './cone'

export const MsonBox = createComponentType(
  'mson:box',
  BoxSchema,
  (context, name, json) => {
    return MsonCone.parse(context, name, { ...json, taper: 0 })
  },
)
