# 1.0.0 - Initial release

## BREAKING CHANGES

* removed SASS from the project

# 0.1.98 - Minor changes in tailwind.config.js

## Added

* Enable the utility class `tw-border-2` to be able to define a 2px border width.

## Changed

* Updated the `inset` key within the `theme` object map in order to extend the range of possible values in properties like `top`, `bottom`, `right` or `left`. Until now we used those defined in `spacing` (and their corresponding in negative), from now on we will use those defined in `width`, which already includes `spacing` and adds values in percentages. In this way, we can use utility classes like `tw-left-1/2`.

# 0.1.86 - 0.1.131 - Goodbye SASS, welcome PostCSS and TailwindCSS

We've started a process of replacing SASS with PostCSS to be able to create custom themes using CSS variables.
In addition, we added TailwindCSS to replace utility classes with their generated ones.

## Deprecations

* deprecated usage of SASS language, loaders and `scss` folder.
* deprecated usage of SASS in Vue SFC.
* deprecated `ec-grid` component.
* deprecated `ec-p-*` utilities.
* deprecated `ec-m-*` utilities.
* deprecated `ec-align-center` utilities.

## BREAKING CHANGES

### settings

* removed complementary color scale because there is no formula for calculating them from the main color.
they are used only in our apps, only one of them, and only in one place as a gradient. we will revisit their
meaning and way how to generate them once we will be doing a refactoring of the functionality.
* color variables now uses HSL format only, to be easily themable by tweaking the saturation and lightness.
* color variables only contain HSL values so they can be used in `hsl()` and `hsla()` functions.

```css
.block {
    color: hsl(var(--ec-some-variable));
    background-color: hsla(var(--ec-some-variable), 0.5);
}
```

* removed `color-interactive` from reserved colors because it's not a reserved color and it's just a duplicate of `gray-color-level-4`.
* names of the gray colors have been cleaned of misleading words, like `$level-6-disabled-lines` is now `--ec-gray-color-level-6`.
the name doesn't reflect the usage e.g. the color `$level-6-disabled-lines` is used for borders, backgrounds, text colors, icon colors, etc. `$level-5-placeholders` is not used for placeholders at all ...
* names of the key colors have been cleaned of misleading words too, e.g. `$level-2-bank-blue` - bank blue doesn't make sense if we are going to make the components themeable. It is now `--ec-key-color-level-2`.
* moved `breakpoints` to tailwind config, so they can be used with `responsive` variant, `@screen` or `theme()`.
* `layout` variables moved to CSS variables.
* `typography` variables moved to tailwind config. You can use `tw-font-sans`, `tw-font-sans-condensed` and `tw-font-mono`.
* `z-index` variables moved to tailwind config. You can use `tw-z-<name_of_level>`, e.g. `tw-z-notification`.

### tools

* mixin `ec-screen-reader-only` removed, use `tw-sr-only` instead.
* mixins `checkbox-border-radius`, `shape-border-radius` and `button-border-radius` removed, use `tw-rounded-sm`, `tw-rounded` and `tw-rounded-button`.
* mixin `border-level-6` removed, use `tw-border tw-border-solid tw-border-gray-6` instead.
* mixins from `media-queries.scss` removed, use `@screen <breakpoint>` or `<breakpoint>:<utility>` instead.
Mixins like `media__up-to-*` and `media__only-mobile` will not be used in the future as tailwind is strictly
[mobile first](https://tailwindcss.com/docs/responsive-design/#mobile-first).
* mixins `media__orientation-landscape` and `media__orientation-portrait` removed without replacement. They were not used anywhere in the code.
* mixin `color-transition` renamed to `ec-text-color-transition` so it matches tailwind naming.
* mixin `fade-transition` renamed to `ec-fade-transition`.
* mixins from `typography.scss` removed, use `tw-h1`, `tw-body-text`, `tw-input-label` instead.
Only mixin `body-link` was preserved, but it was renamed to `ec-body-link`.
* mixin `ellipsis` removed, use `tw-truncate` instead.
* mixin `body-strong` - removed color declaration to match the `body-text`.
* mixin `btn` renamed in tailwind to `tw-btn-text`. The name `btn` was just too generic.
* mixins from `v-effects` removed, use `tw-shadow-level-X`. `left-box-shadow-level-1` renamed to `tw-shadow-level-1-rtl`. Fixed the opacity of `tw-shadow-level-1-rtl` not matching `tw-shadow-level-1` (0.1 -> 0.2).
* mixins from `z-index` removed, use `tw-z-<name_of_level>`, e.g. `tw-z-notification`.

### generic

None

### elements

None

### components

* deprecated `ec-grid` and replaced with bootstrap/tailwind grid based on flexbox. Use `tw-grid` instead.

### utilities

* deprecated `ec-p--*` utilities, use `tw-p-*` instead.
* deprecated `ec-m--*` utilities, use `tw-m-*`, `tw-m-auto` instead.
* expanded spacing range from `0, 4, 8, 12, 16, 20, 24, 36, 40` to `0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64`.
