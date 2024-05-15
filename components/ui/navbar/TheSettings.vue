<template>
  <el-col :span="4" class="end">
    <div class="lang animated" v-if="!loading">
      <div class="lang-body" @click="toggle">
        <div class="icon center">
          <component :is="currentLang + 'Svg'"></component>
        </div>
        <p class="code">
          {{ currentLang.toUpperCase() }}
        </p>
        <arrowSvg class="arrow" :class="{ active: isLangOpen }" />
      </div>

      <div class="lang-drop" v-if="isLangOpen" v-click-outside="hideLangDrop">
        <div
          class="item"
          v-for="item in lang"
          :key="item.value"
          :class="{ active: currentLang === item.name }"
          @click="changeLang(item)"
        >
          <component :is="item.name + 'Svg'"></component>
          <p>{{ item.name.toUpperCase() }}</p>
        </div>
      </div>
    </div>
    <div v-if="loading"></div>
    <div v-else class="animated">
      <nuxt-link to="/auth" v-if="!isAuthenticated">
        <button class="btn enter">Войти</button>
      </nuxt-link>
      <div class="profile" v-else>
        <div class="profile-body center" @click="toggleSettings">
          <div class="avatar center" :class="{ active: isSettingsOpen }">
            <div v-if="counter" class="notification-signal"><notificationSvg /></div>
            <nuxt-img
              :src="'avatars' + user.imageUrl"
              preset="settings"
              v-if="user.imageUrl"
            />
            <avatarSvg v-else />
          </div>
          <p class="name">{{ user.name }}&nbsp;{{ user.surname }}</p>
          <arrowSvg class="arrow" :class="{ active: isSettingsOpen }" />
        </div>

        <div
          class="profile-drop"
          v-if="isSettingsOpen"
          v-click-outside="hideSettingsDrop"
        >
          <nuxt-link :to="`/user/${user._id}`">
            <avatarSvg />
            Мой профиль
          </nuxt-link>
          <nuxt-link to="/user/services">
            <transactionSvg />
            Транзакции
          </nuxt-link>
          <nuxt-link to="/user/messages">
            <messageSvg />
            Сообщения
            <div v-if="counter" class="notification">({{ counter }})</div>
          </nuxt-link>
          <nuxt-link to="/user/information">
            <userSettingsSvg />
            Личные настройки
          </nuxt-link>
          <div class="logout">
            <a href="/" @click.prevent="logout">
              <logoutSvg />
              Выход
            </a>
          </div>
        </div>
      </div>
    </div>
  </el-col>
</template>

<script>
import ruSvg from '@/assets/icons/ru.svg?inline'
import enSvg from '@/assets/icons/en.svg?inline'
import arrowSvg from '@/assets/icons/arrow.svg?inline'
import avatarSvg from '@/assets/icons/avatar.svg?inline'
import transactionSvg from '@/assets/icons/transaction.svg?inline'
import messageSvg from '@/assets/icons/message.svg?inline'
import settingsSvg from '@/assets/icons/settings.svg?inline'
import userSettingsSvg from '@/assets/icons/user-settings.svg?inline'
import logoutSvg from '@/assets/icons/logout.svg?inline'
import notificationSvg from '@/assets/icons/notification.svg?inline'
import vClickOutside from 'v-click-outside'
import { mapMutations, mapState } from 'vuex'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  async fetch() {
    let isAuthenticated = await this.$store.getters['auth/isAuthenticated']
    let userId = ''
    let user = {}
    if (isAuthenticated) {
      userId = await this.$store.getters['auth/userId']
      user = await this.$store.dispatch('user/fetchByIdMinimal', userId)

      this.user = user[0]
    }
    this.isAuthenticated = isAuthenticated
    this.loading = false
  },
  async mounted() {
    const isAuthenticated = await this.$store.getters['auth/isAuthenticated']

    if (isAuthenticated) {
      const userId = await this.$store.getters['auth/userId']
      await this.$socket.emit('userJoined', userId)

      if (!this.telegram.length) {
        await this.$store.dispatch('message/fetchMessages', {
          id: userId
        })
      }

      this.counterHandler(this.telegram)
    }
  },
  data() {
    return {
      user: {},
      counter: 0,
      isAuthenticated: false,
      loading: true,
      lang: [
        { name: 'ru', value: 'ru-RU' },
        { name: 'en', value: 'en-US' }
      ],
      currentLang: 'ru',
      isLangOpen: false,
      isSettingsOpen: false
    }
  },
  methods: {
    ...mapMutations('message', ['clearData']),
    toggle() {
      this.isLangOpen = !this.isLangOpen
    },
    toggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen
    },
    changeLang(item) {
      this.currentLang = item.name
      this.hideLangDrop()
      console.log('language changed to:', this.currentLang)
    },
    hideLangDrop() {
      this.isLangOpen = false
    },
    counterHandler(val) {
      const changed = val.filter((i) => i.count > 0)
      let counter = 0

      changed.forEach((e) => {
        counter += e.count
      })

      if (counter > 999) {
        this.counter = '999+'
      } else {
        this.counter = counter
      }
    },
    hideSettingsDrop() {
      this.isSettingsOpen = false
    },
    async logout() {
      this.hideSettingsDrop()
      await this.$store.dispatch('auth/logout')
      this.$socket.emit('userLeft', this.user._id, () => {
        this.$router.push('/auth?message=logout')
        this.clearData()
      })
    }
  },
  computed: {
    ...mapState('message', ['telegram'])
  },
  watch: {
    telegram: {
      handler: function (val) {
        this.counterHandler(val)
      },
      deep: true
    }
  },
  components: {
    ruSvg,
    enSvg,
    arrowSvg,
    avatarSvg,
    transactionSvg,
    messageSvg,
    settingsSvg,
    userSettingsSvg,
    logoutSvg,
    notificationSvg
  }
}
</script>

<style lang="scss" scoped>
.avatar img {
  border-radius: 50%;
}

.profile-drop a:hover {
  .notification {
    color: $blue;
  }
}

.notification {
  margin-left: 0.4rem;
  color: rgba(125, 125, 125, 0.52);
  transition: 0.4s;
  font-size: 1.3rem;
}

.notification-signal {
  top: -8px;
  left: 22px;
  position: absolute;
  background: $blue;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 10px;
    fill: $white;
  }
}

.animated {
  position: relative;
  z-index: 1500;
}

.btn.enter {
  font-size: 1.4rem;
  background: $blue;
  color: $white;
  border-radius: 4px;
  padding: 0.8rem 2.4rem;
  margin-left: 1.6rem;
  transition: 0.4s;

  &:hover {
    background: lighten($blue, 8%);
  }
}
</style>
