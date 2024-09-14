import { createContext, useContext } from 'react';

export function createHookedContext<T>(defaultValue: T) {
  const context = createContext(defaultValue);

  function useHookedContext() {
    return useContext(context);
  }

  return [context.Provider, useHookedContext] as const;
}
