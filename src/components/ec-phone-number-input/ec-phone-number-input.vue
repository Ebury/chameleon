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
        :selected-text="selectedText"
        @blur="countriesHasFocus = false"
        @change="onCountryChange"
        @focus="onFocusCountry"
        @open="$emit('open')"
        @after-open="$emit('after-open')"
      >
        <template #item="{ item }">
          <div class="ec-phone-number-input__countries-item-wrapper tw-flex tw-items-center">
            <span
              class="ec-phone-number-input__countries-item-name tw-mr-4"
              data-test="ec-phone-number-input__countries-item-name"
            >
              {{ item.name }}
            </span>
            <span
              class="tw-text-gray-4"
              data-test="ec-phone-number-input__countries-item-calling-code"
            >
              {{ item.value }}
            </span>
          </div>
        </template>
      </ec-dropdown>
      <ec-input-field
        v-model="numberModel"
        class="ec-phone-number-input__number"
        data-test="ec-phone-number-input__number"
        is-in-group="left"
        type="tel"
        :disabled="isDisabled"
        :error-id="errorId"
        :error-message="errorMessage"
        :is-sensitive="isSensitive"
        :placeholder="numberPlaceholder"
        @change="onNumberChange"
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
import { obfuscate } from '../../utils/obfuscate';

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
    numberPlaceholder: {
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
  },
  data() {
    return {
      uid: getUid(),
      countriesHasFocus: false,
      previousNumberValue: null,
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
        value: country.value,
        text: country.text + country.value,
        name: country.text,
        countryCode: country.countryCode,
        id: country.countryCode,
      }));
    },
    countriesModel: {
      get() {
        return this.value;
      },
      set(item) {
        this.$emit('value-change', {
          ...this.value,
          country: item,
        });
      },
    },
    numberModel: {
      get() {
        if (this.isDisabled && this.value.number) {
          return obfuscate(this.value.number);
        }

        return this.value.number;
      },
      set(item) {
        this.$emit('value-change', {
          ...this.value,
          number: item,
        });
      },
    },
    selectedText() {
      return this.value?.country?.value || null;
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
    onNumberChange(evt) {
      this.$emit('change', evt);
      this.$emit('number-change', evt);
    },
  },
};
</script>

<style>
:root {
  --ec-phone-number-input-width: 104px;
}

.ec-phone-number-input {
  &__input-group {
    @apply tw-flex tw-flex-row;
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

  &__countries-item-calling-code {
    @apply tw-text-gray-4;
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
