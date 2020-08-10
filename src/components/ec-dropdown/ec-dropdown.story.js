import { storiesOf } from '@storybook/vue';
import { boolean, object, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import EcDropdown from './ec-dropdown.vue';

const stories = storiesOf('Dropdown', module);

const items = [
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3', disabled: true, disabledReason: 'Is disabled for a reason' },
  { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod' },
  { text: 'Item 5' },
  { text: 'Item 6' },
  { text: 'Item 7' },
];

stories.add('basic', () => ({
  components: { EcDropdown },
  data() {
    return {
      selected: null,
    };
  },
  props: {
    items: {
      default: object('items', items),
    },
    isSearchEnabled: {
      default: boolean('isSearchEnabled', true),
    },
    label: {
      default: text('label', 'Dropdown label'),
    },
    errorMessage: {
      default: text('errorMessage', ''),
    },
    placeholder: {
      default: text('placeholder', 'Select item'),
    },
    searchPlaceholder: {
      default: text('searchPlaceholder', 'Search...'),
    },
    noResultsText: {
      default: text('noResultsText', 'No results found'),
    },
    disabled: {
      default: boolean('disabled', false),
    },
    isLoading: {
      default: boolean('isLoading', false),
    },
  },
  methods: {
    onSelected: action('Selected'),
  },
  template: `
    <div class="tw-p-20">
      <p v-if="selected">{{ selected.text }}</p>
      <p v-else>Selected item: None</p>
      <div style="width: 300px;">
        <ec-dropdown
          v-bind="$props"
          v-model="selected"
          @change="onSelected">
        </ec-dropdown>
      </div>
    </div>
  `,
}));

stories.add('all', () => ({
  components: { EcDropdown },
  data() {
    return {
      items,
      itemsIncludingEmpty: [{ text: '' }, ...items],
      selected: null,
      preselected: items[1],
    };
  },
  methods: {
    cta: action('CTA'),
  },
  template: `
    <div class="tw-p-20">
      <h2>Single</h2>
      <div class="tw-grid">
        <div class="tw-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="false"
            label="Single value"
            placeholder="Single value"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="tw-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="true"
            label="Single value - with search"
            placeholder="Single value - with search"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="tw-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="false"
            label="Single value - with error"
            placeholder="Single value - with error"
            error-message="Something went wrong"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="tw-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="false"
            disabled
            label="Single value - disabled"
            placeholder="Single value - disabled"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="tw-col-4">
          <ec-dropdown
            :items="items"
            disabled
            label="Single value - disabled and preselected"
            placeholder="Single value - disabled and preselected"
            v-model="preselected">
          </ec-dropdown>
        </div>
        <div class="tw-col-4">
          <ec-dropdown
            :items="itemsIncludingEmpty"
            label="Single value - with empty item"
            placeholder="Single value - with empty item"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="tw-col-4">
          <ec-dropdown
            :items="items"
            label="Single value - with CTA"
            placeholder="Single value - with CTA"
            v-model="selected">
            <template #cta>
              <a href="#" @click.prevent="cta()" class="tw-block tw-py-8 tw-px-16">Do something</a>
            </template>
          </ec-dropdown>
        </div>
        <div class="tw-col-4">
          <ec-dropdown
            :items="items"
            label="Single value - custom template"
            placeholder="Single value - custom template"
            v-model="selected">
            <template #item="{ item, index, isSelected }">
              <div>00{{ index }}. {{ item.text }}</div>
              <div>{{ item.disabledReason }}</div>
              <div v-if="isSelected">This item is selected</div>
            </template>
          </ec-dropdown>
        </div>
        <div class="tw-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="true"
            label="Single value - with CTA/Loading/Search"
            placeholder="Single value - with CTA/Loading/Search"
            :is-loading="true"
            v-model="selected">
            <template #cta>
              <a href="#" @click.prevent="cta()" style="display: block; padding: 8px 16px;">Do something</a>
            </template>
          </ec-dropdown>
        </div>
        <div class="tw-col-12 tw-p-12">
          Selected value: {{ selected }}
        </div>
      </div>
    </div>
  `,
}));

export default stories;
