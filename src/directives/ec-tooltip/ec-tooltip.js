import FloatingVue, { VTooltip } from 'floating-vue';

import { getUid } from '../../utils/uid';

FloatingVue.options.themes.tooltip = {
  ...FloatingVue.options.themes.tooltip,
  html: true,
  boundary: 'viewport',
};

const origBeforeMount = VTooltip.beforeMount;

function bind(el, { value, ...args } = {}) {
  let options = {};
  const type = typeof value;
  if (type === 'string') {
    options = { content: value };
  } else if (value && type === 'object') {
    options = value;
  } else {
    options = { content: false };
  }

  if (!options.ariaId) {
    options.ariaId = `ec-tooltip-${getUid()}`;
  }

  if (options.popperClass) {
    options.popperClass = [...options.popperClass, 'ec-tooltip'];
  } else {
    options.popperClass = ['ec-tooltip'];
  }

  origBeforeMount.call(this, el, { value: options, ...args });
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
