<template>
  <div class="wrap center mb08" :class="{ check: edit }" @click="active">
    <div class="checkbox center mr1" v-if="edit" :class="{ checked: checked }">
      <CheckSvg />
    </div>
    <div class="msg space-between">
      <!-- class: moderator -->
      <div class="left start">
        <div class="photo" v-if="user.imageUrl">
          <nuxt-img :src="'avatars' + user.imageUrl" preset="offer" />
        </div>
        <div class="no-photo center" v-else>
          <AvatarSvg />
        </div>
        <div class="text">
          <h3>{{ user.name }} {{ user.surname }}</h3>
          <p class="telegram-text">{{ data.messages.slice(-1)[0].text }}</p>
        </div>
      </div>
      <div class="right column-end">
        <p>
          {{
            $moment(
              new Date(data.messages.slice(-1)[0].dateOfCreation).toISOString()
            ).fromNow()
          }}
        </p>
        <div class="count center" :class="{ hide: data.count === 0 }">
          {{ data.count }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarSvg from '@/assets/icons/avatar.svg?inline'
import CheckSvg from '@/assets/icons/check_done.svg?inline'

export default {
  emits: ['clack'],
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },
  async fetch() {
    const user = await this.$store.dispatch(
      'user/fetchByIdMinimal',
      this.data.userId
    )
    this.user = user[0]
  },
  data() {
    return {
      user: { imageUrl: '' },
      counter: 0
    }
  },
  methods: {
    active() {
      this.$emit('clack', this.data)
    }
  },
  components: {
    AvatarSvg,
    CheckSvg
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  .telegram-text {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 120px;
    height: 1.2em;
    white-space: nowrap;
  }

  &.active .msg {
    background: $azure;
    border-color: $azure;
  }

  &:hover .msg {
    background: $azure;
    border-color: $azure;
  }
}

.checkbox {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid rgba(125, 125, 125, 0.24);
  transition: 0.4s;
  cursor: pointer;
  animation: checkIn 0.4s forwards;

  @keyframes checkIn {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
}

.checkbox.checked {
  background: #526eff;
  border-color: #526eff;
}

.msg {
  border: 1px solid $light-gray;
  border-radius: 12px;
  padding: 1.6rem;
  cursor: pointer;
  transition: 0.4s;
  user-select: none;
  width: 97%;

  &.moderator {
    border: 1px solid rgba(237, 76, 79, 0.1);
    background: rgba(237, 76, 79, 0.1);

    h3 {
      color: $coral;
    }
  }

  &:hover,
  &.active {
    background: $azure;
    border-color: $azure;
  }
}

.photo {
  overflow: hidden;
  margin-right: 1.6rem;
  border-radius: 50%;
}

.no-photo {
  width: 56px;
  height: 56px;
  margin-right: 1.6rem;
  background: $white;
  border-radius: 50%;
  border: 1px solid $light-gray;

  svg {
    fill: $blue;
  }
}

.right {
  p {
    font-size: 1.2rem;
    color: rgba(125, 125, 125, 0.7);
    font-weight: 400;
    margin-bottom: 0.6rem;
  }

  .count {
    font-size: 1.1rem;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: $blue;
    color: $white;
    font-weight: 500;

    &.hide {
      opacity: 0;
    }
  }
}

.text {
  h3 {
    font-size: 1.6rem;
    color: $black;
    font-weight: 500;
    margin-bottom: 0.6rem;
  }

  p {
    font-weight: 400;
    font-size: 1.2rem;
    color: rgba(125, 125, 125, 0.7);
  }
}
</style>
