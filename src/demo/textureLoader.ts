import { Color, Texture } from 'three';

import { collectAssetsFromGlob } from './utils/collectAssetsFromGlob';
import { createCanvasContext } from './utils/createCanvasContext';
import { loadImage } from './utils/loadImage';

export const TEXTURES = collectAssetsFromGlob(
  import.meta.glob('/src/demo/assets/mson/**/textures/**/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
  '/src/demo/assets/mson/',
);

export function getTextureUrl(textureId: string) {
  const textureUrl = TEXTURES[textureId];

  if (!textureUrl) {
    throw new Error(`Unregistered texture "${textureId}"`);
  }

  return textureUrl;
}

export interface TextureItem {
  texture: Texture;
  glowColor: Color;
}

export async function loadTexture(textureId: string): Promise<TextureItem> {
  const textureUrl = getTextureUrl(textureId);
  const image = await loadImage(textureUrl);

  const texture = new Texture(image);
  const glowColor = getGlowColor(image);

  return { texture, glowColor };
}

function getGlowColor(image: HTMLImageElement) {
  const ctx = createCanvasContext();

  ctx.canvas.width = 4;
  ctx.canvas.height = 2;

  ctx.drawImage(image, 0, 0);

  const [r = 0, g = 0, b = 0] = ctx.getImageData(0, 1, 1, 1, {
    colorSpace: 'srgb',
  }).data;

  return new Color(r / 0xFF, g / 0xFF, b / 0xFF);
}
