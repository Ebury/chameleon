import { mount } from '@vue/test-utils';
import EcBlogItem from './ec-blog-item.vue';

const post =
  {
    title: 'title',
    shortDescription: 'shortDescription',
    author: 'author',
    category: 'category',
  };

function mountBlogItem(props, mountOpts) {
  return mount(EcBlogItem, {
    propsData: { ...props },
    ...mountOpts,
  });
}

describe('EcBlogItem', () => {

  describe('posts prop', () => {

    it('should render post', () => {
      const wrapper = mountBlogItem({ title: post.title, shortDescription: post.shortDescription, author: post.author, category: post.category, });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
