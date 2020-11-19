import { storiesOf } from '@storybook/vue';
import EcBlogItem from './ec-blog-item.vue';

const stories = storiesOf('Blog Item', module);

stories.add('all', () => ({
  components: { EcBlogItem },
  data() {
    return {
          id: 1,
          title: 'Post 1',
          shortDescription: 'Short 1',
          author: 'Author 1',
          category: 'Category 1',
    };
  },
  props: {
    title: {
      default: text('title', 'A new title'),
    },
    shortDescription: {
      default: text('shortDescription', 'A new shortDescription'),
    },
    author: {
      default: text('author', 'A new author'),
    },
    category: {
      default: text('category', 'A new category'),
    },
  },

  render() {
    return (
      <div>
        <div>
          <EcBlogItem title={this.title} shortDescription={this.shortDescription} author={this.author} category={this.category} />
        </div>
      </div>
    );
  },
}));
