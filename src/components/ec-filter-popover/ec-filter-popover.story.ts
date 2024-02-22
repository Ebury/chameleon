import type { Meta, StoryFn } from '@storybook/vue3';
import { ref, watchEffect } from 'vue';

import EcCheckbox from '../ec-checkbox';
import type { PopoverProps } from '../ec-popover/types';
import EcFilterPopover from './ec-filter-popover.vue';
import type { FilterPopoverProps } from './types';

const meta: Meta = {
  title: 'Filters/Filter Popover',
  component: EcFilterPopover,
};

export default meta;

type EcFilterPopoverStoryItem = {
  name: string,
  selected: boolean,
};

type EcFilterPopoverStory = StoryFn<FilterPopoverProps & {
  popoverOptions: PopoverProps,
  labelOne: string,
  itemListOne: EcFilterPopoverStoryItem[],
  labelTwo: string,
  itemListTwo: EcFilterPopoverStoryItem[],
  labelThree: string,
  itemListThree: EcFilterPopoverStoryItem[],
}>;

export const all: EcFilterPopoverStory = storyArgs => ({
  components: { EcFilterPopover, EcCheckbox },
  setup() {
    const popoverOptions = ref<PopoverProps>({});
    const labelOne = ref('');
    const itemListOne = ref<EcFilterPopoverStoryItem[]>([]);
    const labelTwo = ref('');
    const itemListTwo = ref<EcFilterPopoverStoryItem[]>([]);
    const labelThree = ref('');
    const itemListThree = ref<EcFilterPopoverStoryItem[]>([]);
    const args = ref<FilterPopoverProps>();

    watchEffect(() => {
      const {
        popoverOptions: popoverOptionsFromArgs,
        labelOne: labelOneFromArgs,
        itemListOne: itemListOneFromArgs,
        labelTwo: labelTwoFromArgs,
        itemListTwo: itemListTwoFromArgs,
        labelThree: labelThreeFromArgs,
        itemListThree: itemListThreeFromArgs,
        ...rest
      } = storyArgs;
      popoverOptions.value = popoverOptionsFromArgs;
      labelOne.value = labelOneFromArgs;
      itemListOne.value = itemListOneFromArgs;
      labelTwo.value = labelTwoFromArgs;
      itemListTwo.value = itemListTwoFromArgs;
      labelThree.value = labelThreeFromArgs;
      itemListThree.value = itemListThreeFromArgs;
      args.value = rest;
    });

    return {
      args,
      labelOne,
      itemListOne,
      labelTwo,
      itemListTwo,
      labelThree,
      itemListThree,
      popoverOptions,
    };
  },
  template: `
    <div class="tw-flex tw-flex-row tw-justify-center tw-m-auto" style="min-height: 300px;">
      <ec-filter-popover
        class="tw-mr-16"
        v-bind="args"
        :label="labelOne"
        :number-of-selected-filters="0"
        :popover-options="{ ...popoverOptions, shown: true }"
      >
        <template #filter>
          <ec-checkbox
            v-for="(item, index) in itemListOne"
            :key="index"
            v-model="item.selected"
            class="tw-p-12"
          >
            <template #label>
              {{ item.name }}
            </template>
          </ec-checkbox>
        </template>
      </ec-filter-popover>

      <ec-filter-popover
        class="tw-mr-16"
        v-bind="args"
        :label="labelTwo"
        :number-of-selected-filters="3"
      >
        <template #filter>
          <ec-checkbox
            v-for="(item, index) in itemListTwo"
            :key="index"
            v-model="item.selected"
            class="tw-p-12"
          >
            <template #label>
              {{ item.name }}
            </template>
          </ec-checkbox>
        </template>
      </ec-filter-popover>

      <ec-filter-popover
        class="tw-mr-16"
        v-bind="args"
        :label="labelThree"
        :number-of-selected-filters="0"
      >
        <template #filter>
          <ec-checkbox
            v-for="(item, index) in itemListThree"
            :key="index"
            v-model="item.selected"
            class="tw-p-12"
          >
            <template #label>
              {{ item.name }}
            </template>
          </ec-checkbox>
        </template>
      </ec-filter-popover>
    </div>
  `,
});

all.args = {
  isFullHeight: false,
  labelOne: 'Due date',
  labelTwo: 'Status',
  labelThree: 'Beneficiary',
  itemListOne: [{
    name: 'Test Bank Name',
    selected: false,
  }, {
    name: 'Abindong Insurances',
    selected: false,
  }, {
    name: 'Christopher Li',
    selected: false,
  }, {
    name: 'Albert Simpson',
    selected: false,
  }],
  itemListTwo: [{
    name: 'Not paid',
    selected: false,
  }, {
    name: 'Not paid (Overdue)',
    selected: false,
  }, {
    name: 'Paid',
    selected: false,
  }, {
    name: 'Cancelled',
    selected: false,
  }, {
    name: 'Returned',
    selected: false,
  }],
  itemListThree: [{
    name: 'Item one',
    selected: false,
  }, {
    name: 'Item two',
    selected: false,
  }, {
    name: 'Item three',
    selected: false,
  }],
};
