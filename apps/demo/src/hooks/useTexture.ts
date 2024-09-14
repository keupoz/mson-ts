import { useSuspenseQuery } from '@tanstack/react-query';
import { NearestFilter, Texture } from 'three';
import { loadImage } from '../utils/loadImage';

export function useTexture(textureUrl: string) {
  const { error, data } = useSuspenseQuery({
    queryKey: ['texture', textureUrl],
    queryFn: () => loadImage(textureUrl),
    select: (img) => {
      const texture = new Texture(img);

      texture.minFilter = NearestFilter;
      texture.magFilter = NearestFilter;

      texture.needsUpdate = true;

      return { texture, img };
    },
  });

  if (error) {
    console.error(error);
  }

  return data;
}
