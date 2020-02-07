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

stories.add('basic', () => ({
  components: { EcDropdownSearch, EcIcon },
  data() {
    return {
      selectedItem: null,
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
  },
  methods: {
    onItemSelected: action('Item selected'),
  },
  template: `
    <div style="width: 100vw; height: 100vh;" class="ec-p--20">
      <p v-if="selectedItem">Selected item: {{ selectedItem.text }}</p>
      <p v-else>Selected item: None</p>
      <ec-dropdown-search
        v-bind="$props"
        :popover-options="{ placement: 'bottom-end' }"
        v-model="selectedItem"
        @change="onItemSelected">
        <a href="#" @click.prevent>
          <span>Open</span>
          <ec-icon name="simple-arrow-drop-down" :size="16" fill="currentColor" />
        </a>
      </ec-dropdown-search>
    </div>
  `,
}));

stories.add('in container with a dynamic width', () => ({
  components: { EcDropdownSearch, EcIcon },
  data() {
    return {
      selectedItem: null,
    };
  },
  props: {
    items: {
      default: object('Items', items),
    },
    isSearchEnabled: {
      default: boolean('isSearchEnabled', true),
    },
    paragraphText: {
      default: text('paragraphText', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Consequat interdum varius sit amet mattis vulputate enim nulla. Eget mi proin sed libero enim sed faucibus turpis.'),
    },
    boundariesElement: {
      default: select('boundariesElement', ['viewport', 'scrollParent'], 'viewport'),
    },
    maxVisibleItems: {
      default: number('maxVisibleItems', 3),
    },
  },
  methods: {
    onItemSelected: action('Item selected'),
  },
  template: `
    <div style="width: 100vw; height: 100vh;" class="ec-p--20">
      <p v-if="selectedItem">Selected item: {{ selectedItem.text }}</p>
      <p v-else>Selected item: None</p>
      <div style="width: 300px; overflow: auto; resize: horizontal; border: 1px solid #ccc; background-color: #fafafa;" class="ec-p--8">
        <p class="ec-mb--16"><strong>This is a block wrapper around the dropdown search. You can resize it and check how dropdown adapts.</strong></p>
        <ec-dropdown-search
          :items="items"
          :popover-options="{ placement: 'bottom-end', boundariesElement }"
          :is-search-enabled="isSearchEnabled"
          :max-visible-items="maxVisibleItems"
          v-model="selectedItem"
          @change="onItemSelected">
          <a href="#" @click.prevent>
            <span>Open</span>
            <ec-icon name="simple-arrow-drop-down" :size="16" fill="currentColor" />
          </a>
        </ec-dropdown-search>
        <p class="ec-mt--16">{{ paragraphText }}</p>
      </div>
    </div>
  `,
}));

stories.add('with custom item template', () => ({
  components: { EcDropdownSearch, EcIcon },
  data() {
    return {
      selectedItem: null,
    };
  },
  props: {
    items: {
      default: object('Items', items),
    },
    isSearchEnabled: {
      default: boolean('isSearchEnabled', true),
    },
    paragraphText: {
      default: text('paragraphText', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Consequat interdum varius sit amet mattis vulputate enim nulla. Eget mi proin sed libero enim sed faucibus turpis.'),
    },
    boundariesElement: {
      default: select('boundariesElement', ['viewport', 'scrollParent'], 'viewport'),
    },
    maxVisibleItems: {
      default: number('maxVisibleItems', 3),
    },
  },
  template: `
    <div style="width: 100vw; height: 100vh;" class="ec-p--20">
      <p v-if="selectedItem">Selected item: {{ selectedItem.text }}</p>
      <p v-else>Selected item: None</p>
      <ec-dropdown-search
        :items="items"
        :popover-options="{ placement: 'bottom-end', boundariesElement }"
        :is-search-enabled="isSearchEnabled"
        :max-visible-items="maxVisibleItems"
        v-model="selectedItem">
        <a href="#" @click.prevent>
          <span>Open</span>
          <ec-icon name="simple-arrow-drop-down" :size="16" fill="currentColor" />
        </a>
        <template #item="{ item, index }">
          <div>{{ index + 1 }}. {{ item.text }}</div>
          <strong>{{ item.disabledReason }}</strong>
        </template>
      </ec-dropdown-search>
      <p class="ec-mt--16">{{ paragraphText }}</p>
    </div>
  `,
}));

export default stories;
