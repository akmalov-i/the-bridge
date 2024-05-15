<template>
  <v-app>
    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
    </Navbar>

    <LazyPopup
      v-if="postCancelModal"
      :is-open="postCancelModal"
      title="Вы уверены что хотите перейти?"
      content="После нажатия кнопки «Да» вас перекинет на страницу и внесенные изменения не сохранятся"
    >
      <button class="btn azure" @click="redirect">Да</button>
      <button class="btn azure" @click="postCancelModal = false">Нет</button>
    </LazyPopup>

    <div class="page-container">
      <el-row type="flex" justify="space-between">
        <Main>
          <FormHeader :title="title" :title-show="isEditing" />

          <el-form ref="form" :model="form">
            <div class="edit" v-show="isEditing">
              <div class="t-row i5">
                <div class="select-wrap">
                  <p>Раздел объявлений</p>
                  <el-select v-model="form.adsSection" placeholder="Выбрать">
                    <el-option
                      v-for="item in adsSection"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="select-wrap">
                  <p>Основная категория</p>
                  <el-select
                    v-model="form.mainCategory"
                    placeholder="Выбрать"
                    @change="changeSubcategory"
                  >
                    <el-option
                      v-for="item in mainCategoryContract"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Подкатегория</p>
                  <el-cascader
                    v-model="form.subcategory"
                    :key="definition[0].value"
                    :options="definition"
                  />
                </div>
              </div>
              <Numbers :update-numbers.sync="form.numbers" />
              <div class="t-row i4">
                <div class="select-wrap" v-show="isTransportOff">
                  <p>Страна</p>
                  <el-select v-model="form.country" placeholder="Выбрать">
                    <el-option
                      v-for="item in country"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="select-wrap" v-show="isTransportOff">
                  <p>Город</p>
                  <el-select v-model="form.city" placeholder="Выбрать">
                    <el-option
                      v-for="item in city"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="select-wrap" v-if="!isTransportOff">
                  <country-select>
                    <template #title>
                      <p>Откуда?</p>
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
                        <el-select
                          v-model="form.fromCity"
                          placeholder="Выбрать"
                        >
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
                </div>

                <div class="select-wrap" v-if="!isTransportOff">
                  <country-select>
                    <template #title>
                      <p>Куда?</p>
                      <h4>{{ form.toCity.label }}</h4>
                    </template>
                    <template #country>
                      <div class="select-wrap">
                        <p>Страна</p>
                        <el-select
                          v-model="form.toCountry"
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
                        <el-select v-model="form.toCity" placeholder="Выбрать">
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
                </div>

                <div class="select-wrap">
                  <p>Доставка</p>
                  <el-select v-model="form.delivery" placeholder="Выбрать">
                    <el-option
                      v-for="item in delivery"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="t-row i3">
                <div class="select-wrap">
                  <p>Сроки</p>
                  <el-select v-model="form.deadlines" placeholder="Выбрать">
                    <el-option
                      v-for="item in deadlines"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap" v-show="isDeadline">
                  <DateTimeSelect
                    title="Дата/время"
                    :time="form.time"
                    :date="form.date"
                    :update-time.sync="form.time"
                    :update-date.sync="form.date"
                  />
                </div>
                <div class="select-wrap" v-show="!isDeadline">
                  <DateTimeSelect
                    title="Срок от"
                    :time="form.periodTimeStart"
                    :date="form.periodDateStart"
                    :update-time.sync="form.periodTimeStart"
                    :update-date.sync="form.periodDateStart"
                  />
                </div>
                <div class="select-wrap" v-show="!isDeadline">
                  <DateTimeSelect
                    title="Срок до"
                    :period="true"
                    :minimal="form.periodDateStart"
                    :time="form.periodTimeEnd"
                    :date="form.periodDateEnd"
                    :update-time.sync="form.periodTimeEnd"
                    :update-date.sync="form.periodDateEnd"
                  />
                </div>
              </div>
              <div class="t-area">
                <input
                  ref="title"
                  type="text"
                  class="text-input"
                  placeholder="Впишите название проекта..."
                  maxlength="45"
                />
              </div>
              <div class="t-area">
                <textarea
                  ref="text"
                  class="textarea"
                  placeholder="Впишите детали проекта..."
                  maxlength="2500"
                />
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
              <div class="t-row i2">
                <div class="select-wrap">
                  <p>Определение стоимости</p>
                  <el-select
                    v-model="form.determiningTheCostFixed"
                    placeholder="Выбрать"
                  >
                    <el-option
                      v-for="item in determiningTheCostFixed"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Условие оплаты</p>
                  <el-select v-model="form.paymentTerms" placeholder="Выбрать">
                    <el-option
                      v-for="item in paymentTerms"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <BudgetSelect title="Бюджет" :update-budget.sync="form.budget">
                  <el-select
                    class="right"
                    v-model="form.currency"
                    placeholder="Выбрать"
                  >
                    <el-option
                      v-for="item in currency"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </BudgetSelect>
              </div>
            </div>

            <div class="preview" v-if="!isEditing">
              <div class="preview-title">
                <h2>{{ form.title }}</h2>
                <div class="things">
                  <div class="function">
                    <div class="icon">
                      <timerSvg />
                    </div>
                    <div class="text">
                      <p>5 дней</p>
                    </div>
                  </div>
                  <div class="function">
                    <div class="icon">
                      <eyeSvg />
                    </div>
                    <div class="text">
                      <p>0</p>
                    </div>
                  </div>
                  <div class="function">
                    <div class="icon">
                      <auctionSvg />
                    </div>
                    <div class="text">
                      <p>0</p>
                    </div>
                  </div>
                  <div class="function">
                    <div class="icon">
                      <repeatSvg />
                    </div>
                  </div>
                  <div class="function">
                    <div class="icon">
                      <shareSvg />
                    </div>
                  </div>
                </div>
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
                ></el-upload>
              </div>
              <div class="t-row no-select i5">
                <div class="select-wrap">
                  <p>Раздел объявлений</p>
                  <el-select v-model="form.adsSection" placeholder="Выбрать">
                    <el-option
                      v-for="item in adsSection"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Основная категория</p>
                  <el-select v-model="form.mainCategory" placeholder="Выбрать">
                    <el-option
                      v-for="item in mainCategoryContract"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Подкатегория</p>
                  <el-cascader
                    v-model="form.subcategory"
                    :key="definition[0].value"
                    :options="definition"
                  />
                </div>
              </div>
              <div class="t-row" v-for="(item, idx) in form.numbers" :key="idx">
                <div class="preview-number">
                  {{ item.value }}
                </div>
              </div>
              <div class="t-row no-select i4">
                <div class="select-wrap" v-show="isTransportOff">
                  <p>Страна</p>
                  <el-select v-model="form.country" placeholder="Выбрать">
                    <el-option
                      v-for="item in country"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="select-wrap" v-show="isTransportOff">
                  <p>Город</p>
                  <el-select v-model="form.city" placeholder="Выбрать">
                    <el-option
                      v-for="item in city"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="select-wrap" v-if="!isTransportOff">
                  <country-select>
                    <template #title>
                      <p>Откуда?</p>
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
                        <el-select
                          v-model="form.fromCity"
                          placeholder="Выбрать"
                        >
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
                </div>

                <div class="select-wrap" v-if="!isTransportOff">
                  <country-select>
                    <template #title>
                      <p>Куда?</p>
                      <h4>{{ form.toCity.label }}</h4>
                    </template>
                    <template #country>
                      <div class="select-wrap">
                        <p>Страна</p>
                        <el-select
                          v-model="form.toCountry"
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
                        <el-select v-model="form.toCity" placeholder="Выбрать">
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
                </div>

                <div class="select-wrap">
                  <p>Доставка</p>
                  <el-select v-model="form.delivery" placeholder="Выбрать">
                    <el-option
                      v-for="item in delivery"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="t-row no-select i3">
                <div class="select-wrap">
                  <p>Сроки</p>
                  <el-select v-model="form.deadlines" placeholder="Выбрать">
                    <el-option
                      v-for="item in deadlines"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap" v-show="isDeadline">
                  <DateTimeSelect
                    :time="form.time"
                    :date="form.date"
                    :update-time.sync="form.time"
                    :update-date.sync="form.date"
                  />
                </div>

                <div class="select-wrap" v-show="!isDeadline">
                  <DateTimeSelect
                    title="Срок от"
                    :time="form.periodTimeStart"
                    :date="form.periodDateStart"
                    :update-time.sync="form.periodTimeStart"
                    :update-date.sync="form.periodDateStart"
                  />
                </div>
                <div class="select-wrap" v-show="!isDeadline">
                  <DateTimeSelect
                    title="Срок до"
                    :time="form.periodTimeEnd"
                    :date="form.periodDateEnd"
                    :update-time.sync="form.periodTimeEnd"
                    :update-date.sync="form.periodDateEnd"
                  />
                </div>
              </div>
              <div class="t-row no-select i2">
                <div class="select-wrap">
                  <p>Определение стоимости</p>
                  <el-select
                    v-model="form.determiningTheCostFixed"
                    placeholder="Выбрать"
                  >
                    <el-option
                      v-for="item in determiningTheCostFixed"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Условие оплаты</p>
                  <el-select v-model="form.paymentTerms" placeholder="Выбрать">
                    <el-option
                      v-for="item in paymentTerms"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <BudgetSelect
                  title="Бюджет"
                  :budget-preview="form.budget"
                  :update-budget.sync="form.budget"
                >
                  <el-select
                    class="right"
                    v-model="form.currency"
                    placeholder="Выбрать"
                  >
                    <el-option
                      v-for="item in currency"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </BudgetSelect>
              </div>
            </div>

            <div class="t-btn-row" v-show="isEditing">
              <el-button class="btn azure" @click="changeMode">
                Предварительный осмотр
              </el-button>
            </div>

            <div class="preview-btns" v-if="!isEditing">
              <el-button class="btn cancel" @click="postCancelModal = true"
                >Отменить</el-button
              >
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
          <AsideElements :active="1" />
        </Aside>
      </el-row>
    </div>
    <!-- footer -->
    <Footer />
  </v-app>
</template>

<script>
import vClickOutside from 'v-click-outside'
import { json, check } from '@/content/create-categories'
import fileSvg from '@/assets/icons/file.svg?inline'
import questionSvg from '@/assets/icons/question.svg?inline'
import timerSvg from '@/assets/icons/timer.svg?inline'
import eyeSvg from '@/assets/icons/eye.svg?inline'
import auctionSvg from '@/assets/icons/auction.svg?inline'
import repeatSvg from '@/assets/icons/repeat.svg?inline'
import shareSvg from '@/assets/icons/share.svg?inline'
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
    this.definition = this.transportSub
  },
  data() {
    return {
      title: 'Новый текущий договор',
      isEditing: true,
      isDeadline: true,
      isTransportOff: false,
      loading: false,
      postCancelModal: false,
      definition: [],
      form: {
        numbers: [{ value: '' }],
        title: '',
        text: '',
        adsSection: 'Services',
        mainCategory: 'Transport',
        subcategory: ['Passenger', 'In city'],
        subcategoryLabel: { label: 'Пассажир', children: 'Внутри города' },
        country: 'Uzbekistan',
        city: 'Tashkent',
        fromCountry: { value: 'Uzbekistan', label: 'Узбекистан' },
        fromCity: { value: 'Tashkent', label: 'Ташкент' },
        toCountry: { value: 'Uzbekistan', label: 'Узбекистан' },
        toCity: { value: 'Tashkent', label: 'Ташкент' },
        deadlines: 'Specify a deadline',
        delivery: 'Pickup',
        time: '12:00',
        date: moment().format('YYYY[-]MM[-]DD'),
        periodTimeStart: '12:00',
        periodDateStart: moment().format('YYYY[-]MM[-]DD'),
        periodTimeEnd: '12:00',
        periodDateEnd: moment().add(1, 'days').format('YYYY[-]MM[-]DD'),
        determiningTheCostFixed: 'Fixed mainstay',
        paymentTerms: 'Full payment',
        budget: '',
        currency: 'USD',
        fileList: [] //25
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
            numbers: this.form.numbers,
            title: this.form.title,
            text: this.form.text,
            adsSection: this.form.adsSection,
            mainCategory: this.form.mainCategory,
            subcategory: this.form.subcategory,
            country: this.form.country,
            city: this.form.city,
            fromCountry: this.form.fromCountry,
            fromCity: this.form.fromCity,
            toCountry: this.form.toCountry,
            toCity: this.form.toCity,
            deadlines: this.form.deadlines,
            delivery: this.form.delivery,
            time: this.form.time,
            date: this.form.date,
            periodTimeStart: this.form.periodTimeStart,
            periodDateStart: this.form.periodDateStart,
            periodTimeEnd: this.form.periodTimeEnd,
            periodDateEnd: this.form.periodDateEnd,
            determiningTheCost: this.form.determiningTheCost,
            paymentTerms: this.form.paymentTerms,
            budget: this.form.budget,
            currency: this.form.currency,
            fileList: this.form.fileList,
            dateOfCreation: moment()
          }

          try {
            await this.$store.dispatch('contract/create', formData)
            this.form.fileList = []
            this.$message.success({
              showClose: true,
              message: 'Пост успешно был создан!'
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
    changeFileList(file, fileList) {
      this.form.fileList = fileList
    },
    redirect() {
      this.$router.push('/')
    },
    enableEditing() {
      this.isEditing = true
    },
    changeMode() {
      const MIN_NUM = 7

      if (this.$refs.title.value === 0 || this.$refs.text.value === 0)
        return this.$message.info({
          showClose: true,
          message: 'Впишите название и детали проекта!'
        })
      else if (
        this.$refs.title.value.length <= 6 ||
        this.$refs.text.value.length <= 15
      )
        return this.$message.info({
          showClose: true,
          message: 'Впишите название и детали подробно!'
        })
      else if (this.form.numbers.find((i) => i.value.length < MIN_NUM)) {
        return this.$message.info({
          showClose: true,
          message: `В поле номеров не должно быть меньше ${MIN_NUM - 1} цифр!`
        })
      } else if (
        this.form.budget === null ||
        this.form.budget === '' ||
        this.form.budget.substring(0, 1) == 0
      ) {
        return this.$message.info({
          showClose: true,
          message: 'Необходимо указать бюджет!'
        })
      } else {
        this.form.title = this.$refs.title.value
        this.form.text = this.$refs.text.value
        this.isEditing = false
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
      } else {
        this.form.subcategory = [this.definition[0].value]
      }
    },
    /* changePeriod: {
      handler: function (newval) {
        this.periodDateStart = newval.periodDateStart
        this.periodDateEnd = newval.periodDateEnd
        if (
          moment(this.periodDateStart).unix() >=
          moment(this.periodDateEnd).unix()
        ) {
          this.form.periodDateEnd = moment(this.form.periodDateStart)
            .add(1, 'days')
            .format('YYYY[-]MM[-]DD')
          this.$message.info({showClose: true, message: 'Сроки должны отличаться хотя бы на день!'})
        }
      },
      deep: true
    }, */
    ...check
  },
  watch: {
    'form.deadlines': function (val) {
      val === 'Specify a deadline'
        ? (this.isDeadline = true)
        : (this.isDeadline = false)
    },
    'form.mainCategory': function (val) {
      val === 'Transport'
        ? (this.isTransportOff = false)
        : (this.isTransportOff = true)
    }
  },
  computed: {
    changePeriod: function () {
      const { periodDateStart, periodDateEnd } = this.form
      return {
        periodDateStart,
        periodDateEnd
      }
    }
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
