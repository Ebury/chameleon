import { config } from '@vue/test-utils';

import EcPopoverStub from './ec-popover.stub';
import RouterLinkStub from './router-link.stub';
import RouterViewStub from './router-view.stub';

// do not use RouterLinkStub from @vue/test-utils because we won't be able to evaluate the props
// directly in the snapshots
config.global.stubs.RouterLink = RouterLinkStub;
config.global.stubs.RouterView = RouterViewStub;
config.global.stubs.EcPopover = EcPopoverStub;

config.global.renderStubDefaultSlot = true;
