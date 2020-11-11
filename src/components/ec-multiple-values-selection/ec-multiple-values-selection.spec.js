import { mount, createLocalVue } from '@vue/test-utils';
import EcMultipleValuesSelection from './ec-multiple-values-selection.vue';
import { withMockedConsole } from '../../../tests/utils/console';

const selectAllText = 'Select all';
const items = [{
  value: 'Success',
  icon: {
    name: 'rounded-check',
    type: 'success',
  },
  text: 'Success',
}, {
  value: 'Partially paid',
  icon: {
    name: 'rounded-partial',
    type: 'success',
  },
  text: 'Name two',
}, {
  value: 'Cancelled',
  icon: {
    name: 'rounded-cancelled',
    type: 'error',
  },
  text: 'Cancelled',
}];

function mountEcMultipleValuesSelection(props, mountOpts) {
  return mount(EcMultipleValuesSelection, {
    propsData: {
      selectAllText,
      ...props,
    },
    ...mountOpts,
  });
}

function mountEcMultipleValuesSelectionAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
  const localVue = createLocalVue();

  const Component = localVue.extend({
    components: { EcMultipleValuesSelection },
    template,
    ...wrapperComponentOpts,
  });

  return mount(Component, {
    localVue,
    propsData: { ...props },
    ...mountOpts,
  });
}
describe('EcMultipleValuesSelection', () => {
  it('should render correctly if all the required pros are passed', () => {
    const wrapper = mountEcMultipleValuesSelection({ items });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if required prop label is missing', () => {
    withMockedConsole((errorSpy) => {
      mountEcMultipleValuesSelection();
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "items"');
    });
  });

  it(':selectedItems should return the correct value from prop "value"', () => {
    const testValue = [{ value: 'test value', name: 'test name' }];
    const wrapper = mountEcMultipleValuesSelection({ items, value: testValue });

    expect(wrapper.vm.selectedItems).toEqual(testValue);
  });

  it('should not be visibile if isSearchable is set to false', () => {
    const wrapper = mountEcMultipleValuesSelection({ items, isSearchable: false });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit selected items', async () => {
    const wrapper = mountEcMultipleValuesSelection({ items });
    await wrapper.findByDataTest('ec-multiple-values-selection__checkbox-select').findByDataTest('ec-checkbox__input').trigger('click');
    expect(wrapper.emitted('change')).toBeTruthy();
  });

  it('should deselected items', async () => {
    const wrapper = mountEcMultipleValuesSelectionAsTemplate(
      '<ec-multiple-values-selection v-model="selectedItems" :items="items" :is-searchable="false" :select-all-text="selectAllText" />',
      {},
      {
        data() {
          return {
            items,
            selectAllText,
            selectedItems: [{ value: 'Cancel', name: 'Cancel' }],
          };
        },
      },
    );
    await wrapper.findByDataTest('ec-multiple-values-selection__checkbox-deselect').findByDataTest('ec-checkbox__input').trigger('click');
    expect(wrapper.vm.selectedItems).toEqual([]);
  });

  it('should toggle (select/unselect) all options clicked', async () => {
    const wrapper = mountEcMultipleValuesSelectionAsTemplate(
      '<ec-multiple-values-selection v-model="selectedItems" :items="items" :select-all-text="selectAllText" :canSelectAll="true" />',
      {},
      {
        data() {
          return {
            items,
            selectedItems: [],
            selectAllText,
          };
        },
      },
    );

    await wrapper.findByDataTest('ec-multiple-values-selection__select-all').findByDataTest('ec-checkbox__input').trigger('click');
    expect(wrapper.element).toMatchSnapshot();
    await wrapper.findByDataTest('ec-multiple-values-selection__select-all').findByDataTest('ec-checkbox__input').trigger('click');
    expect(wrapper.element).toMatchSnapshot();
  });
});
