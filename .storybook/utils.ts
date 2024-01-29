import type { StoryFn } from '@storybook/vue3';

export function fixedContainerDecorator(height: string = '100vh'): StoryFn {
  // what is this for? an element with position: fixed always escapes the boundaries of the Docs page. See e.g.
  // ec-navigation.story.js.
  //
  // They are two ways how to fix this:
  //
  // 1. stop inlining stories in Docs page and set:
  // parameters: {
  //   docs: {
  //     inlineStories: false,
  //     iframeHeight: '500px',
  //   },
  // },
  // ^^ this will create an iframe for each story and the fixed elements will be relative to that iframe.
  // It's a proper solution, designed by the storybook guys; and that's why it doesn't work. There's bug which
  // prevents the Controls addon to work with stories running inside of iframe, see https://github.com/storybookjs/storybook/issues/11908.
  // So we have to go with a second option.
  //
  // 2. wrap the inlined story with div that has transform: scale(1) style because that forces a relative
  // container layer even for fixed elements. see https://bleepcoder.com/storybook/490251969/addon-docs-component-with-position-fixed-leaks-out-from
  // It's a CSS hack, but it's still elegant.

  return () => ({ template: `<div style="height: ${height}; transform: scale(1); overflow-x: hidden;"><story/></div>` });
}
