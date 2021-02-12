<template>
  <div
    class="ec-blog-item"
  >
    <div
      class="ec-blog-item__featuredImageColumn"
    >
      <img
        class="ec-blog-item__featuredImage"
        :src="featuredImage"
      >
    </div>
    <div
      class="ec-blog-item__infoColumnm"
    >
      <p
        class="ec-blog-item__title"
      >
        {{ title }}
      </p>
      <p>
        {{ author }}
      </p>
      <p>
        {{ category }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EcBlogItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    category: {
      type: String,
    },
    featuredImage: {
      type: String,
    },
  },
};
</script>

<style>
.ec-blog-item {
  @apply tw-grid;
  @apply tw-border-b;
  @apply tw-border-solid;
  @apply tw-border-gray-6;

  &__featuredImageColumn {
    @apply tw-col-2;
  }

  &__featuredImage {
    @apply tw-w-96;
    @apply tw-h-96;
    @apply tw-rounded;
  }

  &__infoColumnm {
    @apply tw-col-10;
  }

  &__title {
    @apply input-label;
  }
}
</style>
