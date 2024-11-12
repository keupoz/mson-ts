import { MathUtils } from 'three'

export interface ModelItem {
  id: string
  modelId: string
  textureId: string
}

export function createModelItem(modelId: string, textureId: string) {
  const model: ModelItem = {
    id: MathUtils.generateUUID(),
    modelId,
    textureId,
  }

  return model
}
