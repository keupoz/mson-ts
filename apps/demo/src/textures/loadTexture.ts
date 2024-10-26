import type { Color } from 'three'
import { Texture } from 'three'
import { loadImage } from '@demo/utils/loadImage'
import { getGlowColor } from './getGlowColor'
import { getTextureUrl } from './getTextureUrl'

export interface TextureItem {
  texture: Texture
  glowColor: Color
}

export async function loadTexture(textureId: string): Promise<TextureItem> {
  const textureUrl = getTextureUrl(textureId)
  const image = await loadImage(textureUrl)

  const texture = new Texture(image)
  const glowColor = getGlowColor(image)

  return { texture, glowColor }
}
