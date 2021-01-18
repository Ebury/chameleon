/* istanbul ignore file */

import { VTooltip } from 'v-tooltip';

Object.assign(VTooltip.options, {
  defaultClass: 'ec-tooltip',
  defaultTemplate: '<div class="ec-tooltip" role="tooltip"><div class="ec-tooltip__arrow"></div><div class="ec-tooltip__inner"></div></div>',
  defaultArrowSelector: '.ec-tooltip__arrow, .ec-tooltip__arrow',
  defaultLoadingClass: 'ec-tooltip__loading',
  defaultInnerSelector: '.ec-tooltip__inner',
  defaultTargetClass: 'ec-has-tooltip',
  defaultContainer: 'body',
  defaultBoundariesElement: 'viewport',
});

export default VTooltip;
