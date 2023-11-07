import FloatingVue, { VTooltip } from 'floating-vue';
import type { DirectiveBinding, ObjectDirective } from 'vue';

import { getUid } from '../../utils/uid';
import { type TooltipOptions, TooltipPopperClass } from './types';

FloatingVue.options.themes.tooltip = {
  ...FloatingVue.options.themes.tooltip,
  html: true,
  boundary: 'viewport',
};

const origBeforeMount = VTooltip.beforeMount;

function tryGetContainer(instance?: DirectiveBinding['instance']): HTMLElement | string | undefined {
  return instance?.$.appContext.app.config.globalProperties.$tooltipContainer;
}

function bind(this: ObjectDirective<HTMLElement, string | TooltipOptions>, el: HTMLElement, {
  value, instance, modifiers, ...args
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: Partial<DirectiveBinding<string | TooltipOptions>> & { [key: string]: any } = {}) {
  let options: TooltipOptions = {};
  const type = typeof value;
  if (type === 'string') {
    options = { content: value as string };
  } else if (value && type === 'object') {
    options = { ...value as TooltipOptions };
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

  origBeforeMount.call(this, el, { value: options, modifiers, ...args });
}

// each tooltip get a randomly generated ID. we'd rather give it our own using our uid service as
// we can assign a custom ID via ariaId. in order to set it every time a tooltip is created, we need to patch the
// mount function and assign ariaId to options passed into v-ec-tooltip="{}" directive.
// https://github.com/Akryum/floating-vue/blob/main/packages/floating-vue/src/directives/v-tooltip.ts#L151
const EcTooltipDirective: ObjectDirective<HTMLElement, string | TooltipOptions> = {
  ...VTooltip,
  beforeMount: bind,
  updated: bind,
};

export default EcTooltipDirective;
