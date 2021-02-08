import { mount } from '@vue/test-utils';
import EcBlogItem from './ec-blog-item.vue';

const posts = [
  {
    id: 1,
    title: 'Post 1',
    author: 'Author 1',
    category: 'Category 1',
    featuredImage: 'Image 1',
  },
];

function mountBlogItem(props, mountOpts) {
  return mount(EcBlogItem, {
    propsData: { ...props },
    ...mountOpts,
  });
}

describe('EcBlogItem', () => {
  describe('posts prop', () => {
    it('should render post', () => {
      const wrapper = mountBlogItem({ posts });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
