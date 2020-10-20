<template>
  <div
    class="ec-filter-popover"
    data-test="ec-filter-popover"
  >
    <ec-popover
      placement="bottom"
      @update:open="clickTrigger"
    >
      <div
        class="ec-filter-popover__filter-item"
        :class="{ 'ec-filter-popover__filter-item--focused': triggerIsFocused }"
      >
        <a
          class="ec-filter-popover__label"
          data-test="ec-filter-popover__label"
        >{{ label }}</a>
        <span
          v-if="numberOfSelectedFilters > 0"
          class="ec-filter-popover__badge"
        > {{ numberOfSelectedFilters }}
        </span>
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
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      triggerIsFocused: false,
    };
  },
  methods: {
    clickTrigger(status) {
      this.triggerIsFocused = status;
      this.$emit('open', status);
    },
  },
};
</script>
<style>
:root {
  --ec-filter-popover-width: 304px;
  --ec-filter-popover-height: 368px;
}

.ec-filter-popover {
  &__filter-item {
    @apply tw-flex tw-flex-row tw-items-center;
    @apply tw-p-8;
    @apply tw-transition-all tw-duration-200 tw-ease-in-out;

    &:focus {
      @apply tw-bg-key-7;
      @apply tw-rounded;
      @apply tw-outline-none;
    }

    &--focused {
      @apply tw-bg-key-7;
      @apply tw-rounded;
    }

    &:hover {
      @apply tw-bg-key-6;
      @apply tw-rounded;
    }
  }

  &__label {
    @apply tw-text-gray-3;

    &:hover {
      @apply tw-no-underline;
    }
  }

  &__icon {
    @apply tw-flex-shrink-0;
    @apply tw-self-center;
    @apply tw-ml-4;
  }

  &__badge {
    /* TODO remove this styles once we have the badge component */
    @apply tw-m-4;
    @apply tw-bg-key-5 tw-text-gray-8;
    @apply tw-rounded-1/2;
    @apply tw-w-20;
    @apply tw-text-center tw-flags-text;
  }

  &__filter-content {
    @apply tw-bg-gray-8;
    @apply tw-border-gray-6 tw-border-solid tw-border tw-rounded;

    width: var(--ec-filter-popover-width);
    max-height: var(--ec-filter-popover-height);
  }
}
</style>
