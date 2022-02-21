import { mount } from '@vue/test-utils';
import EcDatepicker from './ec-datepicker.vue';

describe('Datepicker', () => {
  function mountDatepicker(props, mountOpts) {
    return mount(EcDatepicker, {
      propsData: { ...props },
      ...mountOpts,
    });
  }

  it('should render properly', () => {
    const wrapper = mountDatepicker();

    expect(wrapper.element).toMatchSnapshot();
  });

  describe(':props', () => {
    it('should render with a label', () => {
      const wrapper = mountDatepicker({
        label: 'Datepicker label',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a note', () => {
      const wrapper = mountDatepicker({
        note: 'Datepicker note',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a bottom note', () => {
      const wrapper = mountDatepicker({
        bottomNote: 'Datepicker bottom note',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a bottom note in a warning state', () => {
      const wrapper = mountDatepicker({
        bottomNote: 'Datepicker bottom note',
        isWarning: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a placeholder', () => {
      const wrapper = mountDatepicker({
        placeholder: 'Datepicker placeholder',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with an error message', () => {
      const wrapper = mountDatepicker({
        errorMessage: 'A random error message',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render as disabled', () => {
      const wrapper = mountDatepicker({
        isDisabled: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
