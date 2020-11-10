import { mount } from '@vue/test-utils';
import EcMetrolineCard from './ec-metroline-card.vue';

describe('EcMetrolineCard', () => {
  function mountMetrolineCard(opts, mountOpts) {
    return mount(EcMetrolineCard, {
      propsData: {
        ...opts,
      },
      ...mountOpts,
    });
  }

  it('should render as expected', async () => {
    const wrapper = mountMetrolineCard();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected when is collapsed', async () => {
    const wrapper = mountMetrolineCard({ isCollapsed: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected when has narrow padding', async () => {
    const wrapper = mountMetrolineCard({ hasNarrowPadding: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected when is collapsed and has narrow padding', async () => {
    const wrapper = mountMetrolineCard({ isCollapsed: true, hasNarrowPadding: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the slot as expected', () => {
    const wrapper = mountMetrolineCard({},
      {
        slots: {
          default: '<p>This is a Metroline Card</p>',
        },
      });
    expect(wrapper.element).toMatchSnapshot();
  });
});
