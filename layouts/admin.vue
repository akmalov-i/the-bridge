<template>
  <div class="settings">
    <!-- navigation -->
    <Navbar>
      <Location />
      <TheLogo :admin="true" />
      <AdminSettings />
    </Navbar>

    <el-container :style="{ 'min-height': '100vh' }" class="settings-wrap">
      <div class="settings-body">
        <el-main class="admin-main">
          <AdminSearch class="mb2" />
          <nuxt />
        </el-main>
        <el-aside :style="{ width: '320px' }">
          <AdminAside />
        </el-aside>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(value) {
      this.$message.error(value.response.data.message)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 0;
}

h1 {
  margin-bottom: 0.4rem;
}

.v-application {
  border-radius: 8px;
}

.settings {
  width: 100%;
  height: 70vh;

  &-wrap {
    background: $azure;
    display: flex;
    flex-direction: column;
    padding: 5rem 3.2rem;
  }
}

.settings-header {
  margin-bottom: 2.4rem;
}

.settings-body {
  display: flex;
}

.context {
  font-style: normal;
  font-weight: normal;
  font-size: 1.4rem;
  line-height: 150%;
  color: $gray;
}

.el-main {
  padding: 0 1.6rem;
}
</style>
