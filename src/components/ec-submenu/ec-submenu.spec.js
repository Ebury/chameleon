import { mount } from '@vue/test-utils';
import EcSubmenu from './ec-submenu.vue';

function mountSubmenu(props, mountOpts) {
  return mount(EcSubmenu, {
    propsData: { ...props },
    ...mountOpts,
  });
}

const submenu = [
  {
    headerSlotName: 'menu-item-1',
    mainSlotName: 'menu-item-1-content',
    title: 'Submitted Requests',
    isActive: true,
  },
  {
    headerSlotName: 'menu-item-2',
    mainSlotName: 'menu-item-2-content',
    title: 'Repayments to Ebury',
    isActive: false,
  },
  {
    headerSlotName: 'menu-item-3',
    mainSlotName: 'menu-item-3-content',
    title: 'test',
    isActive: false,
  },
];

const slots = {
  'menu-menu-1': '<a> Test 1(30)</a>',
  'menu-item-1-content': '<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipisci aspernatur, sed possimus explicabo culpa quas laudantium? Quidem sunt totam maxime magni minus dignissimos eos libero nobis accusantium aspernatur qui inventore odio adipisci at dolorum consectetur velit ipsa quia assumenda porro, consequatur nisi mollitia deserunt. Iusto possimus debitis assumenda harum atque libero voluptates fugit quibusdam ipsa voluptatibus eligendi ex doloremque ducimus molestias natus adipisci, earum facere repudiandae sint nobis error maiores iste. Quam.</p>',
  'menu-menu-2': '<a>Test 2(30)</a>',
  'menu-item-2-content': '<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipisci aspernatur, sed possimus explicabo culpa quas laudantium? Quidem sunt totam maxime magni minus dignissimos eos libero nobis accusantium aspernatur qui inventore odio adipisci at dolorum consectetur velit ipsa quia assumenda porro, consequatur nisi mollitia deserunt. Iusto possimus debitis assumenda harum atque libero voluptates fugit quibusdam ipsa voluptatibus eligendi ex doloremque ducimus molestias natus adipisci, earum facere repudiandae sint nobis error maiores iste. Quam.</p>',
  'menu-menu-3': '<a>Test 3(30)</a>',
  'menu-item-3-content': '<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipisci aspernatur, sed possimus explicabo culpa quas laudantium? Quidem sunt totam maxime magni minus dignissimos eos libero nobis accusantium aspernatur qui inventore odio adipisci at dolorum consectetur velit ipsa quia assumenda porro, consequatur nisi mollitia deserunt. Iusto possimus debitis assumenda harum atque libero voluptates fugit quibusdam ipsa voluptatibus eligendi ex doloremque ducimus molestias natus adipisci, earum facere repudiandae sint nobis error maiores iste. Quam.</p>',
};

describe('EcSubmenu', () => {
  it('should not render the submenu if submenu content not passed', () => {
    const wrapper = mountSubmenu();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the submenu if slots are passed', () => {
    const wrapper = mountSubmenu(
      { submenu },
      {
        slots,
      },
    );
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render the arrows if header does not overflow', () => {
    const wrapper = mountSubmenu(
      { submenu },
      {
        slots,
      },
    );

    wrapper.vm.headerOverflows = jest.fn(() => false);

    expect(wrapper.find('.ec-submenu__arrow-right').exists()).toBe(true);
    expect(wrapper.find('.ec-submenu__arrow-left').exists()).toBe(true);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the arrows if header overflows', () => {
    const wrapper = mountSubmenu(
      { submenu },
      {
        slots,
      },
    );

    wrapper.vm.headerOverflows = jest.fn(() => true);

    expect(wrapper.find('.ec-submenu__arrow-right').exists()).toBe(true);
    expect(wrapper.find('.ec-submenu__arrow-left').exists()).toBe(true);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should move to the right if right arrow is clicked', () => {
    const wrapper = mountSubmenu(
      { submenu },
      {
        slots,
      },
    );

    wrapper.vm.headerOverflows = jest.fn(() => true);
    wrapper.vm.moveRight = jest.fn();

    expect(wrapper.find('.ec-submenu__arrow-right').exists()).toBe(true);

    wrapper.find('.ec-submenu__arrow-right').trigger('click');

    expect(wrapper.vm.moveRight).toHaveBeenCalled();
  });

  it('should move to the left if left arrow is clicked', () => {
    const wrapper = mountSubmenu(
      { submenu },
      {
        slots,
      },
    );

    wrapper.vm.headerOverflows = jest.fn(() => true);
    wrapper.vm.moveLeft = jest.fn();

    expect(wrapper.find('.ec-submenu__arrow-left').exists()).toBe(true);

    wrapper.find('.ec-submenu__arrow-left').trigger('click');

    expect(wrapper.vm.moveLeft).toHaveBeenCalled();
  });
});
