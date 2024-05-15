<template>
  <article class="transaction-wrap">
    <nuxt-link :to="'/trades/' + post._id">
      <!-- :class="{ watched: isWatched }" -->
      <el-row
        class="transaction"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <el-col :span="8" class="transaction__head column-start">
          <el-tooltip placement="top-end">
            <template #content>
              <div class="tooltip">{{ post.title }}</div>
            </template>
            <h3>{{ post.title }}</h3>
          </el-tooltip>
          <div class="details start">
            <div class="timer start">
              <TimerSvg />
              {{
                $moment(new Date(post.dateOfCreation).toISOString()).fromNow()
              }}
            </div>
            <div
              class="fire start"
              v-if="
                post.urgently === 'Is present' &&
                post.deadlines === 'Specify a deadline'
              "
            >
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
          <p>{{ post.city }}</p>
        </el-col>

        <el-col :span="5" class="transaction__price start">
          <div
            class="dollar center"
            v-if="post.determiningTheCost === 'Auction'"
          >
            <AuctionSvg />
          </div>
          <div class="dollar center" v-else>
            <el-tooltip placement="top">
              <template #content>
                <div class="tooltip">Бюджет</div>
              </template>
              <DollarSvg />
            </el-tooltip>
          </div>
          <p v-if="post.determiningTheCost === 'Auction'">
            <span>Аукцион</span>
          </p>
          <p v-else>
            <span class="currency">{{ post.currency }}</span>
            <span class="price">{{ currency(post.budget) }}</span>
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
import DollarSvg from '@/assets/icons/dollar.svg?inline'
import AuctionSvg from '@/assets/icons/auction.svg?inline'
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import TimerSvg from '@/assets/icons/timer.svg?inline'
import FireSvg from '@/assets/icons/fire.svg?inline'
import vClickOutside from 'v-click-outside'
import { currency } from '@/utils/currency-formatter'
import moment from 'moment'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    post: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      currency: currency
    }
  },
  components: {
    GeoSvg,
    DollarSvg,
    AuctionSvg,
    ArrowSvg,
    TimerSvg,
    FireSvg
  }
}
</script>
