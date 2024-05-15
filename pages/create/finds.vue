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
                <div class="select-wrap">
                  <p>Основная категория</p>
                  <el-select v-model="form.finds" placeholder="Выбрать">
                    <el-option
                      v-for="item in finds"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <DateTimeSelect
                  :title="
                    form.finds === 'Find' ? 'Когда нашли?' : 'Когда потеряли?'
                  "
                  :time.sync="form.time"
                  :date.sync="form.date"
                  :update-time.sync="form.time"
                  :update-date.sync="form.date"
                  :finds="true"
                />
                <div class="select-wrap">
                  <p>Категория</p>
                  <el-cascader
                    v-model="form.subcategory"
                    :key="definition[0].value"
                    :options="definition"
                    @change="cascaderHandle"
                  />
                </div>
              </div>
              <div class="t-row i2">
                <country-select>
                  <template #title>
                    <p>Где?</p>
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
                <input
                  type="text"
                  ref="where"
                  class="text-input"
                  placeholder="Где нашли или потеряли..."
                  maxlength="15"
                  v-model.trim="form.where"
                />
              </div>
              <div class="t-area">
                <input
                  v-model.trim="form.title"
                  ref="title"
                  type="text"
                  class="text-input"
                  placeholder="Впишите название найденного или потерянного ..."
                  maxlength="35"
                />
              </div>
              <div class="t-area">
                <textarea
                  v-model.trim="form.text"
                  ref="text"
                  class="textarea"
                  placeholder="Впишите детали..."
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
                  :on-remove="changeFileList"
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
                <div class="preview-textarea"><pre>{{ form.text }}</pre></div>
                <el-upload
                  class="upload-demo"
                  ref="upload-preview"
                  action="#"
                  :limit="5"
                  :file-list="form.fileList"
                ></el-upload>
              </div>
              <div class="t-row i3 no-select">
                <div class="select-wrap">
                  <p>Основная категория</p>
                  <el-select v-model="form.finds" placeholder="Выбрать">
                    <el-option
                      v-for="item in finds"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <DateTimeSelect
                  :title="
                    form.finds === 'Find' ? 'Когда нашли?' : 'Когда потеряли?'
                  "
                  :time.sync="form.time"
                  :date.sync="form.date"
                  :update-time.sync="form.time"
                  :update-date.sync="form.date"
                  :finds="true"
                />
                <div class="select-wrap">
                  <p>Категория</p>
                  <el-cascader
                    v-model="form.subcategory"
                    :key="definition[0].value"
                    :options="definition"
                  />
                </div>
              </div>
              <div class="t-row i2 no-select">
                <country-select>
                  <template #title>
                    <p>Где?</p>
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
                <input
                  type="text"
                  ref="where"
                  class="text-input preview-gray"
                  placeholder="Где нашли или потеряли..."
                  maxlength="15"
                  v-model.trim="form.where"
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
  created() {
    this.definition = this.trades
  },
  data() {
    return {
      title: 'Бюро находок',
      isEditing: true,
      loading: false,
      definition: [],
      postCancelModal: false,
      form: {
        finds: 'Find',
        subcategory: [],
        subcategoryLabel: {},
        country: 'Uzbekistan',
        city: 'Tashkent',
        fromCountry: { value: 'Uzbekistan', label: 'Узбекистан' },
        fromCity: { value: 'Tashkent', label: 'Ташкент' },
        time: '12:00',
        date: moment().format('YYYY[-]MM[-]DD'),
        title: '',
        text: '',
        where: '',
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
            finds: this.form.finds,
            mainCategory: this.form.subcategory[0] || '',
            subcategory: this.form.subcategory[1] || [''],
            subcategoryLabel: this.form.subcategoryLabel,
            title: this.form.title,
            text: this.form.text,
            country: this.form.country,
            city: this.form.city,
            fromCountry: this.form.fromCountry,
            fromCity: this.form.fromCity,
            time: this.form.time,
            date: this.form.date,
            where: this.form.where,
            fileList: this.form.fileList,
            dateOfCreation: moment()
          }

          try {
            await this.$store.dispatch('finds/createFinds', formData)
            this.form.fileList = []
            this.$router.push('/user/services?message=created&mode=finds')
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
    changeFileList(file, fileList) {
      this.form.fileList = fileList
    },
    enableEditing() {
      this.isEditing = true
    },
    changeMode() {
      if (
        this.$refs.title.value === 0 ||
        this.$refs.text.value === 0 ||
        this.$refs.where.value === 0
      )
        return this.$message.info({
          showClose: true,
          message: 'Впишите название и детали проекта!'
        })
      else if (this.form.subcategory.length === 0) {
        return this.$message.info({
          showClose: true,
          message: 'Необходимо выбрать категорию!'
        })
      } else if (
        this.$refs.title.value.length <= 6 ||
        this.$refs.text.value.length <= 6 ||
        this.$refs.where.value.length <= 2
      )
        return this.$message.info({
          showClose: true,
          message: 'Впишите название и детали подробно!'
        })
      else {
        this.form.title = this.$refs.title.value
        this.form.text = this.$refs.text.value
        this.form.where = this.$refs.where.value
        this.isEditing = false
      }
    },
    cascaderHandle(getCheckedNodes) {
      const label = this.definition.find((i) => i.value === getCheckedNodes[0])
      this.form.subcategoryLabel = {
        label: label.label,
        children: ''
      }
      if (label.children) {
        const children = label.children.find(
          (i) => i.value === getCheckedNodes[1]
        )
        this.form.subcategoryLabel = {
          label: label.label,
          children: children.label
        }
      }
    },
    changeSubcategory(getCheckedNodes) {
      const converted = getCheckedNodes
        .replace(/\s(.)/g, function (letter) {
          return letter.toUpperCase()
        })
        .replace(/\s/g, '')
        .replace(/^(.)/, function (letter) {
          return letter.toLowerCase()
        })
        .concat('Sub')

      this.definition = this[converted]

      if (this.definition[0].children) {
        this.form.subcategory = [
          this.definition[0].value,
          this.definition[0].children[0].value
        ]
        this.form.subcategoryLabel = {
          label: this.definition[0].label,
          children: this.definition[0].children[0].label
        }
      } else {
        this.form.subcategory = [this.definition[0].value]
        this.form.subcategoryLabel = {
          label: this.definition[0].label,
          children: ''
        }
      }
    },
    ...check
  },
  watch: {},
  computed: {},
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