<template>
  <el-form
    :style="{ 'min-height': '680px' }"
    :model="main"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <div class="settings-container">
      <div class="settings-header mb2">
        <div class="header-left">
          <h2 class="mb1">{{ this.title }}</h2>
          <p class="context">Быстро и удобно меняйте профиль под себя</p>
        </div>
      </div>
      <div class="grid2">
        <div class="access-item mb1" @click="enable('accessAll')">
          <p>Доступ всем</p>
          <div class="switch" :class="{ active: main.access.accessAll }">
            <span class="circle"></span>
          </div>
        </div>
      </div>
      <div class="grid2">
        <div class="access-item mb1" @click="enable('accessAuth')">
          <p>Зарегистрированные пользователи</p>
          <div class="switch" :class="{ active: main.access.accessAuth }">
            <span class="circle"></span>
          </div>
        </div>
      </div>
      <div class="grid2">
        <div class="access-item mb1" @click="enable('accessTrans')">
          <p>При транзакции</p>
          <div class="switch" :class="{ active: main.access.accessTrans }">
            <span class="circle"></span>
          </div>
        </div>
      </div>
    </div>
    <el-button
      class="btn edit mt3 i1"
      type="primary"
      :loading="loading"
      @click="onSubmit"
    >
      Сохранить изменения
    </el-button>
  </el-form>
</template>

<script>
export default {
  layout: 'userSettings',
  middleware: ['admin-auth'],
  async validate({ params }) {
    return Boolean(params.id)
  },
  async asyncData({ store, params }) {
    let user = await store.dispatch('user/fetchById', params.id)

    return {
      main: {
        access: user.access
      }
    }
  },
  head() {
    return {
      title: 'Lavzee | ' + this.title
    }
  },
  data() {
    return {
      title: 'Доступ к профилю',
      loading: false
    }
  },
  methods: {
    enable(item) {
      Object.keys(this.main.access).map((key) => {
        this.main.access[key] = false
      })
      this.main.access[item] = !this.main.access[item]
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            id: this.$route.params.id,
            access: this.main.access
          }

          try {
            await this.$store.dispatch('user/updateAccess', formData)
            this.$message.success('Изменения сохранены')
          } catch (e) {
          } finally {
            this.loading = false
          }
        } else {
          this.$message.warning('Форма не валидна')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.context {
  max-width: 415px;
  font-size: 1.4rem;
  color: $gray;
  font-weight: 400;
  line-height: 150%;
}

.access-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $white;
  padding: 1.8rem 1.6rem;
  border: 1px solid rgba(19, 116, 246, 0.32);
  border-radius: 4px;
  cursor: pointer;

  .switch.active {
    background: $blue;
    .circle {
      background: $white;
      left: 60%;
    }
  }

  p {
    font-size: 1.4rem;
    font-weight: 500;
    color: $black;
    margin-bottom: 0;
  }
}
</style>
