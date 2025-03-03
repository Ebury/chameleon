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
    :type="InputFieldType.TEXT"
    autocomplete="off"
    :icon="IconName.SIMPLE_CALENDAR"
    :class="['ec-datepicker', attrs.class]"
    :data-test="attrs['data-test'] ? `${attrs['data-test']} ec-datepicker` : 'ec-datepicker'"
    :disabled="isDisabled"
    :model-value="formattedValue"
    @icon-click="openCalendar()"
    @blur="onBlur"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import flatpickr from 'flatpickr';
import {
  onBeforeUnmount, onMounted, onUnmounted, ref, useAttrs, watch,
} from 'vue';

import type { Maybe } from '../../../global';
import { getUid } from '../../utils/uid';
import { IconName } from '../ec-icon/icon-names';
import EcInputField from '../ec-input-field';
import { InputFieldType } from '../ec-input-field/types';
import type { DatepickerProps } from './types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<DatepickerProps>(), {
  disabledDates: () => ({}),
});

const emit = defineEmits<{
  'update:modelValue': [value: Maybe<Date>],
  'ready': [],
  'open': [],
  'close': [],
  'blur': [e: FocusEvent],
  'change': [],
}>();

const uid = getUid();
const id = `ec-datepicker-${uid}`;

const inputRef = ref<InstanceType<typeof EcInputField>>();

// flatpickr instance
let flatpickrInstance: Maybe<flatpickr.Instance> = null;

onMounted(() => {
  if (inputRef.value && inputRef.value.inputRef) {
    flatpickrInstance = flatpickr(inputRef.value.inputRef, mergeWithDefaultOptions(props.options ?? {}));
  }
});

onBeforeUnmount(() => {
  if (flatpickrInstance) {
    document.removeEventListener('scroll', debouncedFlatpickrReposition, { capture: true });
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
  if (flatpickrInstance?.calendarContainer) {
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
  if (flatpickrInstance?.input) {
    formattedValue.value = flatpickrInstance.input.value;
  }
});

watch(() => props.modelValue, (newValue, oldValue) => {
  /* c8 ignore start */
  if (!flatpickrInstance) {
    return;
  }
  /* c8 ignore stop */

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

function onBlur(evt: FocusEvent) {
  emit('blur', evt);
  if (flatpickrInstance && !flatpickrInstance.input.value && props.modelValue) {
    emit('update:modelValue', null);
    emit('change');
  }
}

let isTimeoutRunning = false;
let repositionTimeoutId: ReturnType<typeof setTimeout>;
// In case the datepicker is open and the user scrolls we need to reposition the datepicker otherwise will appear detached from the input.
/* c8 ignore start */
function debouncedFlatpickrReposition() {
  if (!isTimeoutRunning) {
    isTimeoutRunning = true;
    repositionTimeoutId = setTimeout(() => {
      isTimeoutRunning = false;
      // eslint-disable-next-line no-underscore-dangle
      flatpickrInstance?._positionCalendar();
    }, 250);
  }
}

onUnmounted(() => {
  clearTimeout(repositionTimeoutId);
});
/* c8 ignore stop */

function appendDatepickerHook(existingHook: flatpickr.Options.Hook | flatpickr.Options.Hook[] | undefined, hook: flatpickr.Options.Hook) {
  if (typeof existingHook === 'undefined') {
    return [hook];
  }
  if (Array.isArray(existingHook)) {
    return [...existingHook, hook];
  }
  return [existingHook, hook];
}

// options for flatpickr
function mergeWithDefaultOptions(options: flatpickr.Options.Options): flatpickr.Options.Options {
  const mergedOptions: flatpickr.Options.Options = {
    ...options,
    disableMobile: true,
    // We need to update the time of "now" every time something changes otherwise flatpickr will only pick it once when imported.
    now: new Date(),
    allowInput: true,
    defaultDate: props.modelValue ? new Date(props.modelValue) : undefined,
    onDayCreate,
    onReady: appendDatepickerHook(options.onReady, () => {
      emit('ready');
    }),
    onOpen: appendDatepickerHook(options.onOpen, () => {
      emit('open');
      document.addEventListener('scroll', debouncedFlatpickrReposition, { capture: true, passive: true });
    }),
    onClose: appendDatepickerHook(options.onClose, () => {
      document.removeEventListener('scroll', debouncedFlatpickrReposition, { capture: true });
      emit('close');
    }),
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
  const newOptions = mergeWithDefaultOptions(newValue ?? /* c8 ignore next */ {});
  for (const [key, value] of Object.entries(newOptions)) {
    if (!key.match(/on[A-Z]/)) {
      flatpickrInstance?.set(key as keyof flatpickr.Options.Options, value);
    }
  }
});

function getEvents(): Record<string, unknown> {
  const events: Record<string, unknown> = {};
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

type DayElement = ReturnType<flatpickr.Instance['createDay']>;

function onDayCreate(selectedDate: Date[], selectedDateFormatted: string, _: flatpickr.Instance, dayElement: DayElement) {
  const date = dayElement.dateObj;
  const isoDate = toIsoDate(date);

  disableWeekends(dayElement);
  if (disabledDatesMap?.size) {
    disableSpecificDates(dayElement, isoDate);
  }

  dayElement.dataset.test = `ec-datepicker__calendar-day--${isoDate}`;
}

function disableWeekends(dayElement: DayElement) {
  if (props.areWeekendsDisabled && isWeekendDay(dayElement.dateObj)) {
    setDisabledClass(dayElement);
  }
}

function disableSpecificDates(dayElement: DayElement, isoDate: string) {
  if (disabledDatesMap.has(isoDate)) {
    setDisabledClass(dayElement);
    const reason = disabledDatesMap.get(isoDate);
    if (reason) {
      dayElement.title = reason;
    }
  }
}

function setDisabledClass(dayElement: DayElement) {
  dayElement.className = `${dayElement.className} flatpickr-disabled`;
}

// helpers
function isWeekendDay(dateObj: Date): boolean {
  const day = dateObj.getDay();

  const isSaturday = day === 6;
  const isSunday = day === 0;

  return isSaturday || isSunday;
}

function toIsoDate(dateObj: Date): string {
  const isoDateTime = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate())).toISOString();
  const [isoDate] = isoDateTime.split('T');

  return isoDate;
}

function datesAreEqual(date1?: Maybe<Date>, date2?: Maybe<Date>): boolean {
  if (date1 instanceof Date && date2 instanceof Date) {
    return date1.getTime() === date2.getTime();
  }

  return date1 === date2;
}
</script>

<style>
@import '../../styles/components/ec-datepicker/ec-datepicker.css';
</style>
