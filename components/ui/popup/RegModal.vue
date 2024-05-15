<template>
  <div class="modal" v-if="status">
    <div class="overlay"></div>
    <el-form
      :model="config.params"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
      class="popup"
    >
      <div class="cancel" @click="$emit('update:status', false)">
        <cancelSvg />
      </div>
      <div class="popup__head">
        <h2 class="mb3">Заявка на регистрацию</h2>
        <div class="left mb2">
          <AuthComponent
            title="Исполнитель"
            val="executor"
            :data.sync="config.params.data"
          />
          <AuthComponent
            title="Заказчик"
            val="customer"
            :data.sync="config.params.data"
          />
        </div>
      </div>
      <div class="grid2 i3">
        <div class="settings-input mr3">
          <el-form-item label="Имя" prop="name">
            <input
              type="text"
              maxlength="20"
              id="name"
              placeholder="Ваше имя"
              v-model.trim="config.params.name"
            />
          </el-form-item>
        </div>
        <div class="settings-input">
          <el-form-item label="Фамилия" prop="surname">
            <input
              type="text"
              maxlength="20"
              id="surname"
              placeholder="Ваша фамилия"
              v-model.trim="config.params.surname"
            />
          </el-form-item>
        </div>
      </div>
      <div class="grid2 i2 mb2">
        <div class="mr3">
          <div class="select-wrap select-drop">
            <p class="drop-p">Дата рождения</p>
            <el-date-picker
              class="calendar-birthday"
              v-model="config.params.dateOfBirth"
              type="date"
              placeholder="place"
              format="dd.MM.yyyy"
              :clearable="false"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="select-wrap select-drop">
          <p class="drop-p">Город проживания</p>
          <country-select>
            <template #title>
              <h4>{{ config.params.fromCity.label }}</h4>
            </template>
            <template #country>
              <div class="select-wrap">
                <p>Страна</p>
                <el-select
                  v-model="config.params.fromCountry"
                  placeholder="Выбрать"
                >
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
                <el-select
                  v-model="config.params.fromCity"
                  placeholder="Выбрать"
                >
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
      </div>
      <div class="grid2 i1 mb2">
        <div class="settings-input mr3">
          <el-form-item label="Номер телефона" prop="telephone">
            <input
              type="text"
              id="telephone"
              placeholder="Ваш телефон"
              maxlength="15"
              v-model.trim="config.params.telephone"
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
              v-model.trim="config.params.email"
            />
          </el-form-item>
        </div>
      </div>
      <div class="t-area">
        <el-form-item prop="textarea">
          <el-input
            type="textarea"
            v-model="config.params.textarea"
            id="textarea"
            class="textarea"
            placeholder="Расскажите немного о себе ..."
            maxlength="1200"
          />
        </el-form-item>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="#"
          :before-upload="upload"
          :limit="1"
          :file-list="config.params.fileList"
          :on-change="changeFileList"
          :on-remove="changeFileList"
          :auto-upload="false"
        >
          <fileSvg />
        </el-upload>
      </div>
      <div class="popup__btn">
        <el-button
          class="btn edit"
          type="primary"
          :loading="loading"
          @click="onSubmit"
        >
          Отправить
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import fileSvg from '@/assets/icons/file.svg?inline'
import { check } from '@/content/create-categories'
import { citiesAndCountries } from '@/content/cities.countries'
import cancelSvg from '@/assets/icons/x.svg?inline'
import moment from 'moment'

export default {
  props: {
    status: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > moment().subtract(15, 'years') ||
            time.getTime() < moment().subtract(69, 'years')
          )
        }
      },
      config: {
        params: {
          data: 'executor',
          name: '',
          surname: '',
          telephone: '',
          email: '',
          dateOfBirth: moment().subtract(15, 'years').format('YYYY'),
          fromCountry: { value: 'Uzbekistan', label: 'Узбекистан' },
          fromCity: { value: 'Tashkent', label: 'Ташкент' },
          textarea: ''
        }
      },
      rules: {
        textarea: [
          {
            required: true,
            message: 'Расскажите о себе',
            trigger: 'blur'
          },
          {
            min: 80,
            message:
              'Расскажите подробно, в поле не должно быть менее 80 символов',
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
        ],
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
      ...citiesAndCountries
    }
  },
  methods: {
    acceptNumber(item) {
      const regex = item.replace(/\D/g, '')
      if (item.length !== 0) {
        this.config.params.telephone = '+' + regex
      }
    },
    changeFileList(file, fileList) {
      this.config.params.fileList = fileList
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          try {
            const formData = {
              data: this.config.params.data,
              name: this.config.params.name,
              surname: this.config.params.surname,
              dateOfBirth: this.config.params.dateOfBirth,
              telephone: this.config.params.telephone,
              email: this.config.params.email,
              fromCountry: this.config.params.fromCountry,
              fromCity: this.config.params.fromCity,
              textarea: this.config.params.textarea,
              dateOfCreation: moment()
            }

            await this.$store.dispatch('auth/createUser', formData)
            this.$emit('update:status', false)
            this.$message.success('Новый пользователь добавлен')
            this.config.params.data = 'executor'
            this.config.params.name = ''
            this.config.params.surname = ''
            this.config.params.telephone = ''
            this.config.params.dateOfBirth = moment().format('YYYY[-]MM[-]DD')
            this.config.params.email = ''
            this.config.params.fromCountry = {
              value: 'Uzbekistan',
              label: 'Узбекистан'
            }
            this.config.params.fromCity = {
              value: 'Tashkent',
              label: 'Ташкент'
            }
            this.config.params.textarea = ''
            this.loading = false
          } catch (e) {
            this.loading = false
          }
        }
      })
    },
    ...check
  },
  components: {
    fileSvg,
    cancelSvg
  }
}
</script>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.8;
    }
  }

  @keyframes up {
    0% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .select-wrap.select-drop {
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
      height: 51px;
    }
  }

  .cancel {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $light-blue;
    z-index: 3;
    transition: 0.4s;

    &:hover {
      background: $blue;
      svg {
        fill: $white;
      }
    }

    svg {
      fill: $blue;
      transition: 0.4s;
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: $black;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    animation: fadeIn 0.7s forwards;
  }

  .grid2,
  .t-area {
    width: 100%;
  }

  .t-area {
    margin-bottom: 0;
  }

  .popup {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 600px;
    z-index: 1;
    background: $white;
    border-radius: 8px;
    padding: 3.2rem 3.2rem;
    margin: 2rem;
    animation: up 0.7s forwards;

    .select-drop {
      position: relative;
      z-index: 1999;
    }

    h2 {
      font-weight: 700;
      font-size: 3.6rem;
      line-height: 28px;
      color: $black;
    }

    .left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
}
</style>
