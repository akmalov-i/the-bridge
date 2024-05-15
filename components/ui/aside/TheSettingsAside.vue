<template>
  <el-menu router :default-active="$route.path">
    <el-menu-item :index="'/settings/main/' + userId">Основная информация</el-menu-item>
    <el-menu-item :index="'/settings/details/' + userId">Детали</el-menu-item>
    <el-menu-item :index="'/settings/subcustomers/' + userId">Суб заказчики</el-menu-item>
    <el-menu-item :index="'/settings/socials/' + userId">Cоциальные сети</el-menu-item>
    <el-menu-item :index="'/settings/access/' + userId">Доступ к профилю</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  middleware: ['user-auth'],
  async fetch() {
    let userId = await this.$store.getters['auth/userId']
    this.userId = userId
  },
  data() {
    return {
      userId: ''
    }
  }
}
</script>
