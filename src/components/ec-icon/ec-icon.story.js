import copyToClipboard from 'clipboard-copy';
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from 'vue';

import { loadSvgSprites } from '../../icons/loader';
import EcIcon from './ec-icon.vue';

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

const EcIconsGrid = defineComponent({
  components: { EcIcon },
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

const Template = args => ({
  components: { EcIcon },
  setup() {
    return { args };
  },
  template: `
    <div class="tw-p-24 tw-flex">
      <ec-icon v-bind="args" class="tw-m-auto" />
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

export const allIcons = args => ({
  components: { EcIcon, EcIconsGrid },
  setup() {
    const isLoading = ref(true);
    const iconFilter = ref('');
    const roundedIcons = ref([]);
    const simpleIcons = ref([]);

    function filterBy(arr, filterText) {
      return filterText
        ? arr.filter(item => item.toLowerCase().includes(filterText.toLowerCase()))
        : arr;
    }

    const filteredRoundedIcons = computed(() => filterBy(roundedIcons.value, iconFilter.value));
    const filteredSimpleIcons = computed(() => filterBy(simpleIcons.value, iconFilter.value));
    const hasRoundedIcons = computed(() => filteredRoundedIcons.value.length > 0);
    const hasSimpleIcons = computed(() => filteredSimpleIcons.value.length > 0);
    const hasIcons = computed(() => hasRoundedIcons.value || hasSimpleIcons.value);

    onMounted(async () => {
      const [roundedSvgSprite, simpleSvgSprite] = await Promise.all(loadSvgSprites(['rounded-icons', 'simple-icons'], '/img'));
      roundedIcons.value = readIconNamesFromSprite(roundedSvgSprite.svg).sort();
      simpleIcons.value = readIconNamesFromSprite(simpleSvgSprite.svg).sort();

      isLoading.value = false;
    });

    return {
      args,
      isLoading,
      iconFilter,
      filteredRoundedIcons,
      filteredSimpleIcons,
      hasRoundedIcons,
      hasSimpleIcons,
      hasIcons,
    };
  },
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
          <ec-icons-grid :icons="filteredRoundedIcons" v-bind="args" />
        </template>

        <template v-if="hasSimpleIcons">
          <h2>Simple icons</h2>
          <ec-icons-grid :icons="filteredSimpleIcons" v-bind="args" />
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

export const allFlags = args => ({
  components: { EcIcon, EcIconsGrid },
  setup() {
    const isLoading = ref(true);
    const flagFilter = ref('');
    const currencyFlags = ref([]);

    function filterBy(arr, filterText) {
      return filterText
        ? arr.filter(item => item.toLowerCase().includes(filterText.toLowerCase()))
        : arr;
    }

    const filteredCurrencyFlags = computed(() => filterBy(currencyFlags.value, flagFilter.value));
    const hasCurrencyFlags = computed(() => filteredCurrencyFlags.value.length > 0);
    const hasIcons = computed(() => hasCurrencyFlags.value);

    onMounted(async () => {
      const [currencyFlagsSprite] = await Promise.all(loadSvgSprites(['currency-flags'], '/img'));
      currencyFlags.value = readIconNamesFromSprite(currencyFlagsSprite.svg).sort();

      isLoading.value = false;
    });

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
          <ec-icons-grid :icons="filteredCurrencyFlags" v-bind="args" />
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

export const withinAText = args => ({
  components: { EcIcon },
  setup() {
    return { args };
  },
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
