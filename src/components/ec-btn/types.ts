import type { RouteLocationRaw } from 'vue-router';

import type { IconName } from '../ec-icon/icon-names';

export enum ButtonSize {
  Medium = 'md',
  Small = 'sm',
}

export enum ButtonCategory {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
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
