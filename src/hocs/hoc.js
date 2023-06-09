// based heavily on vue-hoc for Vue 2: https://github.com/jackmellis/vue-hoc/tree/master/packages/vue-hoc/src

import { h } from 'vue';

const normalize = function normalize(props) {
  if (!props) {
    return {};
  }
  if (Array.isArray(props)) {
    const result = {};
    props.forEach((key) => {
      if (typeof key === 'string') {
        result[key] = {};
      }
    });
    return result;
  }
  return { ...props };
};

const mergeMixinProps = (mixins, initial = {}) => {
  if (!mixins || !mixins.length) {
    return initial;
  }

  return mixins.reduce((result, mixin) => ({
    ...result,
    ...mergeMixinProps(mixin.mixins, result),
    ...normalize(mixin.props),
  }), initial);
};

const getProps = function getProps(Component) {
  const props = normalize(Component.props);
  const mixinProps = mergeMixinProps(Component.mixins);

  return { ...mixinProps, ...props };
};

function createRenderFn(Component, renderOptions) {
  return function render() {
    const slots = mergeSlotsWithRenderOptions(this.$slots, renderOptions, this);

    return h(Component, {
      ...this.$attrs,
      ...mergePropsWithRenderOptions(this.$props, renderOptions, this),
      ...processListeners(renderOptions, this),
    }, slots);
  };
}

function mergePropsWithRenderOptions(props, renderOptions, vm) {
  if (renderOptions && renderOptions.props) {
    if (typeof renderOptions.props === 'function') {
      return renderOptions.props.call(vm, props);
    }
    if (typeof renderOptions.props === 'object') {
      const newProps = { ...props };
      for (const [key, value] of Object.entries(renderOptions.props)) {
        newProps[key] = value.call(vm);
      }

      return newProps;
    }
    throw new Error(`Unrecognised props form in HoC: ${typeof renderOptions.props}`);
  }

  return props;
}

function capitalise(str) {
  return str[0].toUpperCase() + str.substring(1);
}

function processListeners(renderOptions, vm) {
  if (renderOptions && renderOptions.listeners) {
    if (typeof renderOptions.listeners === 'object') {
      const newAttrs = {};
      for (const [key, value] of Object.entries(renderOptions.listeners)) {
        if (key.includes('-')) {
          throw new Error(`Listener "${key}" should be in camelCase.`);
        }
        newAttrs[`on${capitalise(key)}`] = value.bind(vm);
      }

      return newAttrs;
    }
    throw new Error(`Unrecognised listeners form in HoC: ${typeof renderOptions.listeners}`);
  }

  return {};
}

function mergeSlotsWithRenderOptions(slots, renderOptions, vm) {
  if (renderOptions && renderOptions.scopedSlots) {
    throw new Error('Do not use scopedSlots in render options. Rename it to slots.');
  }

  if (renderOptions && renderOptions.slots) {
    if (typeof renderOptions.slots === 'function') {
      return renderOptions.slots.call(vm, slots);
    }
    throw new Error(`Unrecognised slots form in HoC: ${typeof renderOptions.slots}`);
  }

  return slots;
}

function createHOC(Component, options = {}, renderOptions = {}) {
  const target = Component;
  return {
    ...options,
    props: { ...getProps(target), ...getProps(options) },
    mixins: options.mixins || [],
    name: options.name || `${target.name || 'Anonymous'}HOC`,
    render: options.render || createRenderFn(target, renderOptions),
  };
}

function createHOCc(options, renderOptions) {
  return function curried(Component) {
    return createHOC(Component, options, renderOptions);
  };
}

export {
  createHOC,
  createHOCc,
};
