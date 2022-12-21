import type { IconName } from './iconNames';

export * from './iconNames';

export enum IconType {
    ERROR = 'error',
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    INTERACTIVE = 'interactive'
}

export interface IconProps {
    name: IconName,
    size?: number,
    type?: IconType,
}
