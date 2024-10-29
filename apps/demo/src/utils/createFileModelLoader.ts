import { ModelLoader } from '@keupoz/mson-core'
import { fetchModelLoader } from '@demo/models/loader'

export function createFileModelLoader(getFile: (modelId: string) => File | undefined) {
  const localModelLoader = new ModelLoader(async (modelId) => {
    const file = getFile(modelId)

    if (!file) {
      return fetchModelLoader.fetch(modelId)
    }

    const rawText = await file.text()
    const json = JSON.parse(rawText)

    return json
  })

  return localModelLoader
}
