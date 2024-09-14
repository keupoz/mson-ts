import { Color } from 'three';
import { createCanvasContext } from '@demo/utils/createCanvasContext';

export function getGlowColor(image: HTMLImageElement) {
  const ctx = createCanvasContext();

  ctx.canvas.width = 4;
  ctx.canvas.height = 2;

  ctx.drawImage(image, 0, 0);

  const [r = 0, g = 0, b = 0] = ctx.getImageData(0, 1, 1, 1, {
    colorSpace: 'srgb',
  }).data;

  return new Color(r / 0xFF, g / 0xFF, b / 0xFF);
}
