<template>
  <el-card shadow="always" :style="{ width: '500px' }">
    <el-form
      :model="config.params"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <h2>Войти в панель управления</h2>

      <el-form-item label="E-mail" prop="email">
        <el-input v-model.trim="config.params.email" type="text" />
      </el-form-item>

      <el-form-item label="Пароль" prop="password">
        <el-input v-model.trim="config.params.password" type="password" />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          :style="{ color: '#fff' }"
          round
          :loading="loading"
        >
          Войти
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      loading: false,
      config: {
        params: {
          email: '',
          password: ''
        }
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Введите e-mail',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Введите корректный e-mail',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          { required: true, message: 'Введите пароль', trigger: 'blur' },
          {
            min: 6,
            message: 'Пароль должен быть не менее 6 символов',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    const { message } = this.$route.query

    switch (message) {
      case 'login':
        this.$message.info('Для начала войдите в систему!')
        break
      case 'logout':
        this.$message.success('Вы успешно вышли из системы!')
        break
      case 'session':
        this.$message.warning('Время сессии истекло, пожалуйста зайдите заново')
        break
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          try {
            const formData = {
              email: this.config.params.email,
              password: this.config.params.password
            }

            await this.$store.dispatch('auth/login', formData)
            this.$router.push('/admin')
          } catch (e) {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  padding: 0.6rem;
}
</style>