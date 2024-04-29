import { ModelLoader } from '@/mson/ModelLoader';

import { collectAssetsFromGlob } from './utils/collectAssetsFromGlob';

export const MODELS = collectAssetsFromGlob(
  import.meta.glob('/src/demo/assets/mson/**/models/**/*.json', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
  '/src/demo/assets/mson/',
  true,
  true,
);

export const modelLoader = new ModelLoader(async (modelId) => {
  const url = MODELS[modelId];

  if (!url) {
    throw new Error(`Unknown model "${modelId}"`);
  }

  const r = await fetch(url);
  const json = await r.json();

  return json;
});
