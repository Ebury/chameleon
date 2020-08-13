<template>
  <div class="tw-w-full tw-flex">
    <div class="tw-w-full tw-border tw-border-solid tw-border-gray-6 tw-rounded">
      <div class="tw-flex">
        <span class="tw-flex-grow tw-text-gray-5 tw-pl-12 tw-py-8 tw-truncate">{{ value }}</span>
        <ec-loading
          show
          :size="24"
        >
          <div class="tw-w-40" />
        </ec-loading>
      </div>
    </div>
    <div class="tw-flex tw-items-end tw-ml-20 tw-mb-16">
      <ec-icon
        name="simple-check"
        :size="16"
        type="interactive"
      />
      <ec-icon
        class="tw-ml-8"
        name="simple-close"
        :size="16"
        type="interactive"
      />
    </div>
  </div>
</template>

<script>
import EcIcon from '@/components/ec-icon';
import EcLoading from '@/components/ec-loading';

export default {
  name: 'EcInlineInputField',
  components: { EcIcon, EcLoading },
  props: {
    value: {
      default: '',
      type: String,
    },
  },
};
</script>
