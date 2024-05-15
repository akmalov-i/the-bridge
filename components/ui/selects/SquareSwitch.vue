<template>
  <div class="select-tab space-between">
    <div
      v-for="(option, idx) in options"
      :key="option.value"
      class="center tab"
      :class="{ active: idx === active }"
      @click="selectOption(option, idx)"
    >
      {{ option.label }}
    </div>
  </div>
</template>

<script>
export default {
  emits:['select'],
  props: {
    options: {
      type: Array,
      required: true
    },
    active: Number
  },
  methods: {
    selectOption(option, idx) {
      this.$emit('update:select', option.value)
      this.$emit('update:active', idx)
    }
  }
}
</script>
