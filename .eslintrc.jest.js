module.exports = {
  extends: [
    'plugin:jest/recommended',
  ],
  rules: {
    'jest/no-standalone-expect': ['error', { additionalTestBlockFunctions: ['beforeEach', 'afterEach'] }],
    'jest/expect-expect': ['error', { assertFunctionNames: ['expect', 'expect[A-Za-z]+'] }],
  },
};
