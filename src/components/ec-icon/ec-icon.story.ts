import type { Meta, StoryFn } from '@storybook/vue3';
import copyToClipboard from 'clipboard-copy';
import { computed, defineComponent, ref } from 'vue';

import EcIcon from './ec-icon.vue';
import { IconName, type IconProps, IconType } from './types';

export default {
  title: 'Icon',
  component: EcIcon,
  argTypes: {
    type: {
      options: Object.values(IconType),
      control: { type: 'select' },
    },
    name: {
      options: Object.values(IconName),
      control: { type: 'select' },
    },
  },
} as Meta<typeof EcIcon>;

const EcIconsGrid = defineComponent({
  components: { EcIcon },
  // eslint-disable-next-line vue/require-prop-types
  props: ['icons', 'size', 'type', 'color', 'borderRadius'],
  setup() {
    return {
      copy: copyToClipboard,
    };
  },
  template: `
    <div class="tw-flex tw-flex-wrap" :style="{ fill: color }">
      <div class="tw-inline-block tw-p-16" v-for="icon of icons" :key="icon" :title="icon" @click="copy(icon)">
        <ec-icon :name="icon" :size="size" :type="type || null" :style="{ borderRadius }" />
      </div>
    </div>
  `,
});

type EcIconStory = StoryFn<typeof EcIcon>;

const Template: EcIconStory = args => ({
  components: { EcIcon },
  setup() {
    return {
      args,
    };
  },
  template: `
    <div class="tw-p-24 tw-flex">
      <ec-icon v-bind="args" class="tw-m-auto" />
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  name: IconName.SimpleCheck,
  size: 48,
};

basic.parameters = {
  visualRegressionTests: { disable: true },
};

type EcAllIconsStory = StoryFn<IconProps & { color: string }>;

export const allIcons: EcAllIconsStory = args => ({
  components: { EcIcon, EcIconsGrid },
  setup() {
    const iconFilter = ref('');
    const roundedIcons = Object.values(IconName).filter(iconName => iconName.indexOf('rounded') === 0).sort();
    const simpleIcons = Object.values(IconName).filter(iconName => iconName.indexOf('simple') === 0).sort();

    function filterBy(arr: string[], filterText: string) {
      return filterText
        ? arr.filter(item => item.toLowerCase().includes(filterText.toLowerCase()))
        : arr;
    }

    const filteredRoundedIcons = computed(() => filterBy(roundedIcons, iconFilter.value));
    const filteredSimpleIcons = computed(() => filterBy(simpleIcons, iconFilter.value));
    const hasRoundedIcons = computed(() => filteredRoundedIcons.value.length > 0);
    const hasSimpleIcons = computed(() => filteredSimpleIcons.value.length > 0);
    const hasIcons = computed(() => hasRoundedIcons.value || hasSimpleIcons.value);

    return {
      args,
      iconFilter,
      filteredRoundedIcons,
      filteredSimpleIcons,
      hasRoundedIcons,
      hasSimpleIcons,
      hasIcons,
    };
  },
  template: `
    <div class="tw-p-32 tw-mx-auto" style="max-width: 900px;">
      <input
        v-model="iconFilter"
        placeholder="Search icon by name"
        aria-label="Search icon by name"
        class="tw-block tw-w-4/5 tw-my-0 tw-mx-auto tw-mb-40 tw-h2 tw-py-4 tw-px-12 tw-border tw-border-solid tw-border-gray-6 tw-rounded-sm"
      />

      <div class="search-results">
        <template v-if="hasRoundedIcons">
          <h2>Rounded icons</h2>
          <ec-icons-grid v-bind="args" :icons="filteredRoundedIcons" />
        </template>

        <template v-if="hasSimpleIcons">
          <h2>Simple icons</h2>
          <ec-icons-grid v-bind="args" :icons="filteredSimpleIcons" />
        </template>

        <template v-if="!hasIcons">
          No icons found.
        </template>
      </div>
    </div>
  `,
});

allIcons.argTypes = {
  color: {
    control: { type: 'color' },
  },
  type: {
    options: [IconType.ERROR, IconType.SUCCESS, IconType.WARNING, IconType.INFO, IconType.INTERACTIVE],
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
      'type-error': { type: IconType.ERROR },
    },
  },
};

type EcAllFlagsStory = StoryFn<IconProps & { borderRadius: string }>;

export const allFlags: EcAllFlagsStory = args => ({
  components: { EcIcon, EcIconsGrid },
  setup() {
    const isLoading = ref(true);
    const flagFilter = ref('');
    const currencyFlags = Object.values(IconName).filter(iconName => iconName.indexOf('currency') === 0).sort();

    function filterBy(arr: string[], filterText: string) {
      return filterText
        ? arr.filter(item => item.toLowerCase().includes(filterText.toLowerCase()))
        : arr;
    }

    const filteredCurrencyFlags = computed(() => filterBy(currencyFlags, flagFilter.value));
    const hasCurrencyFlags = computed(() => filteredCurrencyFlags.value.length > 0);
    const hasIcons = computed(() => hasCurrencyFlags.value);

    return {
      args,
      isLoading,
      flagFilter,
      filteredCurrencyFlags,
      hasCurrencyFlags,
      hasIcons,
    };
  },
  template: `
    <div class="tw-p-32 tw-mx-auto" style="max-width: 900px;">
      <input
        v-model="flagFilter"
        placeholder="Search flag by name"
        aria-label="Search flag by name"
        class="tw-block tw-w-4/5 tw-my-0 tw-mx-auto tw-mb-40 tw-h2 tw-py-4 tw-px-12 tw-border tw-border-solid tw-border-gray-6 tw-rounded-sm"
      />

      <div class="search-results">

        <template v-if="hasCurrencyFlags">
          <h2>Currency</h2>
          <ec-icons-grid v-bind="args" :icons="filteredCurrencyFlags" />
        </template>

        <template v-if="!hasIcons">
          No icons found.
        </template>
      </div>
    </div>
  `,
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

export const withinAText = () => ({
  components: { EcIcon },
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
        <ec-icon name="${IconName.SimpleSignOut}" class="tw-fill-current tw-mr-8" :size="24" /><span>Icon inside of a button</span>
      </button>
    </div>
  `,
});

withinAText.parameters = {
  controls: { disable: true },
  actions: { disable: true },
};
