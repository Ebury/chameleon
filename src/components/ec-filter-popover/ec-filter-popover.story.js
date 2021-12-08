import EcFilterPopover from './ec-filter-popover.vue';
import EcCheckbox from '../ec-checkbox';

export default {
  title: 'Filters/Filter Popover',
  component: EcFilterPopover,
};

export const all = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EcFilterPopover, EcCheckbox },
  template: `
    <div class="tw-flex tw-flex-row tw-justify-center tw-m-auto" style="min-height: 300px;">
      <ec-filter-popover
        class="tw-mr-16"
        v-bind="$props"
        :label="labelOne"
        :numberOfSelectedFilters="0"
        :popover-options="{ ...$props.popoverOptions, open: true }"
      >
        <template #filter>
          <ec-checkbox
            v-model="item.selected"
            v-for="(item, index) in itemListOne"
            :key="index"
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
        v-bind="$props"
        :label="labelTwo"
        :numberOfSelectedFilters="3"
      >
        <template #filter>
          <ec-checkbox
            v-model="item.selected"
            v-for="(item, index) in itemListTwo"
            :key="index"
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
        v-bind="$props"
        :label="labelThree"
        :numberOfSelectedFilters="0"
      >
        <template #filter>
          <ec-checkbox
            v-model="item.selected"
            v-for="(item, index) in itemListThree"
            :key="index"
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
