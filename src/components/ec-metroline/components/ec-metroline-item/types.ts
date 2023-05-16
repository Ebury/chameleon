export enum METROLINE_ITEM_STATUS {
  Next = 'next',
  Active = 'active',
  Completed = 'completed',
}

export interface MetrolineItemProps {
  id: number,
  badgeText?: string
}
