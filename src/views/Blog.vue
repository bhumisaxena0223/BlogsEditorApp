<template>
  <div class="page-wrapper">
    <blog-details v-if="currentBlog" :blog="currentBlog"></blog-details>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BlogDetails from '@/components/BlogDetails.vue'

export default {
  components: { BlogDetails },
  props: {
    id: String
  },
  computed: {
    ...mapGetters('blogs', ['getBlogById']),
    currentBlog() {
      return this.getBlogById(this.id)
    }
  }
}
</script>
