/* eslint-disable import/no-extraneous-dependencies */

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/vue-props-interface');

const ruleTester = new RuleTester();
ruleTester.run('vue-props-interface', rule, {
  valid: [{
    filename: 'test.vue',
    code: `
      <script setup lang="ts">
        interface RadioButtonProps {
          value: string,
          modelValue?: string,
          label?: string,
          description?: string,
          isDisabled?: boolean,
          isTextInline?: boolean,
          name?: string,
          errorMessage?: string,
          hasError?: boolean
        }

        const props = defineProps<RadioButtonProps>();
      </script>`,
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
    },
  },
  {
    filename: 'test.vue',
    code: `
      <script setup>
        interface RadioButtonProps {
          value: string,
          modelValue?: string,
          label?: string,
          description?: string,
          isDisabled?: boolean,
          isTextInline?: string,
          name?: string,
          errorMessage?: string,
          hasError?: boolean
        }

        const props = defineProps({
          value: {
            type: string,
          },
        });
      </script>`,
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
    },
  },
  ],

  invalid: [
    {
      code: `
        <script setup lang="ts">

          export interface RadioButtonProps {
            value: string,
            modelValue?: string,
            label?: string,
            description?: string,
            isDisabled?: boolean,
            isTextInline?: boolean,
            name?: string,
            errorMessage?: string,
            hasError?: boolean
          }

          const props = defineProps<RadioButtonProps>();
        </script>`,
      parser: require.resolve('vue-eslint-parser'),
      parserOptions: {
        parser: require.resolve('@typescript-eslint/parser'),
      },
      errors: [{ message: 'Interface RadioButtonProps can\'t be exported. Export it in types.ts file instead.', line: 16 }],
    },
    {
      code: `
        <script setup lang="ts">

          interface RadioButtonProps {
            value: string,
            modelValue?: string,
            label?: string,
            description?: string,
            isDisabled?: boolean,
            isTextInline?: string,
            name?: string,
            errorMessage?: string,
            hasError?: boolean
          }

          const props = defineProps<RadioButtonProps>();
        </script>`,
      parser: require.resolve('vue-eslint-parser'),
      parserOptions: {
        parser: require.resolve('@typescript-eslint/parser'),
      },
      errors: [{ message: 'These properties of interface RadioButtonProps are different in <input> and types.ts: isTextInline', line: 16 }],
    },
    {
      filename: 'test.vue',
      code: `
        <script setup lang="ts">
          interface RadioButtonProps {
            value: string,
            modelValue?: string,
            label?: string,
            description?: string,
            isDisabled?: boolean,
            isTextInline?: string,
            name?: string,
            errorMessage?: string,
            hasError?: boolean
          }

          const props = defineProps({
            value: {
              type: string,
            },
          });
        </script>`,
      parser: require.resolve('vue-eslint-parser'),
      parserOptions: {
        parser: require.resolve('@typescript-eslint/parser'),
      },
      errors: [{ message: 'defineProps must be typed by props interface: defineProps<SomeInterfaceProps>', line: 15 }],
    },
  ],
});
