<template>
  <article class="transaction-wrap">
    <nuxt-link to="/">
      <el-row
        class="transaction"
        :class="{ watched: isWatched }"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <el-col :span="8" class="transaction__head column-start">
          <el-tooltip placement="top-end">
            <template #content>
              <div class="tooltip">{{ title }}</div>
            </template>
            <h3>{{ title }}</h3>
          </el-tooltip>
          <div class="details start">
            <div class="timer start">
              <TimerSvg />
              {{ recently }}
            </div>
            <div class="fire start" v-if="quickly">
              <FireSvg />
              Срочно
            </div>
          </div>
        </el-col>

        <el-col :span="8" class="transaction__location start">
          <el-tooltip placement="top">
            <template #content>
              <div class="tooltip">Локация</div>
            </template>
            <div class="geo center"><GeoSvg /></div>
          </el-tooltip>
          <p>{{ geo }}</p>
        </el-col>

        <el-col :span="5" class="transaction__price start">
          <el-tooltip placement="top">
            <template #content>
              <div class="tooltip">Потребность</div>
            </template>
            <div class="grace center"><GraceSvg /></div>
          </el-tooltip>
          <p v-if="graceName">
            <span>{{ graceName }}</span>
          </p>
          <p v-else>
            <span class="currency">{{ currency }}</span>
            <span class="price">{{ price }}</span>
          </p>
        </el-col>

        <el-col :span="3" class="transaction__btn end">
          <button class="btn circle"><ArrowSvg class="arrow-right" /></button>
        </el-col>
      </el-row>
    </nuxt-link>
  </article>
</template>

<script>
import GeoSvg from '@/assets/icons/geo.svg?inline'
import GraceSvg from '@/assets/icons/grace.svg?inline'
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import TimerSvg from '@/assets/icons/timer.svg?inline'
import FireSvg from '@/assets/icons/fire.svg?inline'
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recently: {
      type: String,
      required: true
    },
    geo: {
      type: String,
      required: true
    },
    currency: {
      type: String,
      required: false,
      default: ''
    },
    quickly: {
      type: Boolean,
      required: true
    },
    graceName: {
      type: String,
      required: false,
      default: ''
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    isWatched: {
      type: Boolean,
      required: true
    },
    price: {
      type: Number,
      required: false,
      default: null
    }
  },
  components: {
    GeoSvg,
    GraceSvg,
    ArrowSvg,
    TimerSvg,
    FireSvg
  }
}
</script>
