export const actions = {
  async fetchById({ commit }, id) {
    const config = {
      params: {
        id: id
      }
    }
    try {
      return await this.$axios.$get(`/api/user/${config.params.id}`, config)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchStatus({ commit }, id) {
    const config = {
      params: {
        id: id
      }
    }
    try {
      return await this.$axios.$get(
        `/api/user/status/${config.params.id}`,
        config
      )
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchByIdMinimal({ commit }, id) {
    const config = {
      params: {
        id: id
      }
    }
    try {
      return await this.$axios.$get(
        `/api/user/minimal/${config.params.id}`,
        config
      )
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchByIdExp({ commit }, id) {
    const config = {
      params: {
        id: id
      }
    }
    try {
      return await this.$axios.$get(`/api/user/exp/${config.params.id}`, config)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async updateProfile({ commit }, config) {
    try {
      return await this.$axios.$put(`/api/user/${config._id}`, config.params)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async updateMain(
    { commit },
    { image, name, textarea, profession, id, imageSrc }
  ) {
    try {
      const fd = new FormData()

      fd.append('name', name)
      fd.append('textarea', textarea)
      fd.append('imageSrc', imageSrc)
      fd.append('profession', JSON.stringify(profession))
      if (image) {
        fd.append('image', image, image.name)
      }

      return await this.$axios.$put(`/api/user/main/${id}`, fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async updateDetails(
    { commit },
    {
      id,
      telephone,
      fromCountry,
      fromCity,
      email,
      exp,
      langs,
      car,
      knowledge,
      tools
    }
  ) {
    try {
      const fd = new FormData()

      fd.append('telephone', telephone)
      fd.append('fromCountry', JSON.stringify(fromCountry))
      fd.append('fromCity', JSON.stringify(fromCity))
      fd.append('email', email)
      fd.append('exp', JSON.stringify(exp))
      fd.append('car', JSON.stringify(car))
      fd.append('knowledge', JSON.stringify(knowledge))
      fd.append('tools', JSON.stringify(tools))
      fd.append('langs', JSON.stringify(langs))

      return await this.$axios.$put(`/api/user/details/${id}`, fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async updateLinks({ commit }, { id, links }) {
    try {
      const fd = new FormData()

      fd.append('links', JSON.stringify(links))

      return await this.$axios.$put(`/api/user/links/${id}`, fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async updateAccess({ commit }, { id, access }) {
    try {
      const fd = new FormData()

      fd.append('access', JSON.stringify(access))

      return await this.$axios.$put(`/api/user/access/${id}`, fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async updateSubsNP({ commit }, { id, subsNP }) {
    try {
      const fd = new FormData()

      fd.append('subsNP', JSON.stringify(subsNP))

      return await this.$axios.$put(`/api/user/subsNP/${id}`, fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async setSubsNP({ commit }, { id, subsNP }) {
    try {
      const fd = new FormData()

      fd.append('setSubsNP', JSON.stringify(subsNP))

      return await this.$axios.$put(`/api/user/setSubsNP/${id}`, fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async setSubsLE({ commit }, { id, subsLE }) {
    try {
      const fd = new FormData()

      fd.append('setSubsLE', JSON.stringify(subsLE))

      return await this.$axios.$put(`/api/user/setSubsLE/${id}`, fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async updateSubsLE({ commit }, { id, subsLE }) {
    try {
      const fd = new FormData()

      fd.append('subsLE', JSON.stringify(subsLE))

      return await this.$axios.$put(`/api/user/subsLE/${id}`, fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async removeSubsNP({ commit }, { id, subsNP }) {
    try {
      const fd = new FormData()

      fd.append('subsNP', JSON.stringify(subsNP))

      return await this.$axios.$put(`/api/user/removeSubsNP/${id}`, fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async removeSubsLE({ commit }, { id, subsLE }) {
    try {
      const fd = new FormData()

      fd.append('subsLE', JSON.stringify(subsLE))

      return await this.$axios.$put(`/api/user/removeSubsLE/${id}`, fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async updatePortfolio({ commit }, { image, id }) {
    try {
      const fd = new FormData()
      if (image) {
        fd.append('image', image, image.name)
      }
      return await this.$axios.$put(`/api/user/portfolio/${id}`, fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}
