import type { InputHTMLAttributes } from 'vue';

import type { Maybe } from '../../../global';
import type { ZIndexLevel } from '../../enums';
import type { DropdownItem } from '../ec-dropdown-search/types';

export interface PhoneNumberCountry {
  areaCode: string,
  text: string,
  countryCode: string
}

export interface PhoneNumberCountryItem extends DropdownItem<PhoneNumberCountry> {
  areaCode: string,
  iconPath: string,
  name: string,
}

export interface PhoneNumberModel {
  country: Maybe<PhoneNumberCountry>,
  phoneNumber: string
}

export interface PhoneNumberProps {
  modelValue: PhoneNumberModel,
  label?: string,
  note?: string,
  bottomNote?: string,
  isWarning?: boolean,
  isMasked?: boolean,
  warningTooltipMessage?: string,
  errorMessage?: string,
  errorTooltipMessage?: string,
  countries: PhoneNumberCountry[],
  areCountriesLoading?: boolean,
  isDisabled?: boolean,
  disabledTooltipMessage?: string,
  isSensitive?: boolean,
  countryPlaceholder?: string,
  phoneNumberPlaceholder?: string,
  isSearchEnabled?: boolean,
  searchCountryPlaceholder?: string,
  noCountriesText?: string,
  level?: ZIndexLevel,
  autocomplete?: Maybe<InputHTMLAttributes['autocomplete']>
}
