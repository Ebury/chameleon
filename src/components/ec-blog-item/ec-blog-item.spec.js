import { mount } from '@vue/test-utils';
import EcBlogItem from './ec-blog-item.vue';

describe('EcBlogItem', () => {
  function mountEcBlogItem(props, mountOpts) {
    return mount(EcBlogItem, {
      propsData: {
        title: 'Title example',
        author: 'Author example',
        category: 'category example',
        featuredImage: 'https://ebury.com/wp-content/uploads/2020/02/iStock-173802956-scaled.jpg',
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
