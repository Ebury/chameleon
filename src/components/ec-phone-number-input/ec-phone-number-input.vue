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
      ref="popperWidthReference"
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
        :popper-modifiers="popperModifier"
        :search-placeholder="searchCountryPlaceholder"
        :level="level"
        selected-text=" "
        @blur="countriesHasFocus = false"
        @change="onCountryChange"
        @focus="onFocusCountry"
        @open="$emit('open')"
        @after-open="$emit('after-open')"
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
        @focus="$emit('focus')"
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

<script>
import { getUid } from '../../utils/uid';
import { mask } from '../../utils/mask';

import EcInputField from '../ec-input-field';
import EcDropdown from '../ec-dropdown';
import EcIcon from '../ec-icon';
import EcTooltip from '../../directives/ec-tooltip';

export default {
  name: 'EcPhoneNumberInput',
  components: {
    EcInputField,
    EcDropdown,
    EcIcon,
  },
  directives: { EcTooltip },
  model: {
    prop: 'value',
    event: 'value-change',
  },
  props: {
    value: {
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
  },
  data() {
    return {
      uid: getUid(),
      countriesHasFocus: false,
      popperModifier: {
        setPopperWidth: {
          enabled: true,
          order: 841,
          fn: /* istanbul ignore next */ (data) => {
            data.styles.width = this.$refs.popperWidthReference.offsetWidth;
            return data;
          },
        },
      },
      popoverOptions: {
        placement: 'bottom-end',
      },
    };
  },
  computed: {
    id() {
      return `ec-phone-number-input-field-${this.uid}`;
    },
    errorId() {
      return this.isInvalid ? `ec-phone-number-input-${this.uid}` : null;
    },
    countriesItems() {
      return this.countries.map(country => ({
        areaCode: country.areaCode,
        iconPath: this.getCountryFlagPath(country.countryCode),
        id: country.countryCode,
        name: country.text,
        text: `${country.text} ${country.areaCode}`, // the text is only displayed in the tooltip, it's just to make items searchable by area code and name of the country
        value: country,
      }))
        .sort(this.sortAlphabetically('text'));
    },
    countriesModel: {
      get() {
        return this.value.country;
      },
      set(item) {
        this.$emit('value-change', {
          ...this.value,
          country: item.value,
        });
      },
    },
    phoneNumberModel: {
      get() {
        if (this.isMasked) {
          return mask(this.value.phoneNumber);
        }

        return this.value.phoneNumber;
      },
      set(phoneNumber) {
        this.$emit('value-change', {
          ...this.value,
          phoneNumber,
        });
      },
    },
    selectedCountryAreaCode() {
      return this.value?.country?.areaCode || null;
    },
    selectedCountryImage() {
      return this.getCountryFlagPath(this.value?.country?.countryCode);
    },
    selectedCountryName() {
      return this.value?.country?.name;
    },
    isInvalid() {
      return !!this.errorMessage;
    },
  },
  methods: {
    onFocusCountry() {
      this.countriesHasFocus = true;
      this.$emit('focus');
    },
    onCountryChange(evt) {
      this.countriesHasFocus = true;
      this.$emit('change', evt);
      this.$emit('country-change', evt);
    },
    onPhoneNumberChange(evt) {
      this.$emit('change', evt);
      this.$emit('phone-number-change', evt);
    },
    sortAlphabetically(key) {
      return (a, b) => a[key].localeCompare(b[key]);
    },
    getCountryFlagPath(countryCode) {
      if (!countryCode) {
        return null;
      }
      try {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        return require(`svg-country-flags/png100px/${countryCode.toLowerCase()}.png`);
      } catch (err) {
        return null;
      }
    },
  },
};
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