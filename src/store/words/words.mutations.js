export default {
  /* Word input name */
  setWordToCreate: (state, payload) => {
    // console.log(payload, 'Payload')
    state.wordToCreate = payload
  },

  /* Words */
  setWords: (state, words) => {
    state.words = words
    console.log(state.words, 'words')
  },
  addWords: (state, word) => {
    state.words.push(word)
    console.log(state.words)
  },
  //   updateBlog: (state, blogData) => {
  //     const index = state.blogs.findIndex(blog => blog.id === blogData.id)
  //     console.log(index, blogData)
  //     // state.blogs.u(index, 1)
  //   },
  removeWordById: (state, wordId) => {
    const index = state.words.findIndex(word => word.id === wordId)
    state.words.splice(index, 1)
  },

  /* Words deletion */
  addWordDeletionPending: (state, wordId) =>
    state.wordDeletionPending.push(wordId),
  removeWordDeletionPending: (state, wordId) => {
    const index = state.words.findIndex(word => word.id === wordId)
    state.wordDeletionPending.splice(index, 1)
  },

  /* Word creation */
  setWordCreationPending: (state, value) => (state.wordCreationPending = value)
}
