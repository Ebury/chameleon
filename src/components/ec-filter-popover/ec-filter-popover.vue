<template>
  <div
    class="ec-filter-popover"
    data-test="ec-filter-popover"
  >
    <ec-popover
      popover-class="ec-popover"
      placement="bottom"
      trigger="click"
      level="modal"
      @update:open="clickTrigger"
    >
      <div class="ec-filter-popover__filter-item">
        <a class="ec-filter-popover__label">{{ label }}</a>
        <!-- <ec-badge-number size="20" value="numberOfSelectedFilters" />
        TODO Badge with https://fxsolutions.atlassian.net/browse/ONL-4909 -->
        <ec-icon
          class="ec-filter-popover__icon"
          :size="16"
          name="simple-chevron-down"
          type="interactive"
        />
      </div>

      <div
        slot="popover"
        class="ec-filter-popover__filter-content"
      >
        <slot
          name="filter"
        />
      </div>
    </ec-popover>
  </div>
</template>
<script>
import EcPopover from '../ec-popover';
import EcIcon from '../ec-icon';

export default {
  name: 'EcFilterPopover',
  components: { EcPopover, EcIcon },
  props: {
    label: {
      type: String,
      required: true,
      default: '',
    },
    numberOfSelectedFilters: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    clickTrigger(status) {
      this.isOpen = status;
      this.$emit('isOpen', this.isOpen);
    },
  },
};
</script>
<style>
:root {
  --ec-filter-popover-width: 304px;
}

.ec-filter-popover {
  &__filter-item {
    @apply tw-flex tw-flex-row tw-items-center;
  }

  &__label {
    @apply tw-text-gray-3;
    @apply tw-mr-8 tw-ml-24;
  }

  &__icons {
    @apply tw-flex-shrink-0;
    @apply tw-self-center;
    @apply tw-mr-24;
  }

  &__filter-content {
    @apply tw-bg-gray-8;
    @apply tw-px-20 tw-py-4;

    width: var(--ec-filter-popover-width);
  }
}
</style>
