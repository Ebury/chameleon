import { mount } from '@vue/test-utils';
import EcMetrolineCards from './ec-metroline-cards.vue';

describe('EcMetrolineCards', () => {
  function mountMetrolineCards(mountOpts) {
    return mount(EcMetrolineCards, { ...mountOpts });
  }

  it('should render as expected', async () => {
    const wrapper = mountMetrolineCards({
      slots: {
        default: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
