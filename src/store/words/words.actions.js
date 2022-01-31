import UserWordsDB from '@/firebase/user-words-db'

export default {
  /**
   * Fetch words of current loggedin user
   */
  getUserWords: async ({ rootState, commit }) => {
    const userWordDb = new UserWordsDB(rootState.authentication.user.id)

    const words = await userWordDb.readAll()
    commit('setWords', words)
  },

  /**
   * Create a word for current loggedin user
   */
  createUserWord: async ({ commit, rootState }, word) => {
    const userWordDb = new UserWordsDB(rootState.authentication.user.id)

    commit('setWordCreationPending', true)
    const createdWord = await userWordDb.create(word)
    console.log(createdWord, 'action word')
    commit('addWords', createdWord)
    commit('setWordCreationPending', false)
  },

  /**
   * Create a new word for current loggedin user and reset word name input
   */
  triggerAddWordAction: ({ dispatch, state, commit }) => {
    if (state.wordToCreate === '') return
    console.log(`called ${state.wordToCreate}`)

    const wordData = {
      word: state.wordToCreate
    }
    commit('setWordToCreate', '')
    dispatch('createUserWord', wordData)
  },
  /**
   * Edit a user blog from its id
   */
  //   editUserBlog: async ({ commit, rootState }, blog) => {
  //     const userBlogDb = new UserWordsDB(rootState.authentication.user.id)

  //     commit('setBlogCreationPending', true)
  //     const updatedBlog = await userBlogDb.update(blog)
  //     console.log(updatedBlog, 'updated BLog')
  //     commit('updateBlog', updatedBlog)
  //     commit('setBlogCreationPending', false)
  //   },

  /**
   * Delete a user word from its id
   */
  deleteUserWord: async ({ rootState, commit, getters }, wordId) => {
    if (getters.isWordDeletionPending(wordId)) return

    const userwordsDb = new UserWordsDB(rootState.authentication.user.id)

    commit('addWordDeletionPending', wordId)
    await userwordsDb.delete(wordId)
    commit('removeWordById', wordId)
    commit('removeWordDeletionPending', wordId)
  }
}
