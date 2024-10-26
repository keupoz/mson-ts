import { ModelLoader } from '@keupoz/mson-core'
import { MODELS } from './collection'

export const modelLoader = new ModelLoader(async (modelId) => {
  const url = MODELS[modelId]

  if (!url) {
    throw new Error(`Unknown model "${modelId}"`)
  }

  const r = await fetch(url)
  const json = await r.json()

  return json
})
