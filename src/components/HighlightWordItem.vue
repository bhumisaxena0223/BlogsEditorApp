<template>
  <div class="product-item">
    <div class="product-link" @click="$emit('getWord', data.word)">
      #{{ index + 1 }} {{ data.word }}
    </div>
    <div
      v-if="!disableActions"
      class="delete-btn"
      @click="$emit('deleteProduct', data.id)"
    >
      {{ isProductDeletionPending ? 'delete in progress...' : 'delete' }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    index: Number,
    isProductDeletionPending: Boolean,
    disableActions: Boolean
  },
  data() {
    return {
      searchQuery: null
    }
  },
  methods: {
    showPreview(word) {
      console.log('ddd', word)
      this.searchQuery = word
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: left;
  width: 100%;

  .product-link {
    color: $vue-color;
  }

  .delete-btn {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    margin-left: 10px;
    color: $danger-color;
    border-color: $danger-color;
  }
}
</style>
