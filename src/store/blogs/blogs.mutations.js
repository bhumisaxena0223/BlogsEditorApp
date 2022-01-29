export default {
  /* Blog input name */
  setBlogNameToCreate: (state, payload) => {
    console.log(payload, 'Payload')
    state.blogTitleToCreate = payload.blogTitleToCreate
    state.blogAuthor = payload.blogAuthor
    state.blogContent = payload.blogContent
  },

  /* Blogs */
  setBlogs: (state, blogs) => {
    state.blogs = blogs
    console.log(state.blogs)
  },
  addBlog: (state, blog) => {
    state.blogs.push(blog)
    console.log(state.blogs)
  },
  updateBlog: (state, blogData) => {
    const index = state.blogs.findIndex(blog => blog.id === blogData.id)
    console.log(index, blogData)
    // state.blogs.u(index, 1)
  },
  removeBlogById: (state, blogId) => {
    const index = state.blogs.findIndex(blog => blog.id === blogId)
    state.blogs.splice(index, 1)
  },

  /* Blogs deletion */
  addBlogDeletionPending: (state, blogId) =>
    state.blogDeletionPending.push(blogId),
  removeBlogDeletionPending: (state, blogId) => {
    const index = state.blogs.findIndex(blog => blog.id === blogId)
    state.blogDeletionPending.splice(index, 1)
  },

  /* Blog creation */
  setBlogCreationPending: (state, value) => (state.blogCreationPending = value)
}
