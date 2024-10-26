import { ThreeModelFoundry } from '@keupoz/mson-three'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { modelLoader } from '@demo/models/loader'
import { useGlowMaterial } from './useGlowMaterial'
import { useSkinMaterial } from './useSkinMaterial'

export function useModel(modelId: string, textureUrl: string) {
  const { error, data } = useSuspenseQuery({
    queryKey: ['model', modelId],
    queryFn: () => modelLoader.load(modelId),
  })

  const { skinMaterial, img } = useSkinMaterial(textureUrl)
  const glowMaterial = useGlowMaterial(img)

  const modelFoundry = useMemo(() => {
    return new ThreeModelFoundry((name) => {
      return name.startsWith('corona') ? glowMaterial : skinMaterial
    })
  }, [glowMaterial, skinMaterial])

  const model = useMemo(() => {
    return modelFoundry.createModel(data)
  }, [data, modelFoundry])

  if (error) {
    console.error(error)
  }

  return model
}
