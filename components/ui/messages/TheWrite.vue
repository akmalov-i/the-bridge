<template>
  <el-form
    :model="controls"
    :class="{ 'big-area': controls.written }"
    ref="form"
    class="write-wrap"
    @submit.native.prevent="onSubmit"
  >
    <div class="write">
      <textarea
        ref="textarea"
        maxlength="500"
        placeholder="Написать сообщение"
        @input="checkWrite"
        v-model.trim="controls.written"
      ></textarea>
      <div class="button" v-if="comment">
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            class="btn primary"
            round
            :loading="loading"
          >
            Отправить
          </el-button>
        </el-form-item>
      </div>
      <div class="button send" v-else>
        <button class="btn center">
          <sendSvg />
        </button>
      </div>
    </div>
  </el-form>
</template>

<script>
import sendSvg from '@/assets/icons/send.svg?inline'

export default {
  emits: ['created', 'createdReply'],
  props: {
    comment: {
      type: Boolean,
      default: true
    },
    replies: {
      type: Object
    },
    postId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      cut: '',
      user: '',
      controls: {
        written: '',
        repliedSubject: '',
        repliedCommentId: ''
      },
      big: false
    }
  },
  watch: {
    async replies(val) {
      const res = await this.$store.dispatch(
        'user/fetchByIdMinimal',
        val.userId
      )
      this.cut = `@${res[0].name} `
      this.controls.written = `@${res[0].name} `
      this.controls.repliedSubject = res[0]._id
      this.controls.repliedCommentId = val.commentId
      this.$refs.textarea.focus()
    },
    written(val) {
      if (val.length === 0) {
        this.controls.repliedSubject = ''
        this.controls.repliedCommentId = ''
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.controls.written.length < 1) {
        return this.$message.warning({
          showClose: true,
          message: 'Поле не может быть пустым!'
        })
      }
      this.$refs.form.validate(async (valid) => {
        if (valid && !this.controls.repliedSubject) {
          this.loading = true

          const formData = {
            userId: this.userId,
            postId: this.postId,
            text: this.controls.written.slice(0, 500)
          }

          try {
            const newComment = await this.$store.dispatch(
              'comment/create',
              formData
            )
            this.$message.success({
              showClose: true,
              message: 'Комментарий добавлен'
            })
            this.$emit('created', newComment)
            this.controls.cut = ''
            this.controls.written = ''
            this.controls.repliedSubject = ''
            this.controls.repliedCommentId = ''
            this.loading = false
          } catch (e) {}
        }
        if (valid && this.controls.repliedSubject) {
          this.loading = true

          const formData = {
            userId: this.userId,
            repliedSubject: this.controls.repliedSubject,
            commentId: this.controls.repliedCommentId,
            text: this.controls.written.slice(this.cut.length, 500)
          }

          try {
            const newComment = await this.$store.dispatch(
              'comment/createReply',
              formData
            )
            this.$message.success({
              showClose: true,
              message: 'Комментарий добавлен'
            })
            this.$emit('createdReply', newComment)
            this.controls.cut = ''
            this.controls.written = ''
            this.controls.repliedSubject = ''
            this.controls.repliedCommentId = ''
            this.loading = false
          } catch (e) {}
        }
      })
    },
    checkWrite() {
      this.controls.written.length > 0 ? (this.big = true) : (this.big = false)
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
    height: 100px;
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
        width: 32px;
        height: 32px;
        background: $blue;
        border-radius: 50%;
        position: relative;
        z-index: 2;
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
    padding: 2rem 18rem 2rem 1.6rem;
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
