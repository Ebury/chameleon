import { reactive, ref, toRefs } from 'vue';

import EcCheckbox from '../ec-checkbox';
import EcFilterPopover from './ec-filter-popover.vue';

export default {
  title: 'Filters/Filter Popover',
  component: EcFilterPopover,
};

export const all = storyArgs => ({
  components: { EcFilterPopover, EcCheckbox },
  setup() {
    const {
      popoverOptions,
      labelOne,
      itemListOne,
      labelTwo,
      itemListTwo,
      labelThree,
      itemListThree,
      ...rest
    } = toRefs(storyArgs);
    const args = reactive(rest);

    return {
      args,
      labelOne,
      itemListOne: ref(itemListOne),
      labelTwo,
      itemListTwo: ref(itemListTwo),
      labelThree,
      itemListThree: ref(itemListThree),
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
