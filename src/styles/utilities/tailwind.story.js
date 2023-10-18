import { generate, parse, walk } from 'css-tree';

import tailwindCSS from './tailwind.story.css?inline';

const parsedCSS = parse(tailwindCSS);
const rules = [];

walk(parsedCSS, {
  visit: 'Rule',
  enter(node) {
    rules.push({
      selector: cleanUpSelector(generate(node.prelude)),
      block: formatBlock(generate(node.block)),
    });
  },
});

function formatBlock(block) {
  return block.replace(/;/g, ';\n').replace('{', '').replace('}', '').replace(/:/g, ': ');
}

function cleanUpSelector(selector) {
  return selector.replace(/\\:/g, ':').replace('\\32xl', '2xl').replace(/\\\//g, '/');
}

export default {
  title: 'CSS/Tailwind',
};

export const all = () => ({
  computed: {
    filteredRules() {
      return this.filter
        ? this.rules.filter(rule => rule.selector.includes(this.filter) || rule.block.includes(this.filter))
        : this.rules;
    },
  },
  data() {
    return { tailwind: tailwindCSS, rules, filter: '' };
  },
  template: `
    <div class="tw-max-w-screen-lg tw-w-full tw-m-auto tw-p-20">
      <h1>Tailwind utility classes</h1>
      <p>Showing {{ filteredRules.length }} out of {{ rules.length }}</p>
      <input v-model="filter" placeholder="Search rules" class="tw-block tw-w-2/5 tw-mb-40 tw-h2 tw-py-4 tw-px-12 tw-border tw-border-solid tw-border-gray-level-6 tw-rounded-sm">
      <table class="tw-font-mono tw-whitespace-pre-wrap tw-max-w-full tw-w-full">
        <tbody>
          <tr v-for="rule of filteredRules">
            <td class="tw-border-gray-5 tw-border-solid tw-border tw-p-4 tw-px-8" style="min-width: 250px; max-width: 400px">{{ rule.selector }}</td>
            <td class="tw-border-gray-5 tw-border-solid tw-border tw-p-4 tw-px-8"><pre class="tw-whitespace-pre-wrap">{{ rule.block }}</pre></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
});

all.parameters = {
  a11y: { disable: true },
  controls: { disable: true },
  actions: { disable: true },
  visualRegressionTests: { disable: true },
};
