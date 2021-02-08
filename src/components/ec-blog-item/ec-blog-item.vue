<template>
  <transition-group
    class="ec-main-container ec-blog-item"
    tag="div"
  >
    <div
      v-for="post of posts"
      :key="post.id"
      class="tw-grid tw-border-b tw-border-solid tw-border-gray-6"
      data-test="ec-blogItem__post"
    >
      <div class="tw-col-2">
        <img
          class="tw-w-96 tw-h-96 tw-rounded"
          :src="post.featuredImage"
        >
      </div>
      <div class="tw-col-10">
        <p class="tw-mt-0 ec-blog-item__title"> {{ post.title }} </p>
        <p class="tw-mt-0 ec-blog-item__author "> {{ post.author }} </p>
        <p class="tw-mt-0 ec-blog-item__category "> {{ post.category }} </p>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'EcBlogItem',
  props: {
    posts: { type: Array, default: () => [] },
  },
};
</script>

<style>
.ec-blog-item {
  &__title {
    @apply input-label;
  }
}
</style>
