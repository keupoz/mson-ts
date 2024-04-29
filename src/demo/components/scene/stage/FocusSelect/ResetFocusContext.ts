import { createHookedContext } from '@/demo/utils/createHookedContext';

export const [ResetFocusProvider, useResetFocus] = createHookedContext(
  () => {},
);
