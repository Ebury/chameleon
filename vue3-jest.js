// With Vue 3.3 we get the possibility to use imported types to declare props. However,
// this new method cause unit tests to fail due to the `@vue/vue3-jest` package didn't
// support it yet. This is a hacky fix that solves the issue.
// If jest transformer mantainers fix it on their side just remove this file
// and replace the fix for the original transformer in `jest.config.js`.
// More info here: https://github.com/vuejs/core/issues/8301

/* eslint-disable import/no-extraneous-dependencies */
require('@vue/compiler-sfc').registerTS(require('typescript'));
module.exports = require('@vue/vue3-jest');
