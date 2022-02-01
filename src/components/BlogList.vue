<template>
  <div>
    <p v-if="blogs === null" class="infos-label">Loading...</p>
    <p v-if="blogs && !blogs.length" class="infos-label font-bold">
      You don't have any product yet
      <br />
      <router-link to="/edit-blog">
        <button
          class="rounded-md bg-blue-500 border p-3 mt-3 font-bold text-white"
        >
          Create a Blog
        </button>
      </router-link>
    </p>
    <div
      v-else
      class="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-6 lg:pb-28 lg:px-4"
    >
      <div
        class="
          relative
          max-w-lg
          mx-auto
          divide-y-2 divide-gray-200
          lg:max-w-7xl
        "
      >
        <div>
          <h2
            class="
              text-3xl
              tracking-tight
              font-extrabold
              text-gray-900
              sm:text-4xl
            "
          >
            Recent publications
          </h2>
          <p class="mt-3 text-xl text-gray-500 sm:mt-4">
            If you're ever in need of inspiration or just want a few quick tips
            to help keep your words flowing onto the screen, just dip into the
            wisdom of these great blogs.
          </p>
        </div>
        <div
          class="mt-8 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12"
        >
          <div v-for="blog in blogs" :key="blog.id">
            <router-link
              :to="{ path: `/blogs/${blog.id}`, params: { id: blog.id } }"
              class="block mt-4"
            >
              <p class="text-xl font-semibold text-gray-900">
                {{ blog.title }}
              </p>
              <p class="mt-4"></p>
              <p
                class="mt-5 text-sm text-gray-500 h-15 overflow-hidden inline"
                v-html="blog.content"
              ></p>
              <span>...</span>
            </router-link>
            <div class="mt-6 flex items-center">
              <div class="ml-1">
                <p class="text-sm font-medium text-gray-900">
                  {{ blog.author }}
                </p>
                <div
                  class="grid grid-cols-3 space-x-1 w-full text-sm text-gray-500"
                >
                  <time :datetime="blog.createTimestamp">
                    {{ blog.createTimestamp | niceDate }}
                  </time>
                  <span class="float-right" aria-hidden="true">
                    &middot;
                  </span>
                  <div class="block items-end text-right">
                    <button
                      class="rounded-full text-gray"
                      @click="editUserBlog(blog)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        />
                      </svg>
                    </button>
                    <button
                      class="rounded-full text-gray"
                      @click="deleteUserBlog(blog.id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  filters: {
    niceDate(obj) {
      return `${obj.toString().slice(0, 15)}`
    }
  },
  computed: {
    ...mapGetters('blogs', ['isBlogDeletionPending']),
    ...mapState('blogs', ['blogs']),
    ...mapState('app', ['networkOnLine'])
  },
  methods: {
    ...mapActions('blogs', ['deleteUserBlog']),
    ...mapMutations('blogs', ['setBlogNameToCreate']),
    editUserBlog(item) {
      this.$router.replace({
        name: 'EditBlog',
        params: {
          title: item.title,
          author: item.author,
          content: item.content,
          id: item.id
        }
      })
    }
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
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 10px auto;
  justify-content: space-between;
}
</style>
