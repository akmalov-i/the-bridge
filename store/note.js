export const actions = {
  async create({ commit }, data) {
    try {
      return await this.$axios.$post('api/note', data)
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async fetch({ commit }, { userId }) {
    try {
      return await this.$axios.$get(`/api/note/${userId}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async edit({ commit }, data) {
    try {
      return await this.$axios.$put(`/api/note`, data)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async remove({ commit }, id) {
    try {
      return await this.$axios.$delete(`/api/note/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}
