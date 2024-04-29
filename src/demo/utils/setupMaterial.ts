import type { Material } from 'three';

import { DoubleSide, FrontSide } from 'three';

export function setupMaterial<T extends Material>(material: T, name: string) {
  material.name = name;
  material.transparent = true;
  material.alphaTest = 1 / 255; // divide by 1 more to make it slightly less than 1/255
  material.side = name === 'glow' ? FrontSide : DoubleSide;
  material.forceSinglePass = true;

  return material;
}
