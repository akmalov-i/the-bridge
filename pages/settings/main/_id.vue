<template>
  <el-form
    :model="main"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <div class="settings-container">
      <h2>Основная информация</h2>
      <div class="start-top">
        <div class="photo-edit">
          <el-form-item class="item">
            <el-upload
              class="avatar-upload"
              action="#"
              ref="upload"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="handleImageChange"
              accept="image/jpeg"
            >
              <div class="avatar-edit">
                <editSvg />
              </div>
              <nuxt-img
                v-if="main.imageUrl"
                :src="'avatars' + main.imageUrl"
                preset="avatar"
              />
              <img
                v-else-if="main.image"
                :src="preview"
                width="150px"
                height="150px"
                class="blob"
                alt="avatar"
              />
              <div v-else class="no-avatar">
                <avatarSvg />
              </div>
            </el-upload>

            <div class="item-icon" @click="deleteAvatar">
              <deleteSvg />
            </div>
          </el-form-item>
          <hr />
          <p class="photo-text">
            Мы рекомендуем использовать изображение как минимум 150x150 px.
            Форматы: JPG;
          </p>
          <p>
            Дата регистрации
            {{ $moment(main.dateOfCreation).locale('ru').format('LL') }}
          </p>
        </div>
        <div :style="{ width: '100%' }">
          <div class="grid2">
            <div class="settings-input mr3">
              <el-form-item label="Имя" prop="name">
                <el-input disabled v-model="main.name" />
              </el-form-item>
            </div>

            <div class="settings-input">
              <el-form-item label="Фамилия" prop="surname">
                <el-input disabled v-model="main.surname" />
              </el-form-item>
            </div>
          </div>
          <div class="grid">
            <TheProfession
              title="Профессия"
              :selected-list="main.selectedList"
              :whole-list="wholeList"
              :max-number="5"
              @addSelect="addSelect"
              @deleteSelected="deleteSelected"
            />
          </div>

          <el-form-item prop="textarea" class="grid">
            <el-input
              v-model="main.textarea"
              type="textarea"
              placeholder="Расскажите немного о себе..."
              show-word-limit
              class="main-textarea"
              maxlength="500"
              resize="none"
            />
          </el-form-item>
        </div>
      </div>
    </div>
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
  </el-form>
</template>

<script>
import editSvg from 'assets/icons/edit.svg?inline'
import deleteSvg from 'assets/icons/delete.svg?inline'
import avatarSvg from 'assets/icons/avatar.svg?inline'
import moment from 'moment'

export default {
  layout: 'settings',
  middleware: ['user-auth'],
  async validate({ store, params }) {
    let userId = await store.getters['auth/userId']
    return Boolean(params.id === userId)
  },
  head() {
    return {
      title: 'Lavzee | ' + this.title
    }
  },
  async asyncData({ store, params }) {
    let isMe = false
    let userId = await store.getters['auth/userId']
    let user = await store.dispatch('user/fetchById', params.id)
    if (params.id === userId) isMe = true

    return {
      main: {
        imageUrl: user.imageUrl,
        name: user.name,
        surname: user.surname,
        textarea: user.textarea,
        image: null,
        profession: user.profession,
        textarea: user.textarea,
        dateOfCreation: user.dateOfCreation,
        selectedList: user.profession
      }
    }
  },
  data() {
    return {
      title: 'Настройки профиля',
      loading: false,
      wholeList: [
        { label: 'Уборка', value: 'Cleaning', disabled: false },
        { label: 'Переводы', value: 'Transfers', disabled: false },
        { label: 'Cантехника', value: 'Plumbing', disabled: false },
        { label: 'Транспортировка', value: 'Transportation', disabled: false },
        { label: 'Строитель', value: 'Builder', disabled: false },
        { label: 'Водитель', value: 'Driver', disabled: false }
      ],
      rules: {
        textarea: [
          {
            required: true,
            message: 'Расскажите о себе',
            trigger: 'blur'
          },
          {
            min: 80,
            message:
              'Расскажите подробно, в поле не должно быть менее 80 символов',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  components: {
    editSvg,
    deleteSvg,
    avatarSvg
  },
  methods: {
    handleImageChange(file, fileList) {
      const isJPG = file.raw.type === 'image/jpeg'
      const isLarge = file.raw.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('Файл должен быть в JPG формате!')
        this.$refs.upload.clearFiles()
      }
      if (!isLarge) {
        this.$message.error('Размер файла не должно превышать 5MB!')
        this.$refs.upload.clearFiles()
      }
      if (isJPG && isLarge) {
        this.main.imageUrl = ''
        this.preview = URL.createObjectURL(file.raw)
        this.main.image = file.raw
      }
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            name: this.main.name,
            id: this.$route.params.id,
            image: this.main.image,
            textarea: this.main.textarea,
            profession: this.main.selectedList
          }

          if (this.main.imageUrl) formData.imageSrc = this.main.imageUrl || ''

          try {
            await this.$store.dispatch('user/updateMain', formData)
            this.$refs.upload.clearFiles()
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
    async deleteAvatar() {
      this.main.imageUrl = ''
      this.main.image = ''
    },
    addSelect(item) {
      this.main.selectedList.push({
        label: item.label,
        value: item.value,
        disabled: item.disabled
      })
    },
    deleteSelected(item, idx) {
      this.main.selectedList.splice(idx, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.no-avatar {
  width: 150px;
  height: 150px;
  background: $azure;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  svg {
    width: 60px;
    height: 60px;
  }
}

.avatar-upload {
  position: relative;
  overflow: hidden;

  .blob {
    object-fit: cover;
  }

  &:hover {
    .avatar-edit {
      opacity: 1;
    }
  }
}

.avatar-edit {
  user-select: none;
  pointer-events: none;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: 0.4s;

  svg {
    width: 50px;
    height: 50px;
  }
}

.photo-edit {
  padding: 0 3.6rem;
  border-right: 1px solid $light-gray;
  margin-right: 3%;

  p {
    font-family: 'Gilroy';
    font-weight: 400;
    font-size: 1.2rem;
    color: $gray;
    color: $black;
    max-width: 234px;
    text-align: center;

    &.photo-text {
      margin-bottom: 4rem;
    }
  }

  hr {
    height: 1px;
    width: 100%;
    background: $light-gray;
    min-width: 200px;
    margin: 0;
    margin-bottom: 2.4rem;
  }

  .item {
    padding-bottom: 1.6rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 168px;

    &-icon {
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: $coral;
      border: 4px solid $white;
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: 1rem;
      right: 3rem;
      cursor: pointer;
      transition: 0.4s;

      &:hover {
        background: $orange;
      }
    }

    img {
      border-radius: 50%;
    }
    svg {
      fill: $white;
    }
  }
}
</style>
