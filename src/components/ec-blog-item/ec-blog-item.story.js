import EcBlogItem from './ec-blog-item.vue';

export default {
  title: 'Blog Item',
  component: EcBlogItem,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    EcBlogItem,
  },
  template: `
  <ec-blog-item
    :title="title"
    :author="author"
    :category="category"
    :featuredImage="featuredImage"
  />`,
});

export const basic = Template.bind({});
basic.args = {
  title: 'Dollars claws background after worst month in 10 years.',
  author: 'Enrique Díaz-Álvarez',
  category: 'CURRENCY UPDATES',
  featuredImage: 'https://ebury.com/wp-content/uploads/2020/02/iStock-173802956-scaled.jpg',
};
