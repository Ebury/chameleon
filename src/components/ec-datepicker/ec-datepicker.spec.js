import {
  mount,
  createWrapper,
  createLocalVue,
} from '@vue/test-utils';
import fakeTimers from '@sinonjs/fake-timers';
import EcDatepicker from './ec-datepicker.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('Datepicker', () => {
  let clock;

  beforeEach(() => {
    clock = fakeTimers.install({
      now: new Date('2022-02-22'),
      toFake: ['Date'],
    });
  });

  afterEach(() => {
    if (clock) {
      clock.uninstall();
    }
  });

  function mountDatepicker(props, mountOpts) {
    const inputWrapper = mount(EcDatepicker, {
      propsData: { ...props },
      ...mountOpts,
    });

    const calendarWrapper = createWrapper(document.body).findByDataTest('ec-datepicker__calendar');

    return { inputWrapper, calendarWrapper };
  }

  function mountDatepickerAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      components: { EcDatepicker },
      template,
      ...wrapperComponentOpts,
    });

    const inputWrapper = mount(Component, {
      propsData: { ...props },
      ...mountOpts,
    });

    const calendarWrapper = createWrapper(document.body).findByDataTest('ec-datepicker__calendar');

    return { inputWrapper, calendarWrapper };
  }

  it('should render properly', () => {
    const { inputWrapper } = mountDatepicker();

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

    it.each([
      ['modal', false],
      ['tooltip', false],
      ['notification', false],
      ['level-1', false],
      ['level-2', false],
      ['level-3', false],
      ['random', true],
    ])('should validate if the level prop("%s") is on the allowed array of strings', (str, error) => {
      if (error) {
        withMockedConsole((errorSpy) => {
          mountDatepicker({ level: str });
          expect(errorSpy).toHaveBeenCalledTimes(1);
          expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "level"');
        });
      } else {
        const { calendarWrapper } = mountDatepicker({ level: str });
        expect(calendarWrapper.element).toMatchSnapshot();
      }
    });
  });

  it('should open the calendar when we click on the input icon', () => {
    const { inputWrapper, calendarWrapper } = mountDatepicker();

    inputWrapper
      .findByDataTest('ec-input-field__icon')
      .trigger('click');

    expect(calendarWrapper.element).toMatchSnapshot();
  });

  describe('@events', () => {
    it('@ready - should be emitted when the calendar is in a ready state', () => {
      const { inputWrapper } = mountDatepicker();

      expect(inputWrapper.emitted('ready').length).toBe(1);
    });

    it('@open - should be emitted when the calendar opens', () => {
      const { inputWrapper } = mountDatepicker();

      inputWrapper
        .findByDataTest('ec-datepicker')
        .trigger('click');

      expect(inputWrapper.emitted('open').length).toBe(1);
    });

    it('@close - should be emitted when the calendar closes', () => {
      const { inputWrapper, calendarWrapper } = mountDatepicker({ value: '2022-02-20' });

      inputWrapper
        .findByDataTest('ec-datepicker')
        .trigger('click');

      calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-24')
        .trigger('click');

      expect(inputWrapper.emitted('close').length).toBe(1);
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

      const onChangeSpy = jest.fn();

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
  });

  describe('v-model', () => {
    it('should have preselected default date', () => {
      const { inputWrapper } = mountDatepickerAsTemplate(
        '<ec-datepicker v-model="model" />',
        {},
        {
          data() {
            return {
              model: '2022-02-22',
            };
          },
        },
      );

      expect(inputWrapper.vm.model).toBe('2022-02-22');
    });

    it('should update the value of the calendar when I type a value', async () => {
      const { inputWrapper } = mountDatepickerAsTemplate(
        '<ec-datepicker v-model="model" />',
        {},
        {
          data() {
            return {
              model: '',
            };
          },
        },
      );

      await inputWrapper.findByDataTest('ec-input-field__input').setValue('2022-02-23');

      expect(inputWrapper.vm.model).toBe('2022-02-23');
    });

    it('should update the value of the calendar when I select a value from the datepicker', async () => {
      const { inputWrapper, calendarWrapper } = mountDatepickerAsTemplate(
        '<ec-datepicker v-model="model" />',
        {},
        {
          data() {
            return {
              model: '',
            };
          },
        },
      );

      await calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-24')
        .trigger('click');

      expect(inputWrapper.vm.model).toBe('2022-02-24');
    });

    it('should not allow to set a date smaller than the minDate', () => {
      const { inputWrapper, calendarWrapper } = mountDatepickerAsTemplate(
        '<ec-datepicker v-model="model" :options="options" />',
        {},
        {
          data() {
            return {
              model: null,
              options: {
                minDate: '2022-02-22',
              },
            };
          },
        },
      );

      calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-21')
        .trigger('click');

      expect(inputWrapper.vm.model).toBe(null);

      calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-22')
        .trigger('click');

      expect(inputWrapper.vm.model).toBe('2022-02-22');
    });

    it('should not allow to set a date bigger than the minDate', () => {
      const { inputWrapper, calendarWrapper } = mountDatepickerAsTemplate(
        '<ec-datepicker v-model="model" :options="options" />',
        {},
        {
          data() {
            return {
              model: null,
              options: {
                maxDate: '2022-02-22',
              },
            };
          },
        },
      );

      calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-23')
        .trigger('click');

      expect(inputWrapper.vm.model).toBe(null);

      calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-22')
        .trigger('click');

      expect(inputWrapper.vm.model).toBe('2022-02-22');
    });
  });
});
