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
            <h1>Авторизация в системе</h1>
            <div class="left mb3">
              <AuthComponent title="E-mail" val="email" :data.sync="data" />
              <AuthComponent title="Телефон" val="phone" :data.sync="data" />
              <AuthComponent title="Телеграм" val="tg" :data.sync="data" />
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
                  <el-input v-model.trim="config.params.email" type="text" />
                </el-form-item>
              </div>
              <div class="settings-input mb2">
                <el-form-item label="Пароль" prop="password">
                  <el-input
                    v-model.trim="config.params.password"
                    type="password"
                  />
                </el-form-item>
              </div>

              <el-button
                class="btn edit mb08"
                type="primary"
                native-type="submit"
                :loading="loading"
              >
                Войти
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
              <div class="settings-input mb2">
                <el-form-item label="Пароль" prop="password">
                  <el-input
                    v-model.trim="configPhone.params.password"
                    type="password"
                  />
                </el-form-item>
              </div>

              <el-button
                class="btn edit mb08"
                type="primary"
                native-type="submit"
                :loading="loading"
              >
                Войти
              </el-button>
            </el-form>

            <nuxt-link to="/auth/forgot" class="forgot-btn">
              Забыли пароль?
            </nuxt-link>
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
  async asyncData({ store }) {
    let isAuthenticated = await store.getters['auth/isAuthenticated']
    let userId = ''
    if (isAuthenticated) {
      userId = await store.getters['auth/userId']
    }
    return { userId }
  },
  data() {
    return {
      loading: false,
      data: 'email',
      config: {
        params: {
          email: '',
          password: ''
        }
      },
      configPhone: {
        params: {
          phone: '',
          password: ''
        }
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
        password: [
          { required: true, message: 'Введите пароль', trigger: 'blur' },
          {
            min: 6,
            message: 'Пароль должен быть не менее 6 символов',
            trigger: 'blur'
          }
        ]
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
      },
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
      }
    }
  },
  mounted() {
    const { message } = this.$route.query

    switch (message) {
      case 'login':
        this.$message.info({
          showClose: true,
          message: 'Для начала войдите в систему!'
        })
        break
      case 'logout':
        this.$message.success({
          showClose: true,
          message: 'Вы успешно вышли из системы!'
        })
        break
      case 'session':
        this.$message.warning({
          showClose: true,
          message: 'Время сессии истекло, пожалуйста зайдите заново'
        })
        break
    }
  },
  methods: {
    acceptNumber(item) {
      const regex = item.replace(/\D/g, '')
      if (item.length !== 0) {
        this.configPhone.params.phone = '+' + regex
      }
    },
    onSubmitEmail() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          try {
            const formData = {
              email: this.config.params.email,
              password: this.config.params.password
            }

            await this.$store.dispatch('auth/loginByEmail', formData)
            let userId = await this.$store.getters['auth/userId']
            this.$router.push(`/user/${userId}`)
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
              password: this.configPhone.params.password
            }

            await this.$store.dispatch('auth/loginByNumber', formData)
            let userId = await this.$store.getters['auth/userId']
            this.$router.push(`/user/${userId}`)
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

.forgot-btn {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: rgba(125, 125, 125, 0.72);
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
