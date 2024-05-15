<template>
  <el-form
    :model="main"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
    :style="{ 'min-height': '680px' }"
  >
    <div class="settings-container">
      <h2 class="mb1">{{ this.title }}</h2>
      <p class="context">
        Рыбатекст используется дизайнерами, проектировщиками и фронтендерами,
        когда нужно быстро
      </p>
      <hr />
      <div class="grid3 mb24 i4">
        <div class="select-wrap mr3 select-drop">
          <p class="drop-p">Город проживания</p>
          <country-select>
            <template #title>
              <h4>{{ main.fromCity.label }}</h4>
            </template>
            <template #country>
              <div class="select-wrap">
                <p>Страна</p>
                <el-select v-model="main.fromCountry" placeholder="Выбрать">
                  <el-option
                    v-for="item in country"
                    :key="item.value"
                    :label="item.label"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
            </template>
            <template #city>
              <div class="select-wrap">
                <p>Город</p>
                <el-select v-model="main.fromCity" placeholder="Выбрать">
                  <el-option
                    v-for="item in city"
                    :key="item.value"
                    :label="item.label"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
            </template>
          </country-select>
        </div>

        <div class="settings-input mr3">
          <el-form-item label="Номер телефона" prop="telephone">
            <input
              type="text"
              id="telephone"
              placeholder="Ваш телефон"
              maxlength="15"
              v-model.trim="main.telephone"
              @input="acceptNumber($event.target.value)"
            />
          </el-form-item>
        </div>

        <div class="settings-input">
          <el-form-item label="E-mail" prop="email">
            <input
              type="email"
              id="email"
              maxlength="40"
              placeholder="E-mail"
              required
              v-model.trim="main.email"
            />
          </el-form-item>
        </div>
      </div>
      <div class="grid1-2 mb5 i3">
        <div class="select-settings mr3">
          <p style="transform: translateY(15%)">Укажите опыт</p>
          <el-select v-model="main.exp" placeholder="Выбрать" @change="pusher($event, 'exp')">
            <el-option
              v-for="item in exp"
              :key="item.value"
              :label="item.label"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <TheProfession
          title="Знание языков"
          :selected-list="main.langs"
          :whole-list="langs"
          :max-number="100"
          :show-max-number="false"
          @addSelect="addSelect"
          @deleteSelected="deleteSelected"
        />
      </div>
      <div class="grid3 i2">
        <div class="select-settings mr3">
          <p>Наличие авто</p>
          <el-select v-model="main.car" placeholder="Выбрать" @change="pusher($event, 'car')">
            <el-option
              v-for="item in car"
              :key="item.value"
              :label="item.label"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="select-settings mr3">
          <p>Образования</p>
          <el-select v-model="main.knowledge" placeholder="Выбрать" @change="pusher($event, 'knowledge')">
            <el-option
              v-for="item in knowledge"
              :key="item.value"
              :label="item.label"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="select-settings">
          <p>Инструменты/материалы</p>
          <el-select v-model="main.tools" placeholder="Выбрать" @change="pusher($event, 'tools')">
            <el-option
              v-for="item in tools"
              :key="item.value"
              :label="item.label"
              :value="item"
            >
            </el-option>
          </el-select>
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
import questionSvg from '@/assets/icons/question.svg?inline'
import { citiesAndCountries } from '@/content/cities.countries'
import { json } from '@/content/create-categories'

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
        fromCity: user.fromCity,
        fromCountry: user.fromCountry,
        telephone: user.telephone,
        email: user.email,
        car: user.car,
        tools: user.tools,
        knowledge: user.knowledge,
        exp: user.exp,
        langs: user.langs
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
      title: 'Детали',
      loading: false,
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
        ]
      },
      ...json,
      ...citiesAndCountries
    }
  },
  methods: {
    pusher(item, name) {
      let obj = this[name].find((e) => e.value === item.value)
      let main = this.main[name]
      main.label = obj.label
      main.value = obj.value
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            id: this.$route.params.id,
            fromCity: this.main.fromCity,
            fromCountry: this.main.fromCountry,
            telephone: this.main.telephone,
            email: this.main.email,
            car: this.main.car,
            tools: this.main.tools,
            knowledge: this.main.knowledge,
            exp: this.main.exp,
            langs: this.main.langs
          }

          try {
            await this.$store.dispatch('user/updateDetails', formData)
            this.$message.success('Изменения сохранены')
          } catch (e) {
          } finally {
            this.loading = false
          }
        } else {
          this.$message.warning('Форма не валидна')
        }
      })
    },
    addSelect(item) {
      this.main.langs.push({
        label: item.label,
        value: item.value,
        disabled: item.disabled
      })
    },
    deleteSelected(item, idx) {
      this.main.langs.splice(idx, 1)
    },
    acceptNumber(item) {
      const regex = item.replace(/\D/g, '')
      if (item.length !== 0) {
        this.main.telephone = '+' + regex
      }
    }
  },
  components: {
    questionSvg
  }
}
</script>

<style lang="scss" scoped>
.pro-wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

ul {
  min-height: 47px;
}

.context {
  max-width: 415px;
  font-size: 1.4rem;
  color: $gray;
  font-weight: 400;
  line-height: 150%;
}

.select-wrap.select-drop {
  width: unset;
  .drop-p {
    position: relative;
    left: 0;
    font-size: 1.4rem;
  }
  .select {
    width: 100%;
    background: #f0f0ff;
    border: 1px solid rgba(19, 116, 246, 0.32);
    color: #161616;
    border-radius: 4px;
    height: 47px;
  }
}

.settings-input {
  .el-form-item {
    margin-bottom: 0;
  }
  input {
    height: 47px;
  }
}

label {
  display: flex;
  align-items: center;
}

.question {
  stroke: $gray;
  margin-left: 0.8rem;
  cursor: pointer;
}

hr {
  height: 1px;
  width: 100%;
  background: $light-gray;
  min-width: 200px;
  margin: 2.4rem 0;
}
</style>
