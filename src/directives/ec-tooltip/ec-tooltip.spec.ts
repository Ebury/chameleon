
import { mount } from '@vue/test-utils';
import { VTooltip } from 'floating-vue';
import { vi } from 'vitest';

import EcTooltip from './ec-tooltip';
import {
  type TooltipOptions, TooltipPlacement, TooltipPopperClass, TooltipTrigger,
} from './types';

vi.mock('floating-vue', () => ({
  default: {
    options: {
      themes: {
        tooltip: {},
      },
    },
  },
  VTooltip: {
    beforeMount: vi.fn(),
  },
}));

vi.unmock('./ec-tooltip');

describe('EcTooltipDirective', () => {
  it('should bind the tooltip directive correctly when value is an object', () => {
    const value = {
      container: '#root1',
      content: 'Test tooltip',
      shown: true,
      placement: TooltipPlacement.TOP,
      popperClass: [TooltipPopperClass.EC_TOOLTIP_BG_SUCCESS],
      triggers: [TooltipTrigger.CLICK],
    };

    const wrapper = mount({
      directives: { EcTooltip },
      template: '<div id="tooltip-element-1" v-ec-tooltip="value">Lorem ipsum</div>',
      data() {
        return { value };
      },
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(VTooltip.beforeMount).toHaveBeenCalledTimes(1);

    const expectedValue = vi.mocked(VTooltip.beforeMount).mock.calls[0][1]?.value as TooltipOptions;

    expect(expectedValue.content).toBe('Test tooltip');
    expect(expectedValue.placement).toBe('top');
    expect(expectedValue.popperClass).toStrictEqual(['ec-tooltip--bg-success', 'ec-tooltip']);
    expect(expectedValue.triggers).toStrictEqual(['click']);
    expect(expectedValue.ariaId).toBe('ec-tooltip-1');
  });

  it('should bind the tooltip directive correctly when value only has content', () => {
    const value = {
      content: 'Test tooltip',
    };

    const wrapper = mount({
      directives: { EcTooltip },
      template: '<div id="tooltip-element-2" v-ec-tooltip="value">Lorem ipsum</div>',
      data() {
        return { value };
      },
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(VTooltip.beforeMount).toHaveBeenCalledTimes(1);

    const expectedValue = vi.mocked(VTooltip.beforeMount).mock.calls[0][1]?.value as TooltipOptions;

    expect(expectedValue.content).toBe('Test tooltip');
    expect(expectedValue.popperClass).toStrictEqual(['ec-tooltip']);
    expect(expectedValue.ariaId).toBe('ec-tooltip-1');
  });

  it('should bind the tooltip directive correctly when value is a string', () => {
    const value = 'Test tooltip';

    const wrapper = mount({
      directives: { EcTooltip },
      template: '<div id="tooltip-element-3" v-ec-tooltip="value">Lorem ipsum</div>',
      data() {
        return { value };
      },
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(VTooltip.beforeMount).toHaveBeenCalledTimes(1);

    const expectedValue = vi.mocked(VTooltip.beforeMount).mock.calls[0][1]?.value as TooltipOptions;

    expect(expectedValue.content).toBe('Test tooltip');
    expect(expectedValue.popperClass).toStrictEqual(['ec-tooltip']);
    expect(expectedValue.ariaId).toBe('ec-tooltip-1');
  });

  it('should bind the tooltip directive correctly when value is false', () => {
    const value = false;

    const wrapper = mount({
      directives: { EcTooltip },
      template: '<div id="tooltip-element-4" v-ec-tooltip="value">Lorem ipsum</div>',
      data() {
        return { value };
      },
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(VTooltip.beforeMount).toHaveBeenCalledTimes(1);

    const expectedValue = vi.mocked(VTooltip.beforeMount).mock.calls[0][1]?.value as TooltipOptions;

    expect(expectedValue.content).toBe(false);
    expect(expectedValue.popperClass).toStrictEqual(['ec-tooltip']);
    expect(expectedValue.ariaId).toBe('ec-tooltip-1');
  });

  it('should bind the tooltip directive correctly with a custom container', () => {
    const value = 'Test tooltip';

    const wrapper = mount({
      directives: { EcTooltip },
      template: '<div id="tooltip-element-5" v-ec-tooltip="value">Lorem ipsum</div>',
      data() {
        return { value };
      },
    }, {
      global: {
        config: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          globalProperties: {
            $tooltipContainer: 'my-container',
          },
        },
      },
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(VTooltip.beforeMount).toHaveBeenCalledTimes(1);

    const expectedValue = vi.mocked(VTooltip.beforeMount).mock.calls[0][1]?.value as TooltipOptions;

    expect(expectedValue.content).toBe('Test tooltip');
    expect(expectedValue.container).toBe('my-container');
    expect(expectedValue.popperClass).toStrictEqual(['ec-tooltip']);
    expect(expectedValue.ariaId).toBe('ec-tooltip-1');
  });
});
