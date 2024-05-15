<template>
  <div class="breadcrumb mb08">
    <nuxt-link to="/admin">{{ firstText }}</nuxt-link>
    /
    <span v-if="addText">
      <nuxt-link :to="addLink">{{ addText }}</nuxt-link>
      /
    </span>
    <span>{{ secondText }}</span>
  </div>
</template>

<script>
export default {
  props: {
    firstText: {
      type: String,
      default: 'Администратор'
    },
    addText: {
      type: String
    },
    addLink: {
      type: String
    },
    secondText: {
      type: String
    }
  }
}
</script>