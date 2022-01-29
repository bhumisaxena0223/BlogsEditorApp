<template>
  <div class="page-wrapper">
    <blog-list></blog-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BlogList from '@/components/BlogList.vue'

export default {
  components: { BlogList },
  computed: mapState('app', ['networkOnLine'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.products-page-title {
  text-align: center;
  margin-bottom: 60px;
}

.product-list {
  margin: 10px 0;
}
</style>
