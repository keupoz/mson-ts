import type { SlotInfo } from '@keupoz/mson-core'
import type { Object3D } from 'three'

export const Implementations: Record<string, (slot: SlotInfo<Object3D>) => void> = {
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
