import { AlertType as BadgeType } from '../ec-alert/types';

export { BadgeType };

export interface BadgeProps {
  type?: BadgeType,
  value: string | number,
}
