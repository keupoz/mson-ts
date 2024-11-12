import { TEXTURES } from './collection'

export function getTextureUrl(textureId: string, userTextures: Record<string, string>) {
  const textureUrl = userTextures[textureId] ?? TEXTURES[textureId]

  if (!textureUrl) {
    throw new Error(`Unregistered texture "${textureId}"`)
  }

  return textureUrl
}
