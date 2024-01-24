import { vi } from 'vitest';
import type { ObjectDirective } from 'vue';

import type { TooltipOptions, TooltipPlacement, TooltipPopperClass } from '../../src/directives/ec-tooltip/types';

function updateTooltipMock(el: HTMLElement, value: string | TooltipOptions) {
  const dataTest = el.getAttribute('data-test') || '';
  if (!dataTest.includes('ec-tooltip-mock')) {
    el.setAttribute('data-test', `${dataTest} ec-mock ec-tooltip-mock`.trim());
  }

  let content: string | boolean | undefined;
  let placement: TooltipPlacement | undefined;
  let popperClass: TooltipPopperClass[] | undefined;
  let shown: boolean | undefined;

  if (typeof value === 'string') {
    content = value;
  }

  if (typeof value === 'object' && value) {
    ({
      placement, content, popperClass, shown,
    } = value);
  }

  if (content) {
    el.setAttribute('data-ec-tooltip-mock-content', `${content}`);
    if (placement) {
      el.setAttribute('data-ec-tooltip-mock-placement', placement);
    } else {
      el.removeAttribute('data-ec-tooltip-mock-placement');
    }
    if (popperClass) {
      el.setAttribute('data-ec-tooltip-mock-popper-class', popperClass.join(', '));
    } else {
      el.removeAttribute('data-ec-tooltip-mock-popper-class');
    }
  } else {
    el.removeAttribute('data-ec-tooltip-mock-content');
    el.removeAttribute('data-ec-tooltip-mock-placement');
    el.removeAttribute('data-ec-tooltip-mock-popper-class');
  }

  if (shown) {
    el.setAttribute('data-ec-tooltip-mock-popper-shown', '');
  } else {
    el.removeAttribute('data-ec-tooltip-mock-popper-shown');
  }
}

export const EcTooltipDirectiveMock: ObjectDirective<HTMLElement, string | TooltipOptions> = {
  beforeMount(el, { value }) {
    updateTooltipMock(el, value);
  },
  updated(el, { value }) {
    updateTooltipMock(el, value);
  },
  unmounted(el) {
    const dataTest = el.getAttribute('data-test') || '';
    el.setAttribute('data-test', dataTest.replace('ec-mock ec-tooltip-mock', '').trim());
    el.removeAttribute('data-ec-tooltip-mock-content');
    el.removeAttribute('data-ec-tooltip-mock-placement');
    el.removeAttribute('data-ec-tooltip-mock-popper-class');
    el.removeAttribute('data-ec-tooltip-mock-popper-shown');
  },
};

vi.mock('../../src/directives/ec-tooltip', () => ({ default: EcTooltipDirectiveMock }));
