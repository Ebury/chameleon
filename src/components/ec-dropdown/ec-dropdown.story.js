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
    multiple: {
      default: boolean('multiple', false),
    },
    disabled: {
      default: boolean('disabled', false),
    },
    isLoading: {
      default: boolean('isLoading', false),
    },
  },
  watch: {
    multiple() {
      this.selected = null;
    },
  },
  methods: {
    onSelected: action('Selected'),
  },
  template: `
    <div class="ec-p--20">
      <p v-if="selected && multiple">Selected items:
        <ul>
          <li v-for="item of selected">{{ item.text }}</li>
        </ul>
      </p>
      <p v-else-if="selected && !multiple">{{ selected.text }}</p>
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
      multiSelected: null,
      multiPreselected: [items[1], items[4]],
    };
  },
  methods: {
    cta: action('CTA'),
  },
  template: `
    <div class="ec-grid ec-p--20">
      <h2>Single</h2>
      <div class="ec-grid__row">
        <div class="ec-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="false"
            label="Single value"
            placeholder="Single value"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="true"
            label="Single value - with search"
            placeholder="Single value - with search"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="false"
            label="Single value - with error"
            placeholder="Single value - with error"
            error-message="Something went wrong"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="false"
            disabled
            label="Single value - disabled"
            placeholder="Single value - disabled"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
          <ec-dropdown
            :items="items"
            disabled
            label="Single value - disabled and preselected"
            placeholder="Single value - disabled and preselected"
            v-model="preselected">
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
          <ec-dropdown
            :items="itemsIncludingEmpty"
            label="Single value - with empty item"
            placeholder="Single value - with empty item"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
          <ec-dropdown
            :items="items"
            label="Single value - with CTA"
            placeholder="Single value - with CTA"
            v-model="selected">
            <template #cta>
              <a href="#" @click.prevent="cta()" style="display: block; padding: 8px 16px;">Do something</a>
            </template>
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
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
        <div class="ec-col-4">
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
      </div>
      <div class="ec-grid__row ec-p--12">
        Selected value: {{ selected }}
      </div>
      <h2 class="ec-mt--24">Multiple</h2>
      <div class="ec-grid__row">
        <div class="ec-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="false"
            multiple
            label="Multiple values"
            placeholder="Multiple values"
            v-model="multiSelected">
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="true"
            multiple
            label="Multiple values - with search"
            placeholder="Multiple values"
            v-model="multiSelected">
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="true"
            multiple
            label="Multiple values - with error"
            placeholder="Multiple values"
            error-message="Something went wrong"
            v-model="multiSelected">
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="true"
            multiple
            disabled
            label="Multiple values - disabled"
            placeholder="Multiple values - disabled"
            v-model="multiSelected">
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="true"
            multiple
            disabled
            label="Multiple values - disabled and preselected"
            placeholder="Multiple values - disabled and preselected"
            v-model="multiPreselected">
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
          <ec-dropdown
            :items="itemsIncludingEmpty"
            label="Multiple values - with empty item"
            placeholder="Multiple values - with empty item"
            multiple
            v-model="multiSelected">
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
          <ec-dropdown
            :items="items"
            label="Multiple values - with CTA"
            placeholder="Multiple values - with CTA"
            multiple
            v-model="multiSelected">
            <template #cta>
              <a href="#" @click.prevent="cta()" style="display: block; padding: 8px 16px;">Do something</a>
            </template>
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
          <ec-dropdown
            :items="items"
            label="Multiple values - custom template"
            placeholder="Multiple values - custom template"
            multiple
            v-model="multiSelected">
            <template #item="{ item, index, isSelected }">
              <div>00{{ index }}. {{ item.text }}</div>
              <div>{{ item.disabledReason }}</div>
              <div v-if="isSelected">This item is selected</div>
            </template>
          </ec-dropdown>
        </div>
        <div class="ec-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="true"
            :is-loading="true"
            label="Multiple values - with CTA/Loading/Search"
            placeholder="Multiple values - with CTA"
            multiple
            v-model="multiSelected">
            <template #cta>
              <a href="#" @click.prevent="cta()" style="display: block; padding: 8px 16px;">Do something</a>
            </template>
          </ec-dropdown>
        </div>
      </div>
      <div class="ec-grid__row ec-p--12">
        Selected value: {{ multiSelected }}
      </div>
    </div>
  `,
}));

export default stories;
