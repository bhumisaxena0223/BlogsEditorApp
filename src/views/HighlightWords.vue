<template>
  <div class="page-wrapper">
    <highlight-words-list></highlight-words-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HighlightWordsList from '@/components/HighlightWordsList.vue'

export default {
  components: { HighlightWordsList },
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
  margin: 20px 0;
}
</style>
