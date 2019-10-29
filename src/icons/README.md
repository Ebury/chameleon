# Icons

This folder contains everything for building and loading svg-sprite from svg icons. This is a temporary home for
it, soon, all icons and build logic will be moving to separated package.

## Building SVG sprite

Build is set up via webpack and performs a cleanup of svg icons when building the sprite. Cleaning is handled
by [svgo library](https://github.com/svg/svgo) with default settings. All `fill` attributes in SVG files are also
removed, and icons use default fill color (`#000`).

To run the build:

```sh
npm run icons
```

Build will output a sprite for each folder in the `icons` folder. Each icon has generated unique ID, which contains
the folder name, sanitized file name and `ec-` prefix. e.g.:

```yaml
rounded
- Icon.svg
- mY icon.svg
simple
- icon.svg
- test.svg
```

... will produce two sprites, first with icons `ec-rounded-icon` and `ec-rounded-my-icon`, and a second sprite with icons
`ec-simple-icon` and `ec-simple-test`.

The folder name is included in the IDs to prevent collision when inlining all sprites in the HTML.

## Using SVG sprites in app

SVG sprite can be used two ways, as "external source" or "inline":

```html
<svg>
    <use xlink:href="/path/to/sprite.svg#ec-my-icon" />
</svg>
```

```html
<svg>
    <use xlink:href="#ec-my-icon" />
</svg>
```

First one doesn't work on IE, so we will use inline svg sprite. To inline the sprite in the HTML,
we can include the svg file in our `index.html` directly, or we can download the file via ajax and attach it to
the DOM when an app does bootstrap. For 2nd option, we have provided a small helper located in `browser.js`. Usage:

```js
import { inlineSvgSprites } from './icons/browser';

inlineSvgSprites(['rounded', 'simple'], '/img');
// loads /img/rounded-icons.svg and /img/simple-icons.svg in parallel
// then attaches content to the body
// automatically creates a <div> with unique ID for each sprite
```

```html
<div id="svg-sprite-container-rounded" hidden="" style="display: none;">
    <svg>
        <defs>
            <symbol viewBox="0 0 16 16" id="ec-rounded-books">...</symbol>
            <symbol viewBox="0 0 16 16" id="ec-rounded-cancelled">...</symbol>
            <symbol viewBox="0 0 16 16" id="ec-rounded-check">...</symbol>
        </defs>
    </svg>
</div>
```

You can call the function `inlineSvgSprites` multiple times to load additional sprites or reloading existing ones:

```js
import { inlineSvgSprites } from './icons/browser';

inlineSvgSprites(['rounded', 'simple'], '/img'); // loads rounded and simple sprites for the first time

inlineSvgSprites(['rounded', 'flags'], '/img');// reloads rounded and loads flags sprites for the first time
```
