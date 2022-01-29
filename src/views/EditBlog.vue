<template>
  <div class="relative bg-white">
    <div class="absolute inset-0">
      <div class="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
    </div>
    <div
      class="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5 rounded-md shadow"
    >
      <div
        class="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12"
      >
        <div class="max-w-lg mx-auto">
          <h2
            class="text-3xl tracking-tight font-extrabold underline text-gray-900 sm:text-3xl font-sans"
          >
            You can make anything by writing.
          </h2>
          <p class="mt-3 text-lg leading-6 text-gray-500">
            If there's a book that you want to read, but it hasn't been written
            yet, then you must write it.
          </p>
          <p class="mt-6 text-base text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
              />
              <path
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clip-rule="evenodd"
              />
            </svg>
          </p>
        </div>
      </div>
      <div
        class="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12"
      >
        <div class="max-w-lg mx-auto lg:max-w-none">
          <form
            class="grid grid-cols-1 gap-y-6"
            @submit.prevent="setBlogValues"
          >
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700"
                >Title of the blog</label
              >
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  v-model="blog.title"
                  type="text"
                  name="title"
                  class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  placeholder="Title of the Blog"
                />
              </div>
              <p id="title-error" class="mt-2 text-sm text-red-600">
                Your title cannot be blank.
              </p>
            </div>
            <div>
              <label
                for="author"
                class="block text-sm font-medium text-gray-700"
                >Author</label
              >
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="author"
                  v-model="blog.author"
                  name="author"
                  type="text"
                  autocomplete="author"
                  class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  placeholder="Author"
                  aria-invalid="true"
                  aria-describedby="author-error"
                />
              </div>
              <p id="email-error" class="mt-2 text-sm text-red-600">
                Your author cannot be blank.
              </p>
            </div>
            <div>
              <label
                for="content"
                class="block text-sm font-medium text-gray-700"
                >Content</label
              >
              <div class="mt-1 relative rounded-md shadow-sm">
                <textarea
                  id="content"
                  v-model="blog.content"
                  name="content"
                  rows="4"
                  class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                  placeholder="Description about blog"
                  aria-invalid="true"
                  aria-describedby="content-error"
                />
              </div>
              <p id="email-error" class="mt-2 text-sm text-red-600">
                Your content cannot be blank.
              </p>
            </div>
            <div>
              <button
                type="submit"
                class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="setBlogValues()"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  name: 'EditBlog',
  data() {
    return {
      blog: {
        title: '',
        author: '',
        content: ''
      }
    }
  },
  computed: mapState('blogs', [
    'blogTitleToCreate',
    'blogContent',
    'blogAuthor',
    'blogCreationPending'
  ]),
  methods: {
    ...mapMutations('blogs', ['setBlogNameToCreate']),
    ...mapActions('blogs', ['triggerAddBlogAction']),
    async setBlogValues() {
      console.log(this.blogTitleToCreate)
      await this.setBlogNameToCreate({
        blogTitleToCreate: this.blog.title,
        blogAuthor: this.blog.author,
        blogContent: this.blog.content
      })
      this.triggerAddBlogAction()
    }
  }
}
</script>
