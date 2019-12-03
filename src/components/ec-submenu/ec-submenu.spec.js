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

const slots = {
  'menu-item-1-content': '<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipisci aspernatur, sed possimus explicabo culpa quas laudantium? Quidem sunt totam maxime magni minus dignissimos eos libero nobis accusantium aspernatur qui inventore odio adipisci at dolorum consectetur velit ipsa quia assumenda porro, consequatur nisi mollitia deserunt. Iusto possimus debitis assumenda harum atque libero voluptates fugit quibusdam ipsa voluptatibus eligendi ex doloremque ducimus molestias natus adipisci, earum facere repudiandae sint nobis error maiores iste. Quam.</p>',
  'menu-item-2-content': '<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipisci aspernatur, sed possimus explicabo culpa quas laudantium? Quidem sunt totam maxime magni minus dignissimos eos libero nobis accusantium aspernatur qui inventore odio adipisci at dolorum consectetur velit ipsa quia assumenda porro, consequatur nisi mollitia deserunt. Iusto possimus debitis assumenda harum atque libero voluptates fugit quibusdam ipsa voluptatibus eligendi ex doloremque ducimus molestias natus adipisci, earum facere repudiandae sint nobis error maiores iste. Quam.</p>',
  'menu-item-3-content': '<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipisci aspernatur, sed possimus explicabo culpa quas laudantium? Quidem sunt totam maxime magni minus dignissimos eos libero nobis accusantium aspernatur qui inventore odio adipisci at dolorum consectetur velit ipsa quia assumenda porro, consequatur nisi mollitia deserunt. Iusto possimus debitis assumenda harum atque libero voluptates fugit quibusdam ipsa voluptatibus eligendi ex doloremque ducimus molestias natus adipisci, earum facere repudiandae sint nobis error maiores iste. Quam.</p>',
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

  it('should have the class ec-submenu--tabs if type is set to tabs', () => {
    const wrapper = mountSubmenu(
      {
        submenu,
        type: 'tabs',
      },
      {
        slots,
      },
    );

    expect(wrapper.find('.ec-submenu').exists()).toBe(true);
    expect(wrapper.find('.ec-submenu--tabs').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });
});
