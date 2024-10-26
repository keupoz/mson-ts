import { Button, Divider, SimpleGrid, Stack } from '@mantine/core'
import { useState } from 'react'
import { MODEL_PRESETS } from '@demo/models/presets'
import { setAppState, useAppState } from '@demo/state/appState'
import { Select } from '@demo/ui/Select'
import { Switch } from '@demo/ui/Switch'
import { ModelItemSettings } from './settings/ModelItemSettings'

const presetKeys = Object.keys(MODEL_PRESETS)

export function Settings() {
  const { smoothCamera, showGrid, enableLight, models } = useAppState()

  const [presetName, setPresetName] = useState(presetKeys[0] ?? 'No presets')

  function resolvePreset() {
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
    <>
      <Switch
        label="Smooth camera"
        checked={smoothCamera}
        onChange={e => setAppState({ smoothCamera: e.currentTarget.checked })}
      />

      <Switch
        label="Show grid"
        checked={showGrid}
        onChange={e => setAppState({ showGrid: e.currentTarget.checked })}
      />

      <Switch
        label="Enable light"
        checked={enableLight}
        onChange={e => setAppState({ enableLight: e.currentTarget.checked })}
      />

      <Divider />

      <Stack gap="xs">
        <Select
          label="Preset"
          data={presetKeys}
          value={presetName}
          onChange={preset => preset && setPresetName(preset)}
        />

        <SimpleGrid cols={2} spacing="xs">
          <Button variant="default" onClick={applyPreset}>Replace scene</Button>
          <Button variant="default" onClick={addPreset}>Add to scene</Button>
        </SimpleGrid>
      </Stack>

      {models.map(item => (
        <ModelItemSettings key={item.id} modelItem={item} />
      ))}
    </>
  )
}
