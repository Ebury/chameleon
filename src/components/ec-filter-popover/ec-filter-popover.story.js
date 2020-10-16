import { text } from '@storybook/addon-knobs';
import EcFilterPopover from './ec-filter-popover.vue';
import EcCheckbox from '../ec-checkbox/ec-checkbox.vue';

export default { title: 'Filter Popover' };

export const Primary = () => ({
  components: { EcFilterPopover, EcCheckbox },
  data() {
    return {
      itemListOne: [{
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
      itemListTwo: [{
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
      itemListThree: [{
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
    // numberOfSelectedFilters: {
    //   default: number('numberOfSelectedFilters', 0),
    // } TODO with https://fxsolutions.atlassian.net/browse/ONL-4909
  },
  template: `
    <div class="tw-flex tw-flex-row tw-m-auto">
      <ec-filter-popover :label="labelOne">
        <div slot="filter">
          <ec-checkbox
            v-model="item.checkbox"
            v-for="(item, index) in itemListOne"
            :key="index"
            class="tw-col-12"
          >
            <template #label>
              {{ item.name }}
            </template>
          </ec-checkbox>
        </div>
      </ec-filter-popover>

      <ec-filter-popover :label="labelTwo">
        <div slot="filter">
          <ec-checkbox
            v-model="item.checkbox"
            v-for="(item, index) in itemListTwo"
            :key="index"
            class="tw-col-12"
          >
            <template #label>
              {{ item.name }}
            </template>
          </ec-checkbox>
        </div>
      </ec-filter-popover>

      <ec-filter-popover :label="labelThree">
        <div slot="filter">
          <ec-checkbox
            v-model="item.checkbox"
            v-for="(item, index) in itemListThree"
            :key="index"
            class="tw-col-12"
          >
            <template #label>
              {{ item.name }}
            </template>
          </ec-checkbox>
        </div>
      </ec-filter-popover>
    </div>`,
});

Primary.storyName = 'Filter Popover';
