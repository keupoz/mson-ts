import { createContext, useContext, useLayoutEffect, useReducer } from 'react';

export function useForceUpdate() {
  return useReducer((x: number) => x + 1, 0);
}

export function createForceUpdateContext() {
  const context = createContext(() => {});

  function useUpdateContext() {
    const update = useContext(context);

    useLayoutEffect(() => {
      update();
    });
  }

  return [context.Provider, useUpdateContext] as const;
}
