<template>
  <div class="select double-select-wrap">
    <div
      class="select-title focus"
    >
      <h4 v-if="selectTitle">{{ selectTitle }}</h4>
      <input
        type="text"
        v-model="defaultNumber"
      />
      <span class="line"></span>
      <div class="trigger">
        <p v-if="selected">{{ selected }}</p>
        <slot />
      </div>
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
    selectTitle: {
      type: String,
      required: true
    },
    selected: {
      type: String,
      required: true
    },
    defaultNumber: {
      type: String,
      required: true
    }
  }
}
</script>
