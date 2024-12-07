import { collectAssetsFromGlob } from '@demo/utils/collectAssetsFromGlob'

export const TEXTURES = collectAssetsFromGlob(
  import.meta.glob('/src/assets/resources/**/textures/**/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
  '/src/assets/resources/',
)
