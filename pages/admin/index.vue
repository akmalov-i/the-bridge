<template>
  <div>
    <AdminTable />
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
      title: 'Транзакции',
      loading: true
    }
  },
  methods: {},
  computed: {},
  components: {}
}
</script>

<style lang="scss" scoped></style>
