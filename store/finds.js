export const actions = {
  async createFinds({ commit }, formData) {
    try {
      return await this.$axios.$post('/api/finds', formData)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchFinds({ commit }, params) {
    try {
      return await this.$axios.$get('/api/finds', params)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchByFindsId({ commit }, id) {
    const config = {
      params: {
        id: id
      }
    }
    try {
      return await this.$axios.$get(
        `/api/finds/${config.params.id}`,
        config
      )
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async addViewFinds({ commit }, { views, _id }) {
    try {
      return await this.$axios.$put(`/api/finds/add/view/${_id}`, {
        views
      })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}
