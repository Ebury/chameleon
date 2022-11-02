import type { InputHTMLAttributes } from 'vue';

import type { Maybe } from '../../../global';
import type { InputFieldEvents } from '../ec-input-field/types';

export interface PhoneNumberCountry {
  areaCode: string,
  text: string,
  countryCode: string
}

export interface PhoneNumberCountryItem {
  areaCode: PhoneNumberCountry['areaCode'],
  iconPath: string,
  id: PhoneNumberCountry['countryCode'],
  name: PhoneNumberCountry['text'],
  text: string,
  value: PhoneNumberCountry
}

export interface PhoneNumberModel {
  country: PhoneNumberCountry,
  phoneNumber: string
}

export enum PhoneNumberEvent {
  UPDATE_MODEL_VALUE = 'update:modelValue',
  CHANGE = 'change',
  FOCUS = 'focus',
  OPEN = 'open',
  AFTER_OPEN = 'after-open',
  COUNTRY_CHANGE = 'country-change',
  PHONE_NUMBER_CHANGE = 'phone-number-change'
}

export interface PhoneNumberEvents {
  [PhoneNumberEvent.UPDATE_MODEL_VALUE]: PhoneNumberProps['modelValue']
  [PhoneNumberEvent.CHANGE]: InputFieldEvents['update:modelValue']
  [PhoneNumberEvent.FOCUS]: undefined
  [PhoneNumberEvent.OPEN]: undefined
  [PhoneNumberEvent.AFTER_OPEN]: undefined
  [PhoneNumberEvent.COUNTRY_CHANGE]: string[]
  [PhoneNumberEvent.PHONE_NUMBER_CHANGE]: InputFieldEvents['update:modelValue']
}

export enum PhoneNumberLevel {
  NOTIFICATION = 'notification',
  MODAL = 'modal',
  TOOLTIP = 'tooltip',
  LEVEL1 = 'level-1',
  LEVEL2 = 'level-2',
  LEVEL3 = 'level-3'
}

export interface PhoneNumberProps {
  modelValue: PhoneNumberModel,
  label: string,
  note: string,
  bottomNote: string,
  isWarning?: boolean,
  isMasked?: boolean,
  warningTooltipMessage: string,
  errorMessage: string,
  errorTooltipMessage: string,
  countries: PhoneNumberCountry[],
  areCountriesLoading?: boolean,
  isDisabled?: boolean,
  disabledTooltipMessage: string,
  isSensitive?: boolean,
  countryPlaceholder: string,
  phoneNumberPlaceholder: string,
  isSearchEnabled?: boolean,
  searchCountryPlaceholder?: string,
  noCountriesText?: string,
  level: PhoneNumberLevel,
  autocomplete?: Maybe<InputHTMLAttributes['autocomplete']>
}
