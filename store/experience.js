export const actions = {
  async createExp(
    { commit },
    {
      title,
      text,
      fromCountry,
      fromCity,
      dateOfCreation,
      time,
      date,
      userId,
      fileList
    }
  ) {
    try {
      const fd = new FormData()

      fd.append('title', title)
      fd.append('userId', userId)
      fd.append('text', text)
      fd.append('time', time)
      fd.append('date', date)
      fd.append('fromCountry', JSON.stringify(fromCountry))
      fd.append('fromCity', JSON.stringify(fromCity))
      fd.append('dateOfCreation', dateOfCreation)
      if (fileList.length) {
        for (let i = 0; i < fileList.length; i++) {
          fd.append('fileList', fileList[i], fileList[i].name)
        }
      }
      return await this.$axios.$post('/api/experience', fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetch({ commit }, params) {
    try {
      return await this.$axios.$get('/api/experience', params)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchById({ commit }, id) {
    const config = {
      params: {
        id: id
      }
    }
    try {
      return await this.$axios.$get(
        `/api/experience/${config.params.id}`,
        config
      )
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async addView({ commit }, { _id }) {
    try {
      return await this.$axios.$put(`/api/experience/add/view/${_id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}
