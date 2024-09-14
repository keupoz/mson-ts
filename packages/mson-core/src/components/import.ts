import { createComponentType } from '../ComponentRegistry';
import { ImportSchema } from '../schemas/components/import';

export const MsonImport = createComponentType(
  'mson:import',
  ImportSchema,
  async (context, name, json) => {
    name = json.name ?? name;

    const raw = await context.loader.fetch(json.data);
    const model = await context.loader.parse(name, raw, json.locals);

    return model;
  },
);
