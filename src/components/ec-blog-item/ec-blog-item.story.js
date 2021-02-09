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
      <div class=" ec-blog-item tw-grid tw-border-b tw-border-solid tw-border-gray-6" >
        <div class="tw-col-2" >
          <img class="tw-w-96 tw-h-96 tw-rounded" :src="featuredImage" >
        </div>
        <div class="tw-col-10">
          <p class="ec-blog-item__title" > {{ title }} </p>
          <p> {{ author }} </p>
          <p> {{ category }} </p>
        </div>
      </div>`,
});

export const basic = Template.bind({});
basic.args = {
  title: 'Dollars claws background after worst month in 10 years.',
  author: 'Enrique Díaz-Álvarez',
  category: 'CURRENCY UPDATES',
  featuredImage: 'https://ebury.com/wp-content/uploads/2020/02/iStock-173802956-scaled.jpg',
};
