import { mount } from '@vue/test-utils';
import EcSubmenu from './ec-submenu.vue';
import { withMockedConsole } from '../../../tests/utils/console';

function mountSubmenu(props, mountOpts) {
  return mount(EcSubmenu, {
    propsData: { ...props },
    stubs: ['router-link'],
    ...mountOpts,
  });
}

const submenu = [
  {
    headerTitle: 'Submitted Requests',
    href: String,
    additionalText: '(30)',
    slotName: 'menu-item-1-content',
  },
  {
    headerTitle: 'Repayments',
    route: '/submitted',
    additionalText: '(30)',
    slotName: 'menu-item-2-content',
  },
  {
    headerTitle: 'Another Request',
    route: '/submitted',
    additionalText: '(30)',
    slotName: 'menu-item-3-content',
  },
];

function lorem() {
  return '<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipisci aspernatur, sed possimus explicabo culpa quas laudantium?</p>';
}

const slots = {
  'menu-item-1-content': lorem(),
  'menu-item-2-content': lorem(),
  'menu-item-3-content': lorem(),
};

describe('EcSubmenu', () => {
  it('should throw an error if we don\'t pass any content', () => {
    withMockedConsole((errorSpy) => {
      mount(EcSubmenu);
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "submenu"');
    });
  });

  it('should render the submenu if slots are passed', () => {
    const wrapper = mountSubmenu(
      { submenu },
      {
        slots,
      },
    );

    expect(wrapper.find('.ec-submenu').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });
});
