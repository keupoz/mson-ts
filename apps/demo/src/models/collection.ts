import { collectAssetsFromGlob } from '@demo/utils/collectAssetsFromGlob'

export const MODELS = collectAssetsFromGlob(
  import.meta.glob('/src/assets/resources/**/models/**/*.json', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
  '/src/assets/resources/',
)
