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
            <!-- <div class="fire start" v-if="quickly">
              <FireSvg />
              Срочно
            </div> -->
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
              <div class="tooltip">Место нахождения</div>
            </template>
            <div class="target center mr08"><TargetSvg /></div>
          </el-tooltip>
          <p>
            <span>{{ post.where }}</span>
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
              {{ post.dateOfCreation }}
            </div>
            <CameraSvg v-if="post.fileList.length > 0" />
            <CameraOffSvg v-else />
          </div>
          <p class="description">
            {{ post.text }}
          </p>
        </div>
        <div class="transaction-open__bottom space-between">
          <div class="author start">
            <div class="avatar center">
              <AvatarSvg />
            </div>
            <div class="status">
              <p>Амирхан</p>
            </div>
          </div>
          <nuxt-link :to="'/find/' + post._id">
            <button class="btn square">Откликнуться на вакансию</button>
          </nuxt-link>
        </div>
      </div>
    </collapse-transition>
  </article>
</template>

<script>
import GeoSvg from '@/assets/icons/geo.svg?inline'
import TargetSvg from '@/assets/icons/target.svg?inline'
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import TimerSvg from '@/assets/icons/timer.svg?inline'
import FireSvg from '@/assets/icons/fire.svg?inline'
import AvatarSvg from '@/assets/icons/avatar.svg?inline'
import TimeSvg from '@/assets/icons/time.svg?inline'
import CameraSvg from '@/assets/icons/camera.svg?inline'
import CameraOffSvg from '@/assets/icons/camera-off.svg?inline'
import { CollapseTransition } from '@ivanv/vue-collapse-transition'
import vClickOutside from 'v-click-outside'
import moment from 'moment'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isTransitionOpen: this.isOpen
    }
  },
  methods: {
    toggleTransaction() {
      this.isTransitionOpen = !this.isTransitionOpen
    },
    hideTransaction() {
      this.isTransitionOpen = false
    }
  },
  components: {
    CollapseTransition,
    GeoSvg,
    TargetSvg,
    ArrowSvg,
    TimerSvg,
    FireSvg,
    AvatarSvg,
    CameraSvg,
    CameraOffSvg,
    TimeSvg
  }
}
</script>
