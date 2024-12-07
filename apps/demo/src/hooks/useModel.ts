import { ThreeModelFoundry } from '@keupoz/mson-three'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Implementations } from '@demo/models/implementations'
import { modelLoader } from '@demo/models/loader'
import { useAppState } from '@demo/state/appState'
import { useGlowMaterial } from './useGlowMaterial'
import { useSkinMaterial } from './useSkinMaterial'

export function useModel(modelId: string, textureUrl: string) {
  const { error, data } = useSuspenseQuery({
    queryKey: ['model', modelId],
    queryFn: () => modelLoader.load(modelId),
  })

  const { skinMaterial, img } = useSkinMaterial(textureUrl)
  const glowMaterial = useGlowMaterial(img)
  const applyImplementations = useAppState(state => state.applyImplementations)

  const modelFoundry = useMemo(() => {
    return new ThreeModelFoundry((name) => {
      return name.startsWith('corona') ? glowMaterial : skinMaterial
    })
  }, [glowMaterial, skinMaterial])

  const model = useMemo(() => {
    const { model, implementableSlots } = modelFoundry.createModel(data)

    // eslint-disable-next-line no-console
    console.log(`Slots of "${modelId}"`, implementableSlots)

    if (applyImplementations) {
      for (const [name, implementation] of Object.entries(Implementations)) {
        const slots = implementableSlots[name]
        slots?.forEach(implementation)
      }
    }

    return model
  }, [applyImplementations, data, modelFoundry, modelId])

  if (error) {
    console.error(error)
  }

  return model
}
