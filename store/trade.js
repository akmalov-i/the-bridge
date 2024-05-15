export const actions = {
  /* async createTrade({ commit }, formData) {
    try {
      return await this.$axios.$post('/api/trade', formData)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }, */
  async createTrade(
    { commit },
    {
      title,
      text,
      adsSection,
      mainCategory,
      purposeOfAds,
      subcategory,
      subcategoryLabel,
      country,
      city,
      tradeDelivery,
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
      fd.append('subcategory', JSON.stringify(subcategory))
      fd.append('subcategoryLabel', JSON.stringify(subcategoryLabel))
      fd.append('tradeDelivery', tradeDelivery)
      fd.append('purposeOfAds', purposeOfAds)
      fd.append('country', country)
      fd.append('city', city)
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
      for (let i = 0; i < fileList.length; i++) {
        fd.append('fileList', fileList[i], fileList[i].name)
      }

      return await this.$axios.$post('/api/trade', fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchTrade({ commit }, params) {
    try {
      return await this.$axios.$get('/api/trade', params)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchByTradeId({ commit }, id) {
    const config = {
      params: {
        id: id
      }
    }
    try {
      return await this.$axios.$get(
        `/api/trade/${config.params.id}`,
        config
      )
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async addViewTrade({ commit }, { views, _id }) {
    try {
      return await this.$axios.$put(`/api/trade/add/view/${_id}`, {
        views
      })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}
