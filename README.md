# Chameleon Components

Chameleon Components is Ebury's vue.js 3.X components library.
The library is being used for our Vue projects at Ebury, and more components are added regularly.

Also, check out the latest version deployed in [Storybook](https://chameleon.ebury.now.sh/).

1. [Vision](VISION.md)
1. [Contributing](#contributing)
1. [Code Owners](CODEOWNERS)
1. [Installation](#installation)
1. [Usage](#usage)
1. [Theming](#theming)
1. [I18n](#i18n)
1. [References](#references)

## Installation

If you'd like to contribute to the library then you must do the following to set up your local environment:

1\. Clone chameleon-components repo

2\. Install all dependencies with:

```sh
npm install
```

3\. Run Storybook with:

```sh
npm start
```

That's it! By now, you should be up and running. You can check the existing components or create new ones.

## Contributing

We love collaborating with other teams and welcome contributions!

See the [contributing](CONTRIBUTING.md) docs for more info on code style, formatting, testing, and troubleshooting. Or if you want to report a problem or request some change.

## Usage

### Install the library in your project

Install `@ebury/chameleon-components` in your project with npm:

```sh
npm install @ebury/chameleon-components --save
```

### Import component/s

All of our components are exported by name from `@ebury/chameleon-components`, so you can import them with:

```js
import { ComponentName } from '@ebury/chameleon-components';
```

**NOTE!** If you are going to use `ec-phone-number-input`, you must host icons from `node_modules/svg-country-flags/png100px/` in your project.

For example icon with path `node_modules/svg-country-flags/png100px/gb.png` should be available in your project by url `[your static prefix]icons/country-flags/100/gb.png`. 
Static prefix could be change by setting up respective `iconsStaticPrefix` property in `src/config.js`.

## Theming

The components can use a custom theme. There are four color palettes used by the CSS, two of them can be adjusted via
CSS variables, e.g. the default blue color is defined as `--ec-key-color-level-4` and can be configured via `--ec-theme-key-color-level-4`.

Check out the list of possible variables in the [storybook colors story](https://chameleon.ebury.now.sh/?path=/story/css-colors-all).

A few examples of a theme can be found in the [src/styles/themes/](src/styles/themes/) folder.

## I18n

Some components, e.g. `ec-amount-input` or `ec-donut` require `Intl` API to format values properly or to detect
what is the decimal/grouping separator for a current locale. They both do that via [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
which might have issues in some browsers for not having all locales set up properly. See the issues we discovered in this [PR](https://github.com/Ebury/chameleon/pull/156#issuecomment-623705733).
If you need to support every single locale on the planet, we recommend to polyfill the Intl API using [formatjs.io](https://formatjs.io/docs/polyfills/intl-numberformat) packages so it's consistent across all browsers.

## References

### Vue.js

[Vue](https://vuejs.org/)

[Vite](https://vitejs.dev/)

### Storybook

[Storybook](https://storybook.js.org/)

### Testing

[Vitest](https://vitest.dev/)

[Vue Test Utils](https://test-utils.vuejs.org/)

[Cypress](https://www.cypress.io/)

### Linting

[ESLint](https://eslint.org/)

[Stylelint](https://stylelint.io/)

### CSS

[PostCSS](https://postcss.org/)

[TailwindCSS](https://tailwindcss.com/)

[Bootstrap Grid](https://getbootstrap.com/docs/4.0/layout/grid/)

### Dependencies

[flatpickr](https://flatpickr.js.org/)

[focus-trap](https://focus-trap.github.io/focus-trap/)

[floating-vue](https://floating-vue.starpad.dev/)

[mitt](https://www.npmjs.com/package/mitt)

[svg-country-flags](https://www.npmjs.com/package/svg-country-flags)
