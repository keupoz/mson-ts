import { useLayoutEffect } from 'react';
import { MeshStandardMaterial } from 'three';
import { setupMaterial } from '../utils/setupMaterial';
import { useConst } from './useConst';
import { useTexture } from './useTexture';

export function useSkinMaterial(textureUrl: string) {
  const { texture, img } = useTexture(textureUrl);

  const skinMaterial = useConst(() => {
    return setupMaterial(new MeshStandardMaterial(), 'skin');
  });

  useLayoutEffect(() => {
    skinMaterial.map = texture;
  }, [skinMaterial, texture]);

  return { skinMaterial, texture, img };
}
