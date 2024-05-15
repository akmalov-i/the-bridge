<template>
  <div class="offer" :class="{ focus: focus }">
    <div class="top">
      <div class="user">
        <div class="content">
          <nuxt-link
            target="_blank"
            :to="`/user/${user._id}`"
            class="start pointer"
          >
            <!-- if hasn't avatar -->
            <div class="avatar">
              <div class="avatar-img">
                <nuxt-img
                  :src="'avatars' + user.imageUrl"
                  preset="offer"
                  v-if="user.imageUrl"
                />
                <avatarSvg v-else />
              </div>
              <div class="level">3</div>
            </div>

            <div class="user-name">
              <p>{{ user.name }} {{ user.surname }}</p>
              <el-rate
                v-model="stars"
                disabled
                disabled-void-color="#7d7d7d75"
                class="stars"
                :max="5"
                :colors="['#1374F6', '#1374F6', '#1374F6']"
              >
              </el-rate>
            </div>
          </nuxt-link>

          <div class="budget">
            <div class="new" :class="{ hidden: !dataGetter.new }">New</div>
            <p>
              <span class="currency">{{
                dataGetter.details[currentSlide].currency
              }}</span>
              <span class="price">{{
                new Intl.NumberFormat('en-US', { style: 'decimal' }).format(
                  dataGetter.details[currentSlide].budget
                )
              }}</span>
            </p>
          </div>
          <el-button
            type="primary"
            class="btn light"
            @click="acceptTheOffer"
            :loading="loading"
            :class="{
              disable: dataGetter.details[currentSlide].author
            }"
          >
            Нанять
          </el-button>
          <div class="options">
            <div class="option-button" @click="isSortOpen = true">
              <optionsSvg />
            </div>
            <div
              class="sort-drop"
              v-if="isSortOpen"
              v-click-outside="sortClose"
            >
              <ul class="result-term">
                <li v-show="!isCounterOfferOpen" @click="tradeOpened()">
                  <transactionSvg />Торговаться
                </li>
                <li v-show="isCounterOfferOpen" @click="tradeClosed()">
                  <transactionSvg />Закрыть
                </li>
                <li @click="reject" v-if="dataGetter.rejected === false">
                  <cancelSvg />Отклонить
                </li>
                <li @click="recover" v-if="dataGetter.rejected === true">
                  <cancelSvg />Восстановить
                </li>
                <li><messageSvg />Сообщения</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="time mb1">
          <span>
            {{
              $moment(dataGetter.dateOfCreation)
                .locale('ru')
                .format('D MMMM, HH:mm')
            }}
          </span>
        </div>
      </div>
    </div>
    <el-form
      ref="form"
      class="bottom"
      :model="form"
      @submit.native.prevent="onSubmit"
    >
      <div>
        <div class="carousel" v-show="isCounterOfferOpen">
          <div
            class="carousel-item"
            v-for="(item, idx) in dataGetter.details"
            :key="idx"
          >
            <div
              :style="'transform: translateX(-' + slideTransition + 'px)'"
              class="step"
              :class="{ 'is-active': currentSlide == idx }"
              @click="selectStep(idx)"
            >
              <nuxt-img
                :src="'avatars' + user.imageUrl"
                preset="comments"
                v-if="user.imageUrl && !dataGetter.details[idx].author"
              />
              <nuxt-img
                :src="'avatars' + author[0].imageUrl"
                preset="comments"
                v-else-if="author[0].imageUrl && dataGetter.details[idx].author"
              />
              <div v-else class="avatarSvg">
                <avatarSvg />
              </div>
              <p>Шаг №{{ idx + 1 }}</p>
            </div>
          </div>
        </div>
        <div
          class="carousel-details"
          v-show="dataGetter.details[currentSlide].text"
        >
          <b
            >Детали
            <span v-if="dataGetter.details[currentSlide].author">
              {{ author[0].name }}
            </span>
            <span v-else>
              {{ user.name }}
            </span>
            №{{ currentSlide + 1 }}:</b
          >
          -
          {{ dataGetter.details[currentSlide].text }}
        </div>
      </div>

      <textarea
        v-if="dataGetter.details.length <= 4"
        v-show="isCounterOfferOpen"
        ref="textarea"
        maxlength="450"
        placeholder="Добавить детали..."
        v-model="form.text"
        class="bottom-area"
      ></textarea>

      <div
        class="buttons"
        v-if="dataGetter.details.length <= 4"
        v-show="isCounterOfferOpen"
      >
        <div class="select double-select-wrap">
          <BudgetSelect
            class="offer-budget-select"
            :budget="form.budget"
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
        <el-button
          type="primary"
          native-type="submit"
          class="btn primary"
          round
          :loading="loading"
          :class="{
            disable: dataGetter.details[dataGetter.details.length - 1].author
          }"
        >
          Контр предложение
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { json } from '@/content/create-categories'
import avatarSvg from '@/assets/icons/avatar.svg?inline'
import optionsSvg from '@/assets/icons/options.svg?inline'
import transactionSvg from '@/assets/icons/transaction.svg?inline'
import messageSvg from '@/assets/icons/message.svg?inline'
import cancelSvg from '@/assets/icons/cancel.svg?inline'
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import vClickOutside from 'v-click-outside'
import moment from 'moment'

export default {
  emits: ['focusOn', 'focusOff', 'created', 'accept', 'reject', 'recover'],
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    author: {
      type: Array,
      required: true
    }
  },
  async fetch() {
    let user = await this.$store.dispatch(
      'user/fetchByIdMinimal',
      this.data.userId
    )
    let statusExecutor = user[0].rating
    this.stars = statusExecutor.stars
    this.user = user[0]
  },
  created() {
    if (this.data.details) {
      this.currentSlide = this.data.details.length - 1
      this.selectStep(this.currentSlide)
    }
    this.dataGetter = this.data
  },
  data() {
    return {
      user: { imgUrl: '' },
      posts: null,
      stars: 0,
      dataGetter: null,
      focus: false,
      loading: false,
      isSortOpen: false,
      areOptionsVisible: false,
      isCounterOfferOpen: false,
      number: null,
      currentSlide: 0,
      slideTransition: 0,
      form: {
        budget: null,
        currency: 'USD',
        text: ''
      },
      ...json
    }
  },
  methods: {
    onSubmit() {
      if (this.dataGetter.details[this.dataGetter.details.length - 1].author) {
        return this.$message.warning({
          showClose: true,
          message: 'Дождитесь ответа исполнителя!'
        })
      }
      if (this.form.text.length < 1) {
        return this.$message.warning({
          showClose: true,
          message: 'Поле деталей не может быть пустым!'
        })
      }
      if (!this.form.budget) {
        return this.$message.warning({
          showClose: true,
          message: 'Поле бюджет не может быть пустым!'
        })
      }
      if (this.form.budget.substring(0, 1) == 0) {
        return this.$message.warning({
          showClose: true,
          message: 'Слишком маленький бюджет'
        })
      }
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          const formData = {
            id: this.dataGetter._id,
            postId: this.dataGetter.postId,
            budget: this.form.budget,
            currency: this.form.currency,
            text: this.form.text,
            dateOfCreation: moment(),
            newOffer: false,
            newOfferByAuthor: true,
            author: true
          }

          try {
            const newOffer = await this.$store.dispatch(
              'offer/setCounter',
              formData
            )
            this.form = { budget: null, currency: 'USD', text: '' }
            this.loading = false
            this.dataGetter = newOffer
            this.currentSlide = this.dataGetter.details.length - 1
            this.selectStep(this.currentSlide)
            this.$message.success({
              showClose: true,
              message: 'Предложение отправлено!'
            })
          } catch (e) {}
        }
      })
    },
    acceptTheOffer() {
      const formData = {
        budget: this.dataGetter.details[this.currentSlide].budget,
        currency: this.dataGetter.details[this.currentSlide].currency,
        text: this.dataGetter.details[this.currentSlide].text,
        step: this.currentSlide + 1,
        id: this.dataGetter.postId,
        userId: this.user._id,
        dateOfCreation: moment()
      }
      this.$emit('accept', formData)
    },
    reject() {
      this.sortClose()
      this.$emit('reject', this.data._id)
    },
    recover() {
      this.sortClose()
      this.$emit('recover', this.data._id)
    },
    sortClose() {
      this.isSortOpen = false
    },
    selectOption(option, type) {
      this.$emit('select', option, type)
      this.hideSelect()
    },
    hideSelect() {
      this.areOptionsVisible = false
    },
    tradeOpened() {
      this.sortClose()
      this.$emit('focusOn')
      this.focus = true
      this.isCounterOfferOpen = true
    },
    tradeClosed() {
      this.sortClose()
      this.$emit('focusOff')
      this.focus = false
      this.isCounterOfferOpen = false
    },
    selectStep(idx) {
      this.currentSlide = idx
      this.slideTransition = this.currentSlide * 70
    }
  },
  components: {
    avatarSvg,
    optionsSvg,
    transactionSvg,
    messageSvg,
    cancelSvg,
    ArrowSvg
  }
}
</script>

<style lang="scss" scoped>
.offer {
  position: relative;
  margin-bottom: 0.4rem;
  background: $white;
  border-radius: 4px;
  padding: 2rem 1.6rem 0.8rem 1.6rem;
  opacity: 1;
  transition: 0.4s;

  &-budget-select {
    height: 54px;
    background: $light-blue;
    border: none;
  }

  &.focus {
    -webkit-box-shadow: 0px 0px 14px 0px rgba(50, 50, 50, 0.08);
    -moz-box-shadow: 0px 0px 14px 0px rgba(50, 50, 50, 0.08);
    box-shadow: 0px 0px 14px 0px rgba(50, 50, 50, 0.08);
    z-index: 11;
  }

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}

.user {
  position: relative;

  .content {
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .time {
    user-select: none;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 0.2rem;
    font-weight: 400;
    font-size: 1.2rem;
    color: rgba(125, 125, 125, 0.68);
  }

  .avatar {
    position: relative;
    margin-right: 1.6rem;

    .avatar-img {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 56px;
      max-width: 56px;
      min-height: 56px;
      max-height: 56px;
      border-radius: 12px;
      background: $light-blue;
      overflow: hidden;
    }

    svg {
      width: 24px;
      height: 24px;
      fill: $blue;
    }

    .level {
      position: absolute;
      background: $blue;
      top: -8px;
      right: -8px;
      width: 24px;
      height: 24px;
      color: $white;
      border-radius: 50%;
      border: 2px solid $light-blue;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
  }

  .user-name {
    margin-right: 2.8rem;
    p {
      width: 135px;
      color: $black;
      line-height: 21px;
      white-space: nowrap;
      font-weight: 500;
      font-size: 1.8rem;
      margin-bottom: 0.6rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .stars {
      i {
        font-size: 1rem;
        margin-right: 0.4rem;
      }
    }
  }

  .budget {
    height: 56px;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 2.4rem;
    border-left: 1px solid $light-gray;
    color: $green;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 19px;
    margin-right: 3.7rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .new {
      font-weight: normal;
      font-size: 1.2rem;
      color: $coral;

      &.hidden {
        visibility: hidden;
      }
    }

    p {
      display: flex;
    }

    .currency {
      margin-right: 0.4rem;
    }
  }

  button {
    margin-right: 2.6rem;
  }

  .option-button {
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .options {
    position: relative;
    cursor: pointer;

    .result-term {
      user-select: none;
      li {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        &:hover svg {
          fill: $blue;
        }
      }
      svg {
        fill: rgba(125, 125, 125, 0.52);
        margin-right: 1rem;
        transition: 0.22s;
      }
    }
  }
}

.btn.light {
  color: $blue;

  &.disable {
    opacity: 0;
    pointer-events: none;
  }

  &:hover {
    color: $white;
  }
}

.bottom {
  &-area {
    background: $ivory;
    width: 100%;
    height: 148px;
    resize: none;
    border-radius: 4px;
    padding: 2rem 1.6rem;
    margin-bottom: 1.5rem;

    &::placeholder {
      font-style: italic;
      font-weight: 300;
      font-size: 1.4rem;
      color: $black;
    }

    &:focus {
      outline: none;
    }
  }

  .double-select-wrap {
    height: 54px;
    width: 200px;
    background: $light-blue;
    border: none;

    .trigger {
      position: relative;
      width: 40%;
    }

    input {
      margin-right: 1rem;
      width: 50%;
    }

    input::placeholder {
      font-style: italic;
      font-weight: 300;
    }

    input:focus {
      outline: none;
    }

    .select-title svg {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -1.2rem;
      fill: #9e9e9e;
      transition: 0.4s;
      z-index: 2;
    }

    .line {
      width: 1px;
      height: 16px;
      background: #e4e4e4;
    }

    .select-title p {
      background: $light-blue;
      color: $black;
      font-weight: 500;
      font-size: 1.4rem;
    }
  }

  .buttons {
    display: flex;

    .btn {
      color: $white;
      width: 60%;
      transition: 0.4s;

      &.disable {
        background: lighten($blue, 8%) !important;
      }

      &:hover {
        background: lighten($blue, 8%) !important;
      }
    }
  }
}

.carousel {
  border-top: 1px solid $light-gray;
  padding-top: 1.6rem;
  margin-bottom: 1.6rem;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  position: relative;
  user-select: none;

  &-details {
    b {
      font-weight: 500;
    }
    word-break: break-word;
    max-width: 500px;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 170%;
    padding: 1.2rem;
    border: 1px solid $light-gray;
    border-radius: 4px;
    margin-bottom: 1.2rem;
  }

  &::after {
    position: absolute;
    content: '';
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 0) 0%,
      rgba(255, 255, 255, 1) 54%,
      rgba(255, 255, 255, 1) 100%
    );
    width: 30px;
    height: 100%;
    top: 0;
    right: 0;
  }
}

.carousel-item {
  height: 40px;
}

.step {
  position: absolute;
  cursor: pointer;
  width: 118px;
  display: flex;
  align-items: center;
  transition: 0.4s;

  &.is-active {
    p {
      background: $blue;
      border: 1px solid $blue;
      color: $white;
    }
  }

  img {
    border-radius: 50%;
    min-width: 40px;
    max-width: 40px;
    max-height: 40px;
    max-height: 40px;
    background-size: cover;
    margin-right: 0.8rem;
  }

  .avatarSvg {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid $blue;
    background: $light-blue;
    margin-right: 0.8rem;
    svg {
      fill: $blue;
    }
  }

  p {
    font-size: 1.4rem;
    font-weight: 400;
    color: $blue;
    padding: 0.3rem 0.6rem;
    border: 1px solid $light-gray;
    border-radius: 4px;
    transition: 0.22s;
  }
}

.carousel-item:nth-child(1) {
  transform: translateX(0px);
}
.carousel-item:nth-child(2) {
  transform: translateX(140px);
}
.carousel-item:nth-child(3) {
  transform: translateX(280px);
}
.carousel-item:nth-child(4) {
  transform: translateX(420px);
}
.carousel-item:nth-child(5) {
  transform: translateX(560px);
}
</style>
