module.exports = {
  extends: [
    'plugin:jest/recommended',
  ],
  ignorePatterns: ['**/*.cy.ts'],
  rules: {
    'jest/expect-expect': ['error', { assertFunctionNames: ['expect', 'expect[A-Za-z]+'] }],
    'jest/no-conditional-expect': 'off',
    'jest/no-identical-title': 'off',
    'jest/no-standalone-expect': ['error', { additionalTestBlockFunctions: ['beforeEach', 'afterEach'] }],
  },
};
