<template>
  <article class="transaction-wrap">
    <nuxt-link to="/">
      <el-row
        class="transaction performers"
        :class="{ watched: isWatched }"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <el-col
          :span="6"
          class="transaction__head performers__head column-start"
        >
          <div class="top-author">
            <div class="left center">
              <AvatarSvg />
            </div>
            <div class="right">
              <h3>{{ author }}</h3>
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
          </div>
        </el-col>

        <el-col :span="6" class="transaction__location start">
          <el-tooltip placement="top">
            <template #content>
              <div class="tooltip">Локация исполнителя</div>
            </template>
            <div class="geo center"><GeoSvg /></div>
          </el-tooltip>
          <p>{{ geo }}</p>
        </el-col>

        <el-col :span="5" class="transaction__price start">
          <el-tooltip placement="top">
            <template #content>
              <div class="tooltip">На сайте уже {{ registeredTime }}</div>
            </template>
            <div class="performers-award center">
              <AwardSvg />
            </div>
          </el-tooltip>
          <p class="ml08">{{ registeredTime }}</p>
        </el-col>

        <el-col :span="5" class="transaction__price start">
          <el-tooltip placement="top">
            <template #content>
              <div class="tooltip">Уровень исполнителя</div>
            </template>
            <div class="performers-level center">
            {{ levelNum }}
          </div>
          </el-tooltip>
          <p class="ml08">{{ level }}</p>
        </el-col>

        <el-col :span="2" class="transaction__btn end">
          <button class="btn circle"><ArrowSvg class="arrow-right" /></button>
        </el-col>
      </el-row>
    </nuxt-link>
  </article>
</template>

<script>
import GeoSvg from '@/assets/icons/geo.svg?inline'
import AvatarSvg from '@/assets/icons/avatar.svg?inline'
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import AwardSvg from '@/assets/icons/award.svg?inline'
import moment from 'moment'

export default {
  props: {
    author: {
      type: String,
      required: true
    },
    geo: {
      type: String,
      required: true
    },
    registeredTime: {
      type: String,
      required: true
    },
    levelNum: {
      type: Number
    },
    level: {
      type: String
    },
    stars: {
      type: Number,
      required: true
    },
    isWatched: {
      type: Boolean
    }
  },
  components: {
    AvatarSvg,
    GeoSvg,
    ArrowSvg,
    AwardSvg
  }
}
</script>
