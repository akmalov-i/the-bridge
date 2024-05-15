<template>
  <el-col :span="4" class="center">
    <nuxt-link :to="admin ? '/admin' : '/'" class="logo">
      <logoSvg />
    </nuxt-link>
  </el-col>
</template>

<script>
import logoSvg from '@/assets/icons/logo.svg?inline'

export default {
  props: {
    admin: {
      type: Boolean,
      default: false
    }
  },
  components: {
    logoSvg
  }
}
</script>

<style lang="scss" scoped>
.logo {
  height: 60px;
}

.logo svg {
  margin-top: -15px;
  height: 90px;
}
</style>
