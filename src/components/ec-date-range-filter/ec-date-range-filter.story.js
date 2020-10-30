import EcDateRangeFilter from './ec-date-range-filter.vue';

export default {
  title: 'Filters/Date range filter',
  component: EcDateRangeFilter,
};

export const basic = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EcDateRangeFilter },
  template: `
    <ec-date-range-filter
      class="tw-flex tw-justify-center tw-items-center tw-p-20 tw-m-auto"
      :label="label"
      :fromLabelText="fromLabelText"
      :toLabelText="toLabelText"
      :value="value"
      :popover-options="{ open: true }"
    />
  `,
});

basic.args = {
  label: 'Due date',
  fromLabelText: 'From',
  toLabelText: 'To',
};
