import { find } from 'lodash'

export default {
  /**
   * Check if a word has deletion pending
   */
  isWordDeletionPending: state => wordId =>
    state.wordDeletionPending.includes(wordId),

  /**
   * Get word by id
   */
  getWordById: state => wordId => find(state.words, word => word.id === wordId)
}
