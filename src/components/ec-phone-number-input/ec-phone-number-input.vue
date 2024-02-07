<template>
  <div
    class="ec-phone-number-input"
    data-test="ec-phone-number-input"
  >
    <label
      v-if="label || note"
      class="ec-phone-number-input__label"
      :for="id"
    >
      <span
        v-if="label"
        class="ec-phone-number-input__label-text"
        data-test="ec-phone-number-input__label-text"
      >{{ label }}</span>

      <span
        v-if="note"
        class="ec-phone-number-input__label-note"
        data-test="ec-phone-number-input__label-note"
      >{{ note }}</span>
    </label>

    <div
      ref="popoverRef"
      v-ec-tooltip="{ content: isDisabled ? disabledTooltipMessage : false }"
      data-test="ec-phone-number-input__input-group"
      class="ec-phone-number-input__input-group"
    >
      <ec-dropdown
        :id="id"
        v-model="countriesModel"
        is-in-group="right"
        data-test="ec-phone-number-input__countries"
        class="ec-phone-number-input__countries"
        :class="{ 'ec-phone-number-input__countries--is-focused': countriesHasFocus }"
        :disabled="isDisabled"
        :error-id="errorId"
        :error-message="errorMessage"
        :is-loading="areCountriesLoading"
        :is-search-enabled="isSearchEnabled"
        :is-sensitive="isSensitive"
        :items="countriesItems"
        :no-results-text="noCountriesText"
        :placeholder="countryPlaceholder"
        :popover-options="popoverOptions"
        :popover-style="getPopoverStyle"
        :search-placeholder="searchCountryPlaceholder"
        :level="level"
        selected-text=" "
        @blur="countriesHasFocus = false"
        @change="onCountryChange"
        @focus="onFocusCountry"
        @open="emit(PhoneNumberEvent.OPEN)"
        @after-open="emit(PhoneNumberEvent.AFTER_OPEN)"
      >
        <template #item="{ item }">
          <div class="ec-phone-number-input__countries-item-wrapper">
            <img
              v-if="getItemProp(item, 'iconPath')"
              :src="getItemProp(item, 'iconPath')"
              :alt="getItemProp(item, 'name')"
              data-test="ec-phone-number-input__countries-item-flag"
              class="ec-phone-number-input__countries-item-flag"
            >
            <span
              class="ec-phone-number-input__countries-item-name"
              data-test="ec-phone-number-input__countries-item-name"
            >
              {{ getItemProp(item, 'name') }}
            </span>
            <span
              class="ec-phone-number-input__countries-item-area-code"
              data-test="ec-phone-number-input__countries-item-area-code"
            >
              {{ getItemProp(item, 'areaCode') }}
            </span>
          </div>
        </template>
      </ec-dropdown>
      <div
        v-if="selectedCountryAreaCode"
        data-test="ec-phone-number-input__countries-selected"
        class="ec-phone-number-input__countries-selected"
      >
        <img
          v-if="selectedCountryImage"
          :src="selectedCountryImage"
          :alt="selectedCountryName"
          class="ec-phone-number-input__countries-selected-image"
          data-test="ec-phone-number-input__countries-selected-image"
        >
        <span
          class="ec-phone-number-input__countries-selected-area-code"
          data-test="ec-phone-number-input__countries-selected-area-code"
        >{{ selectedCountryAreaCode }}</span>
      </div>
      <ec-input-field
        v-model="phoneNumberModel"
        class="ec-phone-number-input__number"
        data-test="ec-phone-number-input__number"
        is-in-group="left"
        :type="InputFieldType.TEL"
        :disabled="isDisabled"
        :error-id="errorId"
        :error-message="errorMessage"
        :is-sensitive="isSensitive"
        :placeholder="phoneNumberPlaceholder"
        :autocomplete="autocomplete || undefined"
        @change="onPhoneNumberChange"
        @focus="emit(PhoneNumberEvent.FOCUS)"
      />
    </div>

    <div
      :id="errorId"
      v-if="isInvalid"
      data-test="ec-phone-number-input__error-text"
      class="ec-phone-number-input__error-text"
    >
      <span>{{ errorMessage }}</span>
      <ec-icon
        v-if="isInvalid && errorTooltipMessage"
        v-ec-tooltip="{ content: errorTooltipMessage }"
        class="ec-phone-number-input__error-tooltip"
        data-test="ec-phone-number-input__error-tooltip"
        :type="IconType.ERROR"
        :name="IconName.SIMPLE_ERROR"
        :size="14"
      />
    </div>

    <div
      v-else-if="bottomNote"
      data-test="ec-phone-number-input__bottom-note"
      class="ec-phone-number-input__bottom-note"
      :class="{ 'ec-phone-number-input__bottom-note--is-warning': isWarning }"
    >
      <span>{{ bottomNote }}</span>
      <ec-icon
        v-if="isWarning && warningTooltipMessage"
        v-ec-tooltip="{ content: warningTooltipMessage }"
        class="ec-phone-number-input__warning-tooltip"
        data-test="ec-phone-number-input__warning-tooltip"
        :type="IconType.WARNING"
        :name="IconName.SIMPLE_ERROR"
        :size="14"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line vue/no-dupe-keys
import * as countries from 'svg-country-flags/countries.json';
import { computed, ref } from 'vue';

import useConfig from '../../composables/use-ec-config';
import vEcTooltip from '../../directives/ec-tooltip';
import { mask } from '../../utils/mask';
import { getUid } from '../../utils/uid';
import EcDropdown from '../ec-dropdown';
import EcIcon from '../ec-icon';
import { IconName, IconType } from '../ec-icon/types';
import EcInputField from '../ec-input-field';
import { InputFieldType } from '../ec-input-field/types';
import type {
  PhoneNumberCountryItem,
  PhoneNumberEvents,
  PhoneNumberModel,
  PhoneNumberProps,
} from './types';
import { PhoneNumberEvent } from './types';

const supportedCountries = new Set(Object.keys(countries));

const config = useConfig();

const emit = defineEmits<{
  'update:modelValue': [value: PhoneNumberEvents[PhoneNumberEvent.UPDATE_MODEL_VALUE]],
  'change': [value: PhoneNumberEvents[PhoneNumberEvent.CHANGE]],
  'focus': [],
  'open': [],
  'after-open': [],
  'country-change': [value: PhoneNumberEvents[PhoneNumberEvent.COUNTRY_CHANGE]],
  'phone-number-change': [value: PhoneNumberEvents[PhoneNumberEvent.PHONE_NUMBER_CHANGE]],
}>();

const props = withDefaults(defineProps<PhoneNumberProps>(), {
  searchCountryPlaceholder: 'Search...',
  autocomplete: null,
  noCountriesText: 'No results found',
  isSearchEnabled: true,
  isWarning: false,
  isMasked: false,
  areCountriesLoading: false,
  isDisabled: false,
  isSensitive: false,
});

const uid = getUid();
const countriesHasFocus = ref(false);

const popoverOptions = ref({
  autoSize: 'min',
});

const id = computed(() => `ec-phone-number-input-field-${uid}`);

const errorId = computed(() => (isInvalid.value ? `ec-phone-number-input-${uid}` : undefined));

const countriesItems = computed(() => props.countries.map(country => ({
  areaCode: country.areaCode,
  iconPath: getCountryFlagPath(country.countryCode),
  id: country.countryCode,
  name: country.text,
  text: `${country.text} ${country.areaCode}`, // the text is only displayed in the tooltip, it's just to make items searchable by area code and name of the country
  value: country,
} as PhoneNumberCountryItem)));

const countriesModel = computed({
  get() {
    return props.modelValue.country;
  },
  set(item) {
    emit(PhoneNumberEvent.UPDATE_MODEL_VALUE, {
      ...props.modelValue,
      // TODO correct types when ec-dropdown will be typed
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      country: item.value,
    });
  },
});

const phoneNumberModel = computed({
  get() {
    if (props.isMasked) {
      return mask(props.modelValue.phoneNumber);
    }

    return props.modelValue.phoneNumber;
  },
  set(phoneNumber) {
    emit(PhoneNumberEvent.UPDATE_MODEL_VALUE, {
      ...props.modelValue,
      phoneNumber,
    });
  },
});

const selectedCountryAreaCode = computed(() => props.modelValue?.country?.areaCode || null);
const selectedCountryImage = computed(() => getCountryFlagPath(props.modelValue?.country?.countryCode));
const selectedCountryName = computed(() => props.modelValue?.country?.text);

const isInvalid = computed(() => !!props.errorMessage);
const popoverRef = ref<HTMLElement | null>();

function getPopoverStyle() {
  if (popoverRef.value) {
    return {
      width: `${popoverRef.value.offsetWidth}px`,
    };
  }

  return null;
}

function onFocusCountry() {
  countriesHasFocus.value = true;
  emit(PhoneNumberEvent.FOCUS);
}

function onCountryChange(evt: PhoneNumberModel['country']) {
  countriesHasFocus.value = true;
  // TODO correct types when ec-dropdown will be typed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  emit(PhoneNumberEvent.CHANGE, evt);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  emit(PhoneNumberEvent.COUNTRY_CHANGE, evt);
}

function onPhoneNumberChange(evt: Event) {
  emit(PhoneNumberEvent.CHANGE, evt as InputEvent);
  emit(PhoneNumberEvent.PHONE_NUMBER_CHANGE, evt as InputEvent);
}

function getCountryFlagPath(countryCode: string) {
  if (!countryCode || !supportedCountries.has(countryCode)) {
    return null;
  }

  return `${config.iconsStaticPrefix}icons/country-flags/100/${countryCode.toLowerCase()}.png`;
}

function getItemProp(item: unknown, prop: keyof PhoneNumberCountryItem) {
  return (item as PhoneNumberCountryItem)[prop] as string;
}
</script>

<style>
:root,
:host {
  --ec-phone-number-input-width: 124px;
}

.ec-phone-number-input {
  &__input-group {
    @apply tw-flex tw-flex-row;
    @apply tw-relative;
  }

  &__countries {
    @apply tw--mr-1;
    @apply tw-flex-shrink-0;

    width: var(--ec-phone-number-input-width);
  }

  &__countries--is-focused {
    @apply tw-z-level-1;
  }

  &__countries-item-wrapper {
    @apply tw-flex tw-items-center;
  }

  &__countries-item-name {
    @apply tw-mr-4;
  }

  &__countries-item-area-code {
    @apply tw-text-gray-4;
  }

  &__countries-item-flag {
    @apply tw-mr-4;

    width: 20px;
  }

  &__countries-selected {
    @apply tw-absolute;
    @apply tw-inset-1;
    @apply tw-right-auto;
    @apply tw-pl-12 tw-py-8;
    @apply tw-body-text tw-text-gray-3;
    @apply tw-z-level-2;
    @apply tw-pointer-events-none;
  }

  &__countries-selected-image {
    width: 20px;
  }

  &__countries-selected-area-code {
    @apply tw-ml-4;
  }

  &__label {
    @apply tw-flex tw-flex-wrap;
  }

  &__label-text {
    @apply tw-input-label;
    @apply tw-flex-grow;
    @apply tw-mr-8;
  }

  &__label-note {
    @apply tw-caption-text;
  }

  &__bottom-note {
    @apply tw-flex tw-items-start;
    @apply tw-help-text;
    @apply tw-mt-4;

    &--is-warning {
      @apply tw-text-warning-dark;
    }
  }

  &__error-text {
    @apply tw-flex tw-items-start;
    @apply tw-help-text tw-text-error;
    @apply tw-mt-4;
  }

  &__error-tooltip,
  &__warning-tooltip {
    @apply tw-flex-shrink-0;
    @apply tw-ml-1 tw-mt-1;
    @apply tw-outline-none;
  }
}
</style>
