<template>
  <div
    class="ec-inline-input-field-copy"
    data-test="ec-inline-input-field-copy"
  >
    <span class="ec-inline-input-field-copy__text">
      {{ value }}
    </span>

    <button
      type="button"
      class="ec-inline-input-field-copy__action"
      data-test="ec-inline-input-field-copy__action"
      @click="copy"
      @mouseleave="hideTooltip"
    >
      <ec-icon
        v-ec-tooltip="{
          placement: 'left',
          show: !!tooltipContent,
          trigger: 'manual',
          content: tooltipContent ,
          classes: tooltipClasses,
          ...tooltipOptions,
        }"
        class="ec-inline-input-field-copy__icon"
        data-test="ec-inline-input-field-copy__icon"
        name="simple-copy"
        :size="16"
      />
    </button>
  </div>
</template>

<script>
import clipboardCopy from 'clipboard-copy';
import EcIcon from '../../../ec-icon';
import EcTooltip from '../../../../directives/ec-tooltip';

export default {
  name: 'EcInlineInputFieldCopy',
  components: { EcIcon },
  directives: { EcTooltip },
  props: {
    value: {
      default: '',
      type: String,
    },
    tooltipOptions: {
      type: Object,
      default: null,
    },
    tooltipTextSuccess: {
      type: String,
      required: true,
    },
    tooltipTextError: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isCopied: false,
    };
  },
  computed: {
    tooltipContent() {
      switch (this.isCopied) {
        case true:
          return this.tooltipTextSuccess;
        case false:
          return this.tooltipTextError;
        default:
          return '';
      }
    },
    tooltipClasses() {
      switch (this.isCopied) {
        case true:
          return 'ec-tooltip--bg-success';
        case false:
          return 'ec-tooltip--bg-error';
        default:
          return '';
      }
    },
  },
  methods: {
    hideTooltip() {
      this.showTooltip = false;
      this.isCopied = null;
    },
    copy() {
      clipboardCopy(this.value)
        .then(() => {
          this.isCopied = true;
        })
        .catch(() => {
          this.isCopied = false;
        });
    },
  },
};
</script>

<style>
.ec-inline-input-field-copy {
  @apply tw-w-full;
  @apply tw-flex tw-justify-between tw-items-center;

  &__text {
    @apply tw-truncate;
  }

  &__action {
    @apply tw-border-0;
    @apply tw-bg-transparent tw-fill-gray-4;
    @apply tw-outline-none;

    &:hover,
    &:focus {
      @apply tw-fill-key-4;
    }

    &:hover {
      @apply tw-cursor-pointer;
    }
  }

  &__icon {
    @apply tw-opacity-0;

    .ec-inline-input-field-copy:hover & {
      @apply tw-opacity-100;
    }
  }
}
</style>
