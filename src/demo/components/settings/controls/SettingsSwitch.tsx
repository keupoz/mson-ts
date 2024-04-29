import { useId } from 'react';

import { Switch } from '@/shadcn/components/ui/switch';

import { SettingsRow } from './SettingsRow';

export interface SettingsSwitchProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export function SettingsSwitch({
  label,
  checked,
  onChange,
}: SettingsSwitchProps) {
  const id = useId();

  return (
    <SettingsRow label={label} id={id} wideLabel>
      <Switch
        className="col-span-2 justify-self-end"
        id={id}
        checked={checked}
        onCheckedChange={value => onChange(value)}
      />
    </SettingsRow>
  );
}
