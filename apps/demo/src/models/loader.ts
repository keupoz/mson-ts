import { ModelLoader } from '@keupoz/mson-core'
import { getAppState } from '@demo/state/appState'
import { createFileModelLoader } from '@demo/utils/createFileModelLoader'
import { MODELS } from './collection'

export const fetchModelLoader = new ModelLoader(async (modelId) => {
  const url = MODELS[modelId]

  if (!url) {
    throw new Error(`Unknown model "${modelId}"`)
  }

  const r = await fetch(url)
  const json = await r.json()

  return json
})

export const modelLoader = createFileModelLoader(modelId => getAppState().userModels[modelId])
