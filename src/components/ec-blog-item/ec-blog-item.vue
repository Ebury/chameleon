<template>
  <div>
    <p>{{ title }}</p>
    <p>{{ shortDescription }}</p>
    <p>{{ author }}</p>
    <p>{{ category }}</p> hello
  </div>
</template>

<script>
export default {
  name: 'EcBlogItem',
  props: {
    title: { type: String },
    shortDescription: { type: String },
    author: { type: String },
    category: { type: String },
  },
};
</script>
<style>
p {
  font-size: 2em;
  text-align: center;
}
</style>
