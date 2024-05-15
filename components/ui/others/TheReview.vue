<template>
  <div class="review i1">
    <div class="top">
      <div class="top-left">
        <nuxt-img
          :src="'avatars' + user.imageUrl"
          preset="comments"
          v-if="user.imageUrl"
        />
        <div class="avatar" v-else>
          <avatarSvg />
        </div>
        <div class="author-info i1">
          <p>{{ user.name }} {{ user.surname }}</p>
          <el-rate
            v-model="status.stars"
            disabled
            disabled-void-color="#7d7d7d75"
            class="stars"
            :max="5"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
          >
          </el-rate>
        </div>
      </div>
      <div class="date-wrap">
        <div class="date">
          {{ $moment(data.date).locale('ru').format('LL HH:mm') }}
        </div>
      </div>
    </div>
    <div class="body">
      <h3>{{ data.postId.title }}</h3>
      <p>{{ data.textarea }}</p>
    </div>
  </div>
</template>

<script>
import avatarSvg from '@/assets/icons/avatar.svg?inline'
import moment from 'moment'

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  async fetch() {
    let user = await this.$store.dispatch(
      'user/fetchByIdMinimal',
      this.data.from
    )
    let status = user[0].rating
    this.user = user[0]
    this.status = status
  },
  data() {
    return {
      user: { imageUrl: '' },
      status: { stars: 0 }
    }
  },
  components: {
    avatarSvg
  }
}
</script>

<style lang="scss" scoped>
.review {
  width: 100%;
  border-radius: 8px;
  font-size: 1.4rem;
  border: 1px solid #e5e5e5;
  margin-bottom: 1.2rem;
  position: relative;

  .author-info {
    .el-rate {
      height: 15px;
    }
  }

  .top {
    padding: 1.1rem 1.8rem 1.6rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;

    &-author {
      margin-left: 0.8rem;
      font-size: 1.4rem;
      color: $white;
      background: $orange;
      border-radius: 4px;
      padding: 0.4rem 1.2rem;
      line-height: 100%;
      font-weight: 400;
    }

    &-left {
      display: flex;
      align-items: center;
    }

    &-right {
      font-size: 1.4rem;
      font-weight: 500;
      color: $gray;
      position: relative;

      &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 1px;
        background: $gray;
        opacity: 0.5;
        transform: scale(0);
        bottom: 0;
        left: 0;
        transition: 0.4s;
      }

      &:hover {
        cursor: pointer;
        &::after {
          transform: scale(1);
        }
      }
    }

    p {
      font-size: 1.6rem;
      font-weight: 500;
    }

    img {
      border-radius: 50%;
      margin-right: 1.2rem;
    }
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

  .body {
    padding: 1.6rem 3rem;
    font-weight: 300;
    max-width: 830px;

    span {
      font-weight: 500;
    }
  }

  .date-wrap {
    .date {
      font-weight: 500;
      font-size: 1.2rem;
      color: $gray;
      opacity: 0.56;
    }
  }

  &.author-comment {
    background: $azure;
    border: 1px solid transparent;

    .top {
      border-bottom: 1px solid #1375f62c;
    }
  }
}
</style>
