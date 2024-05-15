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
            <div class="t-row i3 no-select">
                <div class="select-wrap">
                  <p>Основная категория</p>
                  <el-select v-model="post.finds" placeholder="Выбрать">
                    <el-option
                      v-for="item in finds"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <DateTimeSelect
                  :title="
                    post.finds === 'Find' ? 'Когда нашли?' : 'Когда потеряли?'
                  "
                  :time.sync="post.time"
                  :date.sync="post.date"
                  :update-time.sync="post.time"
                  :update-date.sync="post.date"
                  :finds="true"
                />
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
              <div class="t-row i2 no-select">
                <country-select>
                  <template #title>
                    <p>Где?</p>
                    <h4>{{ post.city }}</h4>
                  </template>
                  <template #country>
                    <div class="select-wrap">
                      <p>Страна</p>
                      <el-select
                        v-model="post.fromCountry"
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
                <input
                  type="text"
                  ref="where"
                  class="text-input preview-gray"
                  placeholder="Где нашли или потеряли..."
                  maxlength="15"
                  v-model.trim="post.where"
                />
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
    const post = await store.dispatch('finds/fetchByFindsId', params.id)
    await store.dispatch('finds/addViewFinds', post)
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
      comments: [],
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
