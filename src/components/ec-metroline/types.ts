import type { Maybe } from '../../../global';

export enum MetrolineEvent {
  CHANGE = 'change',
  COMPLETE = 'complete',
}

export interface MetrolineEvents {
  [MetrolineEvent.CHANGE]: number
  [MetrolineEvent.COMPLETE]: undefined
}

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
