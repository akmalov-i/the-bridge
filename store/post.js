export const actions = {
  async create(
    { commit },
    {
      title,
      text,
      adsSection,
      mainCategory,
      mainCategoryLabel,
      subcategory,
      subcategoryLabel,
      country,
      city,
      fromCountry,
      fromCity,
      toCountry,
      toCity,
      auto,
      deadlines,
      urgently,
      time,
      date,
      periodTimeStart,
      periodDateStart,
      periodTimeEnd,
      periodDateEnd,
      determiningTheCost,
      paymentTerms,
      budget,
      forWhom,
      adAccess,
      minLevelForTheApplication,
      currency,
      fileList,
      author,
      dateOfCreation
    }
  ) {
    try {
      const fd = new FormData()

      fd.append('title', title)
      fd.append('text', text)
      fd.append('adsSection', adsSection)
      fd.append('mainCategory', mainCategory)
      fd.append('mainCategoryLabel', mainCategoryLabel)
      fd.append('subcategory', JSON.stringify(subcategory))
      fd.append('subcategoryLabel', JSON.stringify(subcategoryLabel))
      fd.append('country', country)
      fd.append('city', city)
      fd.append('fromCountry', JSON.stringify(fromCountry))
      fd.append('fromCity', JSON.stringify(fromCity))
      fd.append('toCountry', JSON.stringify(toCountry))
      fd.append('toCity', JSON.stringify(toCity))
      fd.append('auto', auto)
      fd.append('deadlines', deadlines)
      fd.append('urgently', urgently)
      fd.append('time', time)
      fd.append('date', date)
      fd.append('periodTimeStart', periodTimeStart)
      fd.append('periodDateStart', periodDateStart)
      fd.append('periodTimeEnd', periodTimeEnd)
      fd.append('periodDateEnd', periodDateEnd)
      fd.append('determiningTheCost', determiningTheCost)
      fd.append('paymentTerms', paymentTerms)
      fd.append('budget', budget)
      fd.append('forWhom', JSON.stringify(forWhom))
      fd.append('adAccess', adAccess)
      fd.append('minLevelForTheApplication', minLevelForTheApplication)
      fd.append('currency', currency)
      fd.append('author', author)
      fd.append('dateOfCreation', dateOfCreation)
      if (fileList.length) {
        for (let i = 0; i < fileList.length; i++) {
          fd.append('fileList', fileList[i], fileList[i].name)
        }
      }

      return await this.$axios.$post('/api/post', fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async update(
    { commit },
    {
      title,
      text,
      adsSection,
      mainCategory,
      mainCategoryLabel,
      subcategory,
      subcategoryLabel,
      country,
      city,
      fromCountry,
      fromCity,
      toCountry,
      toCity,
      auto,
      deadlines,
      urgently,
      time,
      date,
      periodTimeStart,
      periodDateStart,
      periodTimeEnd,
      periodDateEnd,
      determiningTheCost,
      paymentTerms,
      budget,
      forWhom,
      adAccess,
      minLevelForTheApplication,
      fileListPrototype,
      currency,
      fileList,
      id
    }
  ) {
    try {
      const fd = new FormData()

      fd.append('title', title)
      fd.append('text', text)
      fd.append('adsSection', adsSection)
      fd.append('mainCategory', mainCategory)
      fd.append('mainCategoryLabel', mainCategoryLabel)
      fd.append('subcategory', JSON.stringify(subcategory))
      fd.append('subcategoryLabel', JSON.stringify(subcategoryLabel))
      fd.append('country', country)
      fd.append('city', city)
      if(fromCountry) fd.append('fromCountry', JSON.stringify(fromCountry))
      if(fromCity) fd.append('fromCity', JSON.stringify(fromCity))
      if(toCountry) fd.append('toCountry', JSON.stringify(toCountry))
      if(toCity) fd.append('toCity', JSON.stringify(toCity))
      if (budget) fd.append('budget', budget)
      fd.append('auto', auto)
      fd.append('deadlines', deadlines)
      fd.append('urgently', urgently)
      fd.append('time', time)
      fd.append('date', date)
      fd.append('periodTimeStart', periodTimeStart)
      fd.append('periodDateStart', periodDateStart)
      fd.append('periodTimeEnd', periodTimeEnd)
      fd.append('periodDateEnd', periodDateEnd)
      fd.append('determiningTheCost', determiningTheCost)
      fd.append('paymentTerms', paymentTerms)
      fd.append('forWhom', JSON.stringify(forWhom))
      fd.append('adAccess', adAccess)
      fd.append('minLevelForTheApplication', minLevelForTheApplication)
      fd.append('currency', currency)
      if (fileList.length) {
        for (let i = 0; i < fileList.length; i++) {
          fd.append('fileList', fileList[i], fileList[i].name)
        }
      }
      if (fileListPrototype.length) {
        fd.append('fileListPrototype', JSON.stringify(fileListPrototype))
      }

      return await this.$axios.$put(`/api/post/${id}`, fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async reason(
    { commit },
    { text, fileList, postId, author, userId, dateOfCreation }
  ) {
    try {
      const fd = new FormData()

      fd.append('text', text)
      fd.append('userId', userId)
      fd.append('author', author)
      fd.append('dateOfCreation', dateOfCreation)

      if (fileList) {
        for (let i = 0; i < fileList.length; i++) {
          fd.append('fileList', fileList[i], fileList[i].name)
        }
      }

      return await this.$axios.$put(`/api/post/reason/${postId}`, fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async finish({ commit }, { postId, executor, data }) {
    try {
      return this.$axios.$put(`/api/post/finish/${postId}`, { executor, data })
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async fullFinish({ commit }, { postId }) {
    try {
      return this.$axios.$put(`/api/post/fullfinish/${postId}`)
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async createFinds({ commit }, formData) {
    try {
      return await this.$axios.$post('/api/post/finds', formData)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetch({ commit }, params) {
    try {
      return await this.$axios.$get('/api/post', params)
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
      return await this.$axios.$get(`/api/post/${config.params.id}`, config)
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
        `/api/post/minimal/${config.params.id}`,
        config
      )
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async addView({ commit }, { views, _id }) {
    try {
      return await this.$axios.$put(`/api/post/add/view/${_id}`, { views })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}
