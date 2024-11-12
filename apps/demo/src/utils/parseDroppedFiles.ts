import { type FileWithPath, MIME_TYPES } from '@mantine/dropzone'
import { parseFilePath } from './collectAssetsFromGlob'
import { createFileModelLoader } from './createFileModelLoader'

export interface DropResult {
  models: Record<string, FileWithPath>
  textures: Record<string, string>
  errors: Record<string, unknown>
}

const JSON_MIME_TYPE = 'application/json'
const ASSET_SUBTYPE_REGEX = /^\/assets\/\w+\/(?:models|textures)\/(?:entity|models)\//

function extractAssets(files: FileWithPath[]) {
  const models: Record<string, FileWithPath> = {}
  const textures: Record<string, FileWithPath> = {}

  for (const file of files) {
    if (file.path === undefined) {
      throw new Error('Absolute paths are not supported by your browser')
    }

    if (!ASSET_SUBTYPE_REGEX.test(file.path)) {
      if (file.type === MIME_TYPES.png) {
        textures[file.name] = file
      }

      continue
    }

    switch (file.type) {
      case JSON_MIME_TYPE: {
        const modelId = parseFilePath(file.path, '/assets/')
        models[modelId] = file
        break
      }

      case MIME_TYPES.png: {
        const textureId = parseFilePath(file.path, '/assets/')
        textures[textureId] = file
        break
      }
    }
  }

  return { models, textures }
}

export async function parseDroppedFiles(files: FileWithPath[]) {
  const { models, textures } = extractAssets(files)
  const localModelLoader = createFileModelLoader(modelId => models[modelId])

  const promises: Promise<unknown>[] = []
  const errors: Record<string, unknown> = {}

  for (const modelId in models) {
    promises.push(localModelLoader.load(modelId).catch((error) => {
      errors[modelId] = error
    }))
  }

  const loadedTextures: Record<string, string> = {}

  for (const [textureId, file] of Object.entries(textures)) {
    const slice = file.slice()
    loadedTextures[textureId] = URL.createObjectURL(slice)
  }

  await Promise.allSettled(promises)

  const result: DropResult = { models, textures: loadedTextures, errors }

  return result
}
