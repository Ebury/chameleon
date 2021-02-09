import { mount } from '@vue/test-utils';
import EcBlogItem from './ec-blog-item.vue';

describe('EcBlogItem', () => {
  function mountEcBlogItem(props, mountOpts) {
    return mount(EcBlogItem, {
      propsData: {
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should render post', () => {
    const wrapper = mountEcBlogItem();
    expect(wrapper.element).toMatchSnapshot();
  });
});
