<template>
  <div>
    <AdminInviteTable />
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
      title: 'Новое приглашение',
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