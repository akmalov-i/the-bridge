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
    </div>
    <el-button
      class="btn cancel mt3 i1"
      type="primary"
      :loading="loading"
      @click="onSubmit"
    >
      Редактировать
    </el-button>
  </el-form>
</template>

<script>
export default {
  emits: ['update:editing', 'update:button'],
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  created() {
    this.subs.name = this.data.name
    this.subs.surname = this.data.surname
    this.subs.telephone = this.data.telephone
  },
  data() {
    return {
      subs: { name: '', surname: '', telephone: '' },
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
            await this.$store.dispatch('user/setSubsNP', formData)
            this.$message.success('Изменения сохранены')
            this.$emit('update:button', null)
            this.$emit('update:editing', null)
            this.$nuxt.refresh()
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
