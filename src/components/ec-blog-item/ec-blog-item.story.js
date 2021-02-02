import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';
import EcBlogItem from './ec-blog-item.vue';

const stories = storiesOf('Blog Item', module);

stories.add('all', () => ({
  components: { EcBlogItem },
  data() {
    return {
      id: 1,
      title: 'Post 1',
      author: 'Author 1',
      category: 'Category 1',
      featuredImage: 'Image 1',
    };
  },
  props: {
    title: {
      default: text('title', 'Dollars claws background after worst month in 10 years.'),
    },
    author: {
      default: text('author', 'A new author'),
    },
    category: {
      default: text('category', 'A new category'),
    },
    featuredImage: {
      default: text('featuredImage', 'https://ebury.com/wp-content/uploads/2020/02/iStock-173802956-scaled.jpg'),
    },
  },

  render() {
    return (
      <div>
        <div>
          <EcBlogItem title={this.title} author={this.author} category={this.category} featuredImage={this.featuredImage} />
        </div>
      </div>
    );
  },
}));
