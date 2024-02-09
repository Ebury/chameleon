import fakeTimers, { type InstalledClock } from '@sinonjs/fake-timers';
import {
  type ComponentMountingOptions, DOMWrapper, mount, VueWrapper,
} from '@vue/test-utils';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { vi } from 'vitest';
import { defineComponent, ref } from 'vue';

import type { Maybe } from '../../../global';
import { ZIndexLevel } from '../../enums';
import EcDatepicker from './ec-datepicker.vue';
import type { DatepickerProps } from './types';

describe('Datepicker', () => {
  let clock: InstalledClock;

  beforeEach(() => {
    clock = fakeTimers.install({
      now: new Date('2022-02-22'),
      toFake: ['Date'],
    });

    flatpickr.setDefaults({
      position: () => {}, // We need to fix the position. On the CI/JSDOM is flaky if we do not and will produce snapshots with random positions.
    });
  });

  afterEach(() => {
    if (clock) {
      clock.uninstall();
    }

    flatpickr.setDefaults({
      position: 'auto',
    });
  });

  function mountDatepicker(props?: DatepickerProps, mountOpts?: ComponentMountingOptions<typeof EcDatepicker>) {
    const inputWrapper = mount(EcDatepicker, {
      props,
      ...mountOpts,
    });

    const calendarWrapper = new DOMWrapper(document.body).findByDataTest('ec-datepicker__calendar');

    return { inputWrapper, calendarWrapper };
  }

  it('should render properly', () => {
    const { inputWrapper } = mountDatepicker();

    expect(inputWrapper.element).toMatchSnapshot();
  });

  it('should pass the data-test, class and style down to the input', () => {
    const { inputWrapper } = mountDatepicker({}, {
      attrs: {
        'data-test': 'my-data-test',
        class: 'my-class',
        style: 'color: hotpink',
      },
    });

    expect(inputWrapper.element).toMatchSnapshot();
  });

  it('should not pass any additional attributes to the input', () => {
    const { inputWrapper } = mountDatepicker({}, {
      attrs: {
        'data-my-id': 'my-id',
        'aria-label': 'input',
      },
    });

    expect(inputWrapper.element).toMatchSnapshot();
  });

  describe(':props', () => {
    it('should render with a label', () => {
      const { inputWrapper } = mountDatepicker({
        label: 'Datepicker label',
      });

      expect(inputWrapper.element).toMatchSnapshot();
    });

    it('should render with a note', () => {
      const { inputWrapper } = mountDatepicker({
        note: 'Datepicker note',
      });

      expect(inputWrapper.element).toMatchSnapshot();
    });

    it('should render with a bottom note', () => {
      const { inputWrapper } = mountDatepicker({
        bottomNote: 'Datepicker bottom note',
      });

      expect(inputWrapper.element).toMatchSnapshot();
    });

    it('should render with a bottom note in a warning state', () => {
      const { inputWrapper } = mountDatepicker({
        bottomNote: 'Datepicker bottom note',
        isWarning: true,
      });

      expect(inputWrapper.element).toMatchSnapshot();
    });

    it('should render with a placeholder', () => {
      const { inputWrapper } = mountDatepicker({
        placeholder: 'Datepicker placeholder',
      });

      expect(inputWrapper.element).toMatchSnapshot();
    });

    it('should render with an error message', () => {
      const { inputWrapper } = mountDatepicker({
        errorMessage: 'A random error message',
      });

      expect(inputWrapper.element).toMatchSnapshot();
    });

    it('should render as disabled', () => {
      const { inputWrapper } = mountDatepicker({
        isDisabled: true,
      });

      expect(inputWrapper.element).toMatchSnapshot();
    });

    it('should have disabled a specific date', () => {
      const { calendarWrapper } = mountDatepicker({
        disabledDates: {
          '2022-02-22': 'Bank holiday',
          '2022-02-23': '',
        },
      });

      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-22').classes('flatpickr-disabled')).toBe(true);
      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-22').attributes('title')).toBe('Bank holiday');
      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-23').classes('flatpickr-disabled')).toBe(true);
      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-23').attributes('title')).toBe(undefined);

      expect(calendarWrapper.element).toMatchSnapshot('calendar');
    });

    it('should have disabled weekends', () => {
      const { calendarWrapper } = mountDatepicker({
        areWeekendsDisabled: true,
      });

      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-19').classes('flatpickr-disabled')).toBe(true);
      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-20').classes('flatpickr-disabled')).toBe(true);

      expect(calendarWrapper.element).toMatchSnapshot('calendar');
    });

    it('should render with given level', () => {
      const { calendarWrapper } = mountDatepicker({ level: ZIndexLevel.LEVEL3 });
      expect(calendarWrapper.element).toMatchSnapshot();
    });

    it('should render with Spanish locale', () => {
      const { calendarWrapper } = mountDatepicker({
        locale: Spanish,
      });

      expect(calendarWrapper.element).toMatchSnapshot('calendar');
    });

    it('should render with the dateFormat given', () => {
      const { inputWrapper } = mountDatepicker({
        dateFormat: 'd/m/Y',
        modelValue: new Date('2022-02-22'),
      });

      expect(inputWrapper.findByDataTest<HTMLInputElement>('ec-datepicker').element.value).toBe('22/02/2022');
    });
  });

  it('should open the calendar when we click on the input icon', async () => {
    const { inputWrapper, calendarWrapper } = mountDatepicker();

    await inputWrapper
      .findByDataTest('ec-input-field__icon')
      .trigger('click');

    expect(calendarWrapper.element).toMatchSnapshot();
  });

  describe('@events', () => {
    it('@ready - should be emitted when the calendar is in a ready state', () => {
      const { inputWrapper } = mountDatepicker();

      expect(inputWrapper.emitted('ready')?.length).toBe(1);
    });

    it('@open - should be emitted when the calendar opens', () => {
      const { inputWrapper } = mountDatepicker();

      inputWrapper
        .findByDataTest<HTMLInputElement>('ec-datepicker')
        .trigger('click');

      expect(inputWrapper.emitted('open')?.length).toBe(1);
    });

    it('@close - should be emitted when the calendar closes', () => {
      const { inputWrapper, calendarWrapper } = mountDatepicker({ modelValue: new Date('2022-02-20') });

      inputWrapper
        .findByDataTest<HTMLInputElement>('ec-datepicker')
        .trigger('click');

      calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-24')
        .trigger('click');

      expect(inputWrapper.emitted('close')?.length).toBe(1);
    });

    it('@blur - should be emitted when the input blurs', async () => {
      const { inputWrapper } = mountDatepicker();

      await inputWrapper.findByDataTest<HTMLInputElement>('ec-datepicker').trigger('blur');

      expect(inputWrapper.emitted('blur')?.length).toBe(1);
    });

    it('@change - should be emitted when the value changes', async () => {
      const { inputWrapper } = mountDatepicker();

      await setDatepickerInputValue(inputWrapper, '2022-01-21');

      expect(inputWrapper.emitted('change')?.length).toBe(1);
    });

    it('should pass custom events to the input', async () => {
      const customEventSpy = vi.fn();

      const { inputWrapper } = mountDatepicker({}, {
        attrs: {
          onCustomEvent: customEventSpy,
        },
      });

      await inputWrapper.findByDataTest<HTMLInputElement>('ec-datepicker').trigger('custom-event');

      expect(customEventSpy).toHaveBeenCalledTimes(1);
      expect(inputWrapper.emitted('custom-event')).toBeUndefined();
    });

    it('should merge a datepicker event given via props', () => {
      const onReadySpy = vi.fn();

      const { inputWrapper } = mountDatepicker({
        options: {
          onReady: onReadySpy,
        },
      });

      expect(inputWrapper.emitted('ready')?.length).toBe(1);
      expect(onReadySpy).toHaveBeenCalledTimes(1);
    });

    it('should merge an array of datepicker events given via props', () => {
      const onReadySpy1 = vi.fn();
      const onReadySpy2 = vi.fn();

      const { inputWrapper } = mountDatepicker({
        options: {
          onReady: [onReadySpy1, onReadySpy2],
        },
      });

      expect(inputWrapper.emitted('ready')?.length).toBe(1);
      expect(onReadySpy1).toHaveBeenCalledTimes(1);
      expect(onReadySpy2).toHaveBeenCalledTimes(1);
    });
  });

  describe('watchers', () => {
    it('should update options after initialization', async () => {
      const { inputWrapper, calendarWrapper } = mountDatepicker({
        options: {},
      });

      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-21').classes('flatpickr-disabled')).toBe(false);

      await inputWrapper.setProps({
        options: {
          minDate: '2022-02-22',
        },
      });

      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-21').classes('flatpickr-disabled')).toBe(true);
      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-22').classes('flatpickr-disabled')).toBe(false);
    });

    it('should not update with custom hooks after initialization', async () => {
      const { inputWrapper, calendarWrapper } = mountDatepicker({
        options: {},
      });

      const onChangeSpy = vi.fn();

      await inputWrapper.setProps({
        options: {
          onChange: onChangeSpy,
        },
      });

      calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-24')
        .trigger('click');

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('should watch if weekend are disabled', async () => {
      const { inputWrapper, calendarWrapper } = mountDatepicker({
        areWeekendsDisabled: true,
      });

      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-19').classes('flatpickr-disabled')).toBe(true);
      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-20').classes('flatpickr-disabled')).toBe(true);

      await inputWrapper.setProps({
        areWeekendsDisabled: false,
      });

      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-19').classes('flatpickr-disabled')).toBe(false);
      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-20').classes('flatpickr-disabled')).toBe(false);
    });

    it('should update the disabled date', async () => {
      const { inputWrapper, calendarWrapper } = mountDatepicker({
        disabledDates: {
          '2022-02-22': 'Bank holiday',
        },
      });

      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-22').classes('flatpickr-disabled')).toBe(true);
      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-22').attributes('title')).toBe('Bank holiday');

      await inputWrapper.setProps({
        disabledDates: {
          '2022-02-23': 'Bank holiday',
        },
      });

      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-22').classes('flatpickr-disabled')).toBe(false);
      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-22').attributes('title')).toBe(undefined);

      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-23').classes('flatpickr-disabled')).toBe(true);
      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-23').attributes('title')).toBe('Bank holiday');
    });

    it('should update the dateFormat date', async () => {
      const { inputWrapper, calendarWrapper } = mountDatepicker({});
      await calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-24')
        .trigger('click');

      expect(inputWrapper.findByDataTest<HTMLInputElement>('ec-datepicker').element.value).toBe('2022-02-24');

      await inputWrapper.setProps({
        dateFormat: 'd/m/Y',
      });

      expect(inputWrapper.findByDataTest<HTMLInputElement>('ec-datepicker').element.value).toBe('24/02/2022');
    });

    it('should update the locale', async () => {
      const { inputWrapper, calendarWrapper } = mountDatepicker({});

      expect(calendarWrapper.element).toMatchSnapshot('calendar');

      await inputWrapper.setProps({
        locale: Spanish,
      });

      expect(calendarWrapper.element).toMatchSnapshot('calendar');
    });
  });

  describe('v-model', () => {
    type DatepickerWrapperData = Record<string, unknown> & {
      model: Maybe<Date>
    };

    it('should have preselected default date', () => {
      const Component = defineComponent({
        components: { EcDatepicker },
        data() {
          return {
            model: new Date('2022-02-22'),
          };
        },
        template: '<ec-datepicker v-model="model" />',
      });

      const inputWrapper = mount(Component);

      expect(inputWrapper.vm.model.getTime()).toBe(new Date('2022-02-22').getTime());
      expect(inputWrapper.findByDataTest<HTMLInputElement>('ec-datepicker').element.value).toBe('2022-02-22');
    });

    it('should update the value of the calendar when I type a value', async () => {
      const Component = defineComponent({
        components: { EcDatepicker },
        setup() {
          const model = ref<Maybe<Date>>(null);
          return { model };
        },
        template: '<ec-datepicker v-model="model" />',
      });

      const inputWrapper = mount(Component);
      await setDatepickerInputValue(inputWrapper, '2022-02-23');

      expect(inputWrapper.findByDataTest<HTMLInputElement>('ec-datepicker').element.value).toBe('2022-02-23');
      expect(inputWrapper.vm.model?.getTime()).toBe(new Date(2022, 1, 23).getTime());
    });

    it('should clear the value in the input when a null gets passed to the model', async () => {
      const Component = defineComponent({
        components: { EcDatepicker },
        data(): DatepickerWrapperData {
          return {
            model: new Date('2022-02-23'),
          };
        },
        template: '<ec-datepicker v-model="model" />',
      });

      const inputWrapper = mount(Component);

      await inputWrapper.setData({
        model: null,
      });

      expect(inputWrapper.findByDataTest<HTMLInputElement>('ec-datepicker').element.value).toBe('');
    });

    it('should clear the model value when the input value gets deleted', async () => {
      const Component = defineComponent({
        components: { EcDatepicker },
        data(): DatepickerWrapperData {
          return {
            model: new Date('2022-02-23'),
          };
        },
        template: '<ec-datepicker v-model="model" />',
      });

      const inputWrapper = mount(Component);

      await setDatepickerInputValue(inputWrapper, '');

      expect(inputWrapper.findByDataTest<HTMLInputElement>('ec-datepicker').element.value).toBe('');
      expect(inputWrapper.vm.model).toBe(null);
    });

    it('should update the value of the calendar when I select a value from the datepicker', async () => {
      const Component = defineComponent({
        components: { EcDatepicker },
        data(): DatepickerWrapperData {
          return {
            model: null,
          };
        },
        template: '<ec-datepicker v-model="model" />',
      });

      const inputWrapper = mount(Component);
      const calendarWrapper = getCalendarWrapper();

      await calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-24')
        .trigger('click');

      expect(inputWrapper.vm.model?.getTime()).toBe(new Date(2022, 1, 24).getTime());
    });

    it('should not allow to select a date smaller than the minDate', () => {
      const Component = defineComponent({
        components: { EcDatepicker },
        data(): DatepickerWrapperData {
          return {
            model: null,
            options: {
              minDate: '2022-02-22',
            },
          };
        },
        template: '<ec-datepicker v-model="model" :options="options" />',
      });

      const inputWrapper = mount(Component);
      const calendarWrapper = getCalendarWrapper();

      calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-21')
        .trigger('click');

      expect(inputWrapper.vm.model).toBe(null);

      calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-22')
        .trigger('click');

      expect(inputWrapper.vm.model?.getTime()).toBe(new Date(2022, 1, 22).getTime());
    });

    it('should not allow to type a date smaller than the minDate', async () => {
      const Component = defineComponent({
        components: { EcDatepicker },
        data(): DatepickerWrapperData {
          return {
            model: null,
            options: {
              minDate: '2022-02-22',
            },
          };
        },
        template: '<ec-datepicker v-model="model" :options="options"/>',
      });

      const inputWrapper = mount(Component);

      await setDatepickerInputValue(inputWrapper, '2022-02-18');

      expect(inputWrapper.vm.model).toBe(null);
    });

    it('should not allow to select a date bigger than the maxDate', () => {
      const Component = defineComponent({
        components: { EcDatepicker },
        data(): DatepickerWrapperData {
          return {
            model: null,
            options: {
              maxDate: '2022-02-22',
            },
          };
        },
        template: '<ec-datepicker v-model="model" :options="options" />',
      });

      const inputWrapper = mount(Component);
      const calendarWrapper = getCalendarWrapper();

      calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-23')
        .trigger('click');

      expect(inputWrapper.vm.model).toBe(null);

      calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-22')
        .trigger('click');

      expect(inputWrapper.vm.model?.getTime()).toBe(new Date(2022, 1, 22).getTime());
    });

    it('should not allow to type a date bigger than the maxDate', async () => {
      const Component = defineComponent({
        components: { EcDatepicker },
        data(): DatepickerWrapperData {
          return {
            model: null,
            options: {
              maxDate: '2022-02-22',
            },
          };
        },
        template: '<ec-datepicker v-model="model" :options="options"/>',
      });

      const inputWrapper = mount(Component);
      await setDatepickerInputValue(inputWrapper, '2022-02-23');

      expect(inputWrapper.vm.model).toBe(null);
    });

    it('should not allow to select a bank holiday', () => {
      const Component = defineComponent({
        components: { EcDatepicker },
        data(): DatepickerWrapperData {
          return {
            model: null,
            disabledDates: {
              '2022-02-22': 'Bank holiday',
            },
          };
        },
        template: '<ec-datepicker v-model="model" :disabled-dates="disabledDates"/>',
      });

      const inputWrapper = mount(Component);
      const calendarWrapper = getCalendarWrapper();

      calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-22')
        .trigger('click');

      expect(inputWrapper.vm.model).toBe(null);
    });

    it('should not allow to type a bank holiday', async () => {
      const Component = defineComponent({
        components: { EcDatepicker },
        data(): DatepickerWrapperData {
          return {
            model: null,
            disabledDates: {
              '2022-02-22': 'Bank holiday',
            },
          };
        },
        template: '<ec-datepicker v-model="model" :disabled-dates="disabledDates"/>',
      });

      const inputWrapper = mount(Component);

      await setDatepickerInputValue(inputWrapper, '2022-02-22');
      expect(inputWrapper.vm.model).toBe(null);
    });

    it('should not allow to select a weekend', () => {
      const Component = defineComponent({
        components: { EcDatepicker },
        data(): DatepickerWrapperData {
          return {
            model: null,
            areWeekendsDisabled: true,
          };
        },
        template: '<ec-datepicker v-model="model" :are-weekends-disabled="areWeekendsDisabled"/>',
      });

      const inputWrapper = mount(Component);
      const calendarWrapper = getCalendarWrapper();

      const saturday = 'ec-datepicker__calendar-day--2022-02-19';
      const sunday = 'ec-datepicker__calendar-day--2022-02-20';

      calendarWrapper
        .findByDataTest(saturday)
        .trigger('click');

      expect(inputWrapper.vm.model).toBe(null);

      calendarWrapper
        .findByDataTest(sunday)
        .trigger('click');

      expect(inputWrapper.vm.model).toBe(null);
    });

    it('should not allow to type a weekend', async () => {
      const Component = defineComponent({
        components: { EcDatepicker },
        data(): DatepickerWrapperData {
          return {
            model: null,
            areWeekendsDisabled: true,
          };
        },
        template: '<ec-datepicker v-model="model" :are-weekends-disabled="areWeekendsDisabled"/>',
      });
      const inputWrapper = mount(Component);

      const saturday = '2022-02-19';
      const sunday = '2022-02-20';

      await setDatepickerInputValue(inputWrapper, saturday);
      expect(inputWrapper.vm.model).toBe(null);

      await setDatepickerInputValue(inputWrapper, sunday);
      expect(inputWrapper.vm.model).toBe(null);
    });
  });
});

function getCalendarWrapper(): DOMWrapper<HTMLDivElement> {
  return new DOMWrapper(document.body).findByDataTest('ec-datepicker__calendar');
}

async function setDatepickerInputValue(inputWrapper: VueWrapper, value: string) {
  inputWrapper.findByDataTest<HTMLInputElement>('ec-datepicker').setValue(value);
  // When allowInput is true, flatpickr is listening to blur event
  // https://github.com/flatpickr/flatpickr/blob/master/src/index.ts#L493
  await inputWrapper.findByDataTest<HTMLInputElement>('ec-datepicker').trigger('blur');
}
