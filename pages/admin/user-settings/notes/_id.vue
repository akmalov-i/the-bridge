<template>
  <div>
    <div class="note-modal" v-if="isModalOpen">
      <el-form
        :model="notesModel"
        :rules="rules"
        ref="form"
        @submit.native.prevent="onSubmit"
        :style="{ 'min-height': '680px' }"
      >
        <div class="overlay"></div>
        <div class="note-popup animated">
          <h2 class="mb1">Добавить заметку</h2>
          <button class="close center" @click="modalClose">&#10006;</button>
          <p>
            Прозрачность сделки. Рассрочка без процентов.Продавцы и Покупатели,
            дорожащие репутацией.
          </p>
          <hr class="m0" />
          <el-form-item prop="textarea">
            <el-input
              v-model="notesModel.textarea"
              type="textarea"
              placeholder="Детали..."
              show-word-limit
              class="main-textarea"
              maxlength="500"
              resize="none"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="btn edit mt3"
              native-type="submit"
              :loading="loading"
            >
              Сохранить изменения
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="settings-container">
      <div class="settings-header mb2">
        <div class="header-left">
          <h2 class="mb1">{{ this.title }}</h2>
          <p class="context">
            Рыбатекст используется дизайнерами, проектировщиками и
            фронтендерами, когда нужно быстро
          </p>
        </div>
      </div>
      <div>
        <hr />
        <button class="btn cancel mt3 mb2" @click="modalOpen">
          Добавить заметку
        </button>
      </div>
      <div v-for="note in notes" :key="note._id">
        <TheNote
          :data="note"
          :userId="userId"
          :adminId="adminId"
          @edited="changeNoteHandler"
          @deleted="deleteNoteHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  layout: 'userSettings',
  middleware: ['admin-auth'],
  async validate({ params }) {
    return Boolean(params.id)
  },
  head() {
    return {
      title: 'Lavzee | ' + this.title
    }
  },
  async asyncData({ store, params }) {
    let adminId = await store.getters['auth/userId']
    let user = await store.dispatch('user/fetchById', params.id)
    let notes = await store.dispatch('note/fetch', { userId: user._id })

    return {
      adminId,
      notes,
      userId: user._id,
      notesModel: { textarea: '' }
    }
  },
  data() {
    return {
      title: 'Заметки по данному профилю',
      loading: false,
      isModalOpen: false,
      refreshCounter: 0,
      rules: {
        textarea: [
          {
            required: true,
            message: 'Поле не может быть пустым',
            trigger: 'blur'
          },
          {
            min: 10,
            message: 'В поле не должно быть меньше 10 символов',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            adminId: this.adminId,
            userId: this.userId,
            textarea: this.notesModel.textarea
          }

          try {
            await this.$store.dispatch('note/create', formData)
            this.$nuxt.refresh()
            this.modalClose()
            this.$message.success('Изменения сохранены')
          } catch (e) {
          } finally {
            this.loading = false
          }
        } else {
          this.$message.warning('Форма не валидна')
        }
      })
    },
    changeNoteHandler(data) {
      this.notes.forEach((e) => {
        if (e._id === data._id) {
          e.textarea = data.textarea
          e.adminId = data.adminId
        }
      })
    },
    deleteNoteHandler(data) {
      this.notes = this.notes.filter(e => e._id !== data)
    },
    modalOpen() {
      this.isModalOpen = true
    },
    modalClose() {
      this.isModalOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.note-modal {
  position: fixed;
  z-index: 1999;
}

.overlay {
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  position: fixed;
  z-index: 1998;
  animation: fadeIn 0.7s forwards;
}

.note-popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -45%);
  width: 600px;
  padding: 4.6rem 2.4rem;
  background: $white;
  border-radius: 8px;
  z-index: 1999;
  animation: up 0.7s forwards;

  .close {
    position: absolute;
    top: 24px;
    right: 24px;
    background: $azure;
    color: $blue;
    font-size: 1.6rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  p {
    color: $gray;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 150%;
    max-width: 400px;
    margin-bottom: 1.8rem;
  }

  textarea {
    width: 100%;
    resize: none;
    background: #f3f3f3;
    border-radius: 4px;
    padding: 1.2rem 1.6rem;
    font-weight: 300;
    font-size: 1.4rem;
    line-height: 170%;
    height: 110px;

    &:focus {
      outline: none;
    }
  }
}

.context {
  max-width: 415px;
  font-size: 1.4rem;
  color: $gray;
  font-weight: 400;
  line-height: 150%;
}

hr {
  height: 1px;
  width: 100%;
  background: $light-gray;
  min-width: 200px;
  margin: 2.4rem 0;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
}

@keyframes up {
  0% {
    transform: translate(-50%, -45%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}
</style>
