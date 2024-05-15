<template>
  <div class="about-me">
    <h2 class="mb1">Обо мне</h2>
    <div class="about-me-details">
      <div class="item">
        <helpSvg />
        Помогаю людям: {{ about.exp.label }}
      </div>
      <div class="item">
        <transactionSvg />
        Количество транзакций: 14
      </div>
    </div>
    <div class="about-me-text">
      <p class="empty" v-if="!about.textarea">
        Пользователь пока не заполнил эту секцию
      </p>
      <p v-else>{{ about.textarea }}</p>
    </div>
  </div>
</template>

<script>
import helpSvg from '@/assets/icons/help.svg?inline'
import transactionSvg from '@/assets/icons/transaction.svg?inline'
import moment from 'moment'

export default {
  props: {
    about: {
      type: Object,
      required: true
    }
  },
  components: {
    helpSvg,
    transactionSvg
  }
}
</script>

<style lang="scss" scoped>
.about-me {
  word-break: break-word;
  background: $white;
  width: 100%;
  border-radius: 8px;
  padding: 3.2rem 2.4rem 2.4rem 2.4rem;
  font-size: 1.6rem;
  color: $black;
  font-weight: 300;
  height: 251px;

  &-details {
    margin-bottom: 1.6rem;
    display: flex;

    .item {
      margin-right: 1.6rem;
      display: flex;
      align-items: center;
      color: rgba(125, 125, 125, 0.68);
      font-size: 1.2rem;
      font-weight: 400;
    }

    svg {
      fill: rgba(125, 125, 125, 0.68);
      margin-right: 0.6rem;
    }
  }

  &-text {
    position: relative;
    height: 120px;
    overflow: auto;
    .empty {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.8rem;
      font-weight: 500;
      color: rgba(158, 158, 158, 0.4);
    }
    p {
      padding-right: 2rem;
      font-family: Gilroy;
      font-style: normal;
      font-weight: 300;
      font-size: 1.6rem;
      line-height: 150%;
      max-width: 1280px;
    }
  }
}
</style>
