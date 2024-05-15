<template>
  <div class="admin-wrap">
    <div class="invite-content">
      <TheBreadcrumb
        firstLink="/admin/experience"
        firstText="Опыты"
        :secondText="title"
      />
      <div class="preview limited">
        <div class="preview-title">
          <h2>{{ post.title }}</h2>
          <div class="things">
            <div class="function">
              <el-tooltip placement="bottom">
                <template #content>
                  <div class="tooltip" v-if="post.checked">Просмотрено</div>
                  <div class="tooltip" v-else>Не просмотрено</div>
                </template>
                <div class="icon" :class="{active: post.checked}">
                  <eyeSvg />
                </div>
              </el-tooltip>

              <div class="text">
                <p>{{ post.views }}</p>
              </div>
            </div>
            <div class="function">
              <el-tooltip placement="bottom">
                <template #content>
                  <div class="tooltip">Скопировать ссылку</div>
                </template>
                <div
                  class="icon clickable"
                  v-clipboard:copy="host + $nuxt.$route.fullPath"
                  v-clipboard:success="onCopy"
                >
                  <shareSvg />
                </div>
              </el-tooltip>
            </div>
          </div>
        </div>

        <div class="t-area">
          <div class="preview-textarea">{{ post.text }}</div>
          <TheFilePost :fileList="post.fileList" />
        </div>
        <div class="t-row no-select i3">
          <div class="selecet-wrap">
            <country-select>
              <template #title>
                <p>Где произошло?</p>
                <h4>{{ post.fromCity.label }}</h4>
              </template>
              <template #country>
                <div class="select-wrap">
                  <p>Страна</p>
                  <el-select v-model="post.fromCountry" placeholder="Выбрать">
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
                  <el-select v-model="post.fromCity" placeholder="Выбрать">
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
          <div class="select-wrap">
            <DateTimeSelect
              title="Когда произошло?"
              :time="post.time"
              :date="post.date"
              :update-time.sync="post.time"
              :update-date.sync="post.date"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { json } from '@/content/create-categories'
import fileSvg from '@/assets/icons/file.svg?inline'
import questionSvg from '@/assets/icons/question.svg?inline'
import timerSvg from '@/assets/icons/timer.svg?inline'
import eyeSvg from '@/assets/icons/eye.svg?inline'
import auctionSvg from '@/assets/icons/auction.svg?inline'
import repeatSvg from '@/assets/icons/repeat.svg?inline'
import shareSvg from '@/assets/icons/share.svg?inline'
import moment from 'moment'
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  middleware: ['admin-auth'],
  layout: 'admin',
  head() {
    return {
      title: 'Lavzee | ' + this.title
    }
  },
  validate({ params }) {
    return Boolean(params.id)
  },
  async asyncData({ store, params, req }) {
    const post = await store.dispatch('experience/fetchById', params.id)
    await store.dispatch('experience/addView', post)
    let authorData = null
    authorData = await store.dispatch('user/fetchByIdMinimal', post.userId)

    return {
      post,
      authorData,
      title: post.title,
      host: process.server ? req.headers.host : window.location.host
    }
  },
  data() {
    return {
      title: 'Опыт',
      ...json
    }
  },
  methods: {
    onCopy() {
      this.$message.success('Ссылка скопирована!')
    }
  },
  components: {
    fileSvg,
    questionSvg,
    eyeSvg,
    shareSvg
  }
}
</script>

<style lang="scss" scoped>
.admin-wrap {
  background: $white;
  width: 100%;
  border-radius: 8px;
  padding: 2.4rem;
}

.icon.active {
  border-color: $blue;
  background: $blue;

  svg {
    fill: $white;
  }
}

.carrot {
  height: 57px;
}

.settings-input {
  input {
    background: transparent;
    border: 1px solid rgba(125, 125, 125, 0.32);
  }
}
.comments-wrap {
  position: relative;
  z-index: auto;
  overflow-wrap: break-word;
}
</style>
