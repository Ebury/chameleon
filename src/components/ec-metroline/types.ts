export * from './provide';

export enum MetrolineEvent {
  CHANGE = 'change',
  COMPLETE = 'complete',
}

export interface MetrolineEvents {
  [MetrolineEvent.CHANGE]: number
  [MetrolineEvent.COMPLETE]: undefined
}
