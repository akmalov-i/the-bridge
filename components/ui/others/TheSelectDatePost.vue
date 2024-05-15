<template>
  <div class="select">
    <div class="select-title focus">
      <h4 v-if="selectTitle">{{ selectTitle }}</h4>
      <div class="deadline-date">
        <p v-if="pickDate">{{ pickDate }}</p>
      </div>
      <div class="deadline-time">
        <p v-if="pickTime">{{ pickTime }}</p>
        <timerSvg class="timer-icon" />
      </div>
    </div>
  </div>
</template>

<script>
import calendarSvg from '@/assets/icons/calendar.svg?inline'
import timerSvg from '@/assets/icons/timer.svg?inline'

export default {
  emits: ['open-calendar', 'open-time'],
  props: {
    selectTitle: {
      type: String
    },
    pickDate: {
      type: String
    },
    pickTime: {
      type: String
    },
  },
  components: {
    calendarSvg,
    timerSvg
  }
}
</script>
