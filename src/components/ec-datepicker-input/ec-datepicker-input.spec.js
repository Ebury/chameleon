import { mount } from '@vue/test-utils';
import EcDatepickerInput from './ec-datepicker-input.vue';

describe('Datepicker', () => {
  function mountDatepickerInput(props, mountOpts) {
    return mount(EcDatepickerInput, {
      propsData: { ...props },
      ...mountOpts,
    });
  }

  it('should render properly', () => {
    const wrapper = mountDatepickerInput();

    expect(wrapper.element).toMatchSnapshot();
  });

  describe(':props', () => {
    it('should render with a label', () => {
      const wrapper = mountDatepickerInput({
        label: 'Datepicker input label',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a note', () => {
      const wrapper = mountDatepickerInput({
        note: 'Datepicker note',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a bottom note', () => {
      const wrapper = mountDatepickerInput({
        bottomNote: 'Datepicker bottom note',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a bottom note in a warning state', () => {
      const wrapper = mountDatepickerInput({
        bottomNote: 'Datepicker bottom note',
        isWarning: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a placeholder', () => {
      const wrapper = mountDatepickerInput({
        placeholder: 'Datepicker placeholder',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with an error message', () => {
      const wrapper = mountDatepickerInput({
        errorMessage: 'A random error message',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render as disabled', () => {
      const wrapper = mountDatepickerInput({
        isDisabled: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
