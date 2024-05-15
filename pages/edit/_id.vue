<template>
  <v-app>
    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
    </Navbar>
    <LazyPopup
      v-if="postCancelModal"
      :is-open="postCancelModal"
      title="Вы уверены что хотите перейти?"
      content="После нажатия кнопки «Да» вас перекинет на страницу и внесенные изменения не сохранятся"
    >
      <button class="btn azure" @click="redirect">Да</button>
      <button class="btn azure" @click="postCancelModal = false">Нет</button>
    </LazyPopup>

    <div class="page-container">
      <el-row type="flex" justify="space-between">
        <Main>
          <FormHeader
            mode="editing"
            :title="form.title"
            :title-show="isEditing"
          />

          <el-form ref="form" :model="form" enctype="multipart/form-data">
            <div class="edit" v-show="isEditing">
              <div class="t-row i5">
                <div class="select-wrap">
                  <p
                    style="
                      background: #ffffff;
                      background: -webkit-linear-gradient(
                        top,
                        #ffffff,
                        #f5f8fa
                      );
                      background: -moz-linear-gradient(top, #ffffff, #f5f8fa);
                      background: linear-gradient(to bottom, #ffffff, #f5f8fa);
                    "
                  >
                    Раздел объявлений
                  </p>
                  <el-select
                    v-model="form.adsSection"
                    placeholder="Выбрать"
                    disabled
                  >
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
                  <el-select
                    v-model="form.mainCategory"
                    placeholder="Выбрать"
                    @change="changeSubcategory"
                  >
                    <el-option
                      v-for="item in mainCategory"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Подкатегория</p>
                  <el-cascader
                    v-model="form.subcategory"
                    :key="definition[0].value"
                    :options="definition"
                    @change="cascaderHandle"
                  />
                </div>
              </div>
              <div class="t-row i4">
                <div class="select-wrap" v-show="isTransportOff">
                  <p>Страна</p>
                  <el-select v-model="form.country" placeholder="Выбрать">
                    <el-option
                      v-for="item in country"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="select-wrap" v-show="isTransportOff">
                  <p>Город</p>
                  <el-select v-model="form.city" placeholder="Выбрать">
                    <el-option
                      v-for="item in city"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="select-wrap" v-if="!isTransportOff">
                  <country-select>
                    <template #title>
                      <p>Откуда?</p>
                      <h4>{{ form.fromCity.label }}</h4>
                    </template>
                    <template #country>
                      <div class="select-wrap">
                        <p>Страна</p>
                        <el-select
                          v-model="form.fromCountry"
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
                          v-model="form.fromCity"
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

                <div class="select-wrap" v-if="!isTransportOff">
                  <country-select>
                    <template #title>
                      <p>Куда?</p>
                      <h4>{{ form.toCity.label }}</h4>
                    </template>
                    <template #country>
                      <div class="select-wrap">
                        <p>Страна</p>
                        <el-select
                          v-model="form.toCountry"
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
                        <el-select v-model="form.toCity" placeholder="Выбрать">
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
                  <el-select v-model="form.auto" placeholder="Выбрать">
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

              <div class="t-row i3">
                <div class="select-wrap">
                  <p>Сроки</p>
                  <el-select v-model="form.deadlines" placeholder="Выбрать">
                    <el-option
                      v-for="item in deadlines"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap" v-show="isDeadline">
                  <DateTimeSelect
                    title="Дата/время"
                    :time="form.time"
                    :date="form.date"
                    :update-time.sync="form.time"
                    :update-date.sync="form.date"
                  />
                </div>
                <div class="select-wrap" v-show="isDeadline">
                  <p>Срочность</p>
                  <el-select v-model="form.urgently" placeholder="Выбрать">
                    <el-option
                      v-for="item in urgently"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="select-wrap" v-show="!isDeadline">
                  <DateTimeSelect
                    title="Срок от"
                    :time="form.periodTimeStart"
                    :date="form.periodDateStart"
                    :update-time.sync="form.periodTimeStart"
                    :update-date.sync="form.periodDateStart"
                  />
                </div>
                <div class="select-wrap" v-show="!isDeadline">
                  <DateTimeSelect
                    title="Срок до"
                    :period="true"
                    :minimal="form.periodDateStart"
                    :time="form.periodTimeEnd"
                    :date="form.periodDateEnd"
                    :update-time.sync="form.periodTimeEnd"
                    :update-date.sync="form.periodDateEnd"
                  />
                </div>
              </div>
              <div class="t-area">
                <input
                  ref="title"
                  type="text"
                  class="text-input"
                  :v-model="form.title"
                  placeholder="Впишите название проекта..."
                  maxlength="60"
                />
              </div>
              <div class="t-area">
                <textarea
                  ref="text"
                  class="textarea"
                  :v-model="form.text"
                  placeholder="Впишите детали проекта..."
                  maxlength="2500"
                />
                <el-upload
                  class="upload-demo"
                  :class="{ 'new-files': form.fileList.length }"
                  ref="upload"
                  action="#"
                  :before-upload="upload"
                  :limit="5 - form.fileListPrototype.length"
                  :file-list="form.fileList"
                  :on-change="changeFileList"
                  :on-remove="removeCurrentFile"
                  :auto-upload="false"
                >
                  <fileSvg />
                </el-upload>
                <el-upload
                  v-if="form.fileListPrototype.length"
                  class="upload-demo old-files"
                  ref="uploadPrototype"
                  action="#"
                  :before-upload="upload"
                  :limit="5"
                  :file-list="form.fileListPrototype"
                  :on-change="changeFileListPrototype"
                  :on-remove="removeCurrentFilePrototype"
                  :auto-upload="false"
                >
                </el-upload>
              </div>
              <div class="t-row i2">
                <div class="select-wrap">
                  <p>Определение стоимости</p>
                  <el-select
                    v-model="form.determiningTheCost"
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
                  <el-select v-model="form.paymentTerms" placeholder="Выбрать">
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
                  v-show="isFixedMainstay"
                  title="Бюджет"
                  :budget="form.budget"
                  :update-budget.sync="form.budget"
                >
                  <el-select
                    class="right"
                    v-model="form.currency"
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
                <div class="select-wrap" v-show="!isFixedMainstay">
                  <p>Условие оплаты</p>
                  <el-select v-model="form.currency" placeholder="Выбрать">
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
              <div class="t-row i1">
                <div class="select-wrap">
                  <p class="center">
                    Для кого?
                    <el-tooltip placement="top">
                      <template #content>
                        <div class="tooltip">
                          Добавление суб-заказчиков доступно в настойках профиля
                        </div>
                      </template>
                      <questionSvg class="question" />
                    </el-tooltip>
                  </p>
                  <el-select v-model="form.forWhom" placeholder="Выбрать">
                    <el-option
                      v-for="item in forWhom"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Доступ к объявлению</p>
                  <el-select v-model="form.adAccess" placeholder="Выбрать">
                    <el-option
                      v-for="item in adAccess"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Мин.уровень для заявки</p>
                  <el-select
                    v-model="form.minLevelForTheApplication"
                    placeholder="Выбрать"
                  >
                    <el-option
                      v-for="item in minLevelForTheApplication"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>

            <div class="preview" v-if="!isEditing">
              <div class="preview-title">
                <h2>{{ form.title }}</h2>
                <div class="things">
                  <div class="function">
                    <div class="icon">
                      <timerSvg />
                    </div>
                    <div class="text">
                      <p>5 дней</p>
                    </div>
                  </div>
                  <div class="function">
                    <div class="icon">
                      <eyeSvg />
                    </div>
                    <div class="text">
                      <p>0</p>
                    </div>
                  </div>
                  <div class="function">
                    <div class="icon">
                      <auctionSvg />
                    </div>
                    <div class="text">
                      <p>0</p>
                    </div>
                  </div>
                  <div class="function">
                    <div class="icon">
                      <repeatSvg />
                    </div>
                  </div>
                  <div class="function">
                    <div class="icon">
                      <shareSvg />
                    </div>
                  </div>
                </div>
              </div>

              <div class="t-area no-select">
                <div class="preview-textarea">{{ form.text }}</div>
                <el-upload
                  class="upload-demo"
                  :class="{ 'new-files': form.fileList.length }"
                  ref="uploadPreviewNew"
                  action="#"
                  :limit="5 - form.fileListPrototype.length"
                  :file-list="form.fileList"
                >
                </el-upload>
                <el-upload
                  v-if="form.fileListPrototype.length"
                  class="upload-demo old-files"
                  ref="uploadPreviewOld"
                  action="#"
                  :limit="5"
                  :file-list="form.fileListPrototype"
                ></el-upload>
              </div>
              <div class="t-row no-select i5">
                <div class="select-wrap">
                  <p>Раздел объявлений</p>
                  <el-select v-model="form.adsSection" placeholder="Выбрать">
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
                  <el-select v-model="form.mainCategory" placeholder="Выбрать">
                    <el-option
                      v-for="item in mainCategory"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Подкатегория</p>
                  <el-cascader
                    v-model="form.subcategory"
                    :key="definition[0].value"
                    :options="definition"
                  />
                </div>
              </div>
              <div class="t-row no-select i4">
                <div class="select-wrap" v-show="isTransportOff">
                  <p>Страна</p>
                  <el-select v-model="form.country" placeholder="Выбрать">
                    <el-option
                      v-for="item in country"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="select-wrap" v-show="isTransportOff">
                  <p>Город</p>
                  <el-select v-model="form.city" placeholder="Выбрать">
                    <el-option
                      v-for="item in city"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="select-wrap" v-if="!isTransportOff">
                  <country-select>
                    <template #title>
                      <p>Откуда?</p>
                      <h4>{{ form.fromCity.label }}</h4>
                    </template>
                    <template #country>
                      <div class="select-wrap">
                        <p>Страна</p>
                        <el-select
                          v-model="form.fromCountry"
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
                          v-model="form.fromCity"
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

                <div class="select-wrap" v-if="!isTransportOff">
                  <country-select>
                    <template #title>
                      <p>Куда?</p>
                      <h4>{{ form.toCity.label }}</h4>
                    </template>
                    <template #country>
                      <div class="select-wrap">
                        <p>Страна</p>
                        <el-select
                          v-model="form.toCountry"
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
                        <el-select v-model="form.toCity" placeholder="Выбрать">
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
                  <el-select v-model="form.auto" placeholder="Выбрать">
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
                  <el-select v-model="form.deadlines" placeholder="Выбрать">
                    <el-option
                      v-for="item in deadlines"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap" v-show="isDeadline">
                  <DateTimeSelect
                    title="Дата/Время"
                    :time="form.time"
                    :date="form.date"
                    :update-time.sync="form.time"
                    :update-date.sync="form.date"
                  />
                </div>
                <div class="select-wrap" v-show="isDeadline">
                  <p>Срочность</p>
                  <el-select v-model="form.urgently" placeholder="Выбрать">
                    <el-option
                      v-for="item in urgently"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="select-wrap" v-show="!isDeadline">
                  <DateTimeSelect
                    title="Срок от"
                    :time="form.periodTimeStart"
                    :date="form.periodDateStart"
                    :update-time.sync="form.periodTimeStart"
                    :update-date.sync="form.periodDateStart"
                  />
                </div>
                <div class="select-wrap" v-show="!isDeadline">
                  <DateTimeSelect
                    title="Срок до"
                    :period="true"
                    :time="form.periodTimeEnd"
                    :date="form.periodDateEnd"
                    :update-time.sync="form.periodTimeEnd"
                    :update-date.sync="form.periodDateEnd"
                  />
                </div>
              </div>
              <div class="t-row no-select i2">
                <div class="select-wrap">
                  <p>Определение стоимости</p>
                  <el-select
                    v-model="form.determiningTheCost"
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
                  <el-select v-model="form.paymentTerms" placeholder="Выбрать">
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
                  v-show="isFixedMainstay"
                  :budget-preview="form.budget"
                  :update-budget.sync="form.budget"
                >
                  <el-select
                    class="right"
                    v-model="form.currency"
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
                <div class="select-wrap" v-show="!isFixedMainstay">
                  <p>Условие оплаты</p>
                  <el-select v-model="form.currency" placeholder="Выбрать">
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
              <div class="t-row no-select i1">
                <div class="select-wrap">
                  <p class="center">
                    Для кого?
                    <el-tooltip placement="top">
                      <template #content>
                        <div class="tooltip">
                          Добавление суб-заказчиков доступно в настойках профиля
                        </div>
                      </template>
                      <questionSvg class="question" />
                    </el-tooltip>
                  </p>
                  <el-select v-model="form.forWhom" placeholder="Выбрать">
                    <el-option
                      v-for="item in forWhom"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Доступ к объявлению</p>
                  <el-select v-model="form.adAccess" placeholder="Выбрать">
                    <el-option
                      v-for="item in adAccess"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select-wrap">
                  <p>Мин.уровень для заявки</p>
                  <el-select
                    v-model="form.minLevelForTheApplication"
                    placeholder="Выбрать"
                  >
                    <el-option
                      v-for="item in minLevelForTheApplication"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>

            <div class="t-btn-row" v-show="isEditing">
              <el-button class="btn azure" @click="changeMode">
                Предварительный осмотр
              </el-button>
            </div>

            <div class="preview-btns" v-if="!isEditing">
              <el-button class="btn cancel" @click="postCancelModal = true"
                >Отменить</el-button
              >
              <el-button class="btn edit" @click="enableEditing">
                Редактировать
              </el-button>
              <el-button
                class="btn send"
                type="primary"
                :loading="loading"
                @click="onSubmit"
              >
                Отправить
              </el-button>
            </div>
          </el-form>
        </Main>

        <Aside>
          <AsideElements />
        </Aside>
      </el-row>
    </div>

    <Footer />
  </v-app>
</template>

<script>
import vClickOutside from 'v-click-outside'
import { json, check } from '@/content/create-categories'
import fileSvg from '@/assets/icons/file.svg?inline'
import questionSvg from '@/assets/icons/question.svg?inline'
import timerSvg from '@/assets/icons/timer.svg?inline'
import eyeSvg from '@/assets/icons/eye.svg?inline'
import auctionSvg from '@/assets/icons/auction.svg?inline'
import repeatSvg from '@/assets/icons/repeat.svg?inline'
import shareSvg from '@/assets/icons/share.svg?inline'
import moment from 'moment'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  middleware: ['user-auth'],
  head() {
    return {
      title: 'Lavzee | ' + this.title
    }
  },
  async validate({ store, params }) {
    let isMe = false
    let userId = await store.getters['auth/userId']
    let postAuthorId = await store.dispatch('post/fetchByIdMinimal', params.id)
    if (postAuthorId.author === userId) isMe = true
    return Boolean(isMe)
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch('post/fetchById', params.id)
    let form = {
        ...post,
        forWhom: post.forWhom.value
      },
      box = []

    if (post.fileList) {
      for (let i = 0; i < post.fileList.length; i++) {
        let element = {
          ...post.fileList[i],
          name: post.fileList[i].originalname
        }

        box.push(element)
      }
    }

    let isDeadline = false
    let isTransportOff = false
    let isFixedMainstay = false

    post.deadlines === 'Specify a deadline'
      ? (isDeadline = true)
      : (isDeadline = false)
    post.mainCategory === 'Transport'
      ? (isTransportOff = false)
      : (isTransportOff = true)
    post.determiningTheCost === 'Fixed mainstay'
      ? (isFixedMainstay = true)
      : (isFixedMainstay = false)

    form.fileListPrototype = box
    form.fileList = []

    return {
      title: post.title,
      form,
      post,
      isDeadline,
      isTransportOff,
      isFixedMainstay,
      id: params.id
    }
  },
  async fetch() {
    let userId = await this.$store.getters['auth/userId']
    let user = await this.$store.dispatch('user/fetchByIdMinimal', userId)
    this.forWhom.push(...user[0].subsNP, ...user[0].subsLE)

    for (let i = 0; i < this.forWhom.length; i++) {
      this.forWhom[i].label = this.forWhom[i].name
      this.forWhom[i].value = this.forWhom[i].telephone
      delete this.forWhom[i].name
      delete this.forWhom[i].telephone
    }
    let me = { label: 'Для себя', value: '' }
    this.forWhom.unshift(me)
    this.form.author = userId

    const label = this.forWhom.find((i) => i.value === this.post.forWhom.value)
    this.form.sub = label
  },
  created() {
    const converted = this.form.mainCategory
      .replace(/\s(.)/g, function (letter) {
        return letter.toUpperCase()
      })
      .replace(/\s/g, '')
      .replace(/^(.)/, function (letter) {
        return letter.toLowerCase()
      })
      .concat('Sub')

    this.definition = this[converted]
  },
  mounted() {
    this.$refs.title.value = this.form.title
    this.$refs.text.value = this.form.text
  },
  data() {
    return {
      isEditing: true,
      isFixedMainstay: true,
      isTransportOff: false,
      loading: false,
      postCancelModal: false,
      forWhom: [],
      definition: null,
      ...json
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            title: this.form.title,
            text: this.form.text,
            adsSection: this.form.adsSection,
            mainCategory: this.form.mainCategory,
            mainCategoryLabel: this.form.mainCategoryLabel,
            subcategory: this.form.subcategory,
            subcategoryLabel: this.form.subcategoryLabel,
            country: this.form.country,
            city: this.form.city,
            fromCountry: this.form.fromCountry,
            fromCity: this.form.fromCity,
            toCountry: this.form.toCountry,
            toCity: this.form.toCity,
            auto: this.form.auto,
            deadlines: this.form.deadlines,
            urgently: this.form.urgently,
            time: this.form.time,
            date: this.form.date,
            periodTimeStart: this.form.periodTimeStart,
            periodDateStart: this.form.periodDateStart,
            periodTimeEnd: this.form.periodTimeEnd,
            periodDateEnd: this.form.periodDateEnd,
            determiningTheCost: this.form.determiningTheCost,
            paymentTerms: this.form.paymentTerms,
            budget: this.form.budget,
            forWhom: {},
            adAccess: this.form.adAccess,
            minLevelForTheApplication: this.form.minLevelForTheApplication,
            currency: this.form.currency,
            fileList: this.form.fileList,
            fileListPrototype: this.form?.fileListPrototype,
            id: this.id
          }

          formData.forWhom = {
            value: this.form.sub.value,
            label: this.form.sub.label,
            surname: this.form.sub?.surname || ''
          }

          try {
            await this.$store.dispatch('post/update', formData)
            this.form.fileList = []
            this.$refs.upload.clearFiles()
            this.$router.push('/user/services?message=created')
          } catch (e) {}
        } else {
          this.$message.warning({
            showClose: true,
            message: 'Форма не валидна!'
          })
        }
      })
    },
    removeCurrentFile(file) {
      this.form.fileList = this.form.fileList.filter((i) => i.uid !== file.uid)
    },
    removeCurrentFilePrototype(file) {
      this.form.fileListPrototype = this.form.fileListPrototype.filter(
        (i) => i.uid !== file.uid
      )
    },
    changeFileList(file, fileList) {
      const size = 50

      const isFormat =
        file.raw.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.raw.type === 'image/jpeg' ||
        file.raw.type === 'application/x-zip-compressed' ||
        file.raw.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.raw.type === 'image/jpeg' ||
        file.raw.type === 'image/png' ||
        file.raw.type === 'text/plain' ||
        file.raw.type === 'application/x-zip-compressed' ||
        file.raw.type === 'application/x-zip' ||
        file.raw.type === 'application/pdf' ||
        file.raw.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.raw.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.raw.type === 'application/vnd.ms-excel' ||
        file.raw.type === 'application/msword' ||
        file.raw.type === 'audio/mpeg' ||
        file.raw.type === 'video/mp4' ||
        file.raw.type === 'video/avi'
      const isLarge = file.raw.size / 1024 / 1024 < size

      if (!isFormat) {
        this.$message.warning({
          showClose: true,
          message: 'Недопустимый формат!'
        })
        return (this.form.fileList = this.form.fileList.filter(
          (i) => i.uid !== file.uid
        ))
      } else if (!isLarge) {
        this.$message.warning({
          showClose: true,
          message: `Файл не должен быть больше ${size}MB!`
        })
        return (this.form.fileList = this.form.fileList.filter(
          (i) => i.uid !== file.uid
        ))
      }

      if (isFormat && isLarge) {
        this.form.fileList.push(file.raw)
      }
    },
    changeFileListPrototype(file, fileList) {
      const size = 50

      const isFormat =
        file.raw.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.raw.type === 'image/jpeg' ||
        file.raw.type === 'application/x-zip-compressed' ||
        file.raw.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.raw.type === 'image/jpeg' ||
        file.raw.type === 'image/png' ||
        file.raw.type === 'text/plain' ||
        file.raw.type === 'application/x-zip-compressed' ||
        file.raw.type === 'application/x-zip' ||
        file.raw.type === 'application/pdf' ||
        file.raw.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.raw.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.raw.type === 'application/vnd.ms-excel' ||
        file.raw.type === 'application/msword' ||
        file.raw.type === 'audio/mpeg' ||
        file.raw.type === 'video/mp4' ||
        file.raw.type === 'video/avi'
      const isLarge = file.raw.size / 1024 / 1024 < size

      if (!isFormat) {
        this.$message.warning({
          showClose: true,
          message: 'Недопустимый формат!'
        })
        return (this.form.fileListPrototype =
          this.form.fileListPrototype.filter((i) => i.uid !== file.uid))
      } else if (!isLarge) {
        this.$message.warning({
          showClose: true,
          message: `Файл не должен быть больше ${size}MB!`
        })
        return (this.form.fileListPrototype =
          this.form.fileListPrototype.filter((i) => i.uid !== file.uid))
      }

      if (isFormat && isLarge) {
        this.form.fileListPrototype.push(file.raw)
      }
    },
    redirect() {
      this.$router.push('/')
    },
    enableEditing() {
      this.isEditing = true
    },
    changeMode() {
      if (this.$refs.title.value === 0 || this.$refs.text.value === 0)
        return this.$message.info({
          showClose: true,
          message: 'Впишите название и детали проекта!'
        })
      else if (
        this.$refs.title.value.length <= 6 ||
        this.$refs.text.value.length <= 15
      )
        return this.$message.info({
          showClose: true,
          message: 'Впишите название и детали подробно!'
        })
      else if (
        this.isFixedMainstay &&
        (this.form.budget === null || this.form.budget === '')
      ) {
        return this.$message.info({
          showClose: true,
          message: 'Необходимо указать бюджет!'
        })
      } else if (
        this.isFixedMainstay &&
        this.form.budget.substring(0, 1) == 0
      ) {
        return this.$message.info({
          showClose: true,
          message: 'Слишком маленький бюджет!'
        })
      } else {
        this.form.title = this.$refs.title.value
        this.form.text = this.$refs.text.value
        this.isEditing = false
      }
    },
    cascaderHandle(getCheckedNodes) {
      const label = this.definition.find((i) => i.value === getCheckedNodes[0])
      this.form.subcategoryLabel = {
        label: label.label,
        children: ''
      }
      if (label.children) {
        const children = label.children.find(
          (i) => i.value === getCheckedNodes[1]
        )
        this.form.subcategoryLabel = {
          label: label.label,
          children: children.label
        }
      }
    },
    changeSubcategory(getCheckedNodes) {
      this.form.mainCategoryLabel = this.mainCategory.find(
        (i) => i.value === getCheckedNodes
      ).label

      const converted = getCheckedNodes
        .replace(/\s(.)/g, function (letter) {
          return letter.toUpperCase()
        })
        .replace(/\s/g, '')
        .replace(/^(.)/, function (letter) {
          return letter.toLowerCase()
        })
        .concat('Sub')

      this.definition = this[converted]

      if (this.definition[0].children) {
        this.form.subcategory = [
          this.definition[0].value,
          this.definition[0].children[0].value
        ]
        this.form.subcategoryLabel = {
          label: this.definition[0].label,
          children: this.definition[0].children[0].label
        }
      } else {
        this.form.subcategory = [this.definition[0].value]
        this.form.subcategoryLabel = {
          label: this.definition[0].label,
          children: ''
        }
      }
    },
    ...check
  },
  watch: {
    'form.deadlines': function (val) {
      val === 'Specify a deadline'
        ? (this.isDeadline = true)
        : (this.isDeadline = false)
    },
    'form.forWhom': function (val) {
      const label = this.forWhom.find((i) => i.value === val)
      this.form.sub = label
    },
    'form.mainCategory': function (val) {
      val === 'Transport'
        ? (this.isTransportOff = false)
        : (this.isTransportOff = true)
    },
    'form.determiningTheCost': function (val) {
      val === 'Fixed mainstay'
        ? (this.isFixedMainstay = true)
        : (this.isFixedMainstay = false)
    }
  },
  computed: {
    changePeriod: function () {
      const { periodDateStart, periodDateEnd } = this.form
      return {
        periodDateStart,
        periodDateEnd
      }
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
.question {
  cursor: pointer;
  fill: transparent;
  stroke: #7d7d7d;
  margin-left: 0.6rem;
}
</style>
