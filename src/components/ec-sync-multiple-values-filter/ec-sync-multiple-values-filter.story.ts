import type { Meta, StoryFn } from '@storybook/vue3';
import { ref, watchEffect } from 'vue';

import { IconName, IconType } from '../ec-icon/types';
import type { MultipleValuesSelectionItem } from '../ec-multiple-values-selection/types';
import EcSyncMultipleValuesFilter from './ec-sync-multiple-values-filter.vue';

const meta: Meta = {
  title: 'Filters/Multiple Values Filter',
  component: EcSyncMultipleValuesFilter,
};

export default meta;

const Template: StoryFn<typeof EcSyncMultipleValuesFilter> = storyArgs => ({
  components: { EcSyncMultipleValuesFilter },
  setup() {
    const model = ref<MultipleValuesSelectionItem[]>();
    const args = ref({});

    watchEffect(() => {
      const { modelValue, ...rest } = storyArgs;
      model.value = modelValue;
      args.value = rest;
    });

    return {
      args,
      model,
    };
  },
  template: `
    <ec-sync-multiple-values-filter
      class="tw-flex tw-justify-center tw-items-center tw-p-20 tw-m-auto"
      v-bind="args"
      v-model="model"
      :popover-options="{ shown: true, ...args.popoverOptions }"
    />
  `,
});

const items: MultipleValuesSelectionItem[] = [{
  value: 'Success',
  icon: {
    name: IconName.ROUNDED_CHECK,
    type: IconType.SUCCESS,
  },
  text: 'Success (this text should be too long to display, this is the reason why we have ellipsis)',
}, {
  value: 'Partially paid',
  icon: {
    name: IconName.ROUNDED_PARTIAL,
    type: IconType.SUCCESS,
  },
  text: 'Partially paid',
}, {
  value: 'Cancelled',
  icon: {
    name: IconName.ROUNDED_CANCELLED,
    type: IconType.ERROR,
  },
  text: 'Cancelled',
}, {
  value: 'Returned',
  icon: {
    name: IconName.ROUNDED_RETURNED,
    type: IconType.ERROR,
  },
  text: 'Returned',
}, {
  value: 'Not paid',
  icon: {
    name: IconName.ROUNDED_EURO,
    type: IconType.WARNING,
  },
  text: 'Not paid',
}, {
  value: 'Not paid value date not reached',
  icon: {
    name: IconName.ROUNDED_EURO,
    type: IconType.INTERACTIVE,
  },
  text: 'Not paid (Value date not reached)',
}, {
  value: 'Random status 1',
  icon: {
    name: IconName.CURRENCY_AED,
    type: IconType.INTERACTIVE,
  },
  text: 'Random status 1',
}, {
  value: 'Random status 2',
  icon: {
    name: IconName.CURRENCY_GBP,
    type: IconType.INTERACTIVE,
  },
  text: 'Random status 2',
}, {
  value: 'Random status 3',
  icon: {
    name: IconName.CURRENCY_EUR,
    type: IconType.INTERACTIVE,
  },
  text: 'Random status 3',
}, {
  value: 'Random status 4',
  icon: {
    name: IconName.CURRENCY_USD,
    type: IconType.INTERACTIVE,
  },
  text: 'Random status 4',
}, {
  value: 'Random status 5',
  icon: {
    name: IconName.CURRENCY_RUB,
    type: IconType.INTERACTIVE,
  },
  text: 'Random status 5',
}];

export const basic = Template.bind({});

basic.args = {
  label: 'Status',
  items,
  isSelectAll: false,
  selectAllFiltersText: 'Select all',
  hasRoundedIcons: true,
};
