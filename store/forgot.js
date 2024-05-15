export const state = () => ({
  seconds: 0,
  phoneSeconds: 0
})

export const mutations = {
  setTimer(state, time) {
    state.seconds = time
  },
  setPhoneTimer(state, time) {
    state.phoneSeconds = time
  }
}

export const actions = {
  set({ commit }, time) {
    commit('setTimer', time)
  },
  setPhone({ commit }, time) {
    commit('setPhoneTimer', time)
  },
  async createCode({ commit }, formData) {
    try {
      await this.$axios.$post('/api/verification/codes/email', formData)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async createPhoneCode({ commit }, formData) {
    try {
      await this.$axios.$post('/api/verification/codes/phone', formData)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async forgotByEmail({ commit }, formData) {
    try {
      return await this.$axios.$post(
        '/api/verification/codes/forgot/email',
        formData
      )
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async forgotByPhone({ commit }, formData) {
    try {
      return await this.$axios.$post(
        '/api/verification/codes/forgot/phone',
        formData
      )
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}

export const getters = {
  isTimerExists: (state) => state.seconds,
  isPhoneTimerExists: (state) => state.phoneSeconds
}
