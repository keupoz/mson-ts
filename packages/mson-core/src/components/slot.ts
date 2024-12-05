import { createComponentType } from '../ComponentRegistry'
import { SlotSchema } from '../schemas/components/slot'

export const MsonSlot = createComponentType(
  'mson:slot',
  SlotSchema,
  async (context, name, json) => {
    const raw
      = typeof json.data === 'string'
        ? await context.loader.fetch(json.data)
        : { data: json.data }

    const model = await context.loader.parse(
      name,
      raw,
      json.locals,
      json.texture,
    )

    model.implementation = json.implementation

    return model
  },
)
