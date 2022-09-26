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
      ref="popoverWidthReference"
      v-ec-tooltip="{ content: isDisabled ? disabledTooltipMessage : null }"
      data-test="ec-phone-number-input__input-group"
      class="ec-phone-number-input__input-group"
    >
      <ec-dropdown
        :id="id"
        v-model="countriesModel"
        is-in-group="right"
        data-test="ec-phone-number-input__countries"
        class="ec-phone-number-input__countries"
        :class="{'ec-phone-number-input__countries--is-focused': countriesHasFocus}"
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
        @open="emit('open')"
        @after-open="emit('after-open')"
      >
        <template #item="{ item }">
          <div class="ec-phone-number-input__countries-item-wrapper tw-flex tw-items-center">
            <img
              v-if="item.iconPath"
              :src="item.iconPath"
              :alt="item.name"
              data-test="ec-phone-number-input__countries-item-flag"
              class="ec-phone-number-input__countries-item-flag"
            >
            <span
              class="ec-phone-number-input__countries-item-name"
              data-test="ec-phone-number-input__countries-item-name"
            >
              {{ item.name }}
            </span>
            <span
              class="ec-phone-number-input__countries-item-area-code"
              data-test="ec-phone-number-input__countries-item-area-code"
            >
              {{ item.areaCode }}
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
        type="tel"
        :disabled="isDisabled"
        :error-id="errorId"
        :error-message="errorMessage"
        :is-sensitive="isSensitive"
        :placeholder="phoneNumberPlaceholder"
        @change="onPhoneNumberChange"
        @focus="emit('focus')"
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
        type="error"
        name="simple-error"
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
        type="warning"
        name="simple-error"
        :size="14"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import vEcTooltip from '../../directives/ec-tooltip';
import { mask } from '../../utils/mask';
import { getUid } from '../../utils/uid';
import EcDropdown from '../ec-dropdown';
import EcIcon from '../ec-icon';
import EcInputField from '../ec-input-field';

const props = defineProps({
  modelValue: {
    type: Object,
  },
  label: {
    type: String,
  },
  note: {
    type: String,
  },
  bottomNote: {
    type: String,
  },
  isWarning: {
    type: Boolean,
    default: false,
  },
  isMasked: {
    type: Boolean,
    default: false,
  },
  warningTooltipMessage: {
    type: String,
  },
  errorMessage: {
    type: String,
  },
  errorTooltipMessage: {
    type: String,
  },
  countries: {
    type: Array,
  },
  areCountriesLoading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  disabledTooltipMessage: {
    type: String,
  },
  isSensitive: {
    type: Boolean,
    default: false,
  },
  countryPlaceholder: {
    type: String,
  },
  phoneNumberPlaceholder: {
    type: String,
  },
  isSearchEnabled: {
    type: Boolean,
    default: true,
  },
  searchCountryPlaceholder: {
    type: String,
    default: 'Search...',
  },
  noCountriesText: {
    type: String,
    default: 'No results found',
  },
  level: {
    type: String,
    validator(value) {
      return ['notification', 'modal', 'tooltip', 'level-1', 'level-2', 'level-3'].includes(value);
    },
  },
});

const emit = defineEmits([
  'update:modelValue',
  'change',
  'focus',
  'open',
  'after-open',
  'country-change',
  'phone-number-change',
]);

const uid = getUid();
const countriesHasFocus = ref(false);
const popoverOptions = ref({
  autoSize: 'min',
});
const popoverWidthReference = ref(null);

const id = computed(() => `ec-phone-number-input-field-${uid}`);
const errorId = computed(() => (isInvalid.value ? `ec-phone-number-input-${uid}` : null));
const countriesItems = computed(() => props.countries.map(country => ({
  areaCode: country.areaCode,
  iconPath: getCountryFlagPath(country.countryCode),
  id: country.countryCode,
  name: country.text,
  text: `${country.text} ${country.areaCode}`, // the text is only displayed in the tooltip, it's just to make items searchable by area code and name of the country
  value: country,
})));
const countriesModel = computed({
  get() {
    return props.modelValue.country;
  },
  set(item) {
    emit('update:modelValue', {
      ...props.modelValue,
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
    emit('update:modelValue', {
      ...props.modelValue,
      phoneNumber,
    });
  },
});
const selectedCountryAreaCode = computed(() => props.modelValue?.country?.areaCode || null);
const selectedCountryImage = computed(() => getCountryFlagPath(props.modelValue?.country?.countryCode));
const selectedCountryName = computed(() => props.modelValue?.country?.name);
const isInvalid = computed(() => !!props.errorMessage);

function getPopoverStyle() {
  if (popoverWidthReference.value) {
    return {
      width: `${popoverWidthReference.value.offsetWidth}px`,
    };
  }

  return null;
}

function onFocusCountry() {
  countriesHasFocus.value = true;
  emit('focus');
}

function onCountryChange(evt) {
  countriesHasFocus.value = true;
  emit('change', evt);
  emit('country-change', evt);
}

function onPhoneNumberChange(evt) {
  emit('change', evt);
  emit('phone-number-change', evt);
}

function getCountryFlagPath(countryCode) {
  if (!countryCode) {
    return null;
  }
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    return require(`svg-country-flags/png100px/${countryCode.toLowerCase()}.png`);
  } catch (err) {
    return null;
  }
}

</script>

<style>
:root {
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
