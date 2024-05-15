<template>
  <v-app>
    <LazyPopup
      v-if="postCancelModal"
      :is-open="postCancelModal"
      title="Вы уверены что хотите перейти?"
      content="После нажатия кнопки «Да» вас перекинет на страницу и внесенные изменения не сохранятся"
    >
      <button class="btn azure" @click="redirect">Да</button>
      <button class="btn azure" @click="postCancelModal = false">Нет</button>
    </LazyPopup>

    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
    </Navbar>

    <!-- main -->
    <div class="page-container">
      <el-row type="flex" justify="space-between">
        <Main>
          <FormHeader :title="title" :title-show="isEditing" />

          <el-form ref="form" :model="form" enctype="multipart/form-data">
            <div class="edit" v-show="isEditing">
              <div class="t-row i3">
                <country-select>
                  <template #title>
                    <p>Где произошло?</p>
                    <h4>{{ form.fromCity.label }}</h4>
                  </template>
                  <template #country>
                    <div class="select-wrap">
                      <p>Страна</p>
                      <el-select
                        v-model="form.fromCountry"
                        placeholder="Выбрать"
                      >
                        <el-option
                          v-for="item in country"
                          :key="item.value"
                          :label="item.label"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </template>
                  <template #city>
                    <div class="select-wrap">
                      <p>Город</p>
                      <el-select v-model="form.fromCity" placeholder="Выбрать">
                        <el-option
                          v-for="item in city"
                          :key="item.value"
                          :label="item.label"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </template>
                </country-select>
                <DateTimeSelect
                  title="Когда произошло?"
                  :time.sync="form.time"
                  :date.sync="form.date"
                  :update-time.sync="form.time"
                  :update-date.sync="form.date"
                  :finds="true"
                />
              </div>
              <div class="t-area">
                <input
                  v-model.trim="form.title"
                  ref="title"
                  type="text"
                  class="text-input"
                  placeholder="Короткий заголовок произошедшего..."
                  maxlength="35"
                />
              </div>
              <div class="t-area">
                <textarea
                  v-model.trim="form.text"
                  ref="text"
                  class="textarea"
                  placeholder="Детали прозошедшего..."
                  maxlength="2500"
                ></textarea>
                <el-upload
                  class="upload-demo"
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
            </div>

            <div class="preview" v-show="!isEditing">
              <div class="preview-title">
                <h2>{{ form.title }}</h2>
              </div>
              <div class="t-area no-select">
                <div class="preview-textarea">
                  <pre>{{ form.text }}</pre>
                </div>
                <el-upload
                  class="upload-demo"
                  ref="upload-preview"
                  action="#"
                  :limit="5"
                  :file-list="form.fileList"
                ></el-upload>
              </div>
              <div class="t-row i3 no-select">
                <country-select>
                  <template #title>
                    <p>Где произошло?</p>
                    <h4>{{ form.fromCity.label }}</h4>
                  </template>
                  <template #country>
                    <div class="select-wrap">
                      <p>Страна</p>
                      <el-select
                        v-model="form.fromCountry"
                        placeholder="Выбрать"
                      >
                        <el-option
                          v-for="item in country"
                          :key="item.value"
                          :label="item.label"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </template>
                  <template #city>
                    <div class="select-wrap">
                      <p>Город</p>
                      <el-select v-model="form.fromCity" placeholder="Выбрать">
                        <el-option
                          v-for="item in city"
                          :key="item.value"
                          :label="item.label"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </template>
                </country-select>
                <DateTimeSelect
                  title="Когда произошло?"
                  :time.sync="form.time"
                  :date.sync="form.date"
                  :update-time.sync="form.time"
                  :update-date.sync="form.date"
                  :finds="true"
                />
              </div>
            </div>

            <div class="t-btn-row" v-show="isEditing">
              <el-button class="btn azure" @click="changeMode">
                Предварительный осмотр
              </el-button>
            </div>

            <div class="preview-btns" v-if="!isEditing">
              <el-button class="btn cancel" @click="postCancelModal = true">
                Отменить
              </el-button>
              <el-button class="btn edit" @click="enableEditing">
                Редактировать
              </el-button>
              <el-button
                class="btn send"
                type="primary"
                :loading="loading"
                @click="onSubmit"
              >
                Отправить
              </el-button>
            </div>
          </el-form>
        </Main>

        <Aside>
          <AsideElements />
        </Aside>
      </el-row>
    </div>

    <Footer />
  </v-app>
</template>

<script>
import { json, check } from '@/content/create-categories'
import fileSvg from '@/assets/icons/file.svg?inline'
import questionSvg from '@/assets/icons/question.svg?inline'
import timerSvg from '@/assets/icons/timer.svg?inline'
import eyeSvg from '@/assets/icons/eye.svg?inline'
import auctionSvg from '@/assets/icons/auction.svg?inline'
import repeatSvg from '@/assets/icons/repeat.svg?inline'
import shareSvg from '@/assets/icons/share.svg?inline'
import vClickOutside from 'v-click-outside'
import moment from 'moment'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  head() {
    return {
      title: 'Lavzee | ' + this.title
    }
  },
  middleware: ['user-auth'],
  async asyncData({ store }) {
    let userId = await store.getters['auth/userId']

    return { userId }
  },
  data() {
    return {
      title: 'Поделиться опытом',
      isEditing: true,
      loading: false,
      postCancelModal: false,
      form: {
        fromCountry: { value: 'Uzbekistan', label: 'Узбекистан' },
        fromCity: { value: 'Tashkent', label: 'Ташкент' },
        time: '12:00',
        date: moment().format('YYYY[-]MM[-]DD'),
        title: '',
        text: '',
        fileList: []
      },
      ...json
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            userId: this.userId,
            title: this.form.title,
            text: this.form.text,
            fromCountry: this.form.fromCountry,
            fromCity: this.form.fromCity,
            time: this.form.time,
            date: this.form.date,
            fileList: this.form.fileList,
            dateOfCreation: moment()
          }

          try {
            await this.$store.dispatch('experience/createExp', formData)
            this.form.fileList = []
            this.$refs.upload.clearFiles()
            this.redirect()
            this.$message.success({
              showClose: true,
              message: 'Вы успешно поделились опытом!'
            })
          } catch (e) {}
        } else {
          this.$message.warning({
            showClose: true,
            message: 'Форма не валидна!'
          })
        }
      })
    },
    redirect() {
      this.$router.push('/')
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
    enableEditing() {
      this.isEditing = true
    },
    changeMode() {
      if (this.$refs.title.value === 0 || this.$refs.text.value === 0)
        return this.$message.info({
          showClose: true,
          message: 'Впишите название и детали!'
        })
      else if (
        this.$refs.title.value.length <= 6 ||
        this.$refs.text.value.length <= 6
      )
        return this.$message.info({
          showClose: true,
          message: 'Впишите название и детали подробно!'
        })
      else {
        this.form.title = this.$refs.title.value
        this.form.text = this.$refs.text.value
        this.isEditing = false
      }
    },
    ...check
  },
  components: {
    fileSvg,
    questionSvg,
    timerSvg,
    eyeSvg,
    auctionSvg,
    repeatSvg,
    shareSvg
  }
}
</script>

<style lang="scss" scoped>
pre {
  line-height: 135%;
  font-weight: 400;
  font-size: 1.4rem;
  white-space: pre-line;
  font-family: 'Roboto', sans-serif;
}
</style>
