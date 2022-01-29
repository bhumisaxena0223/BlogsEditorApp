import { find } from 'lodash'

export default {
  /**
   * Check if a blog has deletion pending
   */
  isBlogDeletionPending: state => blogId =>
    state.blogDeletionPending.includes(blogId),

  /**
   * Get blog by id
   */
  getBlogById: state => blogId => find(state.blogs, blog => blog.id === blogId)
}
