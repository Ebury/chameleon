import Vue from 'vue';
import { config } from '@vue/test-utils';

import RouterLinkStub from './router-link.stub';
import RouterViewStub from './router-view.stub';
import EcPopoverStub from './ec-popover.stub';

// do not use RouterLinkStub from @vue/test-utils because we won't be able to evaluate the props
// directly in the snapshots
config.stubs.RouterLink = RouterLinkStub;
config.stubs.RouterView = RouterViewStub;
config.stubs.EcPopover = EcPopoverStub;

Vue.config.ignoredElements = ['ec-stub'];
