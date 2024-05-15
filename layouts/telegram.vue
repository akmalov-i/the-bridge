<template>
  <div class="telegram">
    <!-- navigation -->
    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
    </Navbar>
    <el-container>
      <el-aside width="450px">
        <TheBreadcrumb firstText="Главная" :secondText="title" />
        <div class="search-wrap space-between">
          <TheSearch @typing="searchEvent" :clearBtnAlways="true" />
          <div class="sub-button edit" @click="enableEdit">
            <editSvg />
          </div>
        </div>
        <hr />
        <div class="filters mb2 space-between">
          <button
            class="item mr2"
            :class="{ active: messagesType === 'all' }"
            @click="setType('all')"
          >
            Все
          </button>
          <button
            class="item mr2"
            :class="{ active: messagesType === 'notRead' }"
            @click="setType('notRead')"
          >
            Непрочитанные
          </button>
          <button
            class="item"
            :class="{ active: messagesType === 'archived' }"
            @click="setType('archived')"
          >
            Архив
          </button>
        </div>
        <div class="msg-wrap" :class="{ margin: edit }">
          <TheMessage
            v-for="m in filterTelegram(telegram)"
            :key="m.userId"
            :data="m"
            :edit="edit"
            :checked="selectedChats.includes(m.userId)"
            @clack="clack(m)"
            :class="[
              { active: m.userId === request || '' },
              { active: selectedChats.includes(m.userId) }
            ]"
          />
        </div>
        <div class="actions mb2" v-if="edit">
          <el-button class="item" @click="cancelEditing">Отменить</el-button>
          <el-button class="item" @click="selectAll">Выбрать все</el-button>
          <el-button
            class="item archive-btn center"
            :class="[
              { red: messagesType !== 'archived' },
              { 'green-btn': messagesType === 'archived' }
            ]"
            :disabled="!selectedChats.length"
            :loading="loading"
            @click="setArchive"
          >
            <archiveSvg v-if="!loading && messagesType !== 'archived'" />
            <p v-if="messagesType !== 'archived'">Архивировать</p>
            <p v-else>Разархивировать</p>
          </el-button>
        </div>
      </el-aside>
      <nuxt />
    </el-container>
  </div>
</template>

<script>
import editSvg from '@/assets/icons/edit2.svg?inline'
import archiveSvg from '@/assets/icons/archive.svg?inline'
import AvatarSvg from '@/assets/icons/avatar.svg?inline'
import { mapState, mapMutations } from 'vuex'

export default {
  head() {
    return {
      title: this.title,
      title: 'Lavzee | ' + this.title
    }
  },
  async fetch() {
    this.userId = await this.$store.getters['auth/userId']
  },
  data() {
    return {
      title: 'Сообщения',
      edit: false,
      loading: false,
      messagesType: 'all', //archived, notRead
      selectedChats: [],
      userId: null
    }
  },
  methods: {
    ...mapMutations('message', ['sortTelegram', 'setRead', 'filteredMessages']),
    async searchEvent(str) {
      if (str.length > 2) {
        let box = []
        this.telegram.forEach((obj) => {
          let check = obj.messages.filter((o) => {
            return o.text.toLowerCase().includes(str.toLowerCase())
          })
          box.push(...check)
        })
        this.filteredMessages({ box, userId: this.userId })
      }
      if (str.length === 0) {
        await this.$store.dispatch('message/fetchMessages', {
          id: this.userId
        })
      }
    },
    setType(type) {
      this.messagesType = type
      this.cancelEditing()
    },
    selectAll() {
      let box = []
      this.telegram.forEach((e) => {
        box.push(e.userId)
      })

      this.selectedChats = box
    },
    cancelEditing() {
      this.selectedChats = []
      this.edit = false
    },
    enableEdit() {
      this.edit = !this.edit

      if (!this.edit) {
        this.selectedChats = []
      }
    },
    clack(m) {
      if (!this.edit) {
        this.$router.push(
          `/user/messages/${m.userId}?type=${this.messagesType}`
        )
      } else {
        if (!this.selectedChats.includes(m.userId)) {
          this.selectedChats.push(m.userId)
        } else {
          this.selectedChats = this.selectedChats.filter((i) => i !== m.userId)
        }
      }
    },
    async setArchive() {
      const form = {
        userId: this.userId,
        archive: this.selectedChats
      }

      try {
        this.loading = true

        if (this.messagesType !== 'archived') {
          await this.$store.dispatch('message/setArchive', form)
          return this.$message.success({
            showClose: true,
            message: 'Сообщения успешно архивированы!'
          })
        } else {
          await this.$store.dispatch('message/unzip', form)
          return this.$message.success({
            showClose: true,
            message: 'Сообщения успешно разархивированы!'
          })
        }
      } catch (e) {
      } finally {
        this.loading = false
        this.cancelEditing()
      }
    },
    filterTelegram(telegram) {
      if (this.messagesType === 'all')
        return telegram.filter((e) => !e.archived)
      if (this.messagesType === 'notRead')
        return telegram.filter((e) => e.count)
      if (this.messagesType === 'archived')
        return telegram.filter((e) => e.archived)
    }
  },
  computed: {
    ...mapState('message', ['messages', 'messenger', 'telegram', 'archive']),
    error() {
      return this.$store.getters.error
    },
    request() {
      return this.$route.params.id
    }
  },
  watch: {
    error(value) {
      this.$message.error(value.response.data.message)
    }
  },
  components: {
    editSvg,
    archiveSvg,
    AvatarSvg
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 0;
}

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
