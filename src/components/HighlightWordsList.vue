<template>
  <div>
    <p v-if="words === null" class="infos-label">Loading...</p>
    <p v-if="words && !words.length" class="infos-label">
      You don't have any product yet
    </p>
    <h1 class="text-2xl font-extrabold place-items-center ml-3">
      Highlighted Words list
    </h1>
    <!-- {{ blogs }} -->
    <highlight-word-item
      v-for="(word, index) in words"
      :key="word.id"
      class="product-row"
      :index="index"
      :is-product-deletion-pending="isProductDeletionPending(word.id)"
      :disable-actions="!networkOnLine"
      :data="word"
      :blogs="blogs"
      @getWord="showPreview"
      @deleteProduct="deleteUserProduct"
    >
    </highlight-word-item>
    <ul
      role="list"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <li
        v-for="item in relatedBlogs"
        :key="item.id"
        class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
      >
        <div class="w-full flex items-center justify-between p-6 space-x-6">
          <div class="flex-1 truncate">
            <div class="flex items-center space-x-3">
              <h3 class="text-gray-900 text-sm font-medium truncate">
                {{ item.title }}
              </h3>
              <div>
                <router-link :to="`/blogs/${item.id}`" target="_blank">{{
                  item.content
                }}</router-link>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import HighlightWordItem from './HighlightWordItem.vue'

export default {
  components: { HighlightWordItem },
  data() {
    return {
      searchQuery: null,
      relatedBlogs: []
    }
  },
  computed: {
    ...mapGetters('products', ['isProductDeletionPending']),
    ...mapState('words', ['words']),
    ...mapState('app', ['networkOnLine']),
    ...mapState('blogs', ['blogs'])
  },
  methods: {
    showPreview(word) {
      console.log('ddd', word)
      const { blogs } = this
      if (word) {
        blogs.filter(item => {
          console.log(item.content, 'item')
          return word
            .toLowerCase()
            .split(' ')
            .every(v => item.content.toLowerCase().includes(v))
        })
        console.log(blogs, 'BLOGS')
        this.relatedBlogs = blogs
      }
      return blogs
    },
    ...mapActions('products', ['deleteUserProduct'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.infos-label {
  text-align: center;
}

.product-row {
  display: flex;
  align-items: left;
  width: 100%;
  max-width: 1000px;
  margin: 10px auto;
  justify-content: space-between;
}
</style>
