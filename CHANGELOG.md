# 0.1.86 - 0.1.XX - Goodbye SASS, welcome PostCSS and TailwindCSS

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

None (yet)

### generic

None

### elements

None

### components

None (yet)

### utilities

* deprecated `ec-p--*` utilities, use `tw-p-*` instead.
* deprecated `ec-m--*` utilities, use `tw-m-*`, `tw-m-auto` instead.
* expanded spacing range from `0, 4, 8, 12, 16, 20, 24, 36, 40` to `0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64`.
