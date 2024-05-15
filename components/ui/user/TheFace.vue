<template>
  <div class="face">
    <AdditionsModal :data="face" :status.sync="isOpenModal" />
    <div>
      <div class="face-avatar">
        <div
          class="face-avatar__status"
          :class="{ orange: squareSwitchActiveIdx === 1 }"
        >
          <div class="circle"></div>
          <div v-if="squareSwitchActiveIdx === 0">Свободен</div>
          <div v-else>Недоступен</div>
        </div>
        <div v-if="face.imageUrl" class="face-avatar__img" @click="redirect">
          <nuxt-img :src="'avatars' + face.imageUrl" preset="avatar" />
        </div>
        <div v-else class="no-avatar" @click="redirect">
          <avatarSvg />
        </div>

        <div class="face-avatar__rate">
          <el-tooltip placement="right">
            <template #content>
              <div class="tooltip">Рейтинг: {{ face.stars }}</div>
            </template>
            <el-rate
              v-model="face.stars"
              disabled
              disabled-void-color="#7d7d7d75"
              class="stars"
              :max="5"
              :colors="['#1374F6', '#1374F6', '#1374F6']"
            >
            </el-rate>
          </el-tooltip>
        </div>
        <div class="face-avatar__level">
          <userTimeSvg style="width: 30px" />
        </div>
      </div>
      <div class="name">{{ face.name }} {{ face.surname }}</div>
      <div v-if="face.profession" class="profession mb2">
        <div
          class="start"
          v-for="(item, idx) in face.profession.slice(0, 3)"
          :key="idx"
        >
          <span v-if="idx == 2"> | </span>
          <span v-if="idx == 1"> | </span>
          <p v-if="item.label.length > 10">
            {{ item.label.slice(0, 10) + '..' }}
          </p>
          <p v-else>{{ item.label }}</p>
        </div>
      </div>
      <div v-if="face.isMe">
        <SquareSwitch
          class="mb1"
          :options="squareSwitch"
          :select.sync="config.params.filters.button"
          :active.sync="switchSetter"
        />
        <div class="btns mb24">
          <nuxt-link :to="'/user/services/' + face.id" class="btn azure mb1"
            ><transactionSvg />Мои транзакции</nuxt-link
          >
          <nuxt-link :to="'/settings/main/' + face.id" class="btn cancel"
            ><editSvg /> Редактировать</nuxt-link
          >
        </div>
      </div>
      <div class="another-user mb3" v-else>
        <button class="btn edit mb08" @click="sendMessage">
          <messageSvg class="message" />
          <p>Написать сообщение</p>
        </button>
        <div class="mb08 space-between">
          <button class="btn azure" @click="isOpenModal = true">
            Дополнительно
          </button>
          <button
            class="btn cancel"
            v-clipboard:copy="$nuxt.$route.fullPath"
            v-clipboard:success="onCopy"
          >
            <profileLinkSvg class="profile-link" />
          </button>
        </div>
      </div>
    </div>
    <div
      class="socials"
      :class="{
        'no-links':
          !face.links.telegram && !face.links.whatsapp && !face.links.instagram
      }"
    >
      <a
        target="_blank"
        v-if="face.links.instagram"
        :href="face.links.instagram"
      >
        <instagramSvg />
      </a>
      <a target="_blank" v-if="face.links.whatsapp" :href="face.links.whatsapp">
        <whatsappSvg />
      </a>
      <a target="_blank" v-if="face.links.telegram" :href="face.links.telegram">
        <telegramSvg />
      </a>
      <a
        target="_blank"
        class="no-click"
        v-if="
          !face.links.telegram && !face.links.whatsapp && !face.links.instagram
        "
        href="#"
      >
        <nolinksSvg />
      </a>
    </div>
  </div>
</template>

<script>
import transactionSvg from '@/assets/icons/transaction.svg?inline'
import editSvg from '@/assets/icons/edit2.svg?inline'
import instagramSvg from '@/assets/icons/instagram.svg?inline'
import whatsappSvg from '@/assets/icons/whatsapp.svg?inline'
import telegramSvg from '@/assets/icons/telegram.svg?inline'
import userTimeSvg from '@/assets/icons/user-time.svg?inline'
import nolinksSvg from '@/assets/icons/nolinks.svg?inline'
import messageSvg from '@/assets/icons/message.svg?inline'
import profileLinkSvg from '@/assets/icons/profile-link.svg?inline'
import avatarSvg from 'assets/icons/avatar.svg?inline'

export default {
  props: {
    face: {
      type: Object,
      required: true
    },
    squareSwitchActiveIdx: Number
  },
  created() {
    this.switchSetter = this.squareSwitchActiveIdx
  },
  emits: ['update:squareSwitchActiveIdx'],
  data() {
    return {
      isOpenModal: false,
      config: {
        params: {
          filters: {
            button: 'Ready'
          }
        }
      },
      rate: 2,
      switchSetter: 0,
      squareSwitch: [
        {
          label: 'Готов к заказам',
          value: 'Ready'
        },
        {
          label: 'Недоступен',
          value: 'Unavailable'
        }
      ]
    }
  },
  methods: {
    onCopy() {
      this.$message.success('Ссылка на профиль скопирована!')
    },
    redirect() {
      this.$router.push(`/settings/main/${this.face.id}`)
    },
    sendMessage() {
      this.$router.push(`/user/messages/${this.$route.params.id}`)
    }
  },
  watch: {
    switchSetter(val) {
      this.$emit('update:squareSwitchActiveIdx', val)
    }
  },
  components: {
    editSvg,
    transactionSvg,
    instagramSvg,
    whatsappSvg,
    telegramSvg,
    userTimeSvg,
    nolinksSvg,
    messageSvg,
    profileLinkSvg,
    avatarSvg
  }
}
</script>

<style lang="scss" scoped>
.face {
  .no-avatar {
    width: 150px;
    height: 150px;
    border: 1px solid $azure;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    svg {
      fill: $azure;
      width: 60px;
      height: 60px;
    }
  }

  width: 320px;
  height: 550px;
  background: $white;
  border-radius: 8px;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .select-tab {
    height: 50px;
  }

  .another-user {
    .message {
      fill: $white;
      margin-right: 1rem;
    }

    .btn.azure {
      width: 78%;

      &:hover {
        color: $blue;
        background: lighten($azure, 1%);
      }
    }

    .btn.cancel {
      min-width: 56px;
      min-height: 56px;
      width: 56px;
      height: 56px;
    }

    .btn.cancel:hover .profile-link {
      fill: $white;
    }

    .profile-link {
      fill: $red;
      transition: 0.4s;
    }
  }

  &-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &__status {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: -1rem;
      top: 0rem;
      background: $green;
      width: 82px;
      height: 25px;
      border-radius: 17.5px;
      font-size: 1.2rem;
      font-weight: 500;
      color: $white;
      transition: background 0.4s;

      &.orange {
        width: 90px;
        border: none;
        background: $orange;
        transition: background 0.4s;
      }

      .circle {
        width: 7px;
        height: 7px;
        background: $white;
        border-radius: 100%;
        margin-right: 0.4rem;
      }
    }

    .no-avatar {
      cursor: pointer;
    }

    &__img {
      cursor: pointer;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      overflow: hidden;
    }

    &__rate {
      position: absolute;
      bottom: 0rem;
      width: 88px;
      height: 20px;
      border-radius: 17.5px;
      background: $azure;
      display: flex;
      align-items: center;
      justify-content: center;

      .el-rate {
        height: 13px;
      }
    }

    &__level {
      position: absolute;
      top: 0rem;
      right: 6rem;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: $blue;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: $white;
      font-size: 1.6rem;
      border: 3px solid $white;
    }
  }
}

.name {
  font-size: 2rem;
  color: $black;
  font-weight: 500;
  margin-top: 1.2rem;
  margin-bottom: 1.4rem;
  text-align: center;
}

.profession {
  color: rgba(125, 125, 125, 0.62);
  font-weight: 400;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  span {
    margin: 0 1rem;
  }
}

.status-change .select-tab .tab {
  width: 40%;
}

.status-change .select-tab {
  max-width: unset;
  height: 56px;
  margin-top: 1.4rem;
  margin-bottom: 0.8rem;

  .active.tab {
    width: 60%;
  }

  &.active {
    font-weight: 700;
  }
}

.btns {
  .cancel {
    svg {
      fill: $red;
      transition: 0.4s;
    }
    &:hover svg {
      fill: $white;
    }
  }
  .azure {
    svg {
      fill: $blue;
      transition: 0.4s;
    }
    &:hover svg {
      fill: $white;
    }
  }
  svg {
    margin-right: 1.2rem;
  }
}

.socials {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  a {
    cursor: pointer;
  }

  &::before,
  &::after {
    position: absolute;
    content: '';
    width: 12%;
    height: 1px;
    background: rgba(125, 125, 125, 0.36);
    top: 50%;
    transform: translateY(-50%);
  }

  &.no-links {
    &::before,
    &::after {
      width: 35%;
    }
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(125, 125, 125, 0.36);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.4s;

    &:hover {
      border: 1px solid $blue;
      background: $blue;
      svg {
        fill: $white;
      }
    }

    &:not(:last-child) {
      margin-right: 2.4rem;
    }

    svg {
      fill: rgba(125, 125, 125, 0.36);
      transition: 0.4s;
    }
  }
}
</style>
