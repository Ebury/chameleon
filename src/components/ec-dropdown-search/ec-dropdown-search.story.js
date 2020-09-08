import { storiesOf } from '@storybook/vue';
import {
  boolean, object, select, text, number,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import EcDropdownSearch from './ec-dropdown-search.vue';
import EcIcon from '../ec-icon';

const stories = storiesOf('Dropdown Search', module);

const items = [
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3', disabled: true, disabledReason: 'Is disabled for a reason' },
  { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod' },
  { text: 'Item 5' },
  { text: 'Item 6' },
  { text: 'Item 7' },
];

stories.add('all', () => ({
  components: { EcDropdownSearch, EcIcon },
  data() {
    return {
      selectedItem: null,
      list: [
        {
          title: 'Basic',
          popoverOptions: { placement: 'bottom-end' },
          style: {},
          instructions: '',
        },
        {
          title: 'In container with a dynamic width',
          popoverOptions: { placement: 'bottom-end', boundariesElement: this.boundariesElement },
          style: {
            width: '300px',
            overflow: 'auto',
            resize: 'horizontal',
            border: '1px solid #ccc',
            backgroundColor: '#fafafa',
          },
          instructions: 'This is a block wrapper around the dropdown search. You can resize it and check how dropdown adapts.',
          hasParagraph: true,
        },
        {
          title: 'With custom item template',
          popoverOptions: { placement: 'bottom-end', boundariesElement: this.boundariesElement },
          style: {},
          instructions: '',
          hasParagraph: true,
          hasCustomTemplate: true,
        },
      ],
    };
  },
  props: {
    items: {
      default: object('Items', items),
    },
    isSearchEnabled: {
      default: boolean('isSearchEnabled', true),
    },
    maxVisibleItems: {
      default: number('maxVisibleItems', 3),
    },
    disabled: {
      default: boolean('disabled', false),
    },
    keepOpen: {
      default: boolean('keepOpen', false),
    },
    noResultsText: {
      default: text('noResultsText', 'No results found'),
    },
    isLoading: {
      default: boolean('isLoading', false),
    },
    boundariesElement: {
      default: select('boundariesElement', ['viewport', 'scrollParent'], 'viewport'),
    },
    paragraphText: {
      default: text('paragraphText', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Consequat interdum varius sit amet mattis vulputate enim nulla. Eget mi proin sed libero enim sed faucibus turpis.'),
    },
  },
  methods: {
    onItemSelected: action('Item selected'),
  },
  template: `
    <div class="tw-grid-container">
      <div class="tw-grid">
        <div class="tw-col-12" >
          <p v-if="selectedItem">Selected item: {{ selectedItem.text }}</p>
          <p v-else>Selected item: None</p>
          <div v-for="(dropdownSearch, index) in list" :key="index" class="tw-my-20">
            <h3>{{ dropdownSearch.title }}</h3>
            <div :style="dropdownSearch.style">
              <p class="tw-mb-8"><strong>{{dropdownSearch.instructions}}</strong></p>
              <ec-dropdown-search
                v-bind="$props"
                :popover-options="dropdownSearch.popoverOptions"
                :is-search-enabled="isSearchEnabled"
                :max-visible-items="maxVisibleItems"
                v-model="selectedItem"
                @change="onItemSelected">
                <a href="#" @click.prevent>
                  <span>Open</span>
                  <ec-icon name="simple-arrow-drop-down" :size="16" fill="currentColor" />
                </a>
                <template v-if="dropdownSearch.hasCustomTemplate" #item="{ item, index, isSelected }">
                  <div>{{ index + 1 }}. {{ item.text }}</div>
                  <strong>{{ item.disabledReason }}</strong>
                  <div v-if="isSelected">This item is selected</div>
                </template>
              </ec-dropdown-search>
              <p v-if="dropdownSearch.hasParagraph" class="tw-mt-16">{{ paragraphText }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
}));

