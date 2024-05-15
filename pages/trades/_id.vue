<template>
  <div>
    <!-- sidebar -->
    <TheSidebar
      :open="openSidebar"
      @close-sidebar="openSidebar = false"
      :isFocused="focus"
    >
      <div v-for="(item, idx) in offersData" :key="idx">
        <TheOffer
          :data="item"
          @focusOn="focus = true"
          @focusOff="focus = false"
        />
      </div>
      <div class="center mb3">
        <el-pagination
          layout="prev, pager, next"
          :total="1"
          :background="true"
          :page-size="1"
          :current-page="1"
        >
        </el-pagination>
      </div>
    </TheSidebar>

    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
    </Navbar>
    <div class="page-container">
      <el-row type="flex" justify="space-between">
        <Main>
          <TheSearch :hint="true" />
          <hr />
          <TheBreadcrumb firstText="Главная" :secondText="title" />
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
                    <p>0</p>
                  </div>
                </div>
                <div class="function">
                  <el-tooltip placement="bottom">
                    <template #content>
                      <div class="tooltip">Дублировать</div>
                    </template>
                    <div class="icon clickable">
                      <repeatSvg />
                    </div>
                  </el-tooltip>
                </div>
                <div class="function">
                  <el-tooltip placement="bottom">
                    <template #content>
                      <div class="tooltip">Скопировать ссылку</div>
                    </template>
                    <div
                      class="icon clickable"
                      v-clipboard:copy="$nuxt.$route.fullPath"
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
              <TheFilePost />
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
                <p>Цель объявления</p>
                <el-select v-model="post.purposeOfAds" placeholder="Выбрать">
                  <el-option
                    v-for="item in purposeOfAds"
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
              <div
                class="select-wrap"
                v-show="post.mainCategory != 'Transport'"
              >
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

              <div
                class="select-wrap"
                v-show="post.mainCategory != 'Transport'"
              >
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

              <div class="select-wrap">
                <p>Доставка</p>
                <el-select v-model="post.tradeDelivery" placeholder="Выбрать">
                  <el-option
                    v-for="item in tradeDelivery"
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
                <el-select
                  v-model="post.determiningTheCost"
                  placeholder="Выбрать"
                >
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
          <div class="service-btns">
            <button class="btn cancel">Отменить</button>
            <button class="btn edit">Редактировать</button>
          </div>
          <h2 class="mb1">Комментарии</h2>
          <div class="comments-wrap mb3">
            <TheWrite />
            <div class="comments-wrap" v-for="(item, i) in comments" :key="i">
              <TheComment
                :style="'z-index:' + (1999 - i)"
                :name="item.name"
                :comment="item.comment"
                :author="item.author"
                :reply="item.reply"
              />
            </div>
          </div>
        </Main>

        <Aside>
          <TheNewOffers
            name="Мои предложение"
            tooltip="Цифровой договор, снижающий риски игроков. Отклонение договора при значительных рисках."
            @open-sidebar="openSidebar = true"
          />
          <AsideElements />
        </Aside>
      </el-row>
    </div>

    <Footer />
  </div>
</template>

<script>
import { json } from '@/content/create-categories'
import moment from 'moment'
import fileSvg from '@/assets/icons/file.svg?inline'
import questionSvg from '@/assets/icons/question.svg?inline'
import timerSvg from '@/assets/icons/timer.svg?inline'
import eyeSvg from '@/assets/icons/eye.svg?inline'
import auctionSvg from '@/assets/icons/auction.svg?inline'
import repeatSvg from '@/assets/icons/repeat.svg?inline'
import shareSvg from '@/assets/icons/share.svg?inline'
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  head() {
    return {
      title: 'Lavzee | ' + this.title
    }
  },
  validate({ params }) {
    return Boolean(params.id)
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch('trade/fetchByTradeId', params.id)
    await store.dispatch('trade/addViewTrade', post)
    return { post, views: ++post.views }
  },
  mounted() {
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
      title: 'Примерно что-то',
      period: false,
      openSidebar: false,
      auction: false,
      focus: false,
      deadlineText: '',
      offersData: [
        {
          id: 1164987,
          new: true,
          img: 'avatar4.jpg',
          offerName: 'Василина Ш.',
          offerRate: 3,
          offerLevel: 3,
          details: [
            {
              id: 1,
              img: 'avatar.jpg',
              who: 'offer',
              text: `Копировать и обслуживание компьютерной и офисной техники, оргтехники. - Установка, настройка и обновление офисного и прикладного ПО требовании.`,
              currency: 'EURO',
              price: 150
            },
            {
              id: 2,
              img: 'avatar2.jpg',
              who: 'you',
              text: `Вставить и обслуживание компьютерной и офисной техники, оргтехники. - Установка, настройка и обновление офисного и прикладного ПО требовании.`,
              currency: 'USD',
              price: 180
            },
            {
              id: 3,
              img: 'avatar.jpg',
              who: 'offer',
              text: `Копировать и обслуживание компьютерной и офисной техники, оргтехники. - Установка, настройка и обновление офисного и прикладного ПО требовании.`,
              currency: 'USD',
              price: 200
            },
            {
              id: 4,
              img: 'avatar2.jpg',
              who: 'you',
              text: `Вставить и обслуживание компьютерной и офисной техники, оргтехники. - Установка, настройка и обновление офисного и прикладного ПО требовании.`,
              currency: 'USD',
              price: 180
            },
            {
              id: 5,
              img: 'avatar.jpg',
              who: 'offer',
              text: `Копировать и обслуживание компьютерной и офисной техники, оргтехники. - Установка, настройка и обновление офисного и прикладного ПО требовании.`,
              currency: 'USD',
              price: 4000
            }
          ]
        },
        {
          id: 1187964,
          new: true,
          img: '',
          offerName: 'Абдурашидова Г.',
          offerRate: 5,
          offerLevel: 1,
          details: [
            {
              id: 1,
              img: 'avatar.jpg',
              who: 'offer',
              text: '',
              currency: 'EURO',
              price: 150
            },
            {
              id: 2,
              img: 'avatar2.jpg',
              who: 'you',
              text: `Вставить и обслуживание компьютерной и офисной техники, оргтехники. - Установка, настройка и обновление офисного и прикладного ПО требовании.`,
              currency: 'USD',
              price: 180
            }
          ]
        },
        {
          id: 1164987,
          new: false,
          img: 'avatar3.jpg',
          offerName: 'Атаханов К.',
          offerRate: 3,
          offerLevel: 3,
          details: [
            {
              id: 1,
              img: 'avatar.jpg',
              who: 'offer',
              text: '',
              currency: 'EURO',
              price: 150
            }
          ]
        },
        {
          id: 1187964,
          new: false,
          img: 'avatar2.jpg',
          offerName: 'Абдурашидова Г.',
          offerRate: 5,
          offerLevel: 1,
          details: [
            {
              id: 1,
              img: 'avatar.jpg',
              who: 'offer',
              text: '',
              currency: 'EURO',
              price: 150
            },
            {
              id: 2,
              img: 'avatar2.jpg',
              who: 'you',
              text: `Вставить и обслуживание компьютерной и офисной техники, оргтехники. - Установка, настройка и обновление офисного и прикладного ПО требовании.`,
              currency: 'USD',
              price: 180
            }
          ]
        }
      ],
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      comments: [
        {
          name: 'Alexey.342',
          comment: `Pavel.120 @Anastasia_Koval @Pavel.Bartov @Pavel.120
            Anastasia_Koval Pavel.Bartov Компьютерной и офисной техники, оргтехники.`,
          author: false,
          reply: false
        },
        {
          name: 'Pavel.Bartov',
          comment: `Anastasia_Koval Pavel.Bartov Компьютерной и офисной техники, оргтехники.
            - Установка, настройка и обновление офисного и прикладного. Компьютерной и
            офисной техники, оргтехники. - Установка, настройка и обновление офисного
            и прикладного. Компьютерной и офисной техники, оргтехники. - Установка,
            настройка и обновление офисного и прикладного. Компьютерной и офисной
            техники, оргтехники. - Установка, настройка и обновление офисного техног.`,
          author: true,
          reply: false
        },
        {
          name: 'Anastasia_Koval',
          comment: `Компьютерной и
            офисной техники, оргтехники. - Установка, настройка и обновление офисного
            и прикладного. Компьютерной и офисной техники, оргтехники. - Установка,
            настройка и обновление офисного и прикладного. Компьютерной и офисной
            техники, оргтехники. - Установка, настройка и обновление офисного техног.`,
          author: false,
          reply: true
        },
        {
          name: 'Anastasia_Koval',
          comment: `Компьютерной и
            офисной техники, оргтехники. - Установка, настройка и обновление офисного
            и прикладного. Компьютерной и офисной техники, оргтехники. - Установка,
            настройка и обновление офисного и прикладного. Компьютерной и офисной
            техники, оргтехники. - Установка, настройка и обновление офисного техног.`,
          author: false,
          reply: true
        }
      ],
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
    timerSvg,
    eyeSvg,
    auctionSvg,
    repeatSvg,
    shareSvg
  }
}
</script>

<style lang="scss" scoped>
.comments-wrap {
  position: relative;
  z-index: auto;
  overflow-wrap: break-word;
}
</style>
