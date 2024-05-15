<template>
  <div class="settings">
    <!-- navigation -->
    <Navbar>
      <Location />
      <TheLogo :admin="true" />
      <AdminSettings />
    </Navbar>

    <el-container :style="{ 'min-height': '720px' }" class="settings-wrap">
      <div class="settings-header">
        <h1>{{ title }}</h1>
        <AdminBreadcrumb :secondText="title" />
      </div>
      <div class="settings-body">
        <el-aside :style="{ width: '335px' }">
          <TheUserSettingsAside />
        </el-aside>
        <el-main>
          <nuxt />
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'The Bridge' + this.title
    }
  },
  data() {
    return {
      title: 'Настройки профиля'
    }
  },
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

.settings-wrap {
  min-height: 90vh !important;
}

h1 {
  margin-bottom: 0.4rem;
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
