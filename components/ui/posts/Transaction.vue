<template>
  <article class="transaction-wrap" v-click-outside="hideTransaction">
    <div @click="toggleTransaction">
      <el-row
        class="transaction"
        :class="{ active: isTransitionOpen }"
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
          <el-tooltip placement="top">
            <template #content>
              <div class="tooltip">Бюджет</div>
            </template>
            <div
              class="dollar center"
              v-if="post.determiningTheCost === 'Auction'"
            >
              <AuctionSvg />
            </div>
            <div class="dollar center" v-else><DollarSvg /></div>
          </el-tooltip>
          <p v-if="post.determiningTheCost === 'Auction'">
            <span>Аукцион</span>
          </p>
          <p v-else>
            <span class="currency">{{ post.currency }}</span>
            <span class="price">{{ currency(post.budget) }}</span>
          </p>
        </el-col>

        <el-col :span="3" class="transaction__btn end">
          <button class="btn circle"><ArrowSvg /></button>
        </el-col>
      </el-row>
    </div>

    <collapse-transition>
      <div class="transaction-open" v-show="isTransitionOpen">
        <div class="transaction-open__head">
          <div class="details start">
            <div class="details-item center">
              <TimeSvg />
              <div v-if="post.deadlines === 'Specify a deadline'">
                {{ $moment(post.date).locale('ru').format('LL') }}
              </div>
              <div v-else>
                {{ $moment(post.periodDateEnd).locale('ru').format('LL') }}
              </div>
              ,&#160;
              <span v-if="post.deadlines === 'Specify a deadline'">
                {{ post.time }}
              </span>
              <span v-else>{{ post.periodTimeEnd }}</span>
            </div>
            <div class="details-item center" v-if="post.isTeamwork">
              <TeamworkSvg />
              Работа в команде
            </div>
          </div>
          <p class="description">
            {{ post.text }}
          </p>
        </div>
        <div class="transaction-open__bottom space-between">
          <nuxt-link :to="'/user/' + user._id" class="author start">
            <div class="avatar center">
              <div class="avatar-img">
                <nuxt-img
                  :src="'avatars' + user.imageUrl"
                  preset="offer"
                  v-if="user.imageUrl"
                />
                <AvatarSvg v-else />
              </div>
            </div>
            <div class="status">
              <p>{{ user.name }} {{ user.surname }}</p>
              <el-rate
                v-model="status.stars"
                disabled
                disabled-void-color="#7d7d7d75"
                class="stars"
                :max="5"
                :colors="['#1374F6', '#1374F6', '#1374F6']"
              >
              </el-rate>
            </div>
          </nuxt-link>

          <nuxt-link :to="'/service/' + post._id">
            <button class="btn square">Откликнуться на вакансию</button>
          </nuxt-link>
        </div>
      </div>
    </collapse-transition>
  </article>
</template>

<script>
import GeoSvg from '@/assets/icons/geo.svg?inline'
import DollarSvg from '@/assets/icons/dollar.svg?inline'
import AuctionSvg from '@/assets/icons/auction.svg?inline'
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import TimerSvg from '@/assets/icons/timer.svg?inline'
import FireSvg from '@/assets/icons/fire.svg?inline'
import AvatarSvg from '@/assets/icons/avatar.svg?inline'
import TimeSvg from '@/assets/icons/time.svg?inline'
import TeamworkSvg from '@/assets/icons/teamwork.svg?inline'
import { CollapseTransition } from '@ivanv/vue-collapse-transition'
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
  async created() {
    try {
      let user = await this.$store.dispatch(
        'user/fetchByIdMinimal',
        this.post.author
      )
      this.status = user[0].rating
      this.user = user[0]
    } catch (e) {}
  },
  data() {
    return {
      user: { imageUrl: '' },
      isOpen: true,
      status: { stars: null },
      isTransitionOpen: this.isOpen,
      currency: currency
    }
  },
  methods: {
    async toggleTransaction() {
      this.isTransitionOpen = !this.isTransitionOpen
    },
    hideTransaction() {
      this.isTransitionOpen = false
    }
  },
  components: {
    CollapseTransition,
    GeoSvg,
    DollarSvg,
    AuctionSvg,
    ArrowSvg,
    TimerSvg,
    FireSvg,
    AvatarSvg,
    TeamworkSvg,
    TimeSvg
  }
}
</script>

<style lang="scss" scoped>
.author {
  cursor: pointer;
}

.avatar {
  background: $blue;

  border-radius: 12px;
  margin-right: 1.2rem;
  position: relative;
}
.avatar-img {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  max-width: 48px;
  min-height: 48px;
  max-height: 48px;
  overflow: hidden;
  border-radius: 12px;
}
</style>
