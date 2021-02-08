import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';
import EcBlogItem from './ec-blog-item.vue';

const stories = storiesOf('Blog Item', module);

stories.add('basic', () => ({
  components: { EcBlogItem },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'Dollars claws background after worst month in 10 years.',
          author: 'Enrique Díaz-Álvarez',
          category: 'CURRENCY UPDATES',
          featuredImage: 'https://ebury.com/wp-content/uploads/2020/02/iStock-173802956-scaled.jpg',
        },
        {
          id: 2,
          title: 'Investors favour dollar on diverging economic data',
          author: 'Matthew Ryan',
          category: 'CURRENCY UPDATES',
          featuredImage: 'https://ebury.com/wp-content/uploads/2020/04/iStock-1162461465-scaled.jpg',
        },
      ],
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
  methods: {
    addPost() {
      this.posts.push({
        id: this.id,
        title: this.title,
        author: this.author,
        category: this.category,
        featuredImage: this.featuredImage,
      });
    },
  },

  render() {
    return (
        <div>
          <EcBlogItem posts={this.posts} />
        </div>
    );
  },
}));
