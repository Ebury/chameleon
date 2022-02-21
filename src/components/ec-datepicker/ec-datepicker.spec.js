import {
  mount,
  createWrapper,
  createLocalVue,
} from '@vue/test-utils';
import EcDatepicker from './ec-datepicker.vue';

describe('Datepicker', () => {
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

    it('should have a disabled date', () => {
      const { calendarWrapper } = mountDatepicker({
        disabledDates: {
          '2022-02-22': '',
        },
      });

      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-22').classes('flatpickr-disabled')).toBe(true);

      expect(calendarWrapper.element).toMatchSnapshot('calendar');
    });

    it('should have a disabled weekends', () => {
      const { calendarWrapper } = mountDatepicker({
        areWeekendsDisabled: true,
      });

      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-19').classes('flatpickr-disabled')).toBe(true);
      expect(calendarWrapper.findByDataTest('ec-datepicker__calendar-day--2022-02-20').classes('flatpickr-disabled')).toBe(true);

      expect(calendarWrapper.element).toMatchSnapshot('calendar');
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

      expect(inputWrapper.findByDataTest('ec-input-field__input').element.value).toBe('2022-02-22');
    });

    it('should update the value of the calendar when I type a value', () => {
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

      inputWrapper.findByDataTest('ec-input-field__input').setValue('2022-02-23');

      expect(inputWrapper.findByDataTest('ec-input-field__input').element.value).toBe('2022-02-23');
    });

    it('should update the value of the calendar when I select a value from the datepicker', () => {
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

      calendarWrapper
        .findByDataTest('ec-datepicker__calendar-day--2022-02-24')
        .trigger('click');

      expect(inputWrapper.findByDataTest('ec-input-field__input').element.value).toBe('2022-02-24');
    });

    // TODO test min date
    // TODO test max date
  });
});
