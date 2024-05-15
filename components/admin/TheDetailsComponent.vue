<template>
  <div class="details-component">
    <div class="top">
      <nuxt-img
        :src="'avatars' + user.imageUrl"
        preset="comments"
        v-if="user.imageUrl"
      />
      <div class="avatar" v-else>
        <avatarSvg />
      </div>
      <p>{{ user.name }}&nbsp;{{ user.surname }}</p>
    </div>
    <div class="text">{{ data.text }}</div>
  </div>
</template>

<script>
import avatarSvg from '@/assets/icons/avatar.svg?inline'

export default {
  props: {
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
      user: {
        imgUrl: ''
      }
    }
  },
  components: {
    avatarSvg
  }
}
</script>

<style lang="scss" scoped>
.details-component {
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  margin-bottom: 1.2rem;
  position: relative;
  padding: 1rem 1.8rem;
  z-index: auto;
}

.top {
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    margin-right: 1.2rem;
  }

  p {
    font-size: 1.6rem;
    font-weight: 500;
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $light-blue;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 1.2rem;

    svg {
      fill: $blue;
    }
  }
}

.text {
  padding: 1rem 0;
  font-weight: 300;
  line-height: 170%;
  font-size: 1.4rem;
}
</style>
