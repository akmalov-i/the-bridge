<template>
  <div>
    <div class="date-custom">
      <p>{{ title }}</p>

      <div class="calendar-pick">
        <div class="block"></div>
        <el-date-picker
          v-if="period"
          class="calendar-custom"
          v-model="dateSetter"
          type="date"
          placeholder="place"
          format="dd.MM.yyyy"
          :picker-options="periodPickerOptions"
          :clearable="false"
        >
        </el-date-picker>
        <el-date-picker
          v-else
          class="calendar-custom"
          v-model="dateSetter"
          type="date"
          placeholder="place"
          format="dd.MM.yyyy"
          :picker-options="!finds ? pickerOptions : false"
          :clearable="false"
        >
        </el-date-picker>
        <el-tooltip placement="top">
          <template #content>
            <div class="tooltip">
              {{ $moment(dateSetter).format('dddd, D MMMM YYYY') }}
            </div>
          </template>
          <calendarSvg class="calendar-icon" />
        </el-tooltip>
      </div>

      <el-time-select
        v-model="time"
        :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '23:30'
        }"
        placeholder="Выбрать"
      >
      </el-time-select>
      <timerSvg class="timer-icon" />
    </div>
  </div>
</template>

<script>
import calendarSvg from '@/assets/icons/calendar.svg?inline'
import timerSvg from '@/assets/icons/timer.svg?inline'
import moment from 'moment'

export default {
  props: {
    title: {
      type: String,
      default: 'Дата/время'
    },
    time: String,
    date: String,
    minimal: String,
    period: {
      type: Boolean,
      default: false
    },
    finds: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.timeSetter = this.time
    this.dateSetter = this.date
  },
  data() {
    return {
      timeSetter: '12:00',
      dateSetter: moment().format(),
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > moment().add(6, 'months') ||
            time.getTime() < moment().subtract(1, 'days')
          )
        }
      },
      periodPickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > moment().add(6, 'months') ||
            time.getTime() < moment().subtract(1, 'days')
          )
        }
      }
    }
  },
  computed: {
    timeGetter: function () {
      return (this.timeSetter = this.time)
    },
    dateGetter: function () {
      return (this.dateSetter = this.date)
    }
  },
  watch: {
    timeSetter: function (val) {
      this.$emit('update:updateTime', moment(val).format())
    },
    dateSetter: function (val) {
      if (moment(val).unix() <= moment(this.minimal).unix() && this.period) {
        this.dateSetter = moment(this.minimal).add(1, 'days').format()
        this.$message.warning({
          showClose: true,
          message: 'Нельзя выбрать конечную дату ниже начальной!'
        })
      }
      this.$emit('update:updateDate', moment(val).format())
    },
    minimal: function (val) {
      if (moment(val).unix() >= moment(this.dateSetter).unix()) {
        this.dateSetter = moment(val).add(1, 'days').format()
      }
    }
  },
  components: {
    calendarSvg,
    timerSvg
  }
}
</script>

<style lang="scss" scoped>
.calendar-custom {
  width: 90%;
}

.date-custom p {
  position: absolute;
  left: 14px;
}

.preview .date-custom p {
  background: $ivory;
}

.calendar-pick {
  cursor: pointer;
  position: absolute;
  height: 25px;
  line-height: 25px;
  width: 50%;
  top: 50%;
  left: 1.4rem;
  transform: translateY(-50%);
  border-right: 1px solid $light-gray;
}

.timer-icon,
.calendar-icon {
  fill: $gray;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.calendar-icon {
  right: 0.5rem;
}

.timer-icon {
  right: 2rem;
}
</style>
