export const actions = {
  async create({ commit }, data) {
    try {
      return await this.$axios.$post('/api/feedback', data)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async postFeeds({ commit }, params) {
    try {
      return await this.$axios.$get('/api/feedback/all', params)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async userFeeds({ commit }, params) {
    try {
      return await this.$axios.$get('/api/feedback/user', params)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}
