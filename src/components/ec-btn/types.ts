import type { RouteLocationRaw } from 'vue-router';

import type { IconName } from '../ec-icon/icon-names';

export enum ButtonSize {
  MEDIUM = 'md',
  SMALL = 'sm',
}

export enum ButtonCategory {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export interface ButtonProps {
  size?: ButtonSize;
  href?: string;
  to?: RouteLocationRaw;
  tag?: string;
  isDisabled?: boolean;
  icon?: IconName;
  isRounded?: boolean;
  isOutline?: boolean;
  isFullWidth?: boolean;
  category?: ButtonCategory;
  isReverse?: boolean;
  isLoading?: boolean;
  isSubmit?: boolean
}
