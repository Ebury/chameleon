module.exports = {
  extends: [
    'plugin:jest/recommended',
  ],
  rules: {
    'jest/expect-expect': ['error', { assertFunctionNames: ['expect', 'expect[A-Za-z]+'] }],
    'jest/no-conditional-expect': 'off',
    'jest/no-identical-title': 'off',
    'jest/no-standalone-expect': ['error', { additionalTestBlockFunctions: ['beforeEach', 'afterEach'] }],
    'jest/no-commented-out-tests': 'error',
    'jest/no-disabled-tests': 'error',
  },
};
