import { mount } from '@vue/test-utils';

import EcFileList from './ec-file-list.vue';

describe('EcFileList', () => {
  function mountFileList(props, mountOpts) {
    return mount(EcFileList, {
      props,
      ...mountOpts,
    });
  }

  const items = [
    { name: 'My invoice.pdf' },
    { name: 'This is a very long file name that is for testing the ellipses.pdf' },
    { name: 'DOC_123123_2423490802348_12312323.pdf' },
    { name: 'number_rates_trades.xscl' },
    { name: 'untitled.pdf' },
  ];

  describe(':props', () => {
    it('should not render any items if nothing is passed', () => {
      const wrapper = mountFileList();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render correctly if items are passed', () => {
      const wrapper = mountFileList({ items });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render the delete button as disabled if delete disabled is true', () => {
      const wrapper = mountFileList({ items, isDeleteDisabled: true });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('should emit deleted item', async () => {
      const wrapper = mountFileList({ items });
      await wrapper.findByDataTest('ec-file-list__item--1').findByDataTest('ec-file-list__delete-btn--1').trigger('click');
      expect(wrapper.emitted('delete').length).toBe(1);
    });

    it('should not emit a deleted item if delete disabled is true', async () => {
      const wrapper = mountFileList({ items, isDeleteDisabled: true });
      await wrapper.findByDataTest('ec-file-list__item--1').findByDataTest('ec-file-list__delete-btn--1').trigger('click');
      expect(wrapper.emitted('delete')).toBeUndefined();
    });
  });
});
