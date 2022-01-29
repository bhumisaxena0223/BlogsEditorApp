<template>
  <div class="blog-detail">
    <h1>
      <span
        class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
        >{{ blog.title }}</span
      >
      <span
        class="block text-base text-center text-gray-600 font-semibold tracking-wide capitalize mt-2"
        >By {{ blog.author }}</span
      >
    </h1>
    <p class="mt-8 text-xl text-gray-500 leading-8">
      {{ blog.content }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    blog: Object
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.blog-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
