<template>
  <v-popover
    v-bind="getOptions()"
    v-on="$listeners"
  >
    <slot />
    <template slot="popover">
      <slot name="popover" />
    </template>
  </v-popover>
</template>

<script>
import { VPopover } from 'v-tooltip';

export default {
  components: {
    VPopover,
  },
  inheritAttrs: false,
  props: {
    level: {
      type: String,
      default: '',
    },
  },
  methods: {
    getOptions() {
      return {
        popoverClass: `ec-popover${this.level && ` ec-popover--${this.level}`}`,
        popoverInnerClass: 'ec-popover__inner',
        popoverArrowClass: 'ec-popover__arrow',
        ...this.$attrs,
      };
    },
  },
};
</script>
