import { createContext, useContext } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export interface ThemeProviderState {
  theme: Theme;
  isDark: boolean;
  isSystem: boolean;
  setTheme: (theme: Theme) => void;
}

export const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: 'system',
  isDark: false,
  isSystem: true,
  setTheme: () => null,
});

export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
