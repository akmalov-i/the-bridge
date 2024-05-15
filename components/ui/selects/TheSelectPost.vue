<template>
  <div class="select">
    <div class="select-title focus">
      <p v-if="title">{{ title }}</p>
      <h4 v-if="label">{{ label }}</h4>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  emits: ['select'],
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    label: {
      type: String
    },
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.select-title h4 {
  color: #606266;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
