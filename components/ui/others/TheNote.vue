<template>
  <div class="note space-between mb08">
    <div class="note-modal" v-if="isModalOpen">
      <el-form
        :model="edit"
        :rules="rules"
        ref="form"
        @submit.native.prevent="onSubmit"
        :style="{ 'min-height': '680px' }"
      >
        <div class="overlay"></div>
        <div class="note-popup">
          <h2 class="mb1">Редактировать</h2>
          <button class="close center" @click="modalClose">&#10006;</button>
          <p>
            Прозрачность сделки. Рассрочка без процентов.Продавцы и Покупатели,
            дорожащие репутацией.
          </p>
          <hr class="m0" />
          <el-form-item prop="textarea">
            <el-input
              v-model="edit.textarea"
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
    <div class="delete-wrap" v-if="isDeleteModal">
      <div class="delete-overlay"></div>
      <div class="delete-modal">
        <div class="top">
          <h2 class="mb1">Вы уверены что хотите удалить заметку?</h2>
          <p class="mb3">
            После нажатия кнопки «Да» данная заметка будет удалена навсегда с
            базы данных
          </p>
        </div>
        <div class="bottom center">
          <el-button
            type="primary"
            class="btn center"
            :loading="loading"
            @click="DeleteNote"
          >
            Да
          </el-button>
          <el-button
            type="primary"
            class="btn center"
            :loading="loading"
            @click="DeleteModalClose"
          >
            Нет
          </el-button>
        </div>
      </div>
    </div>

    <div class="content">
      <h3>Модератор: {{ data.adminId.name }} {{ data.adminId.surname }}</h3>
      <p>{{ data.textarea }}</p>
    </div>
    <div class="sub-buttons">
      <div class="sub-button edit" @click="modalOpen">
        <editSvg />
      </div>
      <div class="sub-button delete" @click="DeleteModalOpen">
        <deleteSvg />
      </div>
    </div>
  </div>
</template>

<script>
import editSvg from '@/assets/icons/edit2.svg?inline'
import deleteSvg from '@/assets/icons/delete.svg?inline'
import moment from 'moment'

export default {
  emits: ['edited', 'deleted'],
  props: {
    data: {
      type: Object
    },
    adminId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  created() {
    this.edit.textarea = this.data.textarea
  },
  data() {
    return {
      isModalOpen: false,
      isDeleteModal: false,
      loading: false,
      edit: { textarea: '' },
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
            id: this.data._id,
            textarea: this.edit.textarea
          }

          try {
            let newNote = await this.$store.dispatch('note/edit', formData)
            this.modalClose()
            this.$message.success('Изменения сохранены')
            this.$emit('edited', newNote)
          } catch (e) {
          } finally {
            this.loading = false
          }
        } else {
          this.$message.warning('Форма не валидна')
        }
      })
    },
    modalOpen() {
      this.isModalOpen = true
    },
    modalClose() {
      this.isModalOpen = false
      this.edit.textarea = this.data.textarea
    },
    async DeleteNote() {
      this.loading = true

      try {
        await this.$store.dispatch('note/remove', this.data._id)
        this.DeleteModalClose()
        this.$message.success('Заметка удалена')
        this.$emit('deleted', this.data._id)
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    DeleteModalOpen() {
      this.isDeleteModal = true
    },
    DeleteModalClose() {
      this.isDeleteModal = false
    }
  },
  components: {
    editSvg,
    deleteSvg
  }
}
</script>

<style lang="scss" scoped>
.delete-overlay {
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

.delete-wrap {
  position: fixed;
  z-index: 1999;
}

.delete-modal {
  position: fixed;
  z-index: 1999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 564px;
  height: 242px;
  background: $white;
  padding: 3.6rem 4.3rem;
  border-radius: 8px;

  h2 {
    text-align: center;
  }

  p {
    font-size: 1.4rem;
    line-height: 150%;
    color: $gray;
    text-align: center;
  }

  button {
    background: $azure;
    width: 173px;
    height: 56px;
    border-radius: 4px;
    font-size: 1.4rem;
    color: $blue;
    font-weight: 500;
    transition: 0.4s;

    &:hover {
      background: $blue;
      color: $white;
    }
  }
}

.note {
  padding: 2.4rem;
  border-radius: 4px;
  border: 1px solid $light-gray;

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

  &-popup {
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
}

.content {
  h3 {
    font-weight: 500;
    font-size: 1.4rem;
    color: $black;
    margin-bottom: 0.8rem;
  }
  p {
    font-size: 1.2rem;
    color: $gray;
    line-height: 170%;
    max-width: 515px;
  }
}

hr {
  height: 1px;
  width: 100%;
  background: $light-gray;
  min-width: 200px;
  margin: 2.4rem 0;
}

.sub-buttons {
  display: flex;
  align-items: center;
}

.sub-button {
  width: 32px;
  height: 32px;
  border: 1px solid $light-gray;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    border-color: $blue;
    background: $blue;

    svg {
      fill: $white;
    }
  }

  &:last-child {
    &:hover {
      border-color: $coral;
      background: $coral;

      svg {
        fill: $white;
      }
    }
  }

  &:first-child {
    margin-right: 0.8rem;
  }

  svg {
    fill: rgba(125, 125, 125, 0.52);
    width: 16px;
    height: 16px;
    transition: 0.4s;
  }
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
