import type { Object3D } from 'three';

import { Vector3 } from 'three';

import { createBoxFromObject } from './createBoxFromObject';

export type AlignMode = 'center' | 'max' | 'min' | 'none';

export interface AlignOptions {
  modes: [AlignMode, AlignMode, AlignMode];
  relativeTo?: Vector3;
}

export function getAlignment(options: AlignOptions, object: Object3D) {
  const bounds = createBoxFromObject(object, true);
  const relativeTo = options.relativeTo ?? new Vector3();
  const translation = new Vector3();

  options.modes.forEach((mode, i) => {
    let value = 0;

    switch (mode) {
      case 'center':
        value = (bounds.min.getComponent(i) + bounds.max.getComponent(i)) / 2;
        break;

      case 'max':
        value = bounds.max.getComponent(i);
        break;

      case 'min':
        value = bounds.min.getComponent(i);
        break;
    }

    value = relativeTo.getComponent(i) - value;

    translation.setComponent(i, value);
  });

  return translation;
}
