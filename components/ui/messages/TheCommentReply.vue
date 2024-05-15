<template>
  <div>
    <div class="comments reply" :class="{ 'author-comment': author }">
      <div class="top">
        <div class="details">
          <div class="vertical"></div>
          <div class="horizontal"></div>
          <div class="circle"></div>
        </div>
        <div class="top-left">
          <nuxt-img
            :src="'avatars' + user.imageUrl"
            preset="comments"
            v-if="user.imageUrl"
          />
          <div class="avatar" v-else>
            <avatarSvg />
          </div>
          <p>{{ user.name }}&nbsp;{{ user.surname }}</p>
          <div v-if="author" class="top-author">Заказчик</div>
        </div>
        <div
          class="top-right"
          v-if="answer"
          v-scroll-to="{
            el: '.i2'
          }"
          @click="
            replyToWrite({ userId: user._id, commentId: reply.commentId })
          "
        >
          Ответить
        </div>
      </div>

      <div class="body">
        <span>{{ subject.name }},</span> {{ reply.text }}
      </div>
      <div class="footer">
        <div class="date">
          {{ $moment(reply.date).locale('ru').format('LL HH:mm') }}
        </div>
        <div class="reactions" v-if="isAuthenticated">
          <div class="like" :class="{ active: doesLike }" @click="setLike">
            <fingerSvg />
            <p>{{ reply.likes.count }}</p>
          </div>
          <div
            class="dislike"
            :class="{ active: doesDislike }"
            @click="setDislike"
          >
            <fingerSvg />
            <p>{{ reply.dislikes.count }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fingerSvg from '@/assets/emoji/finger.svg?inline'
import avatarSvg from '@/assets/icons/avatar.svg?inline'
import moment from 'moment'

export default {
  emits: ['loadingControl'],
  props: {
    reply: {
      type: Object
    },
    answer: {
      type: Boolean,
      default: false
    }
  },
  async fetch() {
    let isAuthenticated = await this.$store.getters['auth/isAuthenticated']
    let user = await this.$store.dispatch(
      'user/fetchByIdMinimal',
      this.reply.userId
    )
    let subject = await this.$store.dispatch(
      'user/fetchByIdMinimal',
      this.reply.repliedSubject
    )
    if (isAuthenticated) {
      this.userId = await this.$store.getters['auth/userId']
      this.doesLike = !!this.reply.likes.id.find((i) => i === this.userId)
      this.doesDislike = !!this.reply.dislikes.id.find((i) => i === this.userId)
    }
    this.user = user[0]
    this.subject = subject[0]
    this.author = user._id === this.reply.userId
    this.isAuthenticated = isAuthenticated
  },
  data() {
    return {
      isAuthenticated: false,
      author: false,
      doesDislike: false,
      doesLike: false,
      userId: '',
      user: '',
      subject: ''
    }
  },
  methods: {
    replyToWrite(item) {
      this.$emit('replyToWrite', item)
    },
    async setLike() {
      try {
        if (this.doesDislike) {
          this.reply.dislikes.count--
        }
        this.doesLike = true
        this.doesDislike = false
        const formData = {
          commentId: this.reply._id,
          userId: this.userId,
          count: this.reply.likes.count++
        }
        await this.$store.dispatch('comment/setLikeReply', formData)
      } catch (e) {}
    },
    async setDislike() {
      try {
        if (this.doesLike) {
          this.reply.likes.count--
        }
        this.doesDislike = true
        this.doesLike = false
        const formData = {
          commentId: this.reply._id,
          userId: this.userId,
          count: this.reply.dislikes.count++
        }
        await this.$store.dispatch('comment/setDislikeReply', formData)
      } catch (e) {}
    }
  },
  components: {
    fingerSvg,
    avatarSvg
  }
}
</script>

<style lang="scss" scoped>
.comments {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 222px;
  width: 720px;
  border-radius: 8px;
  font-size: 1.4rem;
  border: 1px solid #e5e5e5;
  margin-bottom: 1.2rem;
  position: relative;
  z-index: auto;

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
      user-select: none;

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
    line-height: 170%;

    span {
      font-weight: 500;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.8rem 1.6rem 3rem;

    .reactions {
      display: flex;
    }

    .reactions .like {
      svg {
        transform: rotate(180deg);
      }
      margin-right: 0.8rem;
    }

    .reactions .like,
    .reactions .dislike {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.75);
      border-radius: 24px;
      padding: 0.4rem 0.6rem;
      display: flex;
      align-items: center;
      color: $white;
      font-weight: 300;
      font-size: 1.2rem;
      line-height: 1.2rem;
      transition: 0.4s;
      user-select: none;

      &:hover {
        cursor: pointer;
        background: $blue;
      }

      &.active {
        pointer-events: none;
        cursor: not-allowed;
        user-select: none;
        background: $blue;
      }

      &.disabled {
        pointer-events: none;
        cursor: not-allowed;
        user-select: none;
        opacity: 0.8;
      }

      p {
        margin-left: 0.4rem;
      }
    }

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

  &.reply {
    margin-left: 5.3rem;

    .details {
      position: absolute;
      top: 50px;
      left: -53px;
    }

    .vertical,
    .horizontal {
      position: absolute;
      height: 1px;
      background: $light-gray;
    }

    .vertical {
      width: 260px;
      top: -130px;
      left: -130px;
      transform: rotate(-90deg);
    }

    .horizontal {
      width: 46px;
    }

    .circle {
      position: absolute;
      width: 8px;
      height: 8px;
      background: $blue;
      border-radius: 100%;
      left: -3.5px;
      top: -3.5px;
    }
  }
}
</style>
