import type { Maybe } from '../../../global';

export const METROLINE_PROVIDE_KEY = Symbol('metroline');

export interface MetrolineProviderContext {
  activeItemId: Maybe<number>,
  lastItemId: Maybe<number>,
  isCompleted: boolean,
  register: (id: number) => void,
  unregister: (id: number) => void,
  goToNext: (id: number) => void,
  goTo: (id: number) => void,
  complete: () => void,
}
