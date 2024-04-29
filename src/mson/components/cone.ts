import type { CuboidInfo } from '../ModelFoundry';

import { createCone } from '../3d/createCone';
import { createComponentType } from '../ComponentRegistry';
import { ConeSchema } from '../schemas/components/cone';

export const MsonCone = createComponentType(
  'mson:cone',
  ConeSchema,
  async (context, name, json) => {
    const position = context.resolve(json.from);
    const size = context.resolve(json.size);
    const texture = context.getTexture(json.texture);
    const dilate = context.getDilation(json.dilate);
    const mirror = json.mirror ?? context.getMirror()[0];
    const taper = context.ref(json.taper);

    const quads = createCone(position, size, dilate, mirror, texture, taper);
    const result: CuboidInfo = { type: 'cuboid', name, quads };

    return result;
  },
);
