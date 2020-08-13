<template>
  <div class="tw-flex">
    <div class="tw-flex tw-flex-grow tw-truncate tw-border tw-border-solid tw-border-gray-6 tw-rounded">
      <span class="tw-flex-grow tw-truncate tw-text-gray-5 tw-pl-12 tw-py-8">{{ value }}</span>
      <ec-loading
        show
        :size="24"
      >
        <div class="tw-w-40" />
      </ec-loading>
    </div>
    <div class="tw-flex tw-items-center tw-ml-20 tw-fill-gray-6">
      <ec-icon
        name="simple-check"
        :size="16"
      />
      <ec-icon
        class="tw-ml-8"
        name="simple-close"
        :size="16"
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
