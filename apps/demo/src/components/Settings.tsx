import { useState } from 'react';
import { MODEL_PRESETS } from '@demo/models/presets';
import { setAppState, useAppState } from '@demo/state/appState';
import { Button, ComboboxWithLabel, Separator, SwitchWithLabel } from '@repo/ui';
import { ModelItemSettings } from './settings/ModelItemSettings';

const presetKeys = Object.keys(MODEL_PRESETS);

export function Settings() {
  const { smoothCamera, showGrid, enableLight, models } = useAppState();

  const [presetName, setPresetName] = useState(presetKeys[0] ?? 'No presets');

  function resolvePreset() {
    const preset = MODEL_PRESETS[presetName];

    if (!preset) {
      throw new Error(`No preset "${presetName}"`);
    }

    return preset;
  }

  function applyPreset() {
    const models = resolvePreset();

    setAppState({ models });
  }

  function addPreset() {
    const models = resolvePreset();

    setAppState((draft) => {
      draft.models.push(...models);
    });
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <SwitchWithLabel
        label="Smooth camera"
        checked={smoothCamera}
        onChange={smoothCamera => setAppState({ smoothCamera })}
      />

      <SwitchWithLabel
        label="Show grid"
        checked={showGrid}
        onChange={showGrid => setAppState({ showGrid })}
      />

      <SwitchWithLabel
        label="Enable light"
        checked={enableLight}
        onChange={enableLight => setAppState({ enableLight })}
      />

      <Separator />

      <ComboboxWithLabel
        label="Preset"
        options={presetKeys}
        value={presetName}
        onChange={preset => setPresetName(preset)}
      />

      <div className="grid grid-cols-2 gap-2">
        <Button onClick={applyPreset}>Use preset</Button>
        <Button onClick={addPreset}>Add preset</Button>
      </div>

      {models.map(item => (
        <ModelItemSettings key={item.id} modelItem={item} />
      ))}
    </div>
  );
}
