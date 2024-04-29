import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useId } from 'react';

import { Button } from '@/shadcn/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shadcn/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover';

import { SettingsRow } from './SettingsRow';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface SettingsComboboxProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function SettingsCombobox({
  label,
  value,
  options,
  onChange,
}: SettingsComboboxProps) {
  const id = useId();

  return (
    <SettingsRow label={label} id={id} valueToCopy={value}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="col-span-8 h-8 justify-between overflow-hidden"
            id={id}
            variant="outline"
            role="combobox"
          >
            {value}

            <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0">
          <Command filter={(value, search) => (value.includes(search) ? 1 : 0)}>
            <CommandInput placeholder="Search items ..." />

            <CommandList>
              <CommandEmpty>Nothing found</CommandEmpty>
              <CommandGroup>
                {options.map(item => (
                  <CommandItem
                    key={item}
                    value={item}
                    title={item}
                    onSelect={onChange}
                  >
                    <span className="shrink">{item}</span>

                    <CheckIcon
                      className={clsx(
                        'ml-auto size-4',
                        value === item ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </SettingsRow>
  );
}
