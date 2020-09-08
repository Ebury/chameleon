import { storiesOf } from '@storybook/vue';
import { parse, walk, generate } from 'css-tree';

// eslint-disable-next-line import/no-webpack-loader-syntax
import tailwindCSS from '!!raw-loader!postcss-loader!./tailwind.story.css';

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

const stories = storiesOf('CSS/Tailwind', module);

stories
  .addParameters({
    a11y: { disabled: true }, // a11y addon, checking a story with a table of 3000+ rows, crashes the browser. we don't need this addon in here.
  })
  .add('all', () => ({
    template: `
      <div class="tw-max-w-screen-lg tw-m-auto tw-mt-20">
        <h1>Tailwind utility classes</h1>
        <p>Showing {{ filteredRules.length }} out of {{ rules.length }}</p>
        <input v-model="filter" placeholder="Search rules" class="tw-block tw-w-2/5 tw-mb-40 tw-h2 tw-py-4 tw-px-12 tw-border tw-border-solid tw-border-gray-level-6 tw-rounded-sm">
        <table class="tw-font-mono tw-whitespace-pre-wrap">
          <tbody>
            <tr v-for="rule of filteredRules">
              <td class="tw-border-gray-5 tw-border-solid tw-border tw-p-4 tw-px-8" style="min-width: 250px;">{{ rule.selector }}</td>
              <td class="tw-border-gray-5 tw-border-solid tw-border tw-p-4 tw-px-8"><pre>{{ rule.block }}</pre></td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
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
  }), {
    visualRegressionTests: { enabled: false },
  });
