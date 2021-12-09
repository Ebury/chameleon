import Vue from 'vue';
import copyToClipboard from 'clipboard-copy';
import EcIcon from './ec-icon.vue';
import { loadSvgSprites } from '../../icons/loader';

export default {
  title: 'Icon',
  component: EcIcon,
  argTypes: {
    type: {
      options: ['error', 'success', 'warning', 'info'],
      control: { type: 'select' },
    },
    name: {
      options: ['simple-check', 'rounded-check'],
      control: { type: 'select' },
    },
  },
};

function readIconNamesFromSprite(svg) {
  const placeholder = document.createElement('div');
  placeholder.innerHTML = svg;
  const symbols = Array.from(placeholder.querySelectorAll('symbol[id^=ec-]'));
  return symbols.map(symbol => symbol.id.trim().replace(/^ec-/, ''));
}

const EcIconsGrid = Vue.extend({
  components: { EcIcon },
  props: ['icons', 'size', 'type', 'color', 'borderRadius'],
  methods: {
    copy(iconName) {
      copyToClipboard(iconName);
    },
  },
  template: `
    <div class="tw-flex tw-flex-wrap" :style="{ fill: color }">
      <div class="tw-inline-block tw-p-16" v-for="icon of icons" :key="icon" :title="icon" @click="copy(icon)">
        <ec-icon :name="icon" :size="size" :type="type || null" :style="{ borderRadius }" />
      </div>
    </div>
  `,
});

const Template = (args, { argTypes }) => ({
  components: { EcIcon },
  props: Object.keys(argTypes),
  template: `
    <div class="tw-p-24 tw-flex">
      <ec-icon v-bind="$props" class="tw-m-auto" />
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  name: 'simple-check',
  size: 48,
};

basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const allIcons = (args, { argTypes }) => ({
  components: { EcIcon, EcIconsGrid },
  props: Object.keys(argTypes),
  template: `
    <div class="tw-p-32 tw-text-center" v-if="isLoading">
      Loading icons...
    </div>
    <div class="tw-p-32 tw-mx-auto" style="max-width: 900px;" v-else>
      <input
        v-model="iconFilter"
        placeholder="Search icon by name"
        aria-label="Search icon by name"
        class="tw-block tw-w-4/5 tw-my-0 tw-mx-auto tw-mb-40 tw-h2 tw-py-4 tw-px-12 tw-border tw-border-solid tw-border-gray-6 tw-rounded-sm"
      />

      <div class="search-results">
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

    const [roundedSvgSprite, simpleSvgSprite] = await Promise.all(loadSvgSprites(['rounded-icons', 'simple-icons'], '/img'));
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
});

allIcons.argTypes = {
  color: {
    control: { type: 'color' },
  },
  type: {
    options: ['error', 'success', 'warning', 'info', 'interactive'],
    control: { type: 'select' },
  },
  name: {
    table: { disable: true },
  },
};

allIcons.args = {
  color: '#333',
  size: 48,
};

allIcons.parameters = {
  visualRegressionTests: {
    waitOn: '.search-results',
    snapshotElement: '.search-results',
    controls: {
      large: { size: 64 },
      'type-error': { type: 'error' },
    },
  },
};

export const allFlags = (args, { argTypes }) => ({
  components: { EcIcon, EcIconsGrid },
  props: Object.keys(argTypes),
  template: `
    <div class="tw-p-32 tw-text-center" v-if="isLoading">
      Loading icons...
    </div>
    <div class="tw-p-32 tw-mx-auto" style="max-width: 900px;" v-else>
      <input
        v-model="flagFilter"
        placeholder="Search flag by name"
        aria-label="Search flag by name"
        class="tw-block tw-w-4/5 tw-my-0 tw-mx-auto tw-mb-40 tw-h2 tw-py-4 tw-px-12 tw-border tw-border-solid tw-border-gray-6 tw-rounded-sm"
      />

      <div class="search-results">

        <template v-if="hasCurrencyFlags">
          <h2>Currency</h2>
          <ec-icons-grid :icons="filteredCurrencyFlags" v-bind="$props" />
        </template>

        <template v-if="!hasIcons">
          No icons found.
        </template>
      </div>
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

    const [currencyFlagsSprite] = await Promise.all(loadSvgSprites(['currency-flags'], '/img'));
    this.currencyFlags = readIconNamesFromSprite(currencyFlagsSprite.svg).sort();

    this.isLoading = false;
  },
  computed: {
    filteredCurrencyFlags() {
      return this.filterBy(this.currencyFlags, this.flagFilter);
    },
    hasCurrencyFlags() {
      return this.filteredCurrencyFlags.length > 0;
    },
    hasIcons() {
      return this.hasCurrencyFlags;
    },
  },
  data() {
    return {
      isLoading: true,
      flagFilter: '',
      currencyFlags: [],
    };
  },
});

allFlags.argTypes = {
  borderRadius: { control: 'text' },
  name: {
    table: { disable: true },
  },
  type: {
    table: { disable: true },
  },
};

allFlags.args = {
  borderRadius: '0px',
  size: 48,
};

allFlags.parameters = {
  visualRegressionTests: {
    waitOn: '.search-results',
    snapshotElement: '.search-results',
    controls: {
      large: { size: 64 },
      rounded: { size: 48, borderRadius: '24px' },
    },
  },
};

export const withinAText = (args, { argTypes }) => ({
  components: { EcIcon },
  props: Object.keys(argTypes),
  template: `
    <div class="tw-p-8">
      <p>
        Ipsum laborum laborum consectetur ut sunt commodo ullamco et reprehenderit anim.
        Deserunt labore mollit adipisicing labore id eiusmod veniam anim proident voluptate qui
        cupidatat culpa. <ec-icon name="simple-trade-finance" class="tw-fill-error" :size="24" /> Sit ipsum sunt sit velit pariatur velit Lorem nisi.
        Tempor Lorem officia esse consequat exercitation pariatur fugiat esse. Aliquip veniam
        dolore veniam magna tempor ad id aute reprehenderit. Officia dolore veniam velit nisi
        amet ipsum aliqua minim. <ec-icon name="simple-check" class="tw-fill-success" :size="24" />Consequat pariatur
        duis labore proident reprehenderit pariatur ex quis incididunt ut ipsum.
      </p>
      <button class="ec-btn ec-btn--rounded ec-btn--md ec-btn--primary ec-btn--outline tw-mt-16">
        <ec-icon name="simple-sign-out" class="tw-fill-current tw-mr-8" :size="24" /><span>Icon inside of a button</span>
      </button>
    </div>
  `,
});
