
import { mount } from '@vue/test-utils';

import EcTooltip from './ec-tooltip';
import {
  type TooltipOptions, TooltipPlacement, TooltipPopperClass, TooltipTrigger,
} from './types';

describe('EcTooltipDirective', () => {
  it('should bind the tooltip directive correctly when value is an object', () => {
    const value = {
      content: 'Test tooltip',
      shown: true,
      placement: TooltipPlacement.TOP,
      popperClass: [TooltipPopperClass.EC_TOOLTIP_BG_SUCCESS],
      triggers: [TooltipTrigger.CLICK],
    };

    const beforeMountSpy = jest.spyOn(EcTooltip, 'beforeMount');

    const wrapper = mount(
      {
        template: '<div id=tooltipElement v-ec-tooltip=value>Tooltip content</div>',
        data() {
          return { value };
        },
        props: {},
      },

      {
        global: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          directives: { EcTooltip },
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();

    expect(beforeMountSpy).toHaveBeenCalledTimes(1);

    const expectedValue = beforeMountSpy.mock.calls[0][1]?.value as TooltipOptions;

    expect(expectedValue.content).toBe('Test tooltip');
    expect(expectedValue.placement).toBe('top');
    expect(expectedValue.popperClass).toStrictEqual(['ec-tooltip--bg-success', 'ec-tooltip']);
    expect(expectedValue.triggers).toStrictEqual(['click']);
    expect(expectedValue.ariaId).toStrictEqual('ec-tooltip-1');

    wrapper.unmount();
    beforeMountSpy.mockRestore();
  });

  it('should bind the tooltip directive correctly when value only has content', () => {
    const value = {
      content: 'Test tooltip',
    };
    const beforeMountSpy = jest.spyOn(EcTooltip, 'beforeMount');

    const wrapper = mount(
      {
        template: '<div id=tooltipElement v-ec-tooltip=value>Tooltip content</div>',
        data() {
          return { value };
        },
        props: {},
      },

      {
        global: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          directives: { EcTooltip },
        },
      },
    );

    expect(beforeMountSpy).toHaveBeenCalledTimes(1);

    const expectedValue = beforeMountSpy.mock.calls[0][1]?.value as TooltipOptions;

    expect(expectedValue.content).toBe('Test tooltip');
    expect(expectedValue.ariaId).toStrictEqual('ec-tooltip-1');
    expect(expectedValue.popperClass).toStrictEqual(['ec-tooltip']);

    wrapper.unmount();
    beforeMountSpy.mockRestore();
  });
});
