import type { PropsWithChildren } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { Theme, ThemeProviderState } from '../hooks/useTheme';
import { ThemeProviderContext } from '../hooks/useTheme';

interface ThemeProviderProps extends PropsWithChildren {
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  const isSystem = theme === 'system';
  const isDark = isSystem
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : theme === 'dark';

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (isSystem) {
      const systemTheme = isDark ? 'dark' : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [isDark, isSystem, theme]);

  const value = useMemo<ThemeProviderState>(() => {
    return {
      theme,
      isDark,
      isSystem,
      setTheme: (theme: Theme) => {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      },
    };
  }, [isDark, isSystem, storageKey, theme]);

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
