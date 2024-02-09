import type flatpickr from 'flatpickr';

import type { Maybe } from '../../../global';
import type { ZIndexLevel } from '../../enums';

export interface DatepickerProps {
  modelValue?: Maybe<Date>,
  label?: string,
  note?: string,
  bottomNote?: string,
  isWarning?: boolean,
  placeholder?: string,
  errorMessage?: string,
  isDisabled?: boolean,
  disabledDates?: Record<string, string>,
  areWeekendsDisabled?: boolean,
  level?: ZIndexLevel,
  options?: flatpickr.Options.Options,
  dateFormat?: string,
  locale?: flatpickr.Options.Options['locale'],
}
