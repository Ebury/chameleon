import { ref, watchEffect } from 'vue';

import EcCheckbox from '../ec-checkbox';
import EcFilterPopover from './ec-filter-popover.vue';

export default {
  title: 'Filters/Filter Popover',
  component: EcFilterPopover,
};

export const all = storyArgs => ({
  components: { EcFilterPopover, EcCheckbox },
  setup() {
    const popoverOptions = ref({});
    const labelOne = ref('');
    const itemListOne = ref([]);
    const labelTwo = ref('');
    const itemListTwo = ref([]);
    const labelThree = ref('');
    const itemListThree = ref([]);
    const args = ref({});

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
    selected: null,
  }, {
    name: 'Abindong Insurances',
    selected: null,
  }, {
    name: 'Christopher Li',
    selected: null,
  }, {
    name: 'Albert Simpson',
    selected: null,
  }],
  itemListTwo: [{
    name: 'Not paid',
    selected: null,
  }, {
    name: 'Not paid (Overdue)',
    selected: null,
  }, {
    name: 'Paid',
    selected: null,
  }, {
    name: 'Cancelled',
    selected: null,
  }, {
    name: 'Returned',
    selected: null,
  }],
  itemListThree: [{
    name: 'Item one',
    selected: null,
  }, {
    name: 'Item two',
    selected: null,
  }, {
    name: 'Item three',
    selected: null,
  }],
};
