<template>
  <div>
    <!-- navigation -->
    <Navbar>
      <Location />
      <TheLogo />
      <AdminSettings />
    </Navbar>

    <!-- main -->
    <div class="page-container">
      <el-row type="flex" justify="space-between">
        <!-- main -->
        <Main>
          <TheSearch :hint="true" />
          <hr />
          <TheBreadcrumb firstText="Главная страница" :secondText="title" />

          <div>
            <div class="preview limited">
              <div class="preview-title">
                <h2 v-if="title">
                  {{ title }}
                  <span>Задача завершена!<completedSvg /> </span>
                </h2>
                <div class="things">
                  <div class="function">
                    <el-tooltip placement="bottom">
                      <template #content>
                        <div class="tooltip">Вернуть</div>
                      </template>
                      <returnSvg />
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div class="t-area">
                <div class="preview-textarea no-select">
                  Далеко-далеко, за словесными горами в стране гласных и
                  согласных живут рыбные тексты. Текст родного предупредила даль
                  решила пор, за снова сбить злых, всеми великий ведущими.
                  Живет, инициал агентство. Образ, снова? Не однажды на берегу
                  имени даль за рот языкового пустился коварный над?
                </div>
                <TheFilePost />
              </div>
              <div class="t-row no-select">
                <TheSelectPost
                  select-title="Раздел объявлений"
                  selected="Услуги"
                />
                <TheSelectPost
                  select-title="Основная категория"
                  selected="Ремонт и стройка"
                />
                <TheSelectPost
                  select-title="Подкатегория"
                  selected="Муж на час"
                />
              </div>
              <div class="t-row no-select">
                <TheSelectPost select-title="Страна" selected="Узбекистан" />
                <TheSelectPost select-title="Город" selected="Ташкент" />
                <TheSelectPost select-title="Авто" selected="Требуется" />
              </div>
              <div class="t-row no-select">
                <TheSelectPost
                  select-title="Сроки"
                  :selected="period ? 'Период' : 'Дедлайн'"
                />
                <div class="date">
                  <TheSelectDatePost
                    :select-title="period ? 'Срок от' : 'Дата/время'"
                    pick-date="26.09.2021"
                    pick-time="12:00"
                  />
                </div>
                <div class="date" v-if="period">
                  <TheSelectDatePost
                    select-title="Срок до"
                    pick-date="26.09.2021"
                    pick-time="12:00"
                  />
                </div>
                <TheSelectPost
                  v-else
                  select-title="Срочность"
                  selected="Отсувствует"
                />
              </div>
              <div class="t-row no-select">
                <TheSelectPost
                  select-title="Определение стоимости"
                  selected="Аукцион"
                />
                <TheSelectPost
                  select-title="Условие оплаты"
                  selected="Полная оплата"
                />
                <TheSelectPost
                  v-if="auction"
                  select-title="Бюджет"
                  selected="USD"
                />
                <TheDoubleSelectPost
                  v-else
                  select-title="Валюта"
                  selected="USD"
                  defaultNumber="1"
                />
              </div>
            </div>

            <h2 class="mb1">Комментарии</h2>
            <div class="comments-wrap mb3">
              <div class="comments-wrap" v-for="(item, i) in comments" :key="i">
                <TheComment
                  :style="'z-index:' + (1999 - i)"
                  :name="item.name"
                  :comment="item.comment"
                  :author="item.author"
                  :reply="item.reply"
                  :answer="false"
                />
              </div>
            </div>
          </div>
        </Main>

        <!-- aside -->
        <Aside>
          <TheCompleteRate />
        </Aside>
      </el-row>
    </div>

    <!-- footer -->
    <Footer />
  </div>
</template>

<script>
import fileSvg from '@/assets/icons/file.svg?inline'
import questionSvg from '@/assets/icons/question.svg?inline'
import timerSvg from '@/assets/icons/timer.svg?inline'
import eyeSvg from '@/assets/icons/eye.svg?inline'
import auctionSvg from '@/assets/icons/auction.svg?inline'
import repeatSvg from '@/assets/icons/repeat.svg?inline'
import shareSvg from '@/assets/icons/share.svg?inline'
import completedSvg from '@/assets/icons/completed.svg?inline'
import returnSvg from '@/assets/icons/return.svg?inline'
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  middleware: ['admin-auth'],
  head() {
    return {
      title: 'Lavzee | ' + this.title
    }
  },
  data() {
    return {
      title: 'Примерно что-то для текста в шапке',
      period: false,
      openSidebar: false,
      auction: false,
      focus: false,
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
      ]
    }
  },
  methods: {},
  components: {
    fileSvg,
    questionSvg,
    timerSvg,
    eyeSvg,
    auctionSvg,
    repeatSvg,
    shareSvg,
    completedSvg,
    returnSvg
  }
}
</script>

<style lang="scss" scoped>
.comments-wrap {
  position: relative;
  z-index: auto;
  overflow-wrap: break-word;
}

.function {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: $coral;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.preview-title {
  h2 {
    display: flex;
    align-items: center;
    margin-right: 1.8rem;
  }
  span {
    margin-left: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 1.4rem;
    color: $white;
    padding: 1.3rem 1.8rem;
    background: $green;
    border-radius: 4px;
    max-height: 60px;

    svg {
      margin-left: 2.7rem;
    }
  }
}
</style>
