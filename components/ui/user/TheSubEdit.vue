<template>
  <el-form
    :model="subs"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <div class="wrap mb1">
      <div class="settings-input mb2">
        <el-form-item label="Имя" prop="name">
          <input v-model="subs.name" placeholder="Впишите имя" />
        </el-form-item>
      </div>

      <div class="settings-input mb2">
        <el-form-item label="Фамилия" prop="surname">
          <input v-model="subs.surname" placeholder="Впишите фамилию" />
        </el-form-item>
      </div>

      <div class="settings-input">
        <el-form-item label="Номер телефона" prop="telephone">
          <input
            type="text"
            id="telephone"
            placeholder="Впишите номер"
            maxlength="15"
            v-model.trim="subs.telephone"
            @input="acceptNumber($event.target.value)"
          />
        </el-form-item>
      </div>
    </div>
    <el-button
      class="btn cancel mt3 i1"
      type="primary"
      :loading="loading"
      @click="onSubmit"
    >
      Добавить
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      subs: { name: '', surname: '', telephone: '' },
      loading: false,
      rules: {
        telephone: [
          {
            required: true,
            message: 'Введите номер телефона',
            trigger: 'blur'
          },
          {
            min: 11,
            message: 'Номер не должен быть менее 10 символов',
            trigger: ['blur', 'change']
          }
        ],
        name: [
          {
            required: true,
            message: 'Введите имя',
            trigger: 'blur'
          },
          {
            min: 2,
            message: 'Имя не должно быть менее 2 символов',
            trigger: ['blur', 'change']
          }
        ],
        surname: [
          {
            required: true,
            message: 'Введите фамилию',
            trigger: 'blur'
          },
          {
            min: 2,
            message: 'Фамилия не должна быть менее 2 символов',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            id: this.$route.params.id,
            subsNP: {
              name: this.subs.name,
              surname: this.subs.surname,
              telephone: this.subs.telephone
            }
          }

          try {
            await this.$store.dispatch('user/updateSubsNP', formData)
            this.$message.success('Субзаказчик добавлен')
            this.subs.name = ''
            this.subs.surname = ''
            this.subs.telephone = ''
            this.$nuxt.refresh()
          } catch (e) {
          } finally {
            this.loading = false
          }
        } else {
          this.$message.warning('Форма не валидна')
        }
      })
    },
    acceptNumber(item) {
      const regex = item.replace(/\D/g, '')
      if (item.length !== 0) {
        this.subs.telephone = '+' + regex
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-input {
  .el-form-item {
    margin-bottom: 0;
  }
  input {
    height: 47px;
  }
}

.wrap {
  padding: 2rem 1.3rem;
  border: 1px solid $light-gray;
  border-radius: 4px;
  height: 300px;
  overflow: auto;
}
</style>
