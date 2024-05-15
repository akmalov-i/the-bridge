export const actions = {
  async fetch({ commit }, params) {
    try {
      return await this.$axios.$get('/api/admin', params)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchUsers({ commit }, params) {
    try {
      return await this.$axios.$get('/api/admin/users', params)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async aside({ commit }) {
    try {
      return await this.$axios.$get('/api/admin/aside')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}
