<template>
  <div>
    <RegModal :status.sync="isOpenModal" />
    <el-footer height="auto">
      <el-row
        type="flex"
        align="middle"
        justify="space-between"
        class="footer-head"
      >
        <el-col :span="6" :xl="5" class="footer-head-left space-between">
          <nuxt-link to="/">О нас</nuxt-link>
          <nuxt-link to="/">Новости</nuxt-link>
          <nuxt-link to="/">Контакты</nuxt-link>
          <nuxt-link to="/">FAQ</nuxt-link>
        </el-col>
        <el-col :span="9" class="footer-head-right end">
          <button type="button" class="for-sign-up" @click="isOpenModal = true">
            Заявка на регистрацию
          </button>
          <nuxt-link to="/create/experience" class="exp-button">
            <ExperienceSvg />
            Поделиться опытом
          </nuxt-link>
        </el-col>
      </el-row>

      <el-row
        type="flex"
        align="middle"
        justify="space-between"
        class="footer-middle"
      >
        <el-col :span="7" :xl="6" class="footer-middle-left">
          <nuxt-link to="/">Facebook</nuxt-link>
          <nuxt-link to="/">Instagram</nuxt-link>
          <nuxt-link to="/">Telegram</nuxt-link>
          <nuxt-link to="/">Youtube</nuxt-link>
        </el-col>
        <el-col :span="1" class="footer-middle-right">
          <button
            class="btn up"
            v-scroll-to="{
              el: '.header'
            }"
          >
            <ArrowSvg />
          </button>
        </el-col>
      </el-row>
    </el-footer>

    <el-row
      type="flex"
      align="middle"
      justify="space-between"
      class="footer-bottom"
    >
      <el-col :span="5" class="footer-bottom-left">
        Copyright &copy; {{ new Date().getFullYear() }} All rights reserved.
      </el-col>

      <el-col :xl="10" :lg="12" :md="14" class="footer-bottom-right">
        <nuxt-link to="/">Политика cookie</nuxt-link>
        <nuxt-link to="/">Политика конфиденциальности</nuxt-link>
        <nuxt-link to="/">Пользовательское соглашение</nuxt-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import ExperienceSvg from '@/assets/icons/experience.svg?inline'

export default {
  data() {
    return {
      isOpenModal: false
    }
  },
  components: {
    ArrowSvg,
    ExperienceSvg
  }
}
</script>