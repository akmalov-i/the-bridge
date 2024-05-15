export const state = () => ({
  messages: [], // all user messages
  messenger: [], // user messagers ID
  telegram: [], // sorted messages
  archive: [], // archived messages
})

export const mutations = {
  setMessages(state, data) {
    state.messages = data.messages
    state.messenger = data.messenger
    state.archive = data.archive

    sortTelegram(state)
  },
  filteredMessages(state, { box, userId }) {
    let messenger = []

    if (box.length > 0) {
      box.forEach((e) => {
        if (!messenger.includes(e.from) && e.from !== userId)
          messenger.push(e.from)
        if (!messenger.includes(e.to) && e.to !== userId) messenger.push(e.to)
      })

      state.messages = box
      state.messenger = messenger
    } else {
      state.messages = []
      state.messenger = []
      state.telegram = []
    }

    sortTelegram(state)
  },
  setArchive(state, data) {
    state.archive = data

    sortTelegram(state)
  },
  pushMessage(state, { message, messenger }) {
    state.messages.push(message)
    state.messenger = messenger

    sortTelegram(state)
  },
  messageLoader(state, messages) {
    state.messages.unshift(...messages.reverse())

    sortTelegram(state)
  },
  clearData(state) {
    state.messages = []
    state.messenger = []
    state.telegram = []
    state.archive = []
  },
  setRead(state, id) {
    let box = state.telegram.find((e) => e.userId === id)

    if (box) {
      box.count = 0
      box.messages.map((e) => (e.isRead = true))
    }

    state.telegram.map((x) => (x.userId === id ? box : x))
  },
  SOCKET_setMessage(state, message) {
    state.messages.push(message)

    if (!state.messenger.includes(message.from)) {
      state.messenger.push(message.from)

      sortTelegram(state)
    }
  },
  SOCKET_removeUsers(state, user) {
    state.users.filter((u) => u !== user)
  },
  SOCKET_setTelegram(state) {
    sortTelegram(state)
  }
}

export const actions = {
  async SOCKET_newMessage({ commit }, data) {
    try {
      const msg = await this.$axios.$post('api/message', data)
      commit('pushMessage', msg)
      return
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async fetchMessages({ commit }, data) {
    const config = {
      params: { ...data }
    }
    try {
      const data = await this.$axios.$get('api/message/messages', config)
      commit('setMessages', data)
      return
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async fetchRoomUsers({ commit }, data) {
    const config = {
      params: { ...data }
    }
    try {
      return await this.$axios.$get('api/message/roomUsers', config)
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async loadMore({ commit }, data) {
    const config = {
      params: { ...data }
    }
    try {
      const messages = await this.$axios.$get('api/message/loadMore', config)
      commit('messageLoader', messages)
      return
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async setArchive({ commit }, { archive, userId }) {
    try {
      const res = await this.$axios.$put(`api/message/setArchive/${userId}`, {
        archive
      })
      commit('setArchive', res)
      return
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async unzip({ commit }, { archive, userId }) {
    try {
      const res = await this.$axios.$put(`api/message/unzip/${userId}`, {
        archive
      })
      commit('setArchive', res)
      return
    } catch (e) {
      commit('setError', e, { root: true })
    }
  }
}

export const getters = {
  messages: (state) => state.messages,
  messenger: (state) => state.messenger
}

function sortTelegram(state) {
  if (state.messenger.length && state.messages.length) {
    let box = []

    for (let i = 0; i < state.messenger.length; i++) {
      let m = state.messages.filter(
        (e) => e.to === state.messenger[i] || e.from === state.messenger[i]
      )

      let mLength = m.filter(
        (e) => e.isRead === false && e.from === state.messenger[i]
      ).length

      if (mLength > 0) {
        box.push({
          userId: state.messenger[i],
          messages: m,
          count: mLength,
          archived: state.archive.includes(state.messenger[i]) ? true : false
        })
      } else {
        box.push({
          userId: state.messenger[i],
          messages: m,
          count: 0,
          archived: state.archive.includes(state.messenger[i]) ? true : false
        })
      }
    }

    state.telegram = box
  }
}
