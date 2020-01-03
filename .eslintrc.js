module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:jest/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'max-len': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': ['error', { allow: ['_uid'] }],
    'no-use-before-define': 'off',

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
        '**/*.spec.js',
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
