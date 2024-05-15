<template>
  <div>
    <AdminUserTable />
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
      title: 'Пользователи',
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