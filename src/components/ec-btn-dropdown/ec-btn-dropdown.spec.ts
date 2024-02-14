import { type ComponentMountingOptions, mount } from '@vue/test-utils';
import { vi } from 'vitest';
import type { ComponentExposed } from 'vue-component-type-helpers';

import EcBtnDropdown from './ec-btn-dropdown.vue';
import type { BtnDropdownItem, BtnDropdownProps } from './types';

type EcBtnDropdownExposed = ComponentExposed<typeof EcBtnDropdown>;

describe('EcBtnDropdown', () => {
  function mountBtnDropdown(props?: Partial<BtnDropdownProps>, mountOpts?: ComponentMountingOptions<EcBtnDropdownExposed>) {
    return mount<EcBtnDropdownExposed>(EcBtnDropdown, {
      props: {
        buttonText: 'Convert & Pay',
        ...props,
      },
      ...mountOpts,
    });
  }

  const items: BtnDropdownItem<string>[] = [
    { value: 'Spot', text: 'Spot' },
    { value: 'Convert', text: 'Convert' },
  ];

  it('should render as expected', () => {
    const wrapper = mountBtnDropdown();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with custom attributes', () => {
    const wrapper = mountBtnDropdown({}, {
      attrs: {
        'data-test': 'my-data-test',
        class: 'my-class',
        id: 'test-id',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with a list of options on the dropdown search', () => {
    const wrapper = mountBtnDropdown({ items });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as opened while the dropdown is opened', async () => {
    const wrapper = mountBtnDropdown();
    await wrapper.findByDataTest('ec-popover-stub').trigger('show');
    expect(wrapper.element).toMatchSnapshot('opened');

    await wrapper.findByDataTest('ec-popover-stub').trigger('hide');
    expect(wrapper.element).toMatchSnapshot('closed');
  });

  it('should use given list-data-test prop', () => {
    const wrapper = mountBtnDropdown({
      items,
      listDataTest: 'my-test-list',
    });

    expect(wrapper.findByDataTest('my-test-list').element).toMatchSnapshot();
  });

  it('should emit the click event when the user clicks on the primary button', async () => {
    const wrapper = mountBtnDropdown();

    await wrapper.findByDataTest('ec-btn-dropdown__btn').trigger('click');
    expect(wrapper.emitted('click')?.length).toBe(1);
  });

  it('should emit the change event when the user clicks on an item of the dropdown list', async () => {
    const wrapper = mountBtnDropdown({ items });

    await wrapper.findByDataTest('ec-btn-dropdown__dropdown-btn').trigger('click');
    await wrapper.findAllByDataTest<HTMLLIElement>('ec-dropdown-search__item').at(0)?.trigger('click');

    expect(wrapper.emitted('change')?.length).toBe(1);
    expect(wrapper.emitted('change')?.[0]).toEqual([items[0]]);
  });

  it("should attach 'attrs' to the rendered anchor", async () => {
    const clickSpy = vi.fn();
    const wrapper = mountBtnDropdown({
      items: [{
        href: '#/convert-and-pay/',
        attrs: {
          id: 'item-link-id',
          onClick: clickSpy,
        },
        text: 'Convert & Pay',
      }],
    });
    await wrapper.findByDataTest('ec-btn-dropdown__dropdown-btn').trigger('click');
    expect(wrapper.findByDataTest('ec-dropdown-search__item--0').element).toMatchSnapshot();
    await wrapper.findByDataTest('ec-btn-dropdown__item-link--0').trigger('click');
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit a click event when the CTA button is clicked', async () => {
    const clickSpy = vi.fn();
    const wrapper = mountBtnDropdown({}, { attrs: { onClick: clickSpy } });
    await wrapper.findByDataTest('ec-btn-dropdown__btn').trigger('click');
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  describe('when a menu item is disabled', () => {
    it('should be a non clickable DOM element', async () => {
      const clickSpy = vi.fn();
      const wrapper = mountBtnDropdown({
        items: [{
          href: '#/convert-and-pay',
          attrs: {
            onClick: clickSpy,
          },
          text: 'Convert & Pay',
          disabled: true,
        }],
      });

      await wrapper.findByDataTest('ec-btn-dropdown__dropdown-btn').trigger('click');
      expect(wrapper.findByDataTest('ec-dropdown-search__item--0').element).toMatchSnapshot();
      await wrapper.findByDataTest('ec-btn-dropdown__item-link--0').trigger('click');
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('when all menu items are disabled', () => {
    it('should render a disabled popover button', () => {
      const allDisabledItems = [
        {
          to: {
            name: 'convert-and-pay',
          },
          attrs: {},
          value: 'convert-and-pay',
          text: 'Convert & Pay',
          disabled: true,
          disabledReason: ' Payment creation is disabled at this time, contact your Relationship Manager.',
        },
        {
          attrs: {},
          href: '#/payments/',
          value: 'pay',
          text: 'Pay',
          disabled: true,
          disabledReason: ' Payment creation is disabled at this time, contact your Relationship Manager.',
        }];

      const wrapper = mountBtnDropdown({ items: allDisabledItems });
      expect(wrapper
        .findByDataTest('ec-btn-dropdown__dropdown-btn')
        .element).toMatchSnapshot();
    });
  });

  describe('when isBtnDropdownDisabled prop is true', () => {
    it('should render with dropdown-btn disabled', () => {
      const wrapper = mountBtnDropdown({
        isBtnDropdownDisabled: true,
      });
      expect(wrapper.findByDataTest('ec-btn-dropdown__btn').element).toMatchSnapshot();
    });
  });
});
