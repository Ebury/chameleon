import { text, number } from '@storybook/addon-knobs';
import EcFilterPopover from './ec-filter-popover.vue';
import EcCheckbox from '../ec-checkbox/ec-checkbox.vue';

export default { title: 'Filters/Filter Popover' };

export const Primary = () => ({
  components: { EcFilterPopover, EcCheckbox },
  data() {
    return {
      selectedValueOne: [{
        name: 'Test Bank Name',
        checkbox: null,
      }, {
        name: 'Abindong Insurances',
        checkbox: null,
      }, {
        name: 'Christopher Li',
        checkbox: null,
      }, {
        name: 'Albert Simpson',
        checkbox: null,
      }],
      selectedValueTwo: [{
        name: 'Not paid',
        checkbox: null,
      }, {
        name: 'Not paid (Overdue)',
        checkbox: null,
      }, {
        name: 'Paid',
        checkbox: null,
      }, {
        name: 'Cancelled',
        checkbox: null,
      }, {
        name: 'Returned',
        checkbox: null,
      }],
      selectedValueThree: [{
        name: 'Item one',
        checkbox: null,
      }, {
        name: 'Item two',
        checkbox: null,
      }, {
        name: 'Item Three',
        checkbox: null,
      }],
    };
  },
  props: {
    labelOne: {
      default: text('dueDate', 'Due date'),
    },
    labelTwo: {
      default: text('status', 'Status'),
    },
    labelThree: {
      default: text('beneficiary', 'Beneficiary'),
    },
    numberOfSelectedFilters: {
      default: number('numberOfSelectedFilters', 0),
    },
    // } TODO with https://fxsolutions.atlassian.net/browse/ONL-4909
  },
  template: `
    <div class="tw-flex tw-flex-row tw-m-auto">
      <ec-filter-popover
        class="tw-mr-16"
        :label="labelOne"
        numberOfSelectedFilters="0"
      >
        <template #filter>
          <ec-checkbox
            v-model="item.checkbox"
            v-for="(item, index) in selectedValueOne"
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
        :label="labelTwo"
        numberOfSelectedFilters="3"
      >
      <template #filter>
          <ec-checkbox
            v-model="item.checkbox"
            v-for="(item, index) in selectedValueTwo"
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
        :label="labelThree"
        numberOfSelectedFilters="0"
      >
      <template #filter>
          <ec-checkbox
            v-model="item.checkbox"
            v-for="(item, index) in selectedValueThree"
            :key="index"
            class="tw-p-12"
          >
            <template #label>
              {{ item.name }}
            </template>
          </ec-checkbox>
        </template>
      </ec-filter-popover>
    </div>`,
});

Primary.storyName = 'Filter Popover';
