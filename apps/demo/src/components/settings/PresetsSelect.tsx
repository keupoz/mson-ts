import { Button, Select, SimpleGrid, Stack } from '@mantine/core'
import { useState } from 'react'
import { MODEL_PRESETS } from '@demo/models/presets'
import { setAppState } from '@demo/state/appState'

const presetKeys = Object.keys(MODEL_PRESETS)

export function PresetsSelect() {
  const [presetName, setPresetName] = useState(presetKeys[0] ?? null)

  function resolvePreset() {
    if (!presetName) {
      throw new Error('No preset selected')
    }

    const preset = MODEL_PRESETS[presetName]

    if (!preset) {
      throw new Error(`No preset "${presetName}"`)
    }

    return preset
  }

  function applyPreset() {
    const models = resolvePreset()

    setAppState({ models })
  }

  function addPreset() {
    const models = resolvePreset()

    setAppState((draft) => {
      draft.models.push(...models)
    })
  }

  return (
    <Stack gap="xs">
      <Select
        label="Preset"
        data={presetKeys}
        value={presetName}
        onChange={setPresetName}
      />

      <SimpleGrid cols={2} spacing="xs">
        <Button variant="default" onClick={applyPreset}>Replace scene</Button>
        <Button variant="default" onClick={addPreset}>Add to scene</Button>
      </SimpleGrid>
    </Stack>
  )
}
