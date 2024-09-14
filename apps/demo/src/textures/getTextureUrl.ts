import { TEXTURES } from './collection';

export function getTextureUrl(textureId: string) {
  const textureUrl = TEXTURES[textureId];

  if (!textureUrl) {
    throw new Error(`Unregistered texture "${textureId}"`);
  }

  return textureUrl;
}
