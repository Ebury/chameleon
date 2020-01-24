<template>
  <v-popover
    ref="popover"
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
    popoverInnerClass: {
      type: String,
      default: '',
    },
    popoverClass: {
      type: String,
      default: '',
    },
    popoverArrowClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    getOptions() {
      return {
        popoverClass: `${this.popoverClass} ec-popover${this.level && ` ec-popover--${this.level}`}`.trim(),
        popoverInnerClass: `${this.popoverInnerClass} ec-popover__inner`.trim(),
        popoverArrowClass: `${this.popoverArrowClass} ec-popover__arrow`.trim(),
        container: 'body',
        boundariesElement: 'viewport',
        ...this.$attrs,
      };
    },
    update: /* istanbul ignore next */ function update() {
      if (this.$refs.popover && this.$refs.popover.popperInstance) {
        this.$refs.popover.popperInstance.scheduleUpdate();
      }
    },
  },
};
</script>
