import { mount } from '@vue/test-utils';
import EcBlogItem from './ec-blog-item.vue';

describe('EcBlogItem', () => {
  function mountEcBlogItem(props, mountOpts) {
    return mount(EcBlogItem, {
      propsData: {
        title: 'title',
        author: 'author',
        category: 'category',
        featuredImage: 'featuredImage',
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should render blog item title', () => {
    const wrapper = mountEcBlogItem({ title: 'title' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render blog item author', () => {
    const wrapper = mountEcBlogItem({ author: 'author' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render blog item category', () => {
    const wrapper = mountEcBlogItem({ category: 'category' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render blog item featuredImage', () => {
    const wrapper = mountEcBlogItem({ featuredImage: 'featuredImage' });
    expect(wrapper.element).toMatchSnapshot();
  });
});
