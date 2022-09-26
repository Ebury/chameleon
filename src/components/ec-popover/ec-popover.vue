<template>
  <fv-dropdown
    v-bind="getOptions()"
    ref="popover"
    :data-test="attrs['data-test'] ? `${attrs['data-test']} ec-popover` : 'ec-popover'"
  >
    <slot />
    <template #popper="{ hide, shown }">
      <slot
        name="popper"
        v-bind="{ hide, shown }"
      />
    </template>
  </fv-dropdown>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { Dropdown as FvDropdown } from 'floating-vue';
import { ref, toRefs, useAttrs } from 'vue';

import { getUid } from '../../utils/uid';

const attrs = useAttrs();
const props = defineProps({
  level: {
    type: String,
    default: '',
  },
  popperClass: {
    type: String,
    default: '',
  },
});

const id = getUid();
const popover = ref(null);

const { level, popperClass } = toRefs(props);

function getOptions() {
  return {
    popperClass: `${popperClass.value} ec-popover${level.value && ` ec-popover--${level.value}`}`.trim(),
    container: 'body',
    ariaId: `ec-popover-${id}`,
    arrowOverflow: true, // to hide the arrow for popover
    ...attrs,
  };
}

/* istanbul ignore next */
function update() {
  if (popover.value) {
    popover.value.onResize();
  }
}

defineExpose({
  update,
});

</script>
