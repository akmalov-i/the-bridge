<template>
  <div>
    <div class="date-custom">
      <div class="calendar-pick" @click="focus">
        {{ dateFormat }}
        <el-tooltip placement="top">
          <template #content>
            <div class="tooltip">{{ dateGetter }}</div>
          </template>
          <calendarSvg class="calendar-icon" />
        </el-tooltip>
      </div>

      <v-row class="calendar" v-if="isDateOpen" v-click-outside="closeDate">
        <v-date-picker v-model="dateSetter" locale="ru" />
      </v-row>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import calendarSvg from '@/assets/icons/calendar-blue.svg?inline'
import moment from 'moment'
import tz from 'moment-timezone'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    date: String,
    minimal: String,
    period: {
      type: Boolean,
      default: false
    },
    freely: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDateOpen: false,
      dateSetter: ''
    }
  },
  methods: {
    focus() {
      this.isDateOpen = true
    },
    closeDate() {
      this.isDateOpen = false
    }
  },
  computed: {
    dateGetter: function () {
      return (this.dateSetter = this.date)
    },
    dateFormat: function () {
      return moment(this.dateSetter).format('DD[.]MM[.]YYYY')
    }
  },
  watch: {
    dateSetter: function (val) {
      this.$emit('update:updateDate', val)
      this.closeDate()
    }
  },
  components: {
    calendarSvg
  }
}
</script>

<style lang="scss" scoped>
.calendar-pick {
  user-select: none;
  height: 100%;
  width: 100%;
  line-height: 50px;
  padding-left: 1.6rem;
}
.date-custom {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #f0f0ff;
  border: 1px solid rgba(19, 116, 246, 0.32);
  color: #161616;
  border-radius: 4px;
  height: 51px;
}
.calendar-icon {
  fill: $blue;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1.6rem;
}
</style>
