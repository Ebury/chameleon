<template>
  <ec-input-field
    :id="id"
    ref="input"
    type="text"
    autocomplete="off"
    icon="simple-calendar"
    class="ec-datepicker"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-datepicker`: 'ec-datepicker'"
    :label="label"
    :note="note"
    :bottom-note="bottomNote"
    :placeholder="placeholder"
    :is-warning="isWarning"
    :error-message="errorMessage"
    :disabled="isDisabled"
    :model-value="formattedValue"
    @icon-click="openCalendar()"
    @blur="onBlur"
    v-on="getListeners()"
  />
</template>

<script>
import flatpickr from 'flatpickr';

import { getUid } from '../../utils/uid';
import EcInputField from '../ec-input-field';

export default {
  name: 'EcDatepicker',
  compatConfig: {
    COMPONENT_V_MODEL: false,
  },
  components: {
    EcInputField,
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Date,
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
    placeholder: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    disabledDates: {
      type: Object,
      default: () => {},
    },
    areWeekendsDisabled: {
      type: Boolean,
      default: false,
    },
    level: {
      type: String,
      validator(value) {
        return ['notification', 'modal', 'tooltip', 'level-1', 'level-2', 'level-3', ''].includes(value);
      },
      default: '',
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    dateFormat: {
      type: String,
    },
    locale: {
      type: [String, Object],
    },
  },
  emits: ['update:modelValue', 'ready', 'open', 'close', 'blur'],
  data() {
    return {
      uid: getUid(),
      formattedValue: '',
    };
  },
  computed: {
    id() {
      return `ec-datepicker-${this.uid}`;
    },
  },
  watch: {
    disabledDates: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.disabledDatesMap = new Map(Object.entries(newValue));
        }
        if (this.flatpickrInstance) {
          this.flatpickrInstance.redraw();
        }
      },
    },
    modelValue(newValue, oldValue) {
      if (newValue && newValue !== oldValue && !this.datesAreEqual(newValue, oldValue)) {
        this.flatpickrInstance.setDate(newValue, true);
      }

      if (!newValue) {
        this.flatpickrInstance.clear();
      }
    },
    dateFormat(newValue) {
      /* istanbul ignore next */
      if (this.flatpickrInstance) {
        this.flatpickrInstance.set('dateFormat', newValue);
        if (this.flatpickrInstance.selectedDates.length) {
          this.flatpickrInstance.setDate(this.flatpickrInstance.selectedDates[0], true);
        }
      }
    },
    locale(newValue) {
      /* istanbul ignore next */
      if (this.flatpickrInstance) {
        this.flatpickrInstance.set('locale', newValue);
      }
    },
    areWeekendsDisabled() {
      /* istanbul ignore next */
      if (this.flatpickrInstance) {
        this.flatpickrInstance.redraw();
      }
    },
    options(newValue) {
      const newOptions = this.mergeWithDefaultOptions(newValue);
      for (const [key, value] of Object.entries(newOptions)) {
        // https://github.com/ankurk91/vue-flatpickr-component/blob/9.0.5/src/component.js#L186
        if (!key.match(/on[A-Z]/)) {
          this.flatpickrInstance.set(key, value);
        }
      }
    },
  },
  mounted() {
    this.flatpickrInstance = flatpickr(this.$refs.input.getInputRef(), this.mergeWithDefaultOptions(this.options));

    /* istanbul ignore next */
    if (this.flatpickrInstance.input) {
      // sync the value to the formattedValue after the flatpickr is initialized.
      //
      // if the 'modelValue' prop contains any initial value, that value got passed to the flatpickr via defaultValue option
      // and a formatted value may be visible in the input now. we need to get that value from input to our
      // formattedValue in order to keep it in sync.
      // if we don't do that, an empty formattedValue can be passed to the ec-input-field via Vue props
      // in the nextTick, and that would reset the value in the input and in the flatpickr.
      this.formattedValue = this.flatpickrInstance.input.value;
    }

    /* istanbul ignore next */
    if (this.flatpickrInstance.calendarContainer) {
      this.flatpickrInstance.calendarContainer.dataset.test = 'ec-datepicker__calendar';
      this.flatpickrInstance.calendarContainer.dataset.relDataTest = `${this.$attrs['data-test'] ?? ''} ec-datepicker`.trim();
      if (this.level) {
        this.flatpickrInstance.calendarContainer.classList.add(`flatpickr-calendar--${this.level}`);
      }
      this.flatpickrInstance.monthsDropdownContainer.dataset.test = 'ec-datepicker__calendar-month';
      this.flatpickrInstance.currentYearElement.dataset.test = 'ec-datepicker__calendar-year';
    }
  },
  beforeUnmount() {
    /* istanbul ignore next */
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
  },
  methods: {
    getListeners() {
      const listeners = { ...this.$listeners };
      delete listeners['update:modelValue'];
      delete listeners.open;
      delete listeners.close;
      delete listeners.ready;
      delete listeners.blur;

      return listeners;
    },
    openCalendar() {
      /* istanbul ignore next */
      if (this.flatpickrInstance) {
        this.flatpickrInstance.open();
      }
    },
    mergeWithDefaultOptions(options) {
      const mergedOptions = {
        ...options,
        // We need to update the time of "now" every time something changes otherwise flatpickr will only pick it once when imported.
        now: new Date(),
        allowInput: true,
        defaultDate: this.modelValue ? new Date(this.modelValue) : null,
        onDayCreate: this.onDayCreate,
        onReady: [...(this.options.onReady ?? []), () => {
          this.$emit('ready');
        }],
        onChange: (selectedDates, dateStr) => {
          const date = selectedDates[0];
          if (date) {
            const isoDate = this.toIsoDate(date);

            if (this.disabledDatesMap?.has(isoDate)) {
              this.flatpickrInstance.clear();
              return;
            }

            if (this.areWeekendsDisabled && this.isWeekendDay(date)) {
              this.flatpickrInstance.clear();
              return;
            }
          }

          this.formattedValue = dateStr;
          this.$emit('update:modelValue', selectedDates[0] ?? null);
        },
        onOpen: [...(this.options.onOpen ?? []), () => {
          this.$emit('open');
        }],
        onClose: [...(this.options.onClose ?? []), () => {
          this.$emit('close');
        }],
        prevArrow: '<svg><use xlink:href="#ec-simple-chevron-left"/></svg>',
        nextArrow: '<svg><use xlink:href="#ec-simple-chevron-right"/></svg>',
      };

      if (this.locale) {
        mergedOptions.locale = this.locale;
      }

      if (this.dateFormat) {
        mergedOptions.dateFormat = this.dateFormat;
      }

      return mergedOptions;
    },
    setDisabledClass(dayElement) {
      dayElement.className = `${dayElement.className} flatpickr-disabled`;
    },
    toIsoDate(dateObj) {
      const isoDateTime = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate())).toISOString();
      const [isoDate] = isoDateTime.split('T');

      return isoDate;
    },
    isWeekendDay(dateObj) {
      const day = dateObj.getDay();

      const isSaturday = day === 6;
      const isSunday = day === 0;

      return isSaturday || isSunday;
    },
    disableWeekends(dayElement) {
      if (this.areWeekendsDisabled && this.isWeekendDay(dayElement.dateObj)) {
        this.setDisabledClass(dayElement);
      }
    },
    disableSpecificDates(dayElement, isoDate) {
      if (this.disabledDatesMap.has(isoDate)) {
        this.setDisabledClass(dayElement);
        const reason = this.disabledDatesMap.get(isoDate);
        if (reason) {
          dayElement.title = reason;
        }
      }
    },
    onDayCreate(selectedDate, selectedDateFormatted, flatpickrInstance, dayElement) {
      const date = dayElement.dateObj;
      const isoDate = this.toIsoDate(date);

      this.disableWeekends(dayElement);
      if (this.disabledDatesMap?.size) {
        this.disableSpecificDates(dayElement, isoDate);
      }

      dayElement.dataset.test = `ec-datepicker__calendar-day--${isoDate}`;
    },
    datesAreEqual(date1, date2) {
      if (date1 instanceof Date && date2 instanceof Date) {
        return date1.getTime() === date2.getTime();
      }

      return date1 === date2;
    },
    onBlur(evt) {
      this.$emit('blur', evt);
      if (this.flatpickrInstance && !this.flatpickrInstance.input.value) {
        this.$emit('update:modelValue', null);
      }
    },
  },
};
</script>
<style>
/* We purge the css as a result Flatpickr does not render correctly, because we cannot apply our own classes we need to whitelist the following file */

/* purgecss start ignore */
@import '../../styles/components/ec-datepicker/ec-datepicker.css';

/* purgecss end ignore */
</style>
