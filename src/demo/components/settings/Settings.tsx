import { useState } from 'react';

import { PRESETS, setAppState, useAppState } from '@/demo/store';
import { Button } from '@/shadcn/components/ui/button';
import { Separator } from '@/shadcn/components/ui/separator';

import { AppHeader } from './AppHeader';
import { ModelSettings } from './ModelSettings';
import { SettingsCombobox } from './controls/SettingsCombobox';
import { SettingsSwitch } from './controls/SettingsSwitch';

const presetKeys = Object.keys(PRESETS);

export function Settings() {
  const { smoothCamera, showGrid, enableLight, models } = useAppState();

  const [presetName, setPresetName] = useState(presetKeys[0] ?? 'No presets');

  function resolvePreset() {
    const preset = PRESETS[presetName];

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
    <>
      <AppHeader appName="Mson Viewer" />

      <div className="flex flex-col gap-2 p-2">
        <SettingsSwitch
          label="Smooth camera"
          checked={smoothCamera}
          onChange={smoothCamera => setAppState({ smoothCamera })}
        />

        <SettingsSwitch
          label="Show grid"
          checked={showGrid}
          onChange={showGrid => setAppState({ showGrid })}
        />

        <SettingsSwitch
          label="Enable light"
          checked={enableLight}
          onChange={enableLight => setAppState({ enableLight })}
        />

        <Separator />

        <SettingsCombobox
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
          <ModelSettings key={item.id} modelItem={item} />
        ))}
      </div>
    </>
  );
}
