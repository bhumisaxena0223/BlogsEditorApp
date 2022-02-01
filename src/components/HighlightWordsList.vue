<template>
  <div>
    <p v-if="words === null" class="infos-label">Loading...</p>
    <p v-if="words && !words.length" class="infos-label">
      You don't have any product yet
    </p>
    <h1 class="text-2xl font-extrabold place-items-center">
      Highlighted Words list
    </h1>
    <p class="text-sm font-medium ml-3">Click on any keyword to get replated Blog</p>
    <!-- {{ blogs }} -->
    <div class="grid grid-cols-3 gap-4">
      <div class="ml-3">
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
      </div>
      <!-- ... -->
      <div class="col-span-2">
        <ul
          role="list"
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <li
            v-for="item in relatedBlogs"
            :key="item.id"
            class="col-span-1 bg-white rounded-lg shadow"
          >
            <div class="w-full flex items-center justify-between p-6 space-x-6">
              <div class="flex-1 h-32 overflow-hidden">
                <div class="flex items-center space-x-3">
                  <h3 class="text-gray-900 text-sm font-medium truncate">
                    {{ item.title }}
                  </h3>
                  <p>
                    <router-link
                      :to="`/blogs/${item.id}`"
                      v-html="item.content"
                    ></router-link>
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
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
      const { blogs } = this
      if (word) {
        this.relatedBlogs = blogs.filter(item => {
          return word
            .toLowerCase()
            .split(' ')
            .every(v => item.content.toLowerCase().includes(v))
        })
      }
      return this.relatedBlogs
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
