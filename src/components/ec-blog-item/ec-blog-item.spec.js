import { mount } from '@vue/test-utils';
import EcBlogItem from './ec-blog-item.vue';

const post = {
  title: 'title',
  author: 'author',
  category: 'category',
  featuredImage: 'https://ebury.com/wp-content/uploads/2020/02/iStock-173802956-scaled.jpg',
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
      const wrapper = mountBlogItem({
        title: post.title, author: post.author, category: post.category, featuredImage: post.featuredImage,
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
