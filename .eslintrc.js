module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
  ],
  plugins: ['simple-import-sort'],
  rules: {
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'default-param-last': 'off',
    'max-len': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': 'off', // we don't need this rule, we DO use semicolons!
    'no-restricted-exports': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': ['error'],
    'no-use-before-define': 'off',
    'require-await': ['error'],
    'import/prefer-default-export': 'off',
    'simple-import-sort/imports': ['error', {
      groups: [
        ['^@?(?!ebury)\\w'], // vendor
        ['^@ebury\\/'], // ebury lib
        ['^[^.\\u0000]', '^\\.', '^'], // both absolute and relative imports
        ['^\\u0000'], // side effect imports
      ],
    }],
    'simple-import-sort/exports': 'error',
    'vue/attributes-order': ['error', {
      order: [
        'GLOBAL',
        'DEFINITION',
        'LIST_RENDERING',
        'UNIQUE',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'CONTENT',
        'EVENTS',
      ],
    }],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/multi-word-component-names': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/one-component-per-file': 'off',
    'vue/require-default-prop': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    // vue/compat
    'vue/no-deprecated-dollar-listeners-api': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'vue/no-deprecated-filter': 'off',
    // TODO:
    'vuejs-accessibility/anchor-has-content': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/mouse-events-have-key-events': 'off',
  },
  overrides: [
    {
      files: [
        '**/src/**/*.spec.js',
      ],
      env: {
        jest: true,
      },
      rules: {
        'global-require': 'off',
        'vue/require-prop-types': 'off',
      },
    },
    {
      files: [
        '**/*.story.js',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'vue/require-prop-types': 'off',
      },
    },
    {
      files: [
        '**/*.vue',
      ],
      rules: {
        'import/first': 'off',
      },
    },
  ],
};
