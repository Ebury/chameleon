export enum MetrolineItemStatus {
  NEXT = 'next',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface MetrolineItemProps {
  id: number,
  badgeText?: string
}
