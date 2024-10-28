import type { Mesh, Object3D } from 'three'
import { createModelItem, type ModelItem } from '@demo/models/createModelItem'
import { createImmerStore } from './createImmerStore'

export interface AppState {
  showGrid: boolean
  enableLight: boolean

  objects: Record<string, Object3D>
  currentObject: Mesh | null

  models: ModelItem[]
}

export const useAppState = createImmerStore<AppState>(() => ({
  showGrid: true,
  enableLight: true,

  objects: {},
  currentObject: null,

  models: [
    createModelItem(
      'minelittlepony:races/steve/alicorn',
      'community:textures/Main Cast/princesses/princess_cadence.png',
    ),
  ],
}))

export const setAppState = useAppState.setState.bind(useAppState)
export const getAppState = useAppState.getState.bind(useAppState)
