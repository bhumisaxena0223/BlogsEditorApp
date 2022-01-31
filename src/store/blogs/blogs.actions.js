import UserBlogsDB from '@/firebase/user-blogs-db'

export default {
  /**
   * Fetch blogs of current loggedin user
   */
  getUserBlogs: async ({ rootState, commit }) => {
    const userBlogDb = new UserBlogsDB(rootState.authentication.user.id)

    const blogs = await userBlogDb.readAll()
    commit('setBlogs', blogs)
  },

  /**
   * Create a blog for current loggedin user
   */
  createUserBlog: async ({ commit, rootState }, blog) => {
    const userBlogDb = new UserBlogsDB(rootState.authentication.user.id)

    commit('setBlogCreationPending', true)
    const createdBlog = await userBlogDb.create(blog)
    console.log(createdBlog, 'action BLog')
    commit('addBlog', createdBlog)
    commit('setBlogCreationPending', false)
  },

  /**
   * Create a new blog for current loggedin user and reset blog name input
   */
  triggerAddBlogAction: ({ dispatch, state, commit }) => {
    if (state.blogTitleToCreate === '') return
    console.log(`called ${state.blogTitleToCreate}`)

    const blog = {
      title: state.blogTitleToCreate,
      author: state.blogAuthor,
      content: state.blogContent
    }
    commit('setBlogNameToCreate', {
      blogTitleToCreate: '',
      blogAuthor: '',
      blogContent: ''
    })
    dispatch('createUserBlog', blog)
  },
  /*
   * Edit a user blog from its id
   */
  editUserBlog: async ({ dispatch, commit, rootState }, blog) => {
    const userBlogDb = new UserBlogsDB(rootState.authentication.user.id)

    commit('setBlogCreationPending', true)
    await userBlogDb.update(blog)
    dispatch('getUserBlogs', blog)
    commit('setBlogCreationPending', false)
  },
  /**
   * Create a new blog for current loggedin user and reset blog name input
   */
  triggerUpdateBlogAction: ({ dispatch, state, commit }) => {
    if (state.blogTitleToCreate === '') return
    console.log(`called ${state.blogTitleToCreate}`, state.blogId)

    const blog = {
      title: state.blogTitleToCreate,
      author: state.blogAuthor,
      content: state.blogContent,
      id: state.blogId
    }
    commit('setBlogNameToCreate', {
      blogTitleToCreate: '',
      blogAuthor: '',
      blogContent: ''
    })
    dispatch('editUserBlog', blog)
  },

  /**
   * Delete a user blog from its id
   */
  deleteUserBlog: async ({ rootState, commit, getters }, blogId) => {
    if (getters.isBlogDeletionPending(blogId)) return

    const userBlogsDb = new UserBlogsDB(rootState.authentication.user.id)

    commit('addBlogDeletionPending', blogId)
    await userBlogsDb.delete(blogId)
    commit('removeBlogById', blogId)
    commit('removeBlogDeletionPending', blogId)
  }
}
