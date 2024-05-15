export const actions = {
  async create({ commit }, data) {
    try {
      return await this.$axios.$post('api/comment', data)
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async createReply({ commit }, data) {
    try {
      return await this.$axios.$post('api/comment/reply', data)
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async setLike({ commit }, { commentId, userId }) {
    try {
      return await this.$axios.$put(`api/comment/like/${commentId}`, { userId })
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async getReactions({ commit }, postId) {
    try {
      return await this.$axios.$get(`/api/comment/allReactions/${postId}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async setReaction({ commit }, data) {
    try {
      return await this.$axios.$put(`api/comment/reaction/${data.postId}`, data)
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async setDislike({ commit }, { commentId, userId }) {
    try {
      return await this.$axios.$put(`api/comment/dislike/${commentId}`, {
        userId
      })
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async setLikeReply({ commit }, { commentId, userId }) {
    try {
      return await this.$axios.$put(`api/comment/like/reply/${commentId}`, {
        userId
      })
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async setDislikeReply({ commit }, { commentId, userId }) {
    try {
      return await this.$axios.$put(`api/comment/dislike/reply/${commentId}`, {
        userId
      })
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async replies({ commit }, id) {
    const config = {
      params: {
        id: id
      }
    }
    try {
      return await this.$axios.$get(
        `/api/comment/replies/${config.params.id}`,
        config
      )
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}
