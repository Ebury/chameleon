import { vi } from 'vitest';
import type { ObjectDirective } from 'vue';

import type { TooltipOptions } from '../../src/directives/ec-tooltip/types';

function updateTooltipMock(el: HTMLElement, value: string | TooltipOptions) {
  const dataTest = el.getAttribute('data-test') || '';
  if (!dataTest.includes('ec-tooltip-mock')) {
    el.setAttribute('data-test', `${dataTest} ec-mock ec-tooltip-mock`.trim());
  }

  let content = null;
  let placement = null;
  let popperClass = null;

  if (typeof value === 'string') {
    content = value;
  }

  if (typeof value === 'object' && value) {
    ({ placement, content, popperClass } = value);
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
  },
};

vi.mock('../../src/directives/ec-tooltip', () => ({ default: EcTooltipDirectiveMock }));
