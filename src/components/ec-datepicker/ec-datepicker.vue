<template>
  <ec-input-field
    v-bind="{
      ...getEvents(),
      style: attrs.style,
      id,
      label,
      placeholder,
      note,
      bottomNote,
      errorMessage,
      isWarning,
    }"
    ref="inputRef"
    type="text"
    autocomplete="off"
    icon="simple-calendar"
    :class="['ec-datepicker', attrs.class]"
    :data-test="attrs['data-test'] ? `${attrs['data-test']} ec-datepicker` : 'ec-datepicker'"
    :disabled="isDisabled"
    :model-value="formattedValue"
    @icon-click="openCalendar()"
    @blur="onBlur"
    @change="onChange"
  />
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});

import flatpickr from 'flatpickr';
import {
  onBeforeUnmount, onMounted, ref, useAttrs, watch,
} from 'vue';

import { getUid } from '../../utils/uid';
import EcInputField from '../ec-input-field';

const props = defineProps({
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
    default: () => ({}),
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
});

const emit = defineEmits(['update:modelValue', 'ready', 'open', 'close', 'blur', 'change', 'after-close']);

const uid = getUid();
const id = `ec-datepicker-${uid}`;

const inputRef = ref(null);

// flatpickr instance
let flatpickrInstance = null;

onMounted(() => {
  flatpickrInstance = flatpickr(inputRef.value.inputRef, mergeWithDefaultOptions(props.options));
});

onBeforeUnmount(() => {
  if (flatpickrInstance) {
    document.removeEventListener('scroll', debouncedFlatpickrReposition, { capture: true, passive: true });
    flatpickrInstance.destroy();
  }
});

function openCalendar() {
  if (flatpickrInstance) {
    flatpickrInstance.open();
  }
}

// custom classes and data-test
const attrs = useAttrs();

onMounted(() => {
  if (flatpickrInstance.calendarContainer) {
    flatpickrInstance.calendarContainer.dataset.test = 'ec-datepicker__calendar';
    flatpickrInstance.calendarContainer.dataset.relDataTest = `${attrs['data-test'] ?? ''} ec-datepicker`.trim();
    if (props.level) {
      flatpickrInstance.calendarContainer.classList.add(`flatpickr-calendar--${props.level}`);
    }
    flatpickrInstance.monthsDropdownContainer.dataset.test = 'ec-datepicker__calendar-month';
    flatpickrInstance.currentYearElement.dataset.test = 'ec-datepicker__calendar-year';
  }
});

// model
const formattedValue = ref('');

onMounted(() => {
  if (flatpickrInstance.input) {
    formattedValue.value = flatpickrInstance.input.value;
  }
});

watch(() => props.modelValue, (newValue, oldValue) => {
  if (newValue && newValue !== oldValue && !datesAreEqual(newValue, oldValue)) {
    flatpickrInstance.setDate(newValue, true);
    emit('change');
  }

  if (!newValue) {
    flatpickrInstance.clear();
  }
});

function onChange() {
  /* c8 ignore start */
  if (!flatpickrInstance) {
    return;
  }
  /* c8 ignore stop */

  const dateStr = flatpickrInstance.input.value;
  const date = flatpickrInstance.selectedDates[0];
  if (dateStr && !date) {
    return;
  }
  if (date) {
    const isoDate = toIsoDate(date);

    if (disabledDatesMap?.has(isoDate)) {
      flatpickrInstance.clear();
      return;
    }

    if (props.areWeekendsDisabled && isWeekendDay(date)) {
      flatpickrInstance.clear();
      return;
    }
  }

  formattedValue.value = dateStr;

  if (datesAreEqual(date, props.modelValue)) {
    return;
  }

  emit('update:modelValue', date ?? null);
  emit('change');
}

function onBlur(evt) {
  emit('blur', evt);
  if (flatpickrInstance && !flatpickrInstance.input.value) {
    emit('update:modelValue', null);
    emit('change');
  }
}

let isTimeoutRunning = false;
// In case the datepicker is open and the user scrolls we need to reposition the datepicker otherwise will appear detached from the input.
/* c8 ignore start */
function debouncedFlatpickrReposition() {
  if (!isTimeoutRunning) {
    isTimeoutRunning = true;
    setTimeout(() => {
      isTimeoutRunning = false;
      // eslint-disable-next-line no-underscore-dangle
      flatpickrInstance._positionCalendar();
    }, 250);
  }
}
/* c8 ignore stop */

// options for flatpickr
function mergeWithDefaultOptions(options) {
  const mergedOptions = {
    ...options,
    // We need to update the time of "now" every time something changes otherwise flatpickr will only pick it once when imported.
    now: new Date(),
    allowInput: true,
    defaultDate: props.modelValue ? new Date(props.modelValue) : null,
    onDayCreate,
    onReady: [...(props.options.onReady ?? []), () => {
      emit('ready');
    }],
    onOpen: [...(props.options.onOpen ?? []), () => {
      emit('open');
      document.addEventListener('scroll', debouncedFlatpickrReposition, { capture: true, passive: true });
    }],
    onClose: [...(props.options.onClose ?? []), () => {
      document.removeEventListener('scroll', debouncedFlatpickrReposition, { capture: true, passive: true });
      emit('close');
      setTimeout(() => {
        emit('after-close');
      }, 100); // We need an event with a small delay for when datepicker is nested inside a popover. Otherwise the flatpicker on close will close the outer popover as well. We have similar event for ec-popover.
    }],
    prevArrow: '<svg><use xlink:href="#ec-simple-chevron-left"/></svg>',
    nextArrow: '<svg><use xlink:href="#ec-simple-chevron-right"/></svg>',
  };

  if (props.locale) {
    mergedOptions.locale = props.locale;
  }

  if (props.dateFormat) {
    mergedOptions.dateFormat = props.dateFormat;
  }

  return mergedOptions;
}

watch(() => props.dateFormat, (newValue) => {
  if (flatpickrInstance) {
    flatpickrInstance.set('dateFormat', newValue);
    if (flatpickrInstance.selectedDates.length) {
      flatpickrInstance.setDate(flatpickrInstance.selectedDates[0], true);
    }
  }
});

watch(() => props.locale, (newValue) => {
  if (flatpickrInstance) {
    flatpickrInstance.set('locale', newValue);
  }
});

watch(() => props.options, (newValue) => {
  const newOptions = mergeWithDefaultOptions(newValue);
  for (const [key, value] of Object.entries(newOptions)) {
    if (!key.match(/on[A-Z]/)) {
      flatpickrInstance.set(key, value);
    }
  }
});

function getEvents() {
  const events = {};
  for (const [key, value] of Object.entries(attrs)) {
    if (key.match(/^on[A-Z]/)) {
      events[key] = value;
    }
  }
  return events;
}

// disabled dates
let disabledDatesMap = new Map();

watch(() => props.disabledDates, (newValue) => {
  if (newValue) {
    disabledDatesMap = new Map(Object.entries(newValue));
  }
  if (flatpickrInstance) {
    flatpickrInstance.redraw();
  }
}, {
  immediate: true,
});

watch(() => props.areWeekendsDisabled, () => {
  if (flatpickrInstance) {
    flatpickrInstance.redraw();
  }
});

function onDayCreate(selectedDate, selectedDateFormatted, _, dayElement) {
  const date = dayElement.dateObj;
  const isoDate = toIsoDate(date);

  disableWeekends(dayElement);
  if (disabledDatesMap?.size) {
    disableSpecificDates(dayElement, isoDate);
  }

  dayElement.dataset.test = `ec-datepicker__calendar-day--${isoDate}`;
}

function disableWeekends(dayElement) {
  if (props.areWeekendsDisabled && isWeekendDay(dayElement.dateObj)) {
    setDisabledClass(dayElement);
  }
}

function disableSpecificDates(dayElement, isoDate) {
  if (disabledDatesMap.has(isoDate)) {
    setDisabledClass(dayElement);
    const reason = disabledDatesMap.get(isoDate);
    if (reason) {
      dayElement.title = reason;
    }
  }
}

function setDisabledClass(dayElement) {
  dayElement.className = `${dayElement.className} flatpickr-disabled`;
}

// helpers
function isWeekendDay(dateObj) {
  const day = dateObj.getDay();

  const isSaturday = day === 6;
  const isSunday = day === 0;

  return isSaturday || isSunday;
}

function toIsoDate(dateObj) {
  const isoDateTime = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate())).toISOString();
  const [isoDate] = isoDateTime.split('T');

  return isoDate;
}

function datesAreEqual(date1, date2) {
  if (date1 instanceof Date && date2 instanceof Date) {
    return date1.getTime() === date2.getTime();
  }

  return date1 === date2;
}
</script>

<style>
@import '../../styles/components/ec-datepicker/ec-datepicker.css';
</style>
