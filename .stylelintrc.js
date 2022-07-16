const NAMING_PATTERN = /^[a-z0-9-]+(__[a-z0-9-]+)?(--[a-z0-9-]+)?$/;

module.exports = {
  root: true,
  reportNeedlessDisables: true,
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    'alpha-value-notation': 'number',
    'at-rule-empty-line-before': null,
    'at-rule-no-unknown': [true, { ignoreAtRules: ['define-mixin', 'mixin', 'screen'] }],
    'color-function-notation': null,
    'custom-property-pattern': NAMING_PATTERN,
    'declaration-block-no-redundant-longhand-properties': null,
    'function-no-unknown': [true, { ignoreFunctions: ['theme'] }],
    'function-url-quotes': 'always',
    indentation: 2,
    'keyframes-name-pattern': NAMING_PATTERN,
    'max-line-length': null,
    'no-descending-specificity': null, // impossible to enforce with SCSS
    'number-max-precision': null,
    'selector-class-pattern': NAMING_PATTERN,
    'selector-max-class': 2,
    'selector-max-id': 0,
    'selector-max-universal': 0,
    'selector-pseudo-element-colon-notation': 'single',
    'string-quotes': 'single',
    'value-keyword-case': ['lower', { camelCaseSvgKeywords: true }],
    'scss/at-each-key-value-single-line': true,
    'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-else-closing-brace-space-after': 'always-intermediate',
    'scss/at-else-empty-line-before': 'never',
    'scss/at-else-if-parentheses-space-before': 'always',
    'scss/at-extend-no-missing-placeholder': true,
    'scss/at-function-named-arguments': null,
    'scss/at-function-parentheses-space-before': 'never',
    'scss/at-function-pattern': NAMING_PATTERN,
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-if-closing-brace-space-after': 'always-intermediate',
    'scss/at-if-no-null': true,
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-import-partial-extension-blacklist': null,
    'scss/at-import-partial-extension-whitelist': null,
    'scss/at-import-partial-extension': 'never',
    'scss/at-mixin-argumentless-call-parentheses': 'never',
    'scss/at-mixin-named-arguments': null,
    'scss/at-mixin-parentheses-space-before': 'never',
    'scss/at-mixin-pattern': NAMING_PATTERN,
    'scss/at-rule-conditional-no-parentheses': true,
    'scss/at-rule-no-unknown': [true, { ignoreAtRules: ['define-mixin', 'screen'] }], // define-mixin, screen used in postcss-import
    'scss/comment-no-loud': null, // disabled because of PostCSS migration
    'scss/declaration-nested-properties-no-divided-groups': true,
    'scss/declaration-nested-properties': null,
    'scss/dimension-no-non-numeric-values': true,
    'scss/dollar-variable-colon-newline-after': null,
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-default': null,
    'scss/dollar-variable-empty-line-before': null,
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/dollar-variable-pattern': NAMING_PATTERN,
    'scss/double-slash-comment-empty-line-before': null,
    'scss/double-slash-comment-inline': null,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/function-color-relative': true,
    'scss/function-quote-no-quoted-strings-inside': true,
    'scss/function-unquote-no-unquoted-strings-inside': true,
    'scss/map-keys-quotes': null,
    'scss/media-feature-value-dollar-variable': null,
    'scss/no-dollar-variables': null,
    'scss/no-duplicate-dollar-variables': true,
    'scss/no-duplicate-mixins': null,
    'scss/operator-no-newline-after': true,
    'scss/operator-no-newline-before': true,
    'scss/operator-no-unspaced': true,
    'scss/partial-no-import': null,
    'scss/percent-placeholder-pattern': NAMING_PATTERN,
    'scss/selector-nest-combinators': null,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/selector-no-union-class-name': null,
  },
};
