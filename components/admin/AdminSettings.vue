<template>
  <el-col :span="4" class="end">
    <div class="profile">
      <div class="profile-body center" @click="toggleSettings">
        <div class="avatar center" :class="{ active: isSettingsOpen }">
          <avatarSvg />
        </div>
        <p class="name">{{ user.name }}&nbsp;{{ user.surname }}</p>
        <arrowSvg class="arrow" :class="{ active: isSettingsOpen }" />
      </div>

      <div
        class="profile-drop"
        v-if="isSettingsOpen"
        v-click-outside="hideSettingsDrop"
      >
        <nuxt-link to="/">
          <messageSvg />
          Перейти на сайт
        </nuxt-link>
        <nuxt-link to="/">
          <messageSvg />
          Сообщения
        </nuxt-link>
        <div class="logout">
          <a href="/" @click.prevent="logout">
            <logoutSvg />
            Выход
          </a>
        </div>
      </div>
    </div>
  </el-col>
</template>

<script>
import arrowSvg from '@/assets/icons/arrow.svg?inline'
import avatarSvg from '@/assets/icons/avatar.svg?inline'
import transactionSvg from '@/assets/icons/transaction.svg?inline'
import messageSvg from '@/assets/icons/message.svg?inline'
import settingsSvg from '@/assets/icons/settings.svg?inline'
import userSettingsSvg from '@/assets/icons/user-settings.svg?inline'
import logoutSvg from '@/assets/icons/logout.svg?inline'
import vClickOutside from 'v-click-outside'

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
  data() {
    return {
      user: {},
      isAuthenticated: false,
      loading: true,
      isSettingsOpen: false
    }
  },
  methods: {
    toggle() {
      this.isLangOpen = !this.isLangOpen
    },
    toggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen
    },
    hideLangDrop() {
      this.isLangOpen = false
    },
    hideSettingsDrop() {
      this.isSettingsOpen = false
    },
    logout() {
      this.hideSettingsDrop()
      this.$store.dispatch('auth/logout')
      this.$router.push('/admin/login?message=logout')
    }
  },
  components: {
    arrowSvg,
    avatarSvg,
    transactionSvg,
    messageSvg,
    settingsSvg,
    userSettingsSvg,
    logoutSvg
  }
}
</script>
