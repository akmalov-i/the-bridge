<template>
  <div>
    <div v-if="custom" class="select-tab space-between">
      <nuxt-link to="/" class="center tab">Работа</nuxt-link>
      <div class="center tab active">Профи</div>
    </div>
    <div v-else class="select-tab space-between">
      <div class="center tab active">Работа</div>
      <nuxt-link to="/performers" class="center tab">Профи</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    custom: {
      type: Boolean,
      default: false
    }
  }
}
</script>
