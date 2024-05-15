<template>
  <div class="offer">
    <div class="top">
      <div class="user">
        <div class="content">
          <!-- if hasn't avatar -->
          <div class="avatar" v-if="false">
            <div class="avatar-img">
              <avatarSvg />
            </div>
            <div class="level">3</div>
          </div>
          <!-- if has avatar -->
          <div class="avatar" v-else>
            <div class="avatar-img">
              <nuxt-img src="avatar.jpg" preset="offer" />
            </div>
            <div class="level">3</div>
          </div>

          <div class="user-name">
            <p>Name</p>
            <el-rate
              :v-model="3"
              disabled
              disabled-void-color="#7d7d7d75"
              class="stars"
              :max="5"
              :colors="['#1374F6', '#1374F6', '#1374F6']"
            >
            </el-rate>
          </div>
          <div class="budget">
            <span class="currency">EURO</span>
            <span class="price">200</span>
          </div>
          <button class="btn light">Сообщение</button>
        </div>

        <div class="time mb1">17:44</div>
      </div>
    </div>
    <div class="bottom">
      <div>
        <div class="carousel-details">
          <b>Детали: - </b>Установка и обслуживание компьютерной и
          офисной техники, оргтехники. - Установка, настройка и обновление
          офисного и прикладного ПО требовании.Требовании и обязанности
        </div>
      </div>

    </div>
    <button class="btn cancel mb1">Отменить предложение</button>
  </div>
</template>

<script>
import avatarSvg from '@/assets/icons/avatar.svg?inline'
import optionsSvg from '@/assets/icons/options.svg?inline'
import transactionSvg from '@/assets/icons/transaction.svg?inline'
import messageSvg from '@/assets/icons/message.svg?inline'
import cancelSvg from '@/assets/icons/cancel.svg?inline'
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import vClickOutside from 'v-click-outside'

export default {
  emits: ['focusOn', 'focusOff'],
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      posts: null,
      focus: false,
      stars: 2,
      isSortOpen: false,
      areOptionsVisible: false,
      isCounterOfferOpen: false,
      number: null,
      currentSlide: 0,
      slideTransition: 0
    }
  },
  methods: {
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
    acceptNumber() {
      this.number = this.number.replace(/\D/g, '')
      this.$emit('input', this.number)
    },
    carousel(n, o) {
      console.log(n, o)
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
    align-items: center;
    padding-left: 2.4rem;
    border-left: 1px solid $light-gray;
    color: $green;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 19px;
    margin-right: 3.7rem;
    display: flex;

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
