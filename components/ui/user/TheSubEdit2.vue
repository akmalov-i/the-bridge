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
        <el-form-item label="Адрес" prop="address">
          <input v-model="subs.address" placeholder="Впишите адрес" />
        </el-form-item>
      </div>

      <div class="settings-input mb2">
        <el-form-item label="Номер телефона" prop="telephone">
          <input
            type="text"
            id="telephone"
            placeholder="Впишите номер телефона"
            maxlength="15"
            v-model.trim="subs.telephone"
            @input="acceptNumber($event.target.value)"
          />
        </el-form-item>
      </div>

      <div class="settings-input">
        <el-form-item label="№ Лицензии/ИНН" prop="lic">
          <input
            type="text"
            id="lic"
            placeholder="Впишите номер Лицензии/ИНН"
            maxlength="15"
            v-model.trim="subs.lic"
            @input="acceptLic($event.target.value)"
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
      subs: { name: '', address: '', telephone: '', lic: '' },
      loading: false,
      rules: {
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
        address: [
          {
            required: true,
            message: 'Введите адрес',
            trigger: 'blur'
          },
          {
            min: 10,
            message: 'Адрес не должен быть менее 10 символов',
            trigger: ['blur', 'change']
          }
        ],
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
        lic: [
          {
            required: true,
            message: 'Введите номер лицензии/ИНН',
            trigger: 'blur'
          },
          {
            min: 8,
            message: 'Номер лицензии/ИНН не должен быть менее 8 символов',
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
            subsLE: {
              name: this.subs.name,
              address: this.subs.address,
              telephone: this.subs.telephone,
              lic: this.subs.lic
            }
          }

          try {
            await this.$store.dispatch('user/updateSubsLE', formData)
            this.$message.success('Субзаказчик добавлен')
            this.subs.name = ''
            this.subs.address = ''
            this.subs.telephone = ''
            this.subs.lic = ''
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
    },
    acceptLic(item) {
      const regex = item.replace(/\D/g, '')
      if (item.length !== 0) {
        this.subs.lic = regex
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
