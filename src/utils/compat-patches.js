/* istanbul ignore file */

import {
  Dropdown as FvDropdown,
  TooltipDirective as FvTooltipDirective,
  VClosePopper,
  VTooltip,
} from 'floating-vue';

// we need to tell the @vue/compat that all components coming from floating-vue are Vue 3 components so it skips
// them when patching component instances. These components can't run in default mode for Vue 2, there is lots of
// errors coming from the console in that mode.
export default function applyCompatPatches() {
  const compatConfig = {
    MODE: 3,
    RENDER_FUNCTION: false,
  };

  VTooltip.compatConfig = compatConfig;
  VClosePopper.compatConfig = compatConfig;
  FvTooltipDirective.compatConfig = compatConfig;
  for (const component of Object.values(FvTooltipDirective.components)) {
    component.compatConfig = compatConfig;
  }

  FvDropdown.compatConfig = compatConfig;

  for (const component of Object.values(FvDropdown.components)) {
    component.compatConfig = compatConfig;
  }
}
