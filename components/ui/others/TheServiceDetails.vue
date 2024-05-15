<template>
  <div>
    <div class="details-popup center" v-if="isOpen">
      <div class="popup">
        <div class="top space-between">
          <h2>Другие причины</h2>
          <div class="cancel" @click="closeDetails">&#10006;</div>
        </div>
        <div class="mb2">
          <el-input
            type="textarea"
            placeholder="Напишите своё впечатление"
            v-model="textarea"
            :rows="6"
            resize="none"
            maxlength="100"
            minlength="10"
            show-word-limit
          >
          </el-input>
        </div>
        <el-button
          type="primary"
          class="btn edit"
          @click="sendServiceReaction('another')"
          :disabled="textarea.length < 1"
          round
          :loading="loading"
        >
          Отправить
        </el-button>
      </div>
    </div>

    <h2 class="mb2">Мои впечатления:</h2>
    <div class="details space-around">
      <div
        class="details-item hover mr4"
        :class="{
          active: reactions.fewDetails
            ? reactions.fewDetails.find((i) => i === userId)
            : false,
          disabled: validate
        }"
        @click="sendServiceReaction('fewDetails')"
      >
        <nuxt-img src="/png/1.png" />
        <p>Мало деталей</p>
      </div>
      <div
        class="details-item hover mr4"
        :class="{
          active: reactions.lowPrice
            ? reactions.lowPrice.find((i) => i === userId)
            : false,
          disabled: validate
        }"
        @click="sendServiceReaction('lowPrice')"
      >
        <nuxt-img src="/png/2.png" />
        <p>Низкая цена</p>
      </div>
      <div
        class="details-item hover mr4"
        :class="{
          active: reactions.suspiciously
            ? reactions.suspiciously.find((i) => i === userId)
            : false,
          disabled: validate
        }"
        @click="sendServiceReaction('suspiciously')"
      >
        <nuxt-img src="/png/3.png" />
        <p>Подозрительно</p>
      </div>
      <div
        class="details-item hover mr4"
        :class="{
          active: reactions.unusual
            ? reactions.unusual.find((i) => i === userId)
            : false,
          disabled: validate
        }"
        @click="sendServiceReaction('unusual')"
      >
        <nuxt-img src="/png/4.png" />
        <p>Необычно</p>
      </div>
      <div
        class="details-item hover"
        @click="openDetails"
        :class="{
          active: reactions.another
            ? reactions.another.find((i) => i.userId === userId)
            : false,
          disabled: validate
        }"
      >
        <nuxt-img src="/png/5.png" />
        <p>Другое</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['createdReaction'],
  props: {
    userId: {
      type: String,
      required: true
    },
    isAuth: {
      type: Boolean,
      required: true
    },
    postId: {
      type: String,
      required: true
    },
    reactions: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.checker()
  },
  data() {
    return {
      loading: false,
      isOpen: false,
      textarea: '',
      validate: false
    }
  },
  methods: {
    openDetails() {
      if (!this.isAuth) {
        return this.$message.warning({
          showClose: true,
          message: 'Пожалуйста авторизируйтесь!'
        })
      }
      this.isOpen = true
    },
    closeDetails() {
      this.isOpen = false
    },
    checker() {
      if (this.reactions?.unusual) {
        const validate = this.reactions.unusual.find((i) => i === this.userId)
        if (validate) return (this.validate = true)
      }
      if (this.reactions?.fewDetails) {
        const validate = this.reactions.fewDetails.find(
          (i) => i === this.userId
        )
        if (validate) return (this.validate = true)
      }
      if (this.reactions?.lowPrice) {
        const validate = this.reactions.lowPrice.find((i) => i === this.userId)
        if (validate) return (this.validate = true)
      }
      if (this.reactions?.suspiciously) {
        const validate = this.reactions.suspiciously.find(
          (i) => i === this.userId
        )
        if (validate) return (this.validate = true)
      }
      if (this.reactions?.another) {
        const validate = this.reactions.another.find(
          (i) => i.userId === this.userId
        )
        if (validate) return (this.validate = true)
      }
    },
    async sendServiceReaction(item) {
      if (!this.isAuth) {
        return this.$message.warning({
          showClose: true,
          message: 'Пожалуйста авторизируйтесь!'
        })
      }

      this.loading = true
      this.closeDetails()
      const formData = {
        postId: this.postId,
        userId: this.userId,
        reaction: item,
        text: this.textarea
      }

      try {
        this.validate = true
        await this.$store.dispatch('comment/setReaction', formData)
        const newReaction = await this.$store.dispatch(
          'comment/getReactions',
          this.postId
        )
        this.$emit('createdReaction', newReaction)
        this.loading = false
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes bg {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.btn.edit[disabled] {
  background: lighten($blue, 15%);
}

.details-popup {
  background: #000000b7;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1999;
  animation: bg 0.4s forwards;

  .popup {
    background: $white;
    width: 564px;
    height: 350px;
    border-radius: 8px;
    padding: 2.4rem;
    overflow: auto;
  }

  .item {
    padding-bottom: 1.4rem;
  }

  .top {
    padding-bottom: 2.4rem;

    h2 {
      margin-bottom: 0 !important;
    }

    .cancel {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: $azure;
      font-size: 2rem;
      color: $blue;
    }
  }

  .person {
    display: flex;
    align-items: center;
    margin-bottom: 1.4rem;
    margin-top: 1.4rem;

    img {
      height: 56px;
      width: 56px;
      border-radius: 50%;
      margin-right: 0.8rem;
    }

    h3 {
      margin-bottom: 0;
    }
  }

  .comments {
    border-radius: 4px;
    background: #f3f3f3;
    padding: 1.6rem;
    font-size: 1.4rem;
    font-weight: 300;
  }
}

.details {
  border-radius: 12px;
  padding: 1.6rem;
  user-select: none;

  &-item {
    border-radius: 4px;
    padding: 0.8rem;
    background: $light-blue;
    border: 1px solid #1374f6;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 9rem;
    transition: background 0.3s, opacity 0.3s;

    &.disabled {
      opacity: 0.8;
      pointer-events: none;
    }

    &.active {
      background: $blue;
      pointer-events: none;
      opacity: 1;

      p,
      span {
        color: $white;
      }
    }

    &.hover {
      cursor: pointer;
      img {
        transition: 0.4s;
      }

      &:hover {
        img {
          transform: scale(1.05);
        }
      }
    }

    span {
      font-weight: 500;
      font-size: 12px;
      color: $blue;
      position: absolute;
      top: 0.8rem;
      right: 0.8rem;
    }

    p {
      margin-top: 0.6rem;
      color: $blue;
      font-size: 1.4rem;
      font-weight: 500;
    }
  }
}
</style>
