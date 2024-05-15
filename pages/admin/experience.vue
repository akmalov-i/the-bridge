<template>
  <div>
    <AdminExpTable />
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head() {
    return {
      title: 'Lavzee | ' + this.title
    }
  },
  data() {
    return {
      title: 'Настройки профиля',
    }
  },
  components: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>