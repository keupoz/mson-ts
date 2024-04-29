import type { Material } from 'three';

import { Group, Mesh } from 'three';
import { generateUUID } from 'three/src/math/MathUtils.js';

import type {
  CuboidInfo,
  ModelInfo,
  ModelPartInfo,
} from '../ModelFoundry';

import {
  ModelFoundry,
} from '../ModelFoundry';
import { createGeometry } from './createGeometry';

export type GetMaterial = (name: string) => Material;

export class ThreeModelFoundry extends ModelFoundry<Group, Group, Mesh> {
  public readonly uuid = generateUUID();

  private readonly getMaterial: GetMaterial;

  constructor(getMaterial: GetMaterial) {
    super();

    this.getMaterial = getMaterial;
  }

  public createModel(info: ModelInfo): Group {
    const group = new Group();
    const children = info.children.map((child) => {
      return this.createChild(child);
    });

    group.name = info.name;

    if (children.length) {
      group.add(...children);
    }

    return group;
  }

  public createModelPart(info: ModelPartInfo): Group {
    const group = new Group();

    group.name = info.name;
    group.visible = info.visible;

    const [x, y, z] = info.position;
    const [rx, ry, rz] = info.rotation;

    group.position.set(x, -y, -z);
    group.rotation.set(rx, -ry, -rz);

    const children = info.children.map((child) => {
      return this.createChild(child);
    });

    const cubes = info.cubes.map(child => this.createCuboid(child));

    if (children.length) {
      group.add(...children);
    }
    if (cubes.length) {
      group.add(...cubes);
    }

    return group;
  }

  public createCuboid(info: CuboidInfo): Mesh {
    const geometry = createGeometry(info.quads);
    const mesh = new Mesh(geometry, this.getMaterial(info.name));

    mesh.name = info.name;

    return mesh;
  }
}
