<template>
  <div>
    <!-- navigation -->
    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
    </Navbar>

    <div class="settings-wrap">
      <div class="settings-header mb24">
        <h1>Личные настройки</h1>
        <p class="context">Быстро и удобно меняйте профиль под себя</p>
      </div>

      <div class="settings-body">
        <el-main>
          <nuxt />
        </el-main>
        <el-aside :style="{ width: '335px' }">
          <TheRsuAside />
        </el-aside>
      </div>
    </div>

    <!-- footer -->
    <Footer />
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

.el-main {
  padding: 0 1.6rem 0 0;
}

.settings-wrap {
  display: flex;
  flex-direction: column;
  background: $azure;
  padding: 5rem 3rem;
  min-height: 720px;
}

.settings-header {
  h1 {
    margin-bottom: 1rem;
  }
}

.context {
  max-width: 415px;
  font-size: 1.4rem;
  color: $gray;
  font-weight: 400;
  line-height: 150%;
}

.settings-body {
  display: flex;
}

</style>