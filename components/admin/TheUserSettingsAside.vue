<template>
  <el-menu router :default-active="$route.path">
    <el-menu-item :index="'/admin/user-settings/main/' + $route.params.id"
      >Основная информация</el-menu-item
    >
    <el-menu-item :index="'/admin/user-settings/details/' + $route.params.id"
      >Детали</el-menu-item
    >
    <el-menu-item :index="'/admin/user-settings/subcustomers/' + $route.params.id"
      >Суб заказчики</el-menu-item
    >
    <el-menu-item :index="'/admin/user-settings/socials/' + $route.params.id"
      >Cоциальные сети</el-menu-item
    >
    <el-menu-item :index="'/admin/user-settings/access/' + $route.params.id"
      >Доступ к профилю</el-menu-item
    >
    <el-menu-item :index="'/admin/user-settings/notes/' + $route.params.id"
      >Заметки</el-menu-item
    >
  </el-menu>
</template>

<script>
export default {
  middleware: ['admin-auth'],
  validate({ params }) {
    return Boolean(params.id)
  },
}
</script>

<style lang="scss" scoped></style>
