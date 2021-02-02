<template>
  <div class="ec-main-container ec-blog-item">
    <div class="tw-grid tw-border-b tw-border-solid tw-border-gray-6">
      <div class="tw-col-2">
        <img class="tw-w-96 tw-h-96 tw-rounded" :src="featuredImage">
      </div>
      <div class="tw-col-10" >
        <p class="tw-mt-0 ec-blog-item__title" >
          {{ title }}
        </p>
        <p>{{ author }}</p>
        <p>{{ category }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EcBlogItem',
  props: {
    title: { type: String },
    author: { type: String },
    category: { type: String },
    featuredImage: { type: String },
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
