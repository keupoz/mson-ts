import type { SlotInfo } from '@keupoz/mson-core'
import type { Object3D } from 'three'
import { useEffect, useLayoutEffect } from 'react'
import { useModel } from '@demo/hooks/useModel'
import { setAppState } from '@demo/state/appState'

export interface ModelProps {
  modelId: string
  textureUrl: string
}

const Implementations: Record<string, (slot: SlotInfo<Object3D>) => void> = {
  'com.minelittlepony.client.model.part.UnicornHorn': (slot) => {
    const corona = slot.model.getObjectByName('corona')

    if (corona) {
      corona.visible = true
      corona.renderOrder = 1
    }
  },

  'com.minelittlepony.client.model.part.PonyTail$Segment': (slot) => {
    const tailStop = slot.info.context.getLocal('segments')
    const index = slot.info.context.getLocal('segment_index')

    slot.model.visible = index < tailStop
  },
}

export function Model({ modelId, textureUrl }: ModelProps) {
  const { model, implementableSlots } = useModel(modelId, textureUrl)

  useLayoutEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`Slots of "${modelId}"`, implementableSlots)

    for (const [name, implementation] of Object.entries(Implementations)) {
      const slots = implementableSlots[name]
      slots?.forEach(implementation)
    }
  }, [implementableSlots, modelId])

  useEffect(() => {
    setAppState((draft) => {
      draft.objects[modelId] = model
    })

    return () => {
      setAppState((draft) => {
        delete draft.objects[modelId]
      })
    }
  }, [model, modelId])

  return <primitive object={model} />
}
