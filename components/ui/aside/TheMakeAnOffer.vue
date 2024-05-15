<template>
  <div>
    <el-form
      ref="form"
      class="offer"
      :model="form"
      @submit.native.prevent="onSubmit"
    >
      <div class="top">
        <div class="user">
          <div class="content">
            <nuxt-link
              target="_blank"
              :to="`/user/${author[0]._id}`"
              class="start pointer"
            >
              <!-- if hasn't avatar -->
              <div class="avatar">
                <div class="avatar-img">
                  <nuxt-img
                    :src="'avatars' + author[0].imageUrl"
                    preset="offer"
                    v-if="author[0].imageUrl"
                  />
                  <avatarSvg v-else />
                </div>
                <div class="level">3</div>
              </div>

              <div class="user-name">
                <p>{{ author[0].name }} {{ author[0].surname }}</p>
                <el-rate
                  v-model="dataGetter.status.statusAuthor.stars"
                  disabled
                  disabled-void-color="#7d7d7d75"
                  class="stars"
                  :max="5"
                  :colors="['#1374F6', '#1374F6', '#1374F6']"
                >
                </el-rate>
              </div>
            </nuxt-link>
            <div class="budget" v-if="dataGetter.offer">
              <div
                class="new"
                :class="{ hidden: !dataGetter.offer.newOfferByAuthor }"
              >
                New
              </div>
              <p>
                <span class="currency">{{
                  dataGetter.offer.details[currentSlide].currency
                }}</span>
                <span class="price">{{
                  new Intl.NumberFormat('en-US', { style: 'decimal' }).format(
                    dataGetter.offer.details[currentSlide].budget
                  )
                }}</span>
              </p>
            </div>
            <button class="btn light">Сообщение</button>
          </div>
          <div class="time mb1">
            <span v-if="dataGetter.offer">
              {{
                $moment(dataGetter.offer.dateOfCreation)
                  .locale('ru')
                  .format('D MMMM, HH:mm')
              }}
            </span>
          </div>
        </div>
      </div>

      <div class="send-offer">
        <div class="bottom">
          <div>
            <div class="carousel" v-if="dataGetter.offer">
              <div
                class="carousel-item"
                v-for="(item, idx) in dataGetter.offer.details"
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
                    v-if="
                      user.imageUrl && !dataGetter.offer.details[idx].author
                    "
                  />
                  <nuxt-img
                    :src="'avatars' + author[0].imageUrl"
                    preset="comments"
                    v-else-if="
                      author[0].imageUrl && dataGetter.offer.details[idx].author
                    "
                  />
                  <div v-else class="avatarSvg">
                    <avatarSvg />
                  </div>
                  <p>Шаг №{{ idx + 1 }}</p>
                </div>
              </div>
            </div>
            <div v-if="dataGetter.offer">
              <div
                class="carousel-details"
                v-show="dataGetter.offer.details[currentSlide].text"
              >
                <b
                  >Детали
                  <span v-if="dataGetter.offer.details[currentSlide].author">
                    {{ author[0].name }}
                  </span>
                  <span v-else>
                    {{ user.name }}
                  </span>
                  №{{ currentSlide + 1 }}:</b
                >
                -
                {{ dataGetter.offer.details[currentSlide].text }}
              </div>
            </div>
            <div class="mb1">
              <textarea
                v-if="
                  !dataGetter.offer ||
                  dataGetter.offer.details[dataGetter.offer.details.length - 1]
                    .author
                "
                ref="textarea"
                maxlength="450"
                placeholder="Добавить детали..."
                v-model="form.text"
                class="bottom-area"
              ></textarea>

              <div
                class="budget-buttons"
                v-if="
                  !dataGetter.offer ||
                  dataGetter.offer.details[dataGetter.offer.details.length - 1]
                    .author
                "
              >
                <BudgetSelect
                  class="offer-budget-select"
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

                <el-button
                  type="primary"
                  native-type="submit"
                  class="btn primary"
                  round
                  :loading="loading"
                >
                  <span v-if="dataGetter.offer">Контр предложение</span>
                  <span v-else>Отправить</span>
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="dataGetter.offer">
          <el-button
            class="btn green mb1"
            v-if="dataGetter.offer.details[currentSlide].author"
            @click="acceptTheOffer"
          >
            Принять предложение
          </el-button>
        </div>
        <el-button
          class="btn cancel mb1 ml0"
          v-if="dataGetter.offer"
          @click="removeTheOffer"
        >
          Отменить предложение
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
  emits: ['focusOn', 'focusOff', 'created', 'remove', 'accept'],
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    author: {
      type: Array,
      required: true
    },
    postId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },

  async fetch() {
    let user = await this.$store.dispatch(
      'user/fetchByIdMinimal',
      this.data.userId
    )
    this.user = user[0]
  },
  created() {
    if (this.data.offer) {
      this.currentSlide = this.data.offer.details.length - 1
      this.selectStep(this.currentSlide)
    }
    this.dataGetter = this.data
  },
  data() {
    return {
      user: { imgUrl: '' },
      posts: null,
      dataGetter: null,
      focus: false,
      loading: false,
      stars: 2,
      areOptionsVisible: false,
      isCounterOfferOpen: false,
      number: null,
      currentSlide: 0,
      slideTransition: 0,
      form: {
        budget: '',
        currency: 'USD',
        text: ''
      },
      ...json
    }
  },
  methods: {
    onSubmit() {
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
      if (
        this.dataGetter?.offer?.details[
          this.dataGetter?.offer?.details.length - 1
        ].author
      ) {
        return this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.loading = true
            const formData = {
              id: this.dataGetter.offer._id,
              postId: this.dataGetter.offer.postId,
              budget: this.form.budget,
              currency: this.form.currency,
              text: this.form.text,
              dateOfCreation: moment(),
              newOffer: true,
              author: false
            }

            try {
              const newOffer = await this.$store.dispatch(
                'offer/setCounter',
                formData
              )
              this.form = { budget: '', currency: 'USD', text: '' }
              this.loading = false
              this.dataGetter.offer = newOffer
              this.currentSlide = this.dataGetter.offer.details.length - 1
              this.selectStep(this.currentSlide)
              return this.$message.success({
                showClose: true,
                message: 'Предложение отправлено!'
              })
            } catch (e) {}
          }
        })
      } else {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.loading = true
            const formData = {
              userId: this.dataGetter.userId,
              postId: this.dataGetter.postId,
              budget: this.form.budget,
              currency: this.form.currency,
              text: this.form.text,
              author: this.dataGetter.author,
              dateOfCreation: moment()
            }

            try {
              const newOffer = await this.$store.dispatch(
                'offer/create',
                formData
              )
              this.form = { budget: '', currency: 'USD', text: '' }
              this.loading = false
              this.$emit('created', newOffer)
              this.$message.success({
                showClose: true,
                message: 'Предложение отправлено!'
              })
            } catch (e) {}
          }
        })
      }
    },
    acceptTheOffer() {
      const formData = {
        budget: this.dataGetter.offer.details[this.currentSlide].budget,
        currency: this.dataGetter.offer.details[this.currentSlide].currency,
        text: this.dataGetter.offer.details[this.currentSlide].text,
        step: this.currentSlide + 1,
        id: this.dataGetter.postId,
        userId: this.user._id,
        dateOfCreation: moment(),
        custom: 'executor'
      }

      this.$emit('accept', formData)
    },
    removeTheOffer() {
      const formData = {
        id: this.dataGetter.offer._id,
        postId: this.postId,
        userId: this.userId
      }
      this.$emit('remove', formData)
    },
    selectOption(option, type) {
      this.$emit('select', option, type)
      this.hideSelect()
    },
    hideSelect() {
      this.areOptionsVisible = false
    },
    acceptNumber() {
      this.number = this.number.replace(/\D/g, '')
      this.$emit('input', this.number)
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
    width: 100%;
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

.budget-buttons {
  display: flex;

  .primary {
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
