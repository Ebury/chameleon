import type { Meta, StoryObj } from '@storybook/vue3';

import './tw-css-grid.story.css';

const meta: Meta = {
  title: 'CSS/CSS Grid',
};

export default meta;

type BasicCssGridStoryProps = {
  numberOfColumns: number,
  numberOfRows: number,
  numberOfItems: number,
  isInline: boolean,
  gap?: string,
  flow?: string,
  autoColumns?: string,
  autoRows?: string,
  justifyItems?: string,
  alignItems?: string,
  width?: number,
  height?: number,
  items: {
    [key: string]: BasicCssGridStoryItem,
  },
};

type BasicCssGridStoryItem = {
  colSpan?: string,
  rowSpan?: string,
};

export const Basic: StoryObj<BasicCssGridStoryProps> = {
  argTypes: {
    numberOfColumns: {
      control: { type: 'number', min: 1, max: 12 },
    },
    numberOfRows: {
      control: { type: 'number', min: 1, max: 6 },
    },
    flow: {
      options: ['', 'tw-grid-flow-row', 'tw-grid-flow-col', 'tw-grid-flow-dense', 'tw-grid-flow-row-dense', 'tw-grid-flow-col-dense'],
      control: { type: 'select' },
    },
    gap: {
      options: [
        '',
        'tw-gap', 'tw-gap-4', 'tw-gap-8', 'tw-gap-12', 'tw-gap-16', 'tw-gap-20', 'tw-gap-24',
        'tw-gap-x', 'tw-gap-x-4', 'tw-gap-x-8', 'tw-gap-x-12', 'tw-gap-x-16', 'tw-gap-x-20', 'tw-gap-x-24',
        'tw-gap-y', 'tw-gap-y-4', 'tw-gap-y-8', 'tw-gap-y-12', 'tw-gap-y-16', 'tw-gap-y-20', 'tw-gap-y-24',
      ],
      control: { type: 'select' },
    },
    autoColumns: {
      options: ['', 'tw-auto-cols-auto', 'tw-auto-cols-min', 'tw-auto-cols-max', 'tw-auto-cols-fr'],
      control: { type: 'select' },
    },
    autoRows: {
      options: ['', 'tw-auto-rows-auto', 'tw-auto-rows-min', 'tw-auto-rows-max', 'tw-auto-rows-fr'],
      control: { type: 'select' },
    },
    justifyItems: {
      options: ['', 'tw-justify-items-start', 'tw-justify-items-end', 'tw-justify-items-center', 'tw-justify-items-stretch'],
      control: { type: 'select' },
    },
    alignItems: {
      options: ['', 'tw-items-start', 'tw-items-end', 'tw-items-center', 'tw-items-stretch'],
      control: { type: 'select' },
    },
    width: {
      control: { type: 'number', min: 0, step: 5 },
    },
    height: {
      control: { type: 'number', min: 0, step: 5 },
    },
    items: {
      control: { type: 'object' },
    },
  },
  args: {
    numberOfColumns: 6,
    numberOfRows: 3,
    numberOfItems: 20,
    isInline: false,
    gap: 'tw-gap',
    items: {
      2: { colSpan: 'tw-col-span-2' },
      4: { colSpan: 'tw-row-span-4' },
      7: { colSpan: 'tw-col-start-2', rowSpan: 'tw-row-start-3' },
      8: { colSpan: 'tw-col-end-2', rowSpan: 'tw-row-end-3' },
      9: { colSpan: 'tw-col-start-3 tw-col-span-2' },
      18: { colSpan: 'tw-col-span-full' },
    },
  },
  render: args => ({
    setup() {
      function getItemClasses(id: string) {
        const { colSpan, rowSpan } = args.items[id] ?? {};
        return [
          `ec-css-grid-story__item--${id}`,
          colSpan || rowSpan ? 'ec-css-grid-story__item--customised' : null,
          colSpan,
          rowSpan,
        ];
      }

      return { args, getItemClasses };
    },
    template: `
      <div class="ec-css-grid-story tw-m-12" :class="{
        'tw-grid': !args.isInline,
        'tw-inline-grid': args.isInline,
        ['tw-grid-cols-' + args.numberOfColumns]: true,
        ['tw-grid-rows-' + args.numberOfRows]: true,
        [args.gap]: !!args.gap,
        [args.flow]: !!args.flow,
        [args.autoColumns]: !!args.autoColumns,
        [args.autoRows]: !!args.autoRows,
        [args.justifyItems]: !!args.justifyItems,
        [args.alignItems]: !!args.alignItems,
      }"
        :style="{
          width: args.width ? args.width + 'px' : null,
          height: args.height ? args.height + 'px' : null,
        }">
        <div v-for="i in args.numberOfItems" class="ec-css-grid-story__item" :class="getItemClasses(i)">{{ i }}</div>
      </div>
    `,
  }),
};

export const Nested: StoryObj = {
  render: () => ({
    template: `
      <div class="ec-css-grid-story tw-m-12 tw-grid tw-gap-12 tw-grid-cols-3">
        <div class="tw-grid tw-gap-4 tw-grid-cols-3">
          <div class="ec-css-grid-story__item">Nested 1</div>
          <div class="ec-css-grid-story__item">Nested 2</div>
          <div class="ec-css-grid-story__item">Nested 3</div>
        </div>
        <div class="ec-css-grid-story__item">1</div>
        <div class="tw-grid tw-gap-4 tw-grid-cols-2">
          <div class="ec-css-grid-story__item">Nested 1</div>
          <div class="ec-css-grid-story__item">Nested 2</div>
          <div class="ec-css-grid-story__item">Nested 3</div>
          <div class="ec-css-grid-story__item">Nested 4</div>
        </div>
        <div class="ec-css-grid-story__item tw-col-span-full">2</div>
        <div class="tw-col-span-full tw-grid tw-gap-8 tw-grid-cols-4">
          <div class="ec-css-grid-story__item">Nested 1</div>
          <div class="ec-css-grid-story__item">Nested 2</div>
          <div class="ec-css-grid-story__item tw-col-span-2">Nested 3</div>
          <div class="ec-css-grid-story__item">Nested 4</div>
          <div class="ec-css-grid-story__item tw-col-span-2 tw-row-span-2">Nested 5</div>
          <div class="ec-css-grid-story__item">Nested 6</div>
          <div class="ec-css-grid-story__item">Nested 7</div>
          <div class="ec-css-grid-story__item">Nested 8</div>
        </div>
        <div class="ec-css-grid-story__item">3</div>
        <div class="ec-css-grid-story__item">4</div>
        <div class="ec-css-grid-story__item">5</div>
        <div class="ec-css-grid-story__item">6</div>
        <div class="tw-grid tw-col-span-2 tw-row-span-2" style="grid-template-columns: subgrid; grid-template-rows: subgrid;">
          <div class="ec-css-grid-story__item">Subgrid 1</div>
          <div class="ec-css-grid-story__item">Subgrid 2</div>
          <div class="ec-css-grid-story__item tw-col-span-2">Subgrid 3</div>
        </div>
        <div class="ec-css-grid-story__item">7</div>
      </div>
    `,
  }),
};

export const Responsive: StoryObj = {
  render: () => ({
    template: `
      <div class="ec-css-grid-story tw-m-12 tw-grid tw-gap-12 md:tw-grid-cols-3 lg:tw-grid-cols-4 lg:tw-gap-24">
        <div class="ec-css-grid-story__item tw-col-span-full">
          <div>tw-grid tw-gap-12</div>
          <div class="tw-hidden md:tw-block lg:tw-hidden">md:tw-grid-cols-3</div>
          <div class="tw-hidden lg:tw-block">lg:tw-grid-cols-4 lg:tw-gap-24</div>
        </div>
        <div v-for="i in 10" class="ec-css-grid-story__item">{{ i }}</div>
      </div>
    `,
  }),
};

export const CustomTemplates: StoryObj = {
  render: () => ({
    template: `
      <div class="ec-css-grid-story tw-grid tw-gap-12 tw-grid-cols-[repeat(2,1fr_3fr)] tw-grid-rows-[1fr_3fr_1fr] tw-auto-rows-[2fr] tw-auto-cols-[minmax(100px,1fr)]">
        <div class="ec-css-grid-story__item tw-col-span-full">
          <div>.tw-grid.tw-gap-12</div>
          <div>.tw-grid-cols-[repeat(2,1fr_3fr)]</div>
          <div>.tw-grid-rows-[1fr_3fr_1fr]</div>
          <div>.tw-auto-rows-[2fr]</div>
          <div>.tw-auto-cols-[minmax(100px,1fr)]</div>
        </div>
        <div v-for="i in 10" class="ec-css-grid-story__item">{{ i }}</div>
        <div class="ec-css-grid-story__item tw-col-span-5">11</div>
      </div>
    `,
  }),
};

// https://css-tricks.com/books/greatest-css-tricks/flexible-grids/
export const Flexible: StoryObj = {
  render: () => ({
    template: `
      <div class="ec-css-grid-story tw-grid tw-gap-12 tw-grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))]">
        <div class="ec-css-grid-story__item tw-col-span-full">
          <div>.tw-grid.tw-gap-12</div>
          <div>.tw-grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))]</div>
        </div>
        <div v-for="i in 12" class="ec-css-grid-story__item">{{ i }}</div>
      </div>
    `,
  }),
};
