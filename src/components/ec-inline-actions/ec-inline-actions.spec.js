import { shallowMount } from '@vue/test-utils';
import EcInlineActions from '@/components/ec-inline-actions/ec-inline-actions.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcInlineActions', () => {
  it('should throw if no items prop were given', () => {
    withMockedConsole((errorSpy) => {
      shallowMount(EcInlineActions);
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "items"');
    });
  });

  it('should render properly when an item was given', () => {
    const wrapper = shallowMount(EcInlineActions,
      {
        propsData: {
          items: [
            [
              {
                text: 'test',
              },
            ],
          ],
        },
      });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render properly with the anchor when the item have a href', () => {
    const wrapper = shallowMount(EcInlineActions,
      {
        propsData: {
          items: [
            [
              {
                text: 'test',
                href: 'random',
              },
            ],
          ],
        },
      });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render properly the item with the download attr', () => {
    const wrapper = shallowMount(EcInlineActions,
      {
        propsData: {
          items: [
            [
              {
                text: 'test',
                href: 'random',
                download: 'random.jpg',
              },
            ],
          ],
        },
      });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render properly the item with the download attr empty', () => {
    const wrapper = shallowMount(EcInlineActions,
      {
        propsData: {
          items: [
            [
              {
                text: 'test',
                href: 'random',
                download: '',
              },
            ],
          ],
        },
      });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render properly with out the disabled href and download attrs', () => {
    const wrapper = shallowMount(EcInlineActions,
      {
        propsData: {
          items: [
            [
              {
                text: 'test',
                href: 'random',
                download: '',
                disabled: true,
              },
            ],
          ],
        },
      });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the item disabled when an item was given disabled', () => {
    const wrapper = shallowMount(EcInlineActions,
      {
        propsData: {
          items: [
            [
              {
                text: 'test', disabled: true,
              },
            ],
          ],
        },
      });
    expect(wrapper.findByDataTest('ec-inline-actions__button').attributes('disabled')).toBe('disabled');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with one line break when a different arrays was given', () => {
    const wrapper = shallowMount(EcInlineActions,
      {
        propsData: {
          items: [
            [
              {
                text: 'Reject',
              },
            ],
            [
              { text: 'Cancel' },
            ],
          ],
        },
      });

    expect(wrapper.findByDataTest('ec-inline-actions__delimiter').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with tooltip', () => {
    const wrapper = shallowMount(EcInlineActions,
      {
        propsData: {
          items: [
            [
              {
                text: 'test', tooltip: 'Test tooltip',
              },
            ],
          ],
        },
      });

    expect(wrapper.find('.ec-has-tooltip').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should trigger the given action', () => {
    const mockCallBack = jest.fn();
    const wrapper = shallowMount(EcInlineActions,
      {
        propsData: {
          items: [
            [
              {
                action: mockCallBack, text: 'test',
              },
            ],
          ],
        },
      });
    expect(mockCallBack).toHaveBeenCalledTimes(0);
    expect(wrapper.findByDataTest('ec-inline-actions__button').exists()).toBe(true);
    wrapper.findByDataTest('ec-inline-actions__button').trigger('click');
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });

  it('should not throw if action is null', () => {
    withMockedConsole((errorSpy) => {
      const wrapper = shallowMount(EcInlineActions,
        {
          propsData: {
            items: [
              [
                {
                  action: null, text: 'test',
                },
              ],
            ],
          },
        });

      expect(wrapper.findByDataTest('ec-inline-actions__button').exists()).toBe(true);
      wrapper.findByDataTest('ec-inline-actions__button').trigger('click');
      expect(errorSpy).not.toHaveBeenCalled();
    });
  });

  it('should render the item with an icon when a item was given with an icon', () => {
    const wrapper = shallowMount(EcInlineActions,
      {
        propsData: {
          items: [
            [
              {
                text: 'test', icon: 'simple-block', iconType: 'warning',
              },
            ],
          ],
        },
      });
    expect(wrapper.find('ec-icon-stub').attributes('name')).toBe('simple-block');
    expect(wrapper.find('ec-icon-stub').attributes('type')).toBe('warning');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the item with default popover options', () => {
    const wrapper = shallowMount(EcInlineActions,
      {
        propsData: {
          items: [
            [
              {
                text: 'test', icon: 'simple-block',
              },
            ],
          ],
        },
      });
    expect(wrapper.find('ec-popover-stub').attributes('placement')).toBe('bottom-start');
    expect(wrapper.find('ec-popover-stub').attributes('offset')).toBe('10');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the item with given popover options', () => {
    const wrapper = shallowMount(EcInlineActions,
      {
        propsData: {
          popoverOptions: {
            placement: 'top',
            offset: 20,
          },
          items: [
            [
              {
                text: 'test', icon: 'simple-block',
              },
            ],
          ],
        },
      });
    expect(wrapper.find('ec-popover-stub').attributes('placement')).toBe('top');
    expect(wrapper.find('ec-popover-stub').attributes('offset')).toBe('20');
    expect(wrapper.element).toMatchSnapshot();
  });
});
