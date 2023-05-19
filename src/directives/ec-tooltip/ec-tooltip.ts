import FloatingVue, { VTooltip } from 'floating-vue';
import type { ComponentPublicInstance } from 'vue';

import { getUid } from '../../utils/uid';
import { type TooltipOptions, TooltipPopperClass } from './types';

FloatingVue.options.themes.tooltip = {
  ...FloatingVue.options.themes.tooltip,
  html: true,
  boundary: 'viewport',
};

const origBeforeMount = VTooltip.beforeMount;

function tryGetContainer(instance?: ComponentPublicInstance): HTMLElement | undefined {
  return instance?.$.appContext.app.config.globalProperties.$tooltipContainer;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function bind(el: HTMLElement, { value, instance, ...args }: { value?: string | TooltipOptions, instance?: ComponentPublicInstance, [key: string]: any } = {}) {
  let options: TooltipOptions = {};
  const type = typeof value;
  if (type === 'string') {
    options = { content: value as string };
  } else if (value && type === 'object') {
    options = value as TooltipOptions;
  } else {
    options = { content: false };
  }

  if (!options?.ariaId) {
    options.ariaId = `ec-tooltip-${getUid()}`;
  }

  if (options.popperClass) {
    options.popperClass = [...options.popperClass, TooltipPopperClass.EC_TOOLTIP];
  } else {
    options.popperClass = [TooltipPopperClass.EC_TOOLTIP];
  }

  const container = tryGetContainer(instance);
  if (container) {
    options.container = container;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  origBeforeMount.call(this, el, { value: options, modifiers: {}, ...args });
}

// each tooltip get a randomly generated ID. we'd rather give it our own using our uid service as
// we can assign a custom ID via ariaId. in order to set it every time a tooltip is created, we need to patch the
// mount function and assign ariaId to options passed into v-ec-tooltip="{}" directive.
// https://github.com/Akryum/floating-vue/blob/main/packages/floating-vue/src/directives/v-tooltip.ts#L151
const EcTooltipDirective = {
  ...VTooltip,
  beforeMount: bind,
  updated: bind,
};

export default EcTooltipDirective;
