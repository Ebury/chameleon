import Vue from 'vue';
import copyToClipboard from 'clipboard-copy';
import { storiesOf } from '@storybook/vue';
import {
  color, number, select, text,
} from '@storybook/addon-knobs';
import EcIcon from './ec-icon.vue';
import { loadSvgSprites } from '../../icons/loader';

const stories = storiesOf('Icon', module);

function readIconNamesFromSprite(svg) {
  const placeholder = document.createElement('div');
  placeholder.innerHTML = svg;
  const symbols = Array.from(placeholder.querySelectorAll('symbol[id^=ec-]'));
  return symbols.map(symbol => symbol.id.trim().replace(/^ec-/, ''));
}

const EcIconsGrid = Vue.extend({
  components: { EcIcon },
  props: ['icons', 'size', 'type', 'color'],
  methods: {
    copy(iconName) {
      copyToClipboard(iconName);
    },
  },
  template: `
    <div style="display: flex; flex-wrap: wrap;" :style="{ fill: color }">
      <div style="display: inline-block; padding: 16px;" v-for="icon of icons" :key="icon" :title="icon" @click="copy(icon)">
        <ec-icon :name="icon" :size="size" :type="type || null" />
      </div>
    </div>
  `,
});

stories.add('all icons', () => ({
  components: { EcIcon, EcIconsGrid },
  props: {
    size: {
      default: number('Size', 48),
    },
    color: {
      default: color('Color', '#333'),
    },
    type: {
      default: select('Type', ['', 'error', 'success', 'warning', 'info', 'interactive']),
    },
  },
  template: `
    <div style="padding: 32px; text-align: center;" v-if="isLoading">
      Loading icons...
    </div>
    <div style="padding: 32px; margin: 0 auto; max-width: 900px;" v-else>
      <input
        v-model="iconFilter"
        placeholder="Search icon by name"
        aria-label="Search icon by name"
        style="display: block; width: 80%; margin: 0 auto; margin-bottom: 40px; line-height: 40px; font-size: 24px; padding: 4px 14px; border: 1px solid #ccc; border-radius: 2px;"
      />

      <template v-if="hasRoundedIcons">
        <h2>Rounded icons</h2>
        <ec-icons-grid :icons="filteredRoundedIcons" v-bind="$props" />
      </template>

      <template v-if="hasSimpleIcons">
        <h2>Simple icons</h2>
        <ec-icons-grid :icons="filteredSimpleIcons" v-bind="$props" />
      </template>

      <template v-if="!hasIcons">
        No icons found.
      </template>
    </div>
  `,
  methods: {
    filterBy(arr, filterBy) {
      return filterBy
        ? arr.filter(item => item.toLowerCase().includes(filterBy.toLowerCase()))
        : arr;
    },
  },
  async created() {
    this.isLoading = true;

    const [roundedSvgSprite, simpleSvgSprite] = await Promise.all(loadSvgSprites(['rounded', 'simple'], '/img'));
    this.roundedIcons = readIconNamesFromSprite(roundedSvgSprite.svg).sort();
    this.simpleIcons = readIconNamesFromSprite(simpleSvgSprite.svg).sort();

    this.isLoading = false;
  },
  computed: {
    filteredRoundedIcons() {
      return this.filterBy(this.roundedIcons, this.iconFilter);
    },
    filteredSimpleIcons() {
      return this.filterBy(this.simpleIcons, this.iconFilter);
    },
    hasRoundedIcons() {
      return this.filteredRoundedIcons.length > 0;
    },
    hasSimpleIcons() {
      return this.filteredSimpleIcons.length > 0;
    },
    hasIcons() {
      return this.hasRoundedIcons || this.hasSimpleIcons;
    },
  },
  data() {
    return {
      isLoading: true,
      iconFilter: '',
      roundedIcons: [],
      simpleIcons: [],
    };
  },
}));

stories.add('basic', () => ({
  components: { EcIcon },
  template: `
      <ec-icon v-bind="$props" />
    `,
  props: {
    name: {
      default: text('Name', 'simple-check'),
    },
    size: {
      default: number('Size', 48),
    },
    type: {
      default: select('Type', ['', 'error', 'success', 'warning', 'info']),
    },
  },
}));

stories.add('within a text', () => ({
  components: { EcIcon },
  template: `<div class="ec-p--8">
    <p>
      Ipsum laborum laborum consectetur ut sunt commodo ullamco et reprehenderit anim.
      Deserunt labore mollit adipisicing labore id eiusmod veniam anim proident voluptate qui
      cupidatat culpa. <ec-icon name="simple-trade-finance" style="fill: #C00" :size="24" /> Sit ipsum sunt sit velit pariatur velit Lorem nisi.
      Tempor Lorem officia esse consequat exercitation pariatur fugiat esse. Aliquip veniam
      dolore veniam magna tempor ad id aute reprehenderit. Officia dolore veniam velit nisi
      amet ipsum aliqua minim. <ec-icon name="simple-check" style="fill: #00C" :size="24" />Consequat pariatur
      duis labore proident reprehenderit pariatur ex quis incididunt ut ipsum.
    </p>
    <button class="ec-btn ec-btn--rounded ec-btn--md ec-btn--primary ec-btn--outline ec-mt--16">
      <ec-icon name="simple-sign-out" style="fill: currentColor;" class="ec-mr--8" :size="24" /> Icon inside a button
    </button>
  </div>`,
}));

export default stories;
