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
    const wrapper = mountMetrolineCard({},
      {
        slots: {
          default: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
        },
      });
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('when we set up the component props', () => {
    it.each([
      [false, false, false, false, false],
      [true, false, false, false, false],
      [false, true, false, false, false],
      [false, false, true, false, false],
      [false, false, false, true, false],
      [false, false, false, false, true],
      [true, true, true, true, true],
    ])(
      'should render properly (when isCollapsed is %s, isFirst is %s, isLast is %s, isStandAlone is %s, and hasNarrowPadding is %s)',
      async (isCollapsed, isFirst, isLast, isStandAlone, hasNarrowPadding) => {
        const wrapper = mountMetrolineCard({
          isCollapsed,
          isFirst,
          isLast,
          isStandAlone,
          hasNarrowPadding,
        });
        expect(wrapper.element).toMatchSnapshot();
      },
    );
  });
});
