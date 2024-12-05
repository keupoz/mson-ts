import type { Quad } from './3d/quad'
import type { Texture } from './schemas/texture'
import type { Tuple3 } from './types/tuple'

export interface ModelInfo {
  type: 'model'
  name: string
  implementation?: string
  texture: Required<Texture>
  children: ChildInfo[]
}

export interface ModelPartInfo {
  type: 'part'
  name: string
  visible: boolean
  position: Tuple3<number>
  rotation: Tuple3<number>
  children: ChildInfo[]
  cubes: CuboidInfo[]
}

export type ChildInfo = ModelInfo | ModelPartInfo

export interface CuboidInfo {
  type: 'cuboid'
  name: string
  quads: Quad[]
}

export type ImplementableSlots<Model> = Record<string, Model[]>

export interface ModelResult<Model> {
  model: Model
  implementableSlots: ImplementableSlots<Model>
}

export abstract class ModelFoundry<ModelRoot, ModelPart, Cuboid> {
  public abstract createRoot(info: ModelInfo, implementableSlots: ImplementableSlots<ModelRoot>): ModelRoot
  public abstract createModelPart(info: ModelPartInfo, implementableSlots: ImplementableSlots<ModelRoot>): ModelPart
  public abstract createCuboid(info: CuboidInfo): Cuboid

  public createModel(info: ModelInfo) {
    const implementableSlots: ImplementableSlots<ModelRoot> = {}
    const model = this.createRootAndCollect(info, implementableSlots)

    const result: ModelResult<ModelRoot> = { model, implementableSlots }

    return result
  }

  private createRootAndCollect(info: ModelInfo, implementableSlots: ImplementableSlots<ModelRoot>) {
    const model = this.createRoot(info, implementableSlots)
    const { implementation } = info

    if (implementation) {
      implementableSlots[implementation] ??= []
      implementableSlots[implementation].push(model)
    }

    return model
  }

  public createChild(info: ChildInfo, implementableSlots: ImplementableSlots<ModelRoot>) {
    return 'cubes' in info
      ? this.createModelPart(info, implementableSlots)
      : this.createRootAndCollect(info, implementableSlots)
  }
}
