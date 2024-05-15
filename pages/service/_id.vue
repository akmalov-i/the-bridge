<template>
  <div>
    <LazyPopup
      v-if="
        (post.finishedExecutor.data && author && !finished && finishOpener) ||
        (post.finishedAuthor.data &&
          executor === userId &&
          !finished &&
          finishOpener)
      "
      :is-open="true"
      title="Вторая сторона закрыла транзакцию"
      content="После нажатия кнопки «Да» вас перекинет на страницу создания новой транзакции"
    >
      <el-button class="btn green" :loading="loading" @click="acceptFinish"
        >Подтвердить</el-button
      >
      <el-button class="btn cancel" :loading="loading" @click="cancelFinish"
        >Отклонить</el-button
      >
    </LazyPopup>
    <LazyPopup
      v-if="
        (reasonExecutor && author && !finished && reasonFirstOpener) ||
        (reasonAuthor && iAmExecutor && !finished && reasonFirstOpener)
      "
      :is-open="true"
      title="Вторая сторона отменила транзакцию"
      content="Обязателен для отмены"
    >
      <el-button class="btn green" :loading="loading" @click="acceptFinish"
        >Подтвердить</el-button
      >
      <el-button
        class="btn cancel"
        :loading="loading"
        @click="cancelReasonFirstOpener"
        >Отклонить</el-button
      >
    </LazyPopup>
    <LazyPopup
      v-if="makeAnOfferDelete && isAuthenticated"
      :is-open="true"
      title="Вы точно хотите отменить данное предложение?"
      content="После нажатия кнопки «Да» данное предложение будет удалено!"
    >
      <button class="btn azure" @click="makeAnOfferDataRemover">Да</button>
      <button class="btn azure" @click="makeAnOfferDelete = false">Нет</button>
    </LazyPopup>
    <LazyPopupOffer
      v-if="offerAccepter && !executor && isAuthenticated"
      :is-open="true"
      :budget="acceptData.budget"
      :currency="acceptData.currency"
      @cancel="offerAccepter = false"
      title="Принять предложение?"
      :content="`Детали №${acceptData.step}: ${acceptData.text}`"
    >
      <el-button
        type="primary"
        native-type="submit"
        class="btn primary"
        round
        :loading="loading"
        @click="makeAnOfferDataAccepter"
      >
        <span>Подтвердить</span>
      </el-button>
    </LazyPopupOffer>

    <!-- Причина -->
    <LazyPopupCancelReason
      v-if="cancelReasonOpen && isAuthenticated"
      :author="author"
      :post-id="post._id"
      :user-id="userId"
      :is-open="true"
      @cancel="cancelReasonOpen = false"
      @created="cancelReason"
      title="Укажите причину отмены"
      content="Прозрачность сделки. Рассрочка без процентов. Продавцы и
    Покупатели, дорожащие репутацией."
    />

    <!-- Мои предложения -->
    <TheSidebar
      :open="mySuggestionsSidebar"
      @close-sidebar="mySuggestionsSidebar = false"
      :isFocused="focus"
      v-if="author && !executor && isAuthenticated"
    >
      <template #sort>
        <TheSort
          :result-term="resultTerm"
          :result-limit="resultLimit"
          :current-limit="limits"
          :current-term="currentTerm"
          @limit="selectResultLimit"
          @term="selectResultTerm"
        />
      </template>
      <div v-for="item in theOfferData" :key="item._id">
        <TheOffer
          :data="item"
          :author="authorData"
          @accept="offerAcceptHandler"
          @reject="rejectOffer"
          @recover="recoverOffer"
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

    <!-- Исполнитель -->
    <TheSidebar
      title="Исполнитель:"
      @close-sidebar="executorSidebar = false"
      :open="executorSidebar"
      :showSort="false"
      :isFocused="false"
      v-if="author && executor && isAuthenticated && !finished"
    >
      <TheSelectedOffer
        :data="{
          ...post.executor,
          postId: post._id,
          executor: false,
          reasonExecutor,
          reasonAuthor,
          finishedAuthor: post.finishedAuthor,
          finishedExecutor: post.finishedExecutor,
          status: status.statusExecutor
        }"
        @cancel="cancelReasonOpener"
        @finished="finishedTransaction"
        @focusOn="focus = true"
        @focusOff="focus = false"
      />
    </TheSidebar>

    <!-- Автор -->
    <TheSidebar
      title="Заказчик:"
      @close-sidebar="authorSidebar = false"
      :open="authorSidebar"
      :showSort="false"
      :isFocused="false"
      v-if="!author && executor === userId && isAuthenticated && !finished"
    >
      <TheSelectedOffer
        :data="{
          ...post.executor,
          postId: post._id,
          authorData: authorData,
          reasonExecutor,
          reasonAuthor,
          executor: true,
          finishedAuthor: post.finishedAuthor,
          finishedExecutor: post.finishedExecutor,
          status: status.statusAuthor
        }"
        @cancel="cancelReasonOpener"
        @finished="finishedTransaction"
        @focusOn="focus = true"
        @focusOff="focus = false"
      />
    </TheSidebar>

    <!-- Сделать предложение Аукцион -->
    <TheSidebar
      :open="makeAnOfferSidebar"
      :title="makeAnOfferGetter ? 'Моё предложение:' : 'Сделать предложение:'"
      @close-sidebar="makeAnOfferSidebar = false"
      :showSort="false"
      :isFocused="false"
      v-if="
        determiningTheCostChecker === 'Auction' &&
        !author &&
        isAuthenticated &&
        !finished &&
        !executor
      "
    >
      <TheMakeAnOffer
        :data="makeAnOfferData"
        :author="authorData"
        :userId="userId"
        :postId="post._id"
        @accept="offerAcceptHandler"
        @created="createdOfferHandler"
        @remove="makeAnOfferDeleteHandler"
      />
    </TheSidebar>

    <!-- Принять предложение Фиксированная оплата -->
    <TheSidebar
      :open="fixedMainstaySidebar"
      :title="makeAnOfferGetter ? 'Моё предложение:' : 'Предложение:'"
      @close-sidebar="fixedMainstaySidebar = false"
      :showSort="false"
      :isFocused="false"
      v-if="
        determiningTheCostChecker === 'Fixed mainstay' &&
        !author &&
        isAuthenticated &&
        !finished &&
        !executor
      "
    >
      <TheFixedMainstay
        :data="makeAnOfferData"
        :author="authorData"
        :userId="userId"
        :postId="post._id"
        @accept="offerAcceptHandler"
        @acceptTheFixedOffer="offerAcceptHandler"
        @created="createdOfferHandler"
        @remove="makeAnOfferDeleteHandler"
      />
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
          <div class="start">
            <TheBreadcrumb
              class="mr3"
              firstText="Главная"
              :secondText="title"
            />
            <div v-if="finished" class="completed">
              <p>Задача завершена!</p>
              <completedSvg />
            </div>
          </div>
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
                      <div class="tooltip">Дублировать</div>
                    </template>
                    <nuxt-link
                      :to="`/dublicate/${post._id}`"
                      class="icon clickable"
                    >
                      <repeatSvg />
                    </nuxt-link>
                  </el-tooltip>
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
              <div class="preview-textarea">
                <pre>{{ post.text }}</pre>
              </div>
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

              <div class="select-wrap" v-if="post.mainCategory == 'Transport'">
                <country-select>
                  <template #title>
                    <p>Откуда?</p>
                    <h4>{{ post.fromCity.label }}</h4>
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
          <div class="service-btns" v-if="author && !finished">
            <button
              class="btn cancel"
              v-if="!executor"
              @click="cancelReasonOpener"
            >
              Отменить
            </button>
            <nuxt-link
              :to="`/edit/${post._id}`"
              class="btn edit"
              v-if="!executor"
              >Редактировать</nuxt-link
            >
          </div>
          <TheServiceDetails
            v-if="!author"
            :isAuth="isAuthenticated"
            :userId="userId"
            :postId="post._id"
            :reactions="post.reactions"
            @createdReaction="createdReactionHandler"
            class="mb2"
          />
          <h2 class="mb3" v-if="post.comments.length">Комментарии:</h2>
          <div class="comments-wrap mb3">
            <TheWrite
              v-if="isAuthenticated"
              :replies="replies"
              :postId="post._id"
              :userId="userId"
              @created="createCommentHandler"
              @createdReply="createReplyCommentHandler"
            />
            <div v-if="post.comments.length">
              <div
                class="comments-wrap"
                v-for="(comment, i) in post.comments"
                :key="comment._id"
              >
                <TheComment
                  :style="'z-index:' + (1999 - i)"
                  :comment="comment"
                  :answer="isAuthenticated"
                  :dynamicReply="
                    dynamicReplies.commentId === comment._id
                      ? dynamicReplies
                      : {}
                  "
                  @replyToWrite="reply"
                  @subReplyToWrite="reply"
                />
              </div>
            </div>
          </div>
        </Main>

        <Aside v-if="(!finished && isAuthenticated) || !isAuthenticated">
          <!-- Мои предложения -->
          <the-new-offers
            v-if="!finished && author && !executor && isAuthenticated"
            :counterTurner="true"
            :counter="newOffers"
            name="Мои предложения"
            tooltip="Цифровой договор, снижающий риски игроков. Отклонение договора при значительных рисках."
            @open-sidebar="mySuggestionsOpener"
          >
            <notificationSvg />
          </the-new-offers>

          <!-- Исполнение -->
          <the-new-offers
            v-if="!finished && author && executor && isAuthenticated"
            :counterTurner="false"
            name="Исполнение"
            tooltip="Цифровой договор, снижающий риски игроков. Отклонение договора при значительных рисках."
            @open-sidebar="executorSidebar = true"
          >
            <checkSvg />
          </the-new-offers>

          <!-- Исполнение -->
          <the-new-offers
            v-if="
              !finished && !author && executor === userId && isAuthenticated
            "
            :counterTurner="false"
            name="Исполнение"
            tooltip="Цифровой договор, снижающий риски игроков. Отклонение договора при значительных рисках."
            @open-sidebar="authorSidebar = true"
          >
            <checkSvg />
          </the-new-offers>

          <!-- Моё предложение : Сделать предложение -->
          <the-new-offers
            v-if="
              determiningTheCostChecker === 'Auction' &&
              !finished &&
              !author &&
              isAuthenticated &&
              !executor
            "
            :counterTurner="
              makeAnOfferGetter && makeAnOfferGetter.newOfferByAuthor
            "
            :counter="
              makeAnOfferGetter && makeAnOfferGetter.newOfferByAuthor ? 1 : 0
            "
            :name="
              makeAnOfferGetter ? 'Моё предложение' : 'Сделать предложение'
            "
            tooltip="Цифровой договор, снижающий риски игроков. Отклонение договора при значительных рисках."
            @open-sidebar="makeAnOfferOpener"
          >
            <notificationSvg v-if="makeAnOfferGetter" />
            <paymentSvg v-if="!makeAnOfferGetter" />
          </the-new-offers>

          <!-- Принять предложение -->
          <the-new-offers
            v-if="
              determiningTheCostChecker === 'Fixed mainstay' &&
              !finished &&
              !author &&
              isAuthenticated &&
              !executor
            "
            :counterTurner="
              makeAnOfferGetter && makeAnOfferGetter.newOfferByAuthor
            "
            :counter="
              makeAnOfferGetter && makeAnOfferGetter.newOfferByAuthor ? 1 : 0
            "
            :name="
              makeAnOfferGetter ? 'Моё предложение' : 'Принять предложение'
            "
            tooltip="Цифровой договор, снижающий риски игроков. Отклонение договора при значительных рисках."
            @open-sidebar="fixedMainstayOpener"
          >
            <notificationSvg v-if="makeAnOfferGetter" />
            <paymentSvg v-if="!makeAnOfferGetter" />
          </the-new-offers>

          <AsideElements v-if="!isAuthenticated" />
        </Aside>

        <AsideNotSticky v-if="finished && isAuthenticated">
          <TheFinalOfTransaction
            :data="theFeedbackData"
            :authorData="authorData"
            :executorData="executorData"
            :userId="userId"
            :author="author"
            @created="feedbackHandler"
            v-if="
              (!feedbackAuthor && author) || (!feedbackExecutor && iAmExecutor)
            "
          />
          <TheFinalOfTransactionOutput
            :data="{
              author: post.feedback.author,
              executor: post.feedback.executor,
              status
            }"
            :authorData="authorData"
            :executorData="executorData"
            :author="author"
            v-if="
              (feedbackAuthor && author) || (feedbackExecutor && iAmExecutor)
            "
          />
          <the-new-offers
            v-if="isAuthenticated && !author && executor != userId"
            :counterTurner="false"
            :name="!finished ? 'Идёт исполнение' : 'Завершена'"
            tooltip="Исолнитель для данного задания выбран!"
          >
            <checkSvg />
          </the-new-offers>
        </AsideNotSticky>
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
import completedSvg from '@/assets/icons/completed.svg?inline'
import notificationSvg from '@/assets/icons/notification.svg?inline'
import checkSvg from '@/assets/icons/check.svg?inline'
import paymentSvg from '@/assets/icons/payment.svg?inline'
import vClickOutside from 'v-click-outside'
import { search, searchActions } from '@/content/search-modules'

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
  async asyncData({ store, params, req }) {
    const isAuthenticated = await store.getters['auth/isAuthenticated']
    let author = false
    let userId = ''
    let authorData = null
    let executorData = null
    let statusAuthor = null
    let statusExecutor = null
    let offers = null
    let newOffers = 0
    let offer = null
    const post = await store.dispatch('post/fetchById', params.id)
    await store.dispatch('post/addView', post)
    if (isAuthenticated) {
      userId = await store.getters['auth/userId']
      author = post.author === userId
      authorData = await store.dispatch('user/fetchByIdMinimal', post.author)
      statusAuthor = authorData[0].rating

      if (
        (author && post.executor.userId) ||
        (post.executor.userId && post.executor.userId === userId)
      ) {
        executorData = await store.dispatch(
          'user/fetchByIdMinimal',
          post.executor.userId
        )
        statusExecutor = executorData[0].rating
      }

      /* finish check */
      if (post.finishedExecutor.data && author && !post.finished) {
        const endDate = moment(post.finishedExecutor.data).format()
        const startDate = moment()
        const diff = moment(endDate).diff(startDate, 'days')
        const deadlineFinish = diff + 1

        if (deadlineFinish < 1) {
          try {
            const finish = await store.dispatch('post/fullFinish', {
              postId: post._id
            })
            post.finished = finish.finished
          } catch (e) {}
        }
      }
      if (
        post.finishedAuthor.data &&
        post.executor.userId === userId &&
        !post.finished
      ) {
        const endDate = moment(post.finishedAuthor.data).format()
        const startDate = moment()
        const diff = moment(endDate).diff(startDate, 'days')
        const deadlineFinish = diff + 1

        if (deadlineFinish < 1 && !post.finished) {
          try {
            const finish = await store.dispatch('post/fullFinish', {
              postId: post._id
            })
            post.finished = finish.finished
          } catch (e) {}
        }
      }
      /* finish check */

      if (!author) {
        offer = await store.dispatch('offer/fetchById', {
          postId: params.id,
          userId: userId
        })
      }
      if (author) {
        offers = await store.dispatch('offer/fetch', {
          postId: params.id
        })
        newOffers = offers.filter((i) => i.new === true).length
      }
    }

    return {
      isAuthenticated,
      userId,
      author,
      authorData,
      executorData,
      post,
      newOffers,
      status: { statusAuthor, statusExecutor },
      determiningTheCostChecker: post.determiningTheCost,
      views: ++post.views,
      title: post.title,
      makeAnOfferData: {
        author: post.author,
        postId: post._id,
        userId: userId,
        offer: offer,
        currency: post.currency,
        budget: post.budget,
        text: post.text,
        determiningTheCost: post.determiningTheCost,
        status: { statusAuthor, statusExecutor }
      },
      finishOpener:
        !post.finished &&
        (post.finishedExecutor.data || post.finishedAuthor.data)
          ? true
          : false,
      theFeedbackData: {
        authorId: post.author,
        postId: post._id,
        userId: userId,
        executorId: post.executor.userId,
        status: { statusAuthor, statusExecutor }
      },
      theOfferData: offers,
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
      replies: {},
      resultTerm: [
        { name: 'Показать все', value: 0 },
        { name: 'Высокая цена', value: -1 },
        { name: 'Низкая цена', value: 1 },
        { name: 'Отклоненные', value: 2 }
      ],
      resultLimit: [{ number: 10 }, { number: 25 }, { number: 50 }],
      currentTerm: 0,
      page: 1,
      limits: 10,
      loading: false,
      period: false,
      reasonFirstOpener: true,
      cancelReasonOpen: false,
      mySuggestionSidebar: false,
      mySuggestionsSidebar: false,
      executorSidebar: false,
      makeAnOfferSidebar: false,
      fixedMainstaySidebar: false,
      authorSidebar: false,
      validateNew: false,
      validateNewByAuthor: false,
      makeAnOfferDelete: false,
      deleteData: null,
      deadlineFinish: null,
      offerAccepter: false,
      acceptData: null,
      auction: false,
      focus: false,
      deadlineText: '',
      dynamicReplies: {},
      ...json
    }
  },
  methods: {
    onCopy() {
      this.$message.success('Ссылка скопирована!')
    },
    reply(data) {
      this.replies = data
    },
    selectResultTerm(option) {
      this.currentTerm = option.value
      this.load()
    },
    async selectResultLimit(option) {
      this.limits = option.number
      this.load()
    },
    async load(pager) {
      if (typeof pager === 'number') {
        this.page = pager
      } else {
        this.page = 1
      }
      const config = {
        currentTerm: this.currentTerm,
        page: this.page,
        limits: this.limits,
        postId: this.post._id
      }
      try {
        const requests = await this.$store.dispatch('offer/fetch', config)
        this.loading = false
        this.theOfferData = requests
      } catch (e) {}
    },
    async mySuggestionsOpener() {
      this.mySuggestionsSidebar = true
      if (!this.validateNew) {
        await this.$store.dispatch('offer/new', { id: this.post._id })
        return (this.validateNew = true)
      }
    },
    async makeAnOfferOpener() {
      this.makeAnOfferSidebar = true
      if (!this.validateNewByAuthor) {
        await this.$store.dispatch('offer/newByAuthor', { id: this.post._id })
        return (this.validateNewByAuthor = true)
      }
    },
    async fixedMainstayOpener() {
      this.fixedMainstaySidebar = true
      if (!this.validateNewByAuthor) {
        await this.$store.dispatch('offer/newByAuthor', { id: this.post._id })
        return (this.validateNewByAuthor = true)
      }
    },
    createdReactionHandler(data) {
      this.post.reactions = data[0].reactions
    },
    createCommentHandler(comment) {
      this.post.comments.unshift(comment)
    },
    createReplyCommentHandler(reply) {
      this.dynamicReplies = reply
    },
    createdOfferHandler(offer) {
      this.makeAnOfferData.offer = offer
    },
    makeAnOfferDeleteHandler(offer) {
      this.makeAnOfferDelete = true
      this.deleteData = offer
    },
    acceptTheFixedOfferHandler(offer) {
      console.log(offer)
    },
    offerAcceptHandler(offer) {
      this.offerAccepter = true
      this.acceptData = offer
    },
    finishedTransaction(post) {
      this.post.finished = post.finished
    },
    async acceptFinish() {
      try {
        this.loading = true
        const finish = await this.$store.dispatch('post/fullFinish', {
          postId: this.post._id
        })
        this.post.finished = finish.finished
        this.finishOpener = false
        this.loading = false
        this.$nuxt.refresh()
      } catch (e) {}
    },
    cancelFinish() {
      this.cancelReasonOpen = true
      this.finishOpener = false
    },
    cancelReasonFirstOpener() {
      this.cancelReasonOpen = true
      this.reasonFirstOpener = false
    },
    feedbackHandler(feed) {
      this.post.feedback = feed.postR.feedback
    },
    cancelReason(post) {
      this.post.reasonExecutor.userId = post.reasonExecutor.userId
      this.post.reasonAuthor.userId = post.reasonAuthor.userId
      this.cancelReasonOpen = false
      this.$nuxt.refresh()
    },
    cancelReasonOpener() {
      if (
        (this.reasonExecutor && !this.author) ||
        (this.reasonAuthor && this.author)
      ) {
        return this.$message.warning(
          'Вы уже отменили. Ждите одобрения модератора!'
        )
      }
      this.cancelReasonOpen = true
    },
    async rejectOffer(id) {
      try {
        await this.$store.dispatch('offer/reject', {
          id: id
        })
        this.load()
        this.$message.success('Предложение успешно добавлено в отклоненные!')
      } catch (e) {}
    },
    async recoverOffer(id) {
      try {
        await this.$store.dispatch('offer/recover', {
          id: id
        })
        this.load()
        this.$message.success('Предложение успешно восстановлено!')
      } catch (e) {}
    },
    async makeAnOfferDataAccepter() {
      try {
        this.loading = true
        const post = await this.$store.dispatch(
          'offer/acceptTheOffer',
          this.acceptData
        )
        this.post.executor = post.executor
        this.$message.success('Исполнитель успешно выбран!')
        this.offerAccepter = false
        this.$nuxt.refresh()
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    async makeAnOfferDataRemover() {
      try {
        const newOffer = await this.$store.dispatch(
          'offer/removeTheOffer',
          this.deleteData
        )
        this.$message.success('Предложение успешно отменено')
        this.makeAnOfferData.offer = newOffer
        this.makeAnOfferDelete = false
        this.$nuxt.refresh()
      } catch (e) {
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    makeAnOfferGetter() {
      return this.makeAnOfferData?.offer
    },
    iAmExecutor() {
      return this.post?.executor?.userId === this.userId
    },
    executor() {
      return this.post?.executor?.userId
    },
    reasonAuthor() {
      return this.post?.reasonAuthor?.userId
    },
    reasonExecutor() {
      return this.post?.reasonExecutor?.userId
    },
    feedbackExecutor() {
      return this.post?.feedback?.executor
    },
    feedbackAuthor() {
      return this.post?.feedback?.author
    },
    finished() {
      return this.post?.finished
    }
  },
  components: {
    fileSvg,
    questionSvg,
    timerSvg,
    eyeSvg,
    auctionSvg,
    repeatSvg,
    shareSvg,
    completedSvg,
    notificationSvg,
    checkSvg,
    paymentSvg
  }
}
</script>

<style lang="scss" scoped>
.comments-wrap {
  position: relative;
  z-index: auto;
  overflow-wrap: break-word;
}
.sort {
  cursor: pointer;
  font-size: 1.4rem;
  position: relative;
  justify-self: end;
  grid-column: 6;
  user-select: none;
  font-weight: 400;
  color: $gray;

  .sort-title:hover {
    cursor: pointer;
  }
}
pre {
  line-height: 135%;
  font-weight: 400;
  font-size: 1.4rem;
  white-space: pre-line;
  font-family: 'Roboto', sans-serif;
}
</style>
