// eslint-disable-next-line import/no-extraneous-dependencies
const vitest = require('eslint-plugin-vitest');

module.exports = {
  overrides: [
    {
      files: [
        '**/*.spec.js',
        '**/*.spec.ts',
      ],
      plugins: ['vitest'],
      extends: [
        'plugin:vitest/recommended',
      ],
      globals: {
        ...vitest.environments.env.globals,
      },
      rules: {
        'vitest/consistent-test-filename': ['error', { pattern: '.*\\.spec\\.[tj]sx?$' }],
        'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
        'vitest/no-alias-methods': 'error',
        'vitest/no-disabled-tests': 'error',
        'vitest/no-duplicate-hooks': 'error',
        'vitest/no-focused-tests': 'error',
        'vitest/no-standalone-expect': 'error',
        'vitest/prefer-hooks-in-order': 'error',
        'vitest/prefer-hooks-on-top': 'error',
        'vitest/prefer-lowercase-title': ['error', { ignoreTopLevelDescribe: true }],
        'vitest/prefer-to-be': 'off',
      },
    },
  ],
};
