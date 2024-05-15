<template>
  <v-app>
    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
    </Navbar>
    <div class="auth-bg">
      <div class="page-container">
        <el-row type="flex" justify="space-between">
          <Aside class="auth-side">
            <h1>Восстановить пароль</h1>
            <div class="left mb3">
              <AuthComponent title="E-mail" val="email" :data.sync="data" />
              <AuthComponent title="Телефон" val="phone" :data.sync="data" />
            </div>

            <el-form
              :model="config.params"
              :rules="rules"
              :key="data"
              @submit.native.prevent="onSubmitEmail"
              ref="form"
              v-if="data === 'email'"
            >
              <div class="settings-input">
                <el-form-item label="E-mail" prop="email">
                  <el-input
                    v-model.trim="config.params.email"
                    type="text"
                    @input="acceptEmail"
                  />
                </el-form-item>
              </div>

              <div class="settings-input" v-if="this.isCodeSent">
                <el-form-item label="Код подтверждения" prop="code">
                  <input
                    type="text"
                    id="code"
                    maxlength="6"
                    v-model.trim="config.params.code"
                    @input="codeValidation"
                  />
                </el-form-item>
              </div>

              <div class="something">
                <p class="forgot-btn">
                  На Е-mail будет отправлен код подтверждения
                </p>
                <el-button
                  class="retry-btn"
                  @click="sendRestoreCode"
                  :disabled="timerCount != 0 || !isValidEmail"
                >
                  Отправить код подтверждения
                  {{ timerCount != 0 ? '(' : '' }}
                  {{ timerCount != 0 ? timerCount : '' }}
                  {{ timerCount != 0 ? 'секунд )' : '' }}
                </el-button>
              </div>
              <el-button
                class="btn edit mt2 mb08"
                type="primary"
                native-type="submit"
                :loading="loading"
                :disabled="
                  !isCodeSent || !isValidEmail || config.params.code.length != 6
                "
              >
                Восстановить пароль
              </el-button>
            </el-form>

            <el-form
              :model="configPhone.params"
              :rules="rulesPhone"
              :key="data"
              @submit.native.prevent="onSubmitNumber"
              ref="formPhone"
              v-if="data === 'phone'"
            >
              <div class="settings-input">
                <el-form-item label="Номер телефона" prop="phone">
                  <input
                    type="text"
                    id="phone"
                    maxlength="15"
                    v-model.trim="configPhone.params.phone"
                    @input="acceptNumber($event.target.value)"
                  />
                </el-form-item>
              </div>
              <div class="settings-input" v-if="this.isPhoneCodeSent">
                <el-form-item label="Код подтверждения" prop="code">
                  <input
                    type="text"
                    id="code"
                    maxlength="6"
                    v-model.trim="configPhone.params.code"
                    @input="codeValidation"
                  />
                </el-form-item>
              </div>
              <div class="something">
                <p class="forgot-btn">
                  На номер телефона будет отправлен код подтверждения
                </p>
                <el-button
                  class="retry-btn"
                  @click="sendPhoneRestoreCode"
                  :disabled="phoneTimerCount != 0 || !isValidNumber"
                >
                  Отправить код подтверждения
                  {{ phoneTimerCount != 0 ? '(' : '' }}
                  {{ phoneTimerCount != 0 ? phoneTimerCount : '' }}
                  {{ phoneTimerCount != 0 ? 'секунд )' : '' }}
                </el-button>
              </div>

              <el-button
                class="btn edit mt2 mb08"
                type="primary"
                native-type="submit"
                :loading="loading"
                :disabled="
                  !isPhoneCodeSent ||
                  !isValidNumber ||
                  configPhone.params.code.length != 6
                "
              >
                Восстановить пароль
              </el-button>
            </el-form>

            <nuxt-link to="/auth" class="forgot-btn">Войти в аккаунт</nuxt-link>
          </Aside>
          <Main>
            <nuxt-link class="cancel" to="/">
              <cancelSvg />
            </nuxt-link>
            <client-only>
              <swiper class="swiper" :options="swiperOption">
                <swiper-slide v-for="(item, idx) in slides" :key="idx">
                  <div class="item">
                    <nuxt-img :src="`/${item}`" />
                    <h3>Мост доверия на пути вашего развития!</h3>
                    <p>
                      Требовании и обязанности: - Установка и обслуживание
                      компьютерной и офисной техники, оргтехники. - Установка,
                      настройка и обн
                    </p>
                  </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev">
                  <i class="iconfont icon-arrow-down"></i>
                </div>
                <div class="swiper-button-next" slot="button-next">
                  <i class="iconfont icon-arrow-up"></i>
                </div>
              </swiper>
            </client-only>
          </Main>
        </el-row>
      </div>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import cancelSvg from '@/assets/icons/x.svg?inline'

export default {
  data() {
    return {
      loading: false,
      data: 'email',
      isValidEmail: false,
      isValidNumber: false,
      isCodeSent: false,
      isPhoneCodeSent: false,
      slides: ['auth1.png', 'auth2.png', 'auth3.png'],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 35,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        speed: 1500,
        autoplay: {
          delay: 2500
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 0
          }
        }
      },
      timerCount: 0,
      phoneTimerCount: 0,
      config: {
        params: {
          email: '',
          code: ''
        }
      },
      configPhone: {
        params: {
          phone: '',
          code: ''
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
        code: [
          {
            required: true,
            message: 'Введите код подтверждения',
            trigger: 'blur'
          },
          {
            max: 6,
            min: 6,
            message: 'Код должен состоять из 6 цифр',
            trigger: 'blur'
          }
        ]
      },
      rulesPhone: {
        phone: [
          {
            required: true,
            message: 'Введите номер телефона',
            trigger: 'blur'
          },
          {
            min: 11,
            message: 'Номер должен быть не менее 10 цифр',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: 'Введите код подтверждения',
            trigger: 'blur'
          },
          {
            max: 6,
            min: 6,
            message: 'Код должен состоять из 6 цифр',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  async asyncData({ store }) {
    let isAuthenticated = await store.getters['auth/isAuthenticated']
    let userId = ''
    if (isAuthenticated) {
      userId = await store.getters['auth/userId']
    }
    return { userId }
  },
  async created() {
    this.timerCount = await this.$store.getters['forgot/isTimerExists']
    this.isCodeSent = this.timerCount
    this.startCountDown()

    this.phoneTimerCount = await this.$store.getters[
      'forgot/isPhoneTimerExists'
    ]
    this.isPhoneCodeSent = this.phoneTimerCount
    this.startPhoneCountDown()
  },
  methods: {
    async sendRestoreCode() {
      const randomCode = Math.floor(Math.random() * (999999 - 100000) + 100000)
      try {
        const formData = {
          email: this.config.params.email,
          code: randomCode
        }
        await this.$store.dispatch('forgot/createCode', formData)
        this.countDownTimer()
      } catch (e) {}
    },
    async sendPhoneRestoreCode() {
      const randomCode = Math.floor(Math.random() * (999999 - 100000) + 100000)
      try {
        const formData = {
          phone: this.configPhone.params.phone,
          code: randomCode
        }
        await this.$store.dispatch('forgot/createPhoneCode', formData)
        this.phoneCountDownTimer()
      } catch (e) {}
    },
    acceptNumber(item) {
      const regex = item.replace(/\D/g, '')
      if (item.length !== 0) {
        this.configPhone.params.phone = '+' + regex
        if (item.length > 10) {
          this.isValidNumber = true
        }
      }
    },
    acceptEmail(item) {
      const toBoolean = String(item)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      this.isValidEmail = !!toBoolean
    },
    async countDownTimer() {
      this.isCodeSent = true
      this.timerCount = 75
      await this.$store.dispatch('forgot/set', this.timerCount)
      this.startCountDown()
    },
    async phoneCountDownTimer() {
      this.isPhoneCodeSent = true
      this.phoneTimerCount = 75
      await this.$store.dispatch('forgot/setPhone', this.phoneTimerCount)
      this.startPhoneCountDown()
    },
    async startCountDown() {
      if (this.timerCount > 0) {
        setTimeout(async () => {
          this.timerCount -= 1
          await this.$store.dispatch('forgot/set', this.timerCount)
          this.startCountDown()
        }, 1000)
      }
    },
    async startPhoneCountDown() {
      if (this.phoneTimerCount > 0) {
        setTimeout(async () => {
          this.phoneTimerCount -= 1
          await this.$store.dispatch('forgot/setPhone', this.phoneTimerCount)
          this.startPhoneCountDown()
        }, 1000)
      }
    },
    codeValidation(item) {
      const regex = item.target.value.replace(/\D/g, '')
      if (item.target.value.length !== 0) {
        this.config.params.code = regex
      }
    },
    onSubmitEmail() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            const formData = {
              email: this.config.params.email,
              code: this.config.params.code
            }

            await this.$store.dispatch('forgot/forgotByEmail', formData)
            let userId = await this.$store.getters['auth/userId']
            this.$router.push(`/user/${userId}`)
            this.loading = false
          } catch (e) {
            this.loading = false
          }
        }
      })
    },
    onSubmitNumber() {
      this.$refs.formPhone.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            const formData = {
              phone: this.configPhone.params.phone,
              code: this.configPhone.params.code
            }

            await this.$store.dispatch('forgot/forgotByPhone', formData)
            let userId = await this.$store.getters['auth/userId']
            this.$router.push(`/user/${userId}`)
            this.loading = false
          } catch (e) {
            this.loading = false
          }
        }
      })
    }
  },
  components: {
    cancelSvg
  }
}
</script>

<style lang="scss" scoped>
.settings-input input {
  height: 44px;
}

.btn.edit[disabled] {
  background: rgba(125, 125, 125, 0.3);
}

.retry-btn[disabled] {
  pointer-events: none;
  font-weight: 400;
  color: rgba(125, 125, 125, 0.72);
}
.auth-bg {
  background: $blue;
  padding: 3.2rem 0;
}
.left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.auth-side {
  height: 720px;
  background: $white;
  margin: 0;
  width: 40%;
  border-radius: 4px 0px 0px 4px;
  padding: 5.2rem 3.2rem;
}
.main {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 720px;
  background: $azure;
  border: 0;
  width: 60%;
  border-radius: 0px 4px 4px 0px;
}
.cancel {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $white;
  z-index: 3;

  svg {
    fill: $blue;
  }
}
.header {
  margin-bottom: 0;
}

.something {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.forgot-btn {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: rgba(125, 125, 125, 0.72);
}

.retry-btn {
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: $blue;
}

.swiper-slide {
  .item {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6.8rem;
    margin-top: 6.8rem;
  }
  h3 {
    margin-top: 6.8rem;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 1.4rem;
  }

  p {
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    max-width: 480px;
    text-align: center;
  }
}
.swiper-button-prev,
.swiper-button-next {
  background: $white;
  border-radius: 50%;
  border: 1px solid rgba(125, 125, 125, 0.32);
  width: 32px;
  height: 32px;
  transition: 0.4s;

  &:hover {
    border: 1px solid $orange;
    background: $orange;

    &::after {
      color: $white;
    }
  }
}

.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: unset;
  bottom: 0 !important;
}

.swiper-pagination {
  font-family: 'Gilroy';
  font-style: normal;
  position: absolute;
  font-size: 1.6rem;
  left: unset;
  width: unset;
  height: unset;
  text-align: unset;
  top: unset;
  bottom: 4px !important;
  right: 45%;
  transform: translateX(-50%);
  color: $gray;
  font-weight: 500;
}

.swiper-button-next.swiper-button-disabled,
.swiper-button-prev.swiper-button-disabled {
  opacity: 1;
}

.swiper-button-prev {
  left: unset;
  right: 55%;
  transform: translateX(-50%);
}

.swiper-button-next {
  left: unset;
  right: 35%;
  transform: translateX(-50%);
}

.swiper-button-prev:after {
  color: $gray;
  font-size: 0.8rem;
  font-weight: 500;
  width: 6px;
  height: 8px;
  transition: 0.4s;
}

.swiper-button-next:after {
  color: $gray;
  font-size: 0.8rem;
  font-weight: 500;
  width: 4px;
  height: 8px;
}
</style>
