module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'max-len': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': 'off', // we don't need this rule, we DO use semicolons!
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': ['error'],
    'no-use-before-define': 'off',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'import/prefer-default-export': 'off',
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
    'vue/multiline-html-element-content-newline': 'off',
    'vue/require-default-prop': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
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
  ],
};
