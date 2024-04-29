import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shadcn/components/ui/toggle-group';
import { useTheme } from '@/shadcn/hooks/useTheme';

export interface AppHeaderProps {
  appName: string;
}

export function AppHeader({ appName }: AppHeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-14 items-center px-2">
      <h4 className="grow scroll-m-20 text-xl font-semibold tracking-tight">
        {appName}
      </h4>

      <ToggleGroup
        type="single"
        size="sm"
        value={theme}
        onValueChange={value =>
          setTheme(value ? (value as 'dark' | 'light') : 'system')}
      >
        <ToggleGroupItem value="dark">
          <MoonIcon />
        </ToggleGroupItem>

        <ToggleGroupItem value="light">
          <SunIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
