<template>
  <div
    ref="filterPopover"
    class="ec-filter-popover"
    data-test="ec-filter-popover"
  >
    <ec-popover
      v-bind="getPopoverOptions"
      :popper-options="popperOptions"
      :placement="'bottom'"
      offset="0, 8"
      @update:open="onOpen"
    >
      <div
        class="ec-filter-popover__trigger"
        :class="{ 'ec-filter-popover__trigger--focused': triggerIsFocused }"
        data-test="ec-filter-popover__trigger"
      >
        <button
          type="button"
          class="ec-filter-popover__label"
          data-test="ec-filter-popover__label"
          :title="label"
        >{{ label }}</button>
        <span
          v-if="numberOfSelectedFilters > 0"
          class="ec-filter-popover__badge"
          data-test="ec-filter-popover__badge"
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
    popoverOptions: {
      type: Object,
    },
    popperModifiers: {
      type: Object,
    },
  },
  data() {
    return {
      triggerIsFocused: false,
      popperOptions: {
        modifiers: {
          calculatePopperPosition: {
            // We need to check whether the popover is escaping from the boundaries of
            // the boundariesElement and if so, fix the position of the popover.
            // normally, we could just check the data.boundaries but there is a bug in popper.js v1.
            // their docs says that the data.boundaries exists (https://popper.js.org/docs/v1/#dataobject) but
            // they accidentaly assign that info into options of the preventOverflow modifier when
            // calculating boundaries. see: https://github.com/popperjs/popper-core/blob/v1.16.1/packages/popper/src/modifiers/preventOverflow.js#L47
            // we can do a workaround and access the boundaries object via this code:
            // const preventOverflowOptions = data.instance.modifiers.find(m => m.name === 'preventOverflow');
            // const popperBoundaries = preventOverflowOptions.boundaries;
            enabled: true,
            order: 845,
            fn: /* istanbul ignore next */ (data) => {
              const preventOverflowOptions = data.instance.modifiers.find(m => m.name === 'preventOverflow');
              const popperBoundaries = preventOverflowOptions.boundaries;
              const { left, right } = popperBoundaries;

              let popperLeft = Math.max(data.offsets.reference.left, left);
              let popperRight = popperLeft + data.popper.width;

              if (popperRight > right) {
                popperRight = right;
                popperLeft = popperRight - data.popper.width;
              }

              data.offsets.popper.left = popperLeft;
              data.popper.left = popperLeft;
              data.offsets.popper.right = popperRight;
              data.popper.right = popperRight;

              return data;
            },
          },
          ...this.popperModifiers,
        },
      },
    };
  },
  computed: {
    getPopoverOptions() {
      return {
        ...this.popoverOptions,
      };
    },
  },
  methods: {
    onOpen(status) {
      this.triggerIsFocused = status;
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
  &__trigger {
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
    @apply tw-p-0 tw-m-0;
    @apply tw-border-none;
    @apply tw-text-gray-3;
    @apply tw-bg-transparent;
    @apply tw-inline-block;
    @apply tw-w-72;
    @apply tw-truncate;
    @apply tw-text-left;

    &:hover {
      @apply tw-no-underline;
      @apply tw-cursor-pointer;
    }

    &:focus {
      @apply tw-outline-none;
    }
  }

  &__icon {
    @apply tw-flex-shrink-0;
    @apply tw-self-center;
    @apply tw-ml-4;
  }

  &__badge {
    /* TODO remove this styles once we have the badge component */
    @apply tw-ml-4;
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
