<template>
  <el-form
    :model="controls"
    :class="{ 'big-area': controls.text }"
    ref="form"
    class="write-wrap"
    @submit.native.prevent="onSubmit"
  >
    <div class="write">
      <textarea
        ref="textarea"
        maxlength="3000"
        placeholder="Написать сообщение"
        v-model.trim="controls.text"
        @keydown.enter.exact.prevent="onSubmit"
      ></textarea>
      <div class="button send">
        <el-button
          type="primary"
          native-type="submit"
          class="btn center"
          :loading="loading"
        >
          <sendSvg v-if="!loading" />
        </el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import sendSvg from '@/assets/icons/send.svg?inline'
import moment from 'moment'

export default {
  emits: ['created', 'createdReply'],
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      controls: {
        text: '',
        dateOfCreation: moment(),
        isRead: false
      },
      big: false
    }
  },
  methods: {
    async onSubmit() {
      if (this.controls.text.length < 1) {
        return this.$message.warning({
          showClose: true,
          message: 'Поле не может быть пустым!'
        })
      }
      if (this.loading) {
        return this.$message.warning({
          showClose: true,
          message: 'Подождите, идёт отправка сообщений!'
        })
      }

      this.loading = true

      this.controls.from = this.data.from
      this.controls.to = this.data.to

      await this.$socket.emit('createMessage', this.controls, (data) => {
        if (typeof data === 'string') {
          console.error(data)
        } else {
          this.controls.text = ''
        }
      })

      this.loading = false
    }
  },
  components: {
    sendSvg
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}

.write-wrap {
  background: $white;
  padding-bottom: 2rem;

  &.big-area textarea {
    height: 90px;
  }
}

.write {
  position: relative;
  background: $azure;
  border-radius: 4px;

  .button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.2rem;
    display: flex;
    justify-content: flex-end;
    z-index: 20;

    &.send {
      button {
        position: relative;
        background: $blue;
        border-radius: 50%;
        z-index: 2;
        width: 40px;
        height: 40px;
      }
    }

    button {
      width: 162px;
      height: 44px;
      color: $white;
      font-size: 1.4rem;

      &:disabled {
        user-select: none;
        cursor: not-allowed;
      }

      &:hover {
        background-color: lighten($blue, 8%) !important;
      }
    }
  }

  textarea {
    width: 100%;
    height: 60px;
    resize: none;
    padding: 2rem 5rem 2rem 1.6rem;
    font-weight: 300;
    font-size: 1.4rem;
    color: $black;
    overflow: auto;
    transition: 0.4s;

    &::-webkit-scrollbar {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      font-weight: 300;
      font-style: italic;
      font-size: 1.4rem;
      color: $black;
    }
  }
}
</style>
