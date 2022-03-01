<template>
  <ec-input-field
    :id="id"
    ref="input"
    v-model="datepickerModel"
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
    v-on="$listeners"
    @icon-click="openCalendar()"
  />
</template>

<script>
import flatpickr from 'flatpickr';
import { getUid } from '../../utils/uid';

import EcInputField from '../ec-input-field';

export default {
  name: 'EcDatepicker',
  components: {
    EcInputField,
  },
  model: {
    prop: 'value',
    event: 'value-change',
  },
  props: {
    value: {
      type: String,
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
        return ['notification', 'modal', 'tooltip', 'level-1', 'level-2', 'level-3'].includes(value);
      },
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      uid: getUid(),
    };
  },
  computed: {
    datepickerModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.flatpickrInstance.setDate(value);
        this.$emit('value-change', value);
      },
    },
    id() {
      return `datepicker-${this.uid}`;
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
    if (this.flatpickrInstance.calendarContainer) {
      this.flatpickrInstance.calendarContainer.dataset.test = 'ec-datepicker__calendar';
      this.flatpickrInstance.calendarContainer.dataset.relDataTest = `${this.$attrs['data-test']} ec-datepicker`.trim();
      this.flatpickrInstance.calendarContainer.classList.add(`flatpickr-calendar--${this.level}`);
    }
  },
  beforeDestroy() {
    /* istanbul ignore next */
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
  },
  methods: {
    openCalendar() {
      this.flatpickrInstance.open();
    },
    mergeWithDefaultOptions(options) {
      return {
        ...options,
        // We need to update the time of "now" every time something changes otherwise flatpickr will only pick it once when imported.
        now: new Date(),
        allowInput: true,
        onDayCreate: this.onDayCreate,
        onReady: [...(this.options.onReady ?? []), () => {
          this.$emit('ready');
        }],
        onOpen: [...(this.options.onOpen ?? []), () => {
          this.$emit('open');
        }],
        onClose: [...(this.options.onClose ?? []), () => {
          this.$emit('close');
        }],
        prevArrow: '<svg><use xlink:href="#ec-simple-chevron-left"/></svg>',
        nextArrow: '<svg><use xlink:href="#ec-simple-chevron-right"/></svg>',
      };
    },
    setDisabledClass(dayElement) {
      dayElement.className = `${dayElement.className} flatpickr-disabled`;
    },
    disableWeekends(dayElement) {
      if (this.areWeekendsDisabled) {
        const day = dayElement.dateObj.getDay();
        const isSaturday = day === 6;
        const isSunday = day === 0;

        if (isSaturday || isSunday) {
          this.setDisabledClass(dayElement);
        }
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
      const d = dayElement.dateObj;
      const isoDateTime = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();
      const [isoDate] = isoDateTime.split('T');

      this.disableWeekends(dayElement);
      if (this.disabledDatesMap?.size) {
        this.disableSpecificDates(dayElement, isoDate);
      }

      dayElement.dataset.test = `ec-datepicker__calendar-day--${isoDate}`;
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
