<template>
  <v-app>
    <!-- popup -->
    <thePopup
      v-if="showPopup"
      :popupTitle="popupTitle"
      :popupText="popupText"
      :firstButtonText="firstButtonText"
      :secondButtonText="secondButtonText"
      @firstEvent="goTo"
      @secondEvent="popupClose"
    />

    <!-- navigation -->
    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
    </Navbar>

    <!-- main -->
    <div class="page-container">
      <el-row type="flex" justify="space-between">
        <!-- main -->
        <Main>
          <TheSearch :hint="true" />
          <hr />
          <TheBreadcrumb firstText="Главная" :secondText="title" />
          <h1 class="text-blue" v-if="edit">{{ title }}</h1>

          <form @submit.prevent="send" enctype="multipart/form-data">
            <!-- Edit -->
            <div class="edit" v-show="edit">
              <div class="t-row i7">
                <TheSelect
                  type="serviceType"
                  :options="serviceType"
                  :select-title="titles.serviceType"
                  :selected="changeTitle('serviceType')"
                  @select="changeSelect"
                />
                <TheSelect
                  type="graceCategory"
                  :options="graceCategory"
                  :select-title="titles.graceCategory"
                  :selected="changeTitle('graceCategory')"
                  @select="changeSelect"
                />
                <TheSelect
                  type="category"
                  :options="category"
                  :select-title="titles.category"
                  :selected="changeTitle('category')"
                  @select="changeSelect"
                />
              </div>
              <div class="t-row i6">
                <input
                  type="text"
                  class="text-input"
                  placeholder="Впишите для кого/для чего..."
                  maxlength="15"
                  v-model="forWhom"
                />
                <input
                  type="text"
                  class="text-input"
                  placeholder="Впишите имя куратора..."
                  maxlength="15"
                  v-model="curator"
                />
                <input
                  type="text"
                  class="text-input"
                  placeholder="Контактные данные..."
                  maxlength="15"
                  v-model="telephone"
                  @input="acceptNumber('telephone')"
                />
              </div>
              <div class="t-row i5">
                <TheSelect
                  type="country"
                  :options="country"
                  :select-title="titles.country"
                  :selected="changeTitle('country')"
                  @select="changeSelect"
                />
                <TheSelect
                  type="city"
                  :options="city"
                  :select-title="titles.city"
                  :selected="changeTitle('city')"
                  @select="changeSelect"
                />
                <div class="date">
                  <TheSelectDate
                    select-title="Дедлайн"
                    :pick-date="dateFormat()"
                    :pick-time="time"
                    :dateFormat="picker"
                    @open-calendar="calendarVisible = !calendarVisible"
                    @open-time="timeVisible = !timeVisible"
                  />
                  <v-row
                    class="calendar"
                    v-if="calendarVisible"
                    v-click-outside="hideCalendar"
                  >
                    <v-date-picker
                      locale="ru"
                      v-model="picker"
                      :min="today"
                    ></v-date-picker>
                  </v-row>
                  <v-row v-if="timeVisible" v-click-outside="hideTime">
                    <v-time-picker
                      class="time-picker"
                      v-model="time"
                      format="24hr"
                      @click:minute="hideTime()"
                    ></v-time-picker>
                  </v-row>
                </div>
              </div>
              <div class="t-area">
                <input
                  v-model.trim="projectName"
                  type="text"
                  class="text-input"
                  placeholder="Впишите название проекта..."
                  maxlength="35"
                />
              </div>
              <div class="t-area">
                <textarea
                  v-model.trim="projectDescription"
                  class="textarea"
                  placeholder="Впишите детали проекта..."
                  maxlength="2500"
                ></textarea>
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="#"
                  :before-upload="fileCheck"
                  :limit="5"
                  :auto-upload="false"
                >
                  <fileSvg />
                </el-upload>
              </div>
              <div class="t-card i4">
                <TheSelect
                  type="cardType"
                  :options="cardType"
                  :select-title="titles.cardType"
                  :selected="changeTitle('cardType')"
                  @select="changeSelect"
                />
                <input
                  type="text"
                  class="text-input"
                  placeholder="Впишите номер карты..."
                  maxlength="16"
                  v-model="card"
                  pattern="[0-9\s]{13,16}"
                  @input="acceptCard('card')"
                />
                <div class="addiction">
                  <button class="btn add-filter center" @click="enableCard">
                    +
                  </button>
                </div>
              </div>
              <div class="t-card i3" v-if="isCard2">
                <TheSelect
                  type="cardType2"
                  :options="cardType2"
                  :select-title="titles.cardType2"
                  :selected="changeTitle('cardType2')"
                  @select="changeSelect"
                />
                <input
                  type="text"
                  class="text-input"
                  placeholder="Впишите номер карты..."
                  maxlength="16"
                  v-model="card2"
                  pattern="[0-9\s]{13,16}"
                  @input="acceptCard('card2')"
                />
                <div class="addiction">
                  <button class="btn delete center" @click="disableCard">
                    <deleteSvg />
                  </button>
                </div>
              </div>
              <div class="t-card i2" v-if="isCard3">
                <TheSelect
                  type="cardType3"
                  :options="cardType3"
                  :select-title="titles.cardType3"
                  :selected="changeTitle('cardType3')"
                  @select="changeSelect"
                />
                <input
                  type="text"
                  class="text-input"
                  placeholder="Впишите номер карты..."
                  maxlength="16"
                  v-model="card3"
                  pattern="[0-9\s]{13,16}"
                  @input="acceptCard('card')"
                />
                <div class="addiction">
                  <button class="btn delete center" @click="disableCard">
                    <deleteSvg />
                  </button>
                </div>
              </div>
              <div class="t-card i1">
                <TheDoubleSelect
                  type="currency"
                  :options="currency"
                  :select-title="titles.currency"
                  :selected="changeTitle('currency')"
                  :defaultNumber="budget"
                  @select="changeSelect"
                  @input="changeBudget"
                />
              </div>
            </div>

            <!-- Preview -->
            <div class="preview" v-if="!edit">
              <div class="preview-title">
                <h2 v-if="projectName">{{ projectName }}</h2>
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
                  <pre>{{ projectDescription }}</pre>
                </div>
                <el-upload
                  class="upload-demo"
                  ref="upload-preview"
                  action="#"
                  :limit="5"
                  :file-list="fileList"
                ></el-upload>
              </div>
              <div class="t-row no-select i5">
                <TheSelect
                  type="serviceType"
                  :options="serviceType"
                  :select-title="titles.serviceType"
                  :selected="changeTitle('serviceType')"
                  @select="changeSelect"
                />
                <TheSelect
                  type="graceCategory"
                  :options="graceCategory"
                  :select-title="titles.graceCategory"
                  :selected="changeTitle('graceCategory')"
                  @select="changeSelect"
                />
                <TheSelect
                  type="category"
                  :options="category"
                  :select-title="titles.category"
                  :selected="changeTitle('category')"
                  @select="changeSelect"
                />
              </div>
              <div class="t-row no-select i6">
                <input
                  type="text"
                  class="text-input preview-gray"
                  placeholder="Впишите для кого/для чего..."
                  maxlength="15"
                  v-model="forWhom"
                />
                <input
                  type="text"
                  class="text-input preview-gray"
                  placeholder="Впишите имя куратора..."
                  maxlength="15"
                  v-model="curator"
                />
                <input
                  type="text"
                  class="text-input preview-gray"
                  placeholder="Контактные данные..."
                  maxlength="15"
                  v-model="telephone"
                  @input="acceptNumber('telephone')"
                />
              </div>
              <div class="t-row no-select i5">
                <TheSelect
                  type="country"
                  :options="country"
                  :select-title="titles.country"
                  :selected="changeTitle('country')"
                  @select="changeSelect"
                />
                <TheSelect
                  type="city"
                  :options="city"
                  :select-title="titles.city"
                  :selected="changeTitle('city')"
                  @select="changeSelect"
                />
                <div class="date">
                  <TheSelectDate
                    select-title="Дедлайн"
                    :pick-date="dateFormat()"
                    :pick-time="time"
                    :dateFormat="picker"
                    @open-calendar="calendarVisible = !calendarVisible"
                    @open-time="timeVisible = !timeVisible"
                  />
                  <v-row
                    class="calendar"
                    v-if="calendarVisible"
                    v-click-outside="hideCalendar"
                  >
                    <v-date-picker
                      locale="ru"
                      v-model="picker"
                      :min="today"
                    ></v-date-picker>
                  </v-row>
                  <v-row v-if="timeVisible" v-click-outside="hideTime">
                    <v-time-picker
                      class="time-picker"
                      v-model="time"
                      format="24hr"
                      @click:minute="hideTime()"
                    ></v-time-picker>
                  </v-row>
                </div>
              </div>
              <div class="t-row no-select i4">
                <TheSelect
                  type="cardType"
                  :options="cardType"
                  :select-title="titles.cardType"
                  :selected="changeTitle('cardType')"
                  @select="changeSelect"
                />
                <input
                  type="text"
                  class="text-input preview-gray"
                  placeholder="Впишите номер карты..."
                  maxlength="16"
                  v-model="card"
                  pattern="[0-9\s]{13,16}"
                  @input="acceptCard('card')"
                />
              </div>
              <div class="t-row no-select i3" v-if="isCard2">
                <TheSelect
                  type="cardType2"
                  :options="cardType2"
                  :select-title="titles.cardType2"
                  :selected="changeTitle('cardType2')"
                  @select="changeSelect"
                />
                <input
                  type="text"
                  class="text-input preview-gray"
                  placeholder="Впишите номер карты..."
                  maxlength="16"
                  v-model="card2"
                  pattern="[0-9\s]{13,16}"
                  @input="acceptCard('card2')"
                />
              </div>
              <div class="t-row no-select i2" v-if="isCard3">
                <TheSelect
                  type="cardType3"
                  :options="cardType3"
                  :select-title="titles.cardType3"
                  :selected="changeTitle('cardType3')"
                  @select="changeSelect"
                />
                <input
                  type="text"
                  class="text-input preview-gray"
                  placeholder="Впишите номер карты..."
                  maxlength="16"
                  v-model="card3"
                  pattern="[0-9\s]{13,16}"
                  @input="acceptCard('card')"
                />
              </div>
              <div class="t-row no-select i1">
                <TheDoubleSelect
                  type="currency"
                  :options="currency"
                  :select-title="titles.currency"
                  :selected="changeTitle('currency')"
                  :defaultNumber="budget"
                  @select="changeSelect"
                  @input="changeBudget"
                />
              </div>
            </div>

            <div class="t-btn-row" v-show="edit">
              <button class="btn azure" @click="changeEdit">
                Предварительный осмотр
              </button>
            </div>

            <div class="preview-btns" v-if="!edit">
              <button
                class="btn cancel"
                @click="
                  popup(
                    'Вы уверены что хотите отменить?',
                    'После нажатия кнопки «Да» вас перекинет на главную страницу',
                    'Да',
                    'Нет',
                    '/'
                  )
                "
              >
                Отменить
              </button>
              <button class="btn edit" @click="edit = true">
                Редактировать
              </button>
              <button class="btn send" type="submit" @click="send">
                Отправить
              </button>
            </div>
          </form>
        </Main>

        <!-- aside -->
        <Aside>
          <h2 class="text-center">Полезные плюшки</h2>
          <TheTabs :beforeEach="true" @popupProps="popupProps" />
          <h2 class="text-center mt3">Дополнительные функции</h2>
          <TheNewTrans
            name="Текущий договор"
            link="/createContract"
            tooltip="Цифровой договор, снижающий риски игроков. Отклонение договора при значительных рисках."
          />
          <TheNewTrans
            name="Новое объявление"
            link="/createService"
            tooltip="Оказание услуг профессионалами, которые умеют держать слово."
          />
          <TheNewTrans
            name="Новый проект"
            link="/"
            tooltip="Создание команды профессионалов для решения комплексных задач и организации мероприятий"
          />
        </Aside>
      </el-row>
    </div>

    <!-- footer -->
    <Footer />
  </v-app>
</template>

<script>
import fileSvg from '@/assets/icons/file.svg?inline'
import questionSvg from '@/assets/icons/question.svg?inline'
import timerSvg from '@/assets/icons/timer.svg?inline'
import eyeSvg from '@/assets/icons/eye.svg?inline'
import auctionSvg from '@/assets/icons/auction.svg?inline'
import repeatSvg from '@/assets/icons/repeat.svg?inline'
import shareSvg from '@/assets/icons/share.svg?inline'
import deleteSvg from '@/assets/icons/delete.svg?inline'
import { varriables, modules } from '@/custom/501'
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  head() {
    return {
      title: 'Lavzee | ' + this.title
    }
  },
  data() {
    return {
      title: '501(С)(3)',
      ...varriables
    }
  },
  methods: {
    ...modules
  },
  watch: {
    picker: function (val) {
      if (val) {
        this.hideCalendar()
      }
    },
    budget: function (val) {
      if (val) this.setBudget(val)
    }
  },
  computed: {
    picker2: function () {
      return this.picker
    },
    checkCategory: function () {
      return this.category
    },
    currentCountry: function () {
      return this.settedCountry
    },
    currentCity: function () {
      return this.city[0].label
    },
    currentCountry2: function () {
      return this.settedCountry2
    },
    currentCity2: function () {
      return this.city[0].label
    },
    subCategoryByClick: function () {
      return this[this.subCategory]
    }
  },
  components: {
    fileSvg,
    questionSvg,
    timerSvg,
    eyeSvg,
    auctionSvg,
    repeatSvg,
    shareSvg,
    deleteSvg
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
