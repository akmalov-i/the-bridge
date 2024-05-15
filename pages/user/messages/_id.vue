<template>
  <el-main>
    <div class="top">
      <div class="head start">
        <div class="left" v-if="interlocutor">
          <div v-if="interlocutor.imageUrl">
            <nuxt-img :src="'avatars' + interlocutor.imageUrl" preset="offer" />
          </div>
          <div class="avatar-svg" v-else>
            <AvatarSvg />
          </div>
        </div>
        <div class="right" v-if="interlocutor">
          <h2>
            Сообщение от
            <nuxt-link :to="'/user/' + interlocutor._id">
              {{ interlocutor.name }} {{ interlocutor.surname }}
            </nuxt-link>
          </h2>
          <!-- <nuxt-link class="org" to="#">Организатор торжества</nuxt-link> -->
        </div>
      </div>
      <hr v-if="interlocutor" />
      <div>
        <div
          class="msg-content"
          :class="{ mt4: interlocutor }"
          @scroll="handleScroll"
          ref="scroll"
        >
          <div class="center no-messages" v-if="!request">
            Выберите чат для общения
          </div>
          <div class="interlocutor-block" v-if="interlocutor">
            <div :class="[{ active: loading }]" class="loader">
              <div class="simple-loading-spinner"></div>
            </div>
            <div v-for="m in messagesGetter" :key="m._id">
              <TheMessageContent
                class="show"
                :message="m"
                :owner="m.from === request.from"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheWriteMsg v-if="interlocutor" :data="request" />
  </el-main>
</template>

<script>
import editSvg from '@/assets/icons/edit2.svg?inline'
import archiveSvg from '@/assets/icons/archive.svg?inline'
import AvatarSvg from '@/assets/icons/avatar.svg?inline'
import { mapState, mapMutations } from 'vuex'

export default {
  layout: 'telegram',
  middleware: ['user-auth'],
  async validate({ store, route }) {
    const userId = await store.getters['auth/userId']
    let interlocutor = null

    if (route?.id) {
      interlocutor = await store.dispatch(
        'user/fetchByIdMinimal',
        route.params?.id
      )
    }

    return Boolean(route.params?.id != userId)
  },
  async asyncData({ route, store }) {
    const userId = await store.getters['auth/userId']
    let hasMessages = true
    let interlocutor = null
    let request = null
    let user = null

    if (route.params?.id) {
      request = {
        from: userId,
        to: route.params?.id
      }

      const roomUsers = await store.dispatch('message/fetchRoomUsers', request)

      interlocutor = roomUsers.interlocutor
      user = roomUsers.user
    }

    return {
      hasMessages,
      request,
      user,
      userId,
      interlocutor
    }
  },
  mounted() {
    if (this.$route.query?.type) {
      this.messagesType = this.$route.query?.type
    }
    setTimeout(() => {
      this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight
    }, 100)

    if (this.$route.params?.id) {
      this.setRead(this.$route.params.id)
    }
  },
  data() {
    return {
      title: 'Сообщения',
      edit: false,
      loading: false,
      loaderCount: 1,
      isFirstExists: false
    }
  },
  methods: {
    ...mapMutations('message', ['sortTelegram', 'setRead', 'filteredMessages']),
    async handleScroll() {
      if (this.$refs.scroll.scrollTop === 0 && !this.loading) {
        if (!!!this.isFirstExists) {
          this.loading = true
          try {
            const form = {
              loaderCount: this.loaderCount,
              userId: this.userId,
              interlocutor: this.interlocutor._id
            }

            await this.$store.dispatch('message/loadMore', form)
            this.loaderCount++
          } catch (e) {
          } finally {
            setTimeout(() => {
              this.$refs.scroll.scrollTop = 50
            })
            setTimeout(() => {
              this.loading = false
            }, 1000)
          }
        }
      }
    }
  },
  computed: {
    ...mapState('message', [
      'messages',
      'messenger',
      'telegram',
      'archive',
      'loaders'
    ]),
    messagesGetter() {
      if (this.messages.length && this.request) {
        return this.messages.filter(
          (m) => m.to === this.request.to || m.from === this.request.to
        )
      }
    }
  },
  components: {
    editSvg,
    archiveSvg,
    AvatarSvg
  },
  watch: {
    telegram: {
      handler: function (val) {
        if (this.request) {
          const changed = val.filter((i) => i.count > 0)
          const checking = changed.find((e) => e.userId === this.request.to)
          if (checking) {
            this.setRead(this.request.to)
          }
        }
      },
      deep: true
    },
    messagesGetter() {
      this.isFirstExists = this.messagesGetter.find(
        (i) => i.isFirstMsg === true
      )

      setTimeout(() => {
        this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight
      })
    }
  }
}
</script>

<style lang="scss" scoped>
body,
html {
  height: 100vh !important;
  overflow: hidden !important;
}

main {
  height: calc(100vh - 110px);
  position: relative;
  padding: 5.2rem 4.2rem 0 4.2rem;
  overflow: hidden;
}

.interlocutor-block {
  position: relative;

  .loader {
    position: absolute;
    background: $white;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -8rem;
    left: 50%;
    transform: translate(50%, -50%);
    &.active {
      animation: scrolldown 0.5s forwards;
    }

    @keyframes scrolldown {
      0% {
        top: -8rem;
      }
      100% {
        top: 3rem;
      }
    }
  }
}

.no-messages {
  height: 100%;
  align-items: center;
  font-size: 1.4rem;
  color: $gray;
}

.rotate-icon {
  transform: rotate(180deg);
  transform-origin: center;
}

.msg-content {
  position: absolute;
  top: 0rem;
  bottom: 10rem;
  opacity: 0;
  width: 95%;
  overflow: auto;
  animation: fade 1s forwards;
}

.msg-content.mt4 {
  top: 12rem;
}

.show {
  animation: fadeIn 0.4s forwards;
}

@keyframes fade {
  80% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

.write-wrap {
  position: absolute;
  right: 4.2rem;
  left: 4.2rem;
  bottom: 0rem;
  z-index: 30;
}

.select-сhat {
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: #161616;
}

.top {
  h2 {
    font-size: 2.4rem;
    color: $black;
    margin-bottom: 0.2rem;

    a {
      color: $blue;
    }
  }

  .head {
    animation: fadeIn 1s forwards;
  }

  .head .left {
    border-radius: 50%;
    overflow: hidden;
    margin-right: 2rem;
  }

  .org {
    color: $blue;
    font-size: 1.4rem;
    font-weight: 400;
  }
}

aside {
  position: relative;
  height: calc(100vh - 110px);
  padding: 2.4rem 3.2rem;
  border-right: 1px solid $light-gray;
  overflow: hidden;
}

.msg-wrap {
  position: absolute;
  width: 88%;
  top: 22rem;
  bottom: 0;
  overflow: auto;

  &.margin {
    bottom: 86px;
  }

  /* &::-webkit-scrollbar {
    display: none;
  } */
}

.green-btn {
  background: $green;

  transition: 0.4s;

  &:hover {
    border: 1px solid lighten($green, 8%) !important;
    background: lighten($green, 8%) !important;
  }

  p {
    color: $white;
  }
}

.filters,
.actions {
  button {
    border: 1px solid $light-gray;
    border-radius: 4px;
    padding: 1rem 1.6rem;
    color: rgba(125, 125, 125, 0.52);
    font-size: 1.4rem;
    font-weight: 500;
    transition: 0.4s;
    height: 44px;

    &:hover,
    &.active {
      background: $blue;
      color: $white;
      border-color: $blue;
    }

    &.red {
      background: $coral;
      color: $white;
      border-color: $coral;

      svg {
        fill: $white;
        margin-right: 0.8rem;
      }

      &:hover {
        background: lighten($coral, 8%);
        border-color: lighten($coral, 8%);
      }
    }
  }
}

.filters button {
  width: 100%;
}

.actions {
  position: absolute;
  left: 0;
  bottom: -2rem;
  background: $white;
  width: 100%;
  padding: 1.6rem 2.1rem;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid $light-gray;
  animation: actionsIn 0.4s forwards;

  @keyframes actionsIn {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
}

.sub-button {
  width: 44px;
  height: 44px;
  border: 1px solid $light-gray;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
  cursor: pointer;

  svg {
    fill: rgba(125, 125, 125, 0.52);
    width: 16px;
    height: 16px;
    transition: 0.4s;
  }

  &:hover {
    border-color: $blue;
    background: $blue;

    svg {
      fill: $white;
    }
  }
}

.search {
  width: 86%;
}

.avatar-svg {
  border: 1px solid $light-gray;
  border-radius: 50%;
  min-height: 56px;
  max-height: 56px;
  min-width: 56px;
  max-width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $white;

  svg {
    fill: $blue;
  }
}

hr {
  height: 1px;
  width: 100%;
  background: $light-gray;
  min-width: 200px;
  margin: 2.4rem 0;
}

.breadcrumb {
  margin-bottom: 2.4rem;
}
</style>
