export const actions = {
  async create({ commit }, data) {
    try {
      return await this.$axios.$post('api/offer', data)
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async fetchById({ commit }, params) {
    try {
      return await this.$axios.$get('/api/offer', { params })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetch({ commit }, params) {
    try {
      return await this.$axios.$get('/api/offer/all', { params })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async new({ commit }, { id }) {
    try {
      return await this.$axios.$put(`/api/offer/new/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async reject({ commit }, { id }) {
    try {
      return await this.$axios.$put(`/api/offer/reject/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async recover({ commit }, { id }) {
    try {
      return await this.$axios.$put(`/api/offer/recover/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async newByAuthor({ commit }, { id }) {
    try {
      return await this.$axios.$put(`/api/offer/newByAuthor/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async removeTheOffer({ commit }, { id, postId, userId }) {
    try {
      return await this.$axios.$put(`/api/offer/remove/${id}`, {postId, userId})
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async acceptTheOffer(
    { commit },
    { id, userId, text, budget, currency, step, dateOfCreation }
  ) {
    try {
      return await this.$axios.$put(`/api/offer/accept/${id}`, {
        userId,
        text,
        budget,
        currency,
        step,
        dateOfCreation
      })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async setCounter(
    { commit },
    {
      id,
      postId,
      budget,
      currency,
      text,
      dateOfCreation,
      newOffer,
      author,
      newOfferByAuthor
    }
  ) {
    try {
      return await this.$axios.$put(`api/offer/counter/${id}`, {
        postId,
        budget,
        currency,
        text,
        dateOfCreation,
        newOffer,
        author,
        newOfferByAuthor
      })
    } catch (e) {
      commit('setError', e, { root: true })
    }
  }
}
