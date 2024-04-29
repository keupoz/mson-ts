import type { Quad } from './3d/quad';
import type { Texture } from './schemas/texture';
import type { Tuple3 } from './utils/tuple';

export interface ModelInfo {
  type: 'model';
  name: string;
  texture: Required<Texture>;
  children: ChildInfo[];
}

export interface ModelPartInfo {
  type: 'part';
  name: string;
  visible: boolean;
  position: Tuple3<number>;
  rotation: Tuple3<number>;
  children: ChildInfo[];
  cubes: CuboidInfo[];
}

export type ChildInfo = ModelInfo | ModelPartInfo;

export interface CuboidInfo {
  type: 'cuboid';
  name: string;
  quads: Quad[];
}

export abstract class ModelFoundry<Model, ModelPart, Cuboid> {
  public abstract createModel(info: ModelInfo): Model;
  public abstract createModelPart(info: ModelPartInfo): ModelPart;
  public abstract createCuboid(info: CuboidInfo): Cuboid;

  public createChild(info: ChildInfo) {
    return 'cubes' in info
      ? this.createModelPart(info)
      : this.createModel(info);
  }
}
