<template>
  <el-form
    :style="{ 'min-height': '680px' }"
    :model="main"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <div class="settings-container">
      <div class="settings-header">
        <div class="header-left">
          <h2 class="mb1">{{ this.title }}</h2>
          <p class="context">
            Рыбатекст используется дизайнерами, проектировщиками и
            фронтендерами, когда нужно быстро
          </p>
        </div>
      </div>
      <hr />
      <div class="grid2 mb3">
        <div class="settings-input mr3">
          <el-form-item label="Instagram:" prop="instagram">
            <input
              type="text"
              id="instagram"
              maxlength="500"
              placeholder="Вставьте в поле ссылку..."
              v-model.trim="main.links.instagram"
            />
          </el-form-item>
        </div>
        <div class="settings-input mr3">
          <el-form-item label="Whatsapp:" prop="whatsapp">
            <input
              type="text"
              id="whatsapp"
              maxlength="500"
              placeholder="Вставьте в поле ссылку..."
              v-model.trim="main.links.whatsapp"
            />
          </el-form-item>
        </div>
      </div>
      <div class="grid2 mb2">
        <div class="settings-input mr3">
          <el-form-item label="Telegram:" prop="telegram">
            <input
              type="text"
              id="telegram"
              maxlength="500"
              placeholder="Вставьте в поле ссылку..."
              v-model.trim="main.links.telegram"
            />
          </el-form-item>
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
  layout: 'settings',
  middleware: ['user-auth'],
  async validate({ store, params }) {
    let userId = await store.getters['auth/userId']
    return Boolean(params.id === userId)
  },
  async asyncData({ store, params }) {
    let isMe = false
    let userId = await store.getters['auth/userId']
    let user = await store.dispatch('user/fetchById', params.id)
    if (params.id === userId) isMe = true

    return {
      main: {
        links: user.links
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
      title: 'Социальные сети',
      loading: false
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            id: this.$route.params.id,
            links: this.main.links
          }

          try {
            await this.$store.dispatch('user/updateLinks', formData)
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

label {
  display: flex;
  align-items: center;
}

.settings-input {
  .el-form-item {
    margin-bottom: 0;
  }
  input {
    height: 47px;
  }
}

hr {
  height: 1px;
  width: 100%;
  background: $light-gray;
  min-width: 200px;
  margin: 2.4rem 0;
}
</style>
