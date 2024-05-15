<template>
  <div class="settings">
    <!-- navigation -->
    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
    </Navbar>

    <el-container :style="{ 'min-height': '720px' }" class="settings-wrap">
      <div class="settings-header">
        <TheBreadcrumb
          firstText="Главная"
          addText="Мой профиль"
          :link="'/user/' + userId"
          :slash="false"
        />
        <h1>Настройки профиля</h1>
        <p class="context">Быстро и удобно меняйте профиль под себя</p>
      </div>
      <div class="settings-body">
        <el-aside :style="{ width: '335px' }">
          <the-settings-aside></the-settings-aside>
        </el-aside>
        <el-main>
          <Nuxt />
        </el-main>
      </div>
    </el-container>

    <!-- footer -->
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'Settings',
  async fetch() {
    let userId = await this.$store.getters['auth/userId']
    this.userId = userId
  },
  data() {
    return {
      userId: ''
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
