<template>
  <div class="breadcrumb mb08" :class="{ absolute: absolute }">
    <nuxt-link :to="firstLink">{{ firstText }}</nuxt-link>
    /
    <span v-if="addText">
      <nuxt-link :to="link">{{ addText }}</nuxt-link>
      <span v-if="slash">/</span>
    </span>
    <span>{{ secondText }}</span>
  </div>
</template>

<script>
export default {
  props: {
    firstText: {
      type: String
    },
    firstLink: {
      type: String,
      default: '/'
    },
    addText: {
      type: String
    },
    link: {
      type: String
    },
    secondText: {
      type: String
    },
    absolute: {
      type: Boolean,
      default: false
    },
    slash: {
      type: Boolean,
      default: true
    }
  }
}
</script>
