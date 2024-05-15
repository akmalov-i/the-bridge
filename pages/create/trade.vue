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
          <h1>{{ this.form.mainCategory }}</h1>

          <el-form ref="form" :model="form" enctype="multipart/form-data">
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
                  <p>Цель объявления</p>
                  <el-select v-model="form.purposeOfAds" placeholder="Выбрать">
                    <el-option
                      v-for="item in purposeOfAds"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      @change="changeSubcategory"
                    >
                    </el-option>
                  </el-select>
                </div>
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
              <div class="t-row i4">
                <div class="select-wrap">
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

                <div class="select-wrap">
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

                <div class="select-wrap">
                  <p>Доставка</p>
                  <el-select v-model="form.tradeDelivery" placeholder="Выбрать">
                    <el-option
                      v-for="item in tradeDelivery"
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
                    :time="form.time"
                    :date="form.date"
                    :update-time.sync="form.time"
                    :update-date.sync="form.date"
                  />
                </div>
                <div class="select-wrap" v-show="isDeadline">
                  <p>Срочность</p>
                  <el-select v-model="form.urgently" placeholder="Выбрать">
                    <el-option
                      v-for="item in urgently"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
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
                  maxlength="60"
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
                    v-model="form.determiningTheCost"
                    placeholder="Выбрать"
                  >
                    <el-option
                      v-for="item in determiningTheCost"
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
                  v-show="isFixedMainstay"
                  title="Бюджет"
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
                <div class="select-wrap" v-show="!isFixedMainstay">
                  <p>Условие оплаты</p>
                  <el-select v-model="form.currency" placeholder="Выбрать">
                    <el-option
                      v-for="item in currency"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="t-row i1">
                <div class="select-wrap">
                  <p class="center">
                    Для кого?
                    <el-tooltip placement="top">
                      <template #content>
                        <div class="tooltip">
                          Добавление суб-заказчиков доступно в настойках профиля
                        </div>
                      </template>
                      <questionSvg class="question" />
                    </el-tooltip>
                  </p>
                  <el-select v-model="form.forWhom" placeholder="Выбрать">
                    <el-option
                      v-for="item in forWhom"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Доступ к объявлению</p>
                  <el-select v-model="form.adAccess" placeholder="Выбрать">
                    <el-option
                      v-for="item in adAccess"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Мин.уровень для заявки</p>
                  <el-select
                    v-model="form.minLevelForTheApplication"
                    placeholder="Выбрать"
                  >
                    <el-option
                      v-for="item in minLevelForTheApplication"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
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
                <div class="preview-textarea"><pre>{{ form.text }}</pre></div>
                <el-upload
                  class="upload-demo"
                  ref="upload-preview"
                  action="#"
                  :limit="5"
                  :file-list="form.fileList"
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
                  <p>Цель объявления</p>
                  <el-select v-model="form.purposeOfAds" placeholder="Выбрать">
                    <el-option
                      v-for="item in purposeOfAds"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Категория</p>
                  <el-cascader
                    v-model="form.subcategory"
                    :key="definition[0].value"
                    :options="definition"
                  />
                </div>
              </div>
              <div class="t-row no-select i4">
                <div class="select-wrap">
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

                <div class="select-wrap">
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

                <div class="select-wrap">
                  <p>Доставка</p>
                  <el-select v-model="form.tradeDelivery" placeholder="Выбрать">
                    <el-option
                      v-for="item in tradeDelivery"
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
                <div class="select-wrap" v-show="isDeadline">
                  <p>Срочность</p>
                  <el-select v-model="form.urgently" placeholder="Выбрать">
                    <el-option
                      v-for="item in urgently"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
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
                    v-model="form.determiningTheCost"
                    placeholder="Выбрать"
                  >
                    <el-option
                      v-for="item in determiningTheCost"
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
                  v-show="isFixedMainstay"
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
                <div class="select-wrap" v-show="!isFixedMainstay">
                  <p>Условие оплаты</p>
                  <el-select v-model="form.currency" placeholder="Выбрать">
                    <el-option
                      v-for="item in currency"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="t-row no-select i1">
                <div class="select-wrap">
                  <p class="center">
                    Для кого?
                    <el-tooltip placement="top">
                      <template #content>
                        <div class="tooltip">
                          Добавление суб-заказчиков доступно в настойках профиля
                        </div>
                      </template>
                      <questionSvg class="question" />
                    </el-tooltip>
                  </p>
                  <el-select v-model="form.forWhom" placeholder="Выбрать">
                    <el-option
                      v-for="item in forWhom"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Доступ к объявлению</p>
                  <el-select v-model="form.adAccess" placeholder="Выбрать">
                    <el-option
                      v-for="item in adAccess"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Мин.уровень для заявки</p>
                  <el-select
                    v-model="form.minLevelForTheApplication"
                    placeholder="Выбрать"
                  >
                    <el-option
                      v-for="item in minLevelForTheApplication"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
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
          <AsideElements :active="2" />
        </Aside>
      </el-row>
    </div>

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
  validate({ store }) {
    return Boolean(store.getters['auth/isAuthenticated'])
  },
  async fetch() {
    let userId = await this.$store.getters['auth/userId']
    let user = await this.$store.dispatch('user/fetchByIdMinimal', userId)
    this.forWhom.push(...user[0].subsNP, ...user[0].subsLE)

    for (let i = 0; i < this.forWhom.length; i++) {
      this.forWhom[i].label = this.forWhom[i].name
      this.forWhom[i].value = this.forWhom[i].telephone
      delete this.forWhom[i].name
      delete this.forWhom[i].telephone
    }
    let me = { label: 'Для себя', value: '' }
    this.forWhom.unshift(me)
    this.form.author = userId
  },
  mounted() {
    const { message } = this.$route.query

    switch (message) {
      case 'purchase':
        this.form.purposeOfAds = 'Purchase'
        break
      case 'sale':
        this.form.purposeOfAds = 'Sale'
        break
    }
  },
  created() {
    this.definition = this.trades
  },
  data() {
    return {
      title: 'Новое объявление',
      isEditing: true,
      isDeadline: true,
      isFixedMainstay: true,
      loading: false,
      definition: [],
      forWhom: [],
      postCancelModal: false,
      form: {
        adsSection: 'Auction',
        purposeOfAds: 'Purchase',
        subcategory: [],
        subcategoryLabel: {},
        country: 'Uzbekistan',
        city: 'Tashkent',
        tradeDelivery: 'Not required',
        deadlines: 'Specify a deadline',
        urgently: 'Absent',
        time: '12:00',
        date: moment().format('YYYY[-]MM[-]DD'),
        periodTimeStart: '12:00',
        periodDateStart: moment().format('YYYY[-]MM[-]DD'),
        periodTimeEnd: '12:00',
        periodDateEnd: moment().add(1, 'days').format('YYYY[-]MM[-]DD'),
        title: '',
        text: '',
        determiningTheCost: 'Fixed mainstay',
        paymentTerms: 'Full payment',
        budget: '',
        forWhom: '',
        adAccess: 'All',
        minLevelForTheApplication: 'Novice users',
        currency: 'USD',
        author: '',
        sub: { label: 'Для себя', value: '' },
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
            title: this.form.title,
            text: this.form.text,
            adsSection: this.form.adsSection,
            purposeOfAds: this.form.purposeOfAds,
            mainCategory: this.form.subcategory[0] || '',
            subcategory: this.form.subcategory[1] || [''],
            subcategoryLabel: this.form.subcategoryLabel,
            country: this.form.country,
            city: this.form.city,
            tradeDelivery: this.form.tradeDelivery,
            deadlines: this.form.deadlines,
            urgently: this.form.urgently,
            time: this.form.time,
            date: this.form.date,
            periodTimeStart: this.form.periodTimeStart,
            periodDateStart: this.form.periodDateStart,
            periodTimeEnd: this.form.periodTimeEnd,
            periodDateEnd: this.form.periodDateEnd,
            determiningTheCost: this.form.determiningTheCost,
            paymentTerms: this.form.paymentTerms,
            budget: this.form.budget,
            forWhom: this.form.sub,
            adAccess: this.form.adAccess,
            minLevelForTheApplication: this.form.minLevelForTheApplication,
            currency: this.form.currency,
            fileList: this.form.fileList,
            author: this.form.author,
            dateOfCreation: moment()
          }

          try {
            await this.$store.dispatch('trade/createTrade', formData)
            this.form.fileList = []
            this.$router.push('/user/services?message=created')
          } catch (e) {}
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
      if (this.$refs.title.value === 0 || this.$refs.text.value === 0)
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
        this.$refs.text.value.length <= 15
      )
        return this.$message.info({
          showClose: true,
          message: 'Впишите название и детали подробно!'
        })
      else if (
        this.isFixedMainstay &&
        (this.form.budget === null ||
          this.form.budget === '' ||
          this.form.budget.substring(0, 1) == 0)
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
  watch: {
    'form.deadlines': function (val) {
      val === 'Specify a deadline'
        ? (this.isDeadline = true)
        : (this.isDeadline = false)
    },
    'form.adsSection': function (val) {
      if (val === 'Services') {
        this.$router.push('/create/service')
      }
    },
    'form.forWhom': function (val) {
      const label = this.forWhom.find((i) => i.value === val)
      this.form.sub = label
    },
    'form.determiningTheCost': function (val) {
      val === 'Fixed mainstay'
        ? (this.isFixedMainstay = true)
        : (this.isFixedMainstay = false)
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
.question {
  cursor: pointer;
  fill: transparent;
  stroke: #7d7d7d;
  margin-left: 0.6rem;
}
pre {
  line-height: 135%;
  font-weight: 400;
  font-size: 1.4rem;
  white-space: pre-line;
  font-family: 'Roboto', sans-serif;
}
</style>