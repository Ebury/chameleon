import type { IconName } from './icon-names';

export * from './icon-names';

export enum IconType {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  INTERACTIVE = 'interactive',
}

export interface IconProps {
  name: IconName,
  size?: number,
  type?: IconType,
}
