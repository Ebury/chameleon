import type { DatepickerProps } from '../ec-datepicker/types';
import type { PopoverProps } from '../ec-popover/types';

export interface DateRangeFilterModel {
  from?: Date,
  to?: Date,
}

export interface DateRangeFilterProps {
  label: string,
  clearText?: string,
  dateRangeErrorMessage?: string,
  popoverOptions?: PopoverProps,
  modelValue?: DateRangeFilterModel,
  fromDatepickerOptions?: DatepickerProps,
  toDatepickerOptions?: DatepickerProps,
}
