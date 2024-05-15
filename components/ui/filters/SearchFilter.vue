<template>
  <div class="filter">
    <div v-if="top" class="top">
      <slot name="top" />
    </div>
    <div class="bottom space-between">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    top: {
      type: Boolean,
      default: true
    }
  }
}
</script>
