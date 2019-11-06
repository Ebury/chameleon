import { storiesOf } from '@storybook/vue';
import {
  boolean, object, select, text,
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
  },
  methods: {
    onItemSelected: action('Item selected'),
  },
  template: `
    <div style="width: 100vw; height: 100vh;" class="ec-p--20">
      <p v-if="selectedItem">Selected item: {{ selectedItem.text }}</p>
      <p v-else>Selected item: None</p>
      <ec-dropdown-search
        :items="items"
        :popover-options="{ placement: 'bottom-end' }"
        :is-search-enabled="isSearchEnabled"
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

export default stories;
