<template>
  <div class="admin-wrap">
    <div class="mb1">
      <TheBreadcrumb
        firstLink="/admin"
        firstText="Транзакции"
        :secondText="title"
      />
    </div>
    <div class="space-between">
      <button class="btn mr3 cancel">Отказ в публикации</button>
      <nuxt-link :to="`edit/${post._id}`" class="btn mr3 carrot"
        >Редактировать</nuxt-link
      >
      <button class="btn mr3 blu">Одобрить с депозитом</button>
      <button class="btn green">Одобрить</button>
    </div>
    <div class="invite-content">
      <div class="preview limited">
        <div class="preview-title">
          <h2>{{ post.title }}</h2>
          <div class="things">
            <div class="function">
              <el-tooltip placement="bottom">
                <template #content>
                  <div class="tooltip">Срок окончания</div>
                </template>
                <div class="icon">
                  <timerSvg />
                </div>
              </el-tooltip>
              <div class="text">
                <p v-if="deadlineText > 0">{{ deadlineText }} дн.</p>
                <p v-else>Просрочен</p>
              </div>
            </div>
            <div class="function">
              <el-tooltip placement="bottom">
                <template #content>
                  <div class="tooltip">Количество просмотров</div>
                </template>
                <div class="icon">
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
                  <div class="tooltip">Аукцион</div>
                </template>
                <div class="icon">
                  <auctionSvg />
                </div>
              </el-tooltip>
              <div class="text">
                <p>{{ post.offers.length }}</p>
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
        <div class="t-row no-select i5">
          <div class="select-wrap">
            <p>Раздел объявлений</p>
            <el-select v-model="post.adsSection" placeholder="Выбрать">
              <el-option
                v-for="item in adsSection"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="select-wrap">
            <p>Основная категория</p>
            <el-select v-model="post.mainCategory" placeholder="Выбрать">
              <el-option
                v-for="item in mainCategory"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="select-wrap">
            <p>Основная категория</p>
            <el-select
              :value="
                post.subcategoryLabel.children
                  ? post.subcategoryLabel.label +
                    ' / ' +
                    post.subcategoryLabel.children
                  : post.subcategoryLabel.label
              "
              placeholder="Выбрать"
            >
              <el-option :key="null" :label="null" :value="null" />
            </el-select>
          </div>
        </div>
        <div class="t-row no-select i4">
          <div class="select-wrap" v-show="post.mainCategory != 'Transport'">
            <p>Страна</p>
            <el-select v-model="post.country" placeholder="Выбрать">
              <el-option
                v-for="item in country"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <div class="select-wrap" v-show="post.mainCategory != 'Transport'">
            <p>Город</p>
            <el-select v-model="post.city" placeholder="Выбрать">
              <el-option
                v-for="item in city"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <div class="select-wrap" v-if="post.mainCategory == 'Transport'">
            <country-select>
              <template #title>
                <p>Откуда?</p>
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

          <div class="select-wrap" v-if="post.mainCategory == 'Transport'">
            <country-select>
              <template #title>
                <p>Куда?</p>
                <h4>{{ post.toCity.label }}</h4>
              </template>
              <template #country>
                <div class="select-wrap">
                  <p>Страна</p>
                  <el-select v-model="post.toCountry" placeholder="Выбрать">
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
                  <el-select v-model="post.toCity" placeholder="Выбрать">
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
            <p>Авто</p>
            <el-select v-model="post.auto" placeholder="Выбрать">
              <el-option
                v-for="item in auto"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="t-row no-select i3">
          <div class="select-wrap">
            <p>Сроки</p>
            <el-select v-model="post.deadlines" placeholder="Выбрать">
              <el-option
                v-for="item in deadlines"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div
            class="select-wrap"
            v-show="post.deadlines == 'Specify a deadline'"
          >
            <DateTimeSelect
              :time="post.time"
              :date="post.date"
              :update-time.sync="post.time"
              :update-date.sync="post.date"
            />
          </div>
          <div
            class="select-wrap"
            v-show="post.deadlines == 'Specify a deadline'"
          >
            <p>Срочность</p>
            <el-select v-model="post.urgently" placeholder="Выбрать">
              <el-option
                v-for="item in urgently"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <div
            class="select-wrap"
            v-show="post.deadlines != 'Specify a deadline'"
          >
            <DateTimeSelect
              title="Срок от"
              :time="post.periodTimeStart"
              :date="post.periodDateStart"
              :update-time.sync="post.periodTimeStart"
              :update-date.sync="post.periodDateStart"
            />
          </div>
          <div
            class="select-wrap"
            v-show="post.deadlines != 'Specify a deadline'"
          >
            <DateTimeSelect
              title="Срок до"
              :time="post.periodTimeEnd"
              :date="post.periodDateEnd"
              :update-time.sync="post.periodTimeEnd"
              :update-date.sync="post.periodDateEnd"
            />
          </div>
        </div>
        <div class="t-row no-select i2">
          <div class="select-wrap">
            <p>Определение стоимости</p>
            <el-select v-model="post.determiningTheCost" placeholder="Выбрать">
              <el-option
                v-for="item in determiningTheCost"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="select-wrap">
            <p>Условие оплаты</p>
            <el-select v-model="post.paymentTerms" placeholder="Выбрать">
              <el-option
                v-for="item in paymentTerms"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <BudgetSelect
            title="Бюджет"
            v-show="post.determiningTheCost == 'Fixed mainstay'"
            :budget-preview="post.budget"
            :update-budget.sync="post.budget"
          >
            <el-select
              class="right"
              v-model="post.currency"
              placeholder="Выбрать"
            >
              <el-option
                v-for="item in currency"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </BudgetSelect>
          <div
            class="select-wrap"
            v-show="post.determiningTheCost != 'Fixed mainstay'"
          >
            <p>Условие оплаты</p>
            <el-select v-model="post.currency" placeholder="Выбрать">
              <el-option
                v-for="item in currency"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <TheServiceDetailsAdmin
        :postId="post._id"
        :reactions="post.reactions"
        class="mb2"
      />
    </div>

    <h2 class="mb3" v-if="post.comments.length">Комментарии:</h2>
    <div class="comments-wrap mb3">
      <div v-if="post.comments.length">
        <div
          class="comments-wrap"
          v-for="(comment, i) in post.comments"
          :key="comment._id"
        >
          <TheComment
            :style="'z-index:' + (1999 - i)"
            :comment="comment"
            :answer="false"
            :dynamicReply="
              dynamicReplies.commentId === comment._id ? dynamicReplies : {}
            "
            @replyToWrite="reply"
            @subReplyToWrite="reply"
          />
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
    const post = await store.dispatch('post/fetchById', params.id)
    let authorData = null
    let statusAuthor = null
    authorData = await store.dispatch('user/fetchByIdMinimal', post.author)
    statusAuthor = authorData.rating

    return {
      post,
      authorData,
      statusAuthor,
      title: post.title,
      host: process.server ? req.headers.host : window.location.host
    }
  },
  async created() {
    if (this.post.deadlines === 'Specify a deadline') {
      const startDate = moment()
      const endDate = moment(this.post.date).format()
      const diff = moment(endDate).diff(startDate, 'days')
      this.deadlineText = diff + 1
    } else {
      const startDate = moment()
      const endDate = moment(this.post.periodDateEnd).format()
      const diff = moment(endDate).diff(startDate, 'days')
      this.deadlineText = diff + 1
    }
  },
  data() {
    return {
      title: 'Заявка на публикацию',
      replies: {},
      dynamicReplies: {},
      deadlineText: '',
      ...json
    }
  },
  methods: {
    reply(data) {
      this.replies = data
    },
    onCopy() {
      this.$message.success('Ссылка скопирована!')
    },
    createReplyCommentHandler(reply) {
      this.dynamicReplies = reply
    }
  },
  components: {
    fileSvg,
    questionSvg,
    timerSvg,
    eyeSvg,
    auctionSvg,
    repeatSvg,
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
