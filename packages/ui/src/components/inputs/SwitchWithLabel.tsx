import { useId } from 'react';
import { Switch } from '@ui/shadcn/components/ui/switch';
import { InputWithLabel } from './InputWithLabel';

export interface SwitchWithLabelProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export function SwitchWithLabel({
  label,
  checked,
  onChange,
}: SwitchWithLabelProps) {
  const id = useId();

  return (
    <InputWithLabel label={label} id={id} wideLabel>
      <Switch
        className="col-span-2 justify-self-end"
        id={id}
        checked={checked}
        onCheckedChange={value => onChange(value)}
      />
    </InputWithLabel>
  );
}
