<template>
  <el-form
    ref="form"
    :rules="rules"
    :model="form"
    enctype="multipart/form-data"
    class="wrap cancel-reason"
    @submit.native.prevent="onSubmit"
    :class="{ closed: !isOpen }"
  >
    <div class="overlay"></div>
    <div class="popup">
      <div class="cancel" @click="cancelAction">
        <cancelSvg />
      </div>
      <div class="popup__head">
        <h3>{{ title }}</h3>
      </div>
      <div class="popup__content">
        <p>
          {{ content }}
        </p>
      </div>
      <div class="popup__btn">
        <div class="t-area">
          <el-form-item prop="textarea">
            <textarea
              ref="textarea"
              id="textarea"
              class="textarea"
              placeholder="Впишите детали проекта..."
              maxlength="500"
              v-model="form.textarea"
            />
          </el-form-item>
          <el-upload
            class="upload-demo upload-cancel-reason"
            ref="upload"
            action="#"
            :before-upload="upload"
            :limit="5"
            :file-list="form.fileList"
            :on-change="changeFileList"
            :on-remove="removeCurrentFile"
            :auto-upload="false"
          >
            <fileSvg />
          </el-upload>
        </div>
        <el-button
          type="primary"
          native-type="submit"
          class="btn primary"
          round
          :loading="loading"
        >
          <span>Отправить</span>
        </el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import { check } from '@/content/create-categories'
import cancelSvg from '@/assets/icons/x.svg?inline'
import fileSvg from '@/assets/icons/file.svg?inline'
import moment from 'moment'

export default {
  emits: ['created'],
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: Boolean,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    postId: {
      type: String,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      rules: {
        textarea: [
          {
            required: true,
            message: 'Напишите причину отмены',
            trigger: 'blur'
          },
          {
            min: 10,
            message:
              'Расскажите подробно, в поле не должно быть менее 10 символов',
            trigger: ['blur', 'change']
          }
        ]
      },
      form: {
        textarea: '',
        fileList: []
      }
    }
  },
  methods: {
    cancelAction() {
      this.$emit('cancel')
    },
    removeCurrentFile(file) {
      this.form.fileList = this.form.fileList.filter((i) => i.uid !== file.uid)
    },
    changeFileList(file, fileList) {
      const size = 50

      const isFormat =
        file.raw.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.raw.type === 'image/jpeg' ||
        file.raw.type === 'application/x-zip-compressed' ||
        file.raw.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.raw.type === 'image/jpeg' ||
        file.raw.type === 'image/png' ||
        file.raw.type === 'text/plain' ||
        file.raw.type === 'application/x-zip-compressed' ||
        file.raw.type === 'application/x-zip' ||
        file.raw.type === 'application/pdf' ||
        file.raw.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.raw.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.raw.type === 'application/vnd.ms-excel' ||
        file.raw.type === 'application/msword' ||
        file.raw.type === 'audio/mpeg' ||
        file.raw.type === 'video/mp4' ||
        file.raw.type === 'video/avi'
      const isLarge = file.raw.size / 1024 / 1024 < size

      if (!isFormat) {
        this.$message.warning({
          showClose: true,
          message: 'Недопустимый формат!'
        })
        return (this.form.fileList = this.form.fileList.filter(
          (i) => i.uid !== file.uid
        ))
      } else if (!isLarge) {
        this.$message.warning({
          showClose: true,
          message: `Файл не должен быть больше ${size}MB!`
        })
        return (this.form.fileList = this.form.fileList.filter(
          (i) => i.uid !== file.uid
        ))
      }

      if (isFormat && isLarge) {
        this.form.fileList.push(file.raw)
      }
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            postId: this.postId,
            fileList: this.form.fileList,
            text: this.form.textarea,
            author: this.author ? 'true' : 'false',
            userId: this.userId,
            dateOfCreation: moment()
          }

          try {
            const reason = await this.$store.dispatch('post/reason', formData)
            this.form.fileList = []
            this.$refs.upload.clearFiles()
            this.$emit('created', reason)
            this.loading = false
            this.$message.warning({
              showClose: true,
              message: 'Заявка отправлена в модерацию!'
            })
          } catch (e) {
          } finally {
            this.loading = false
          }
        } else {
          this.$message.warning({
            showClose: true,
            message: 'Форма не валидна!'
          })
        }
      })
    },
    ...check
  },
  components: {
    cancelSvg,
    fileSvg
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;

  &.closed {
    animation: close 0.3s forwards;
  }
}

@keyframes close {
  0% {
    opacity: 1;
    user-select: unset;
    pointer-events: unset;
  }
  100% {
    opacity: 0;
    user-select: none;
    pointer-events: none;
  }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  background: $black;
  opacity: 0.8;
  width: 100%;
  height: 100%;
  z-index: 0;
}

@keyframes up {
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.popup {
  position: relative;
  z-index: 1;
  background: $white;
  border-radius: 8px;
  padding: 3.6rem 3.6rem;
  margin: 2rem;
  animation: up 0.7s forwards;

  .cancel {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $azure;
    z-index: 3;
    transition: 0.4s;

    &:hover {
      background: $blue;
      svg {
        fill: $white;
      }
    }

    svg {
      fill: $blue;
      transition: 0.4s;
    }
  }

  h3 {
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 28px;
    text-align: left;
    margin-bottom: 1.2rem;
    color: $black;
  }

  &__content {
    margin-bottom: 1.5rem;
    width: 550px;
    display: flex;
    border-radius: 4px;
    padding-bottom: 1.8rem;
    border-bottom: 1px solid $light-gray;

    p {
      color: $gray;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      font-size: 1.4rem;
      max-width: 350px;
    }
  }

  .primary {
    color: $white;
    height: 56px;
  }

  .t-area {
    width: 100%;
    padding-bottom: 3.2rem;
  }

  &__btn {
    display: flex;
    flex-direction: column;
  }
}
</style>
