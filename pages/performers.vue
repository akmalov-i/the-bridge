<template>
  <div>
    <!-- navigation -->
    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
    </Navbar>

    <!-- main -->
    <div class="page-container">
      <el-row type="flex" justify="space-between">
        <!-- main -->
        <Main>
          <h1>{{ title }}</h1>

          <LazySearchFilter>
            <template #top>
              <TheSearch />
              <TheSelect
                type="categories"
                :options="categories"
                :select-title="titles.categories"
                :selected="changeTitle('categories')"
                @select="changeSelect"
              />
              <SearchTab :custom="true" />
            </template>

            <template #bottom>
              <TheSelect
                type="level"
                :options="level"
                :select-title="titles.level"
                :selected="changeTitle('level')"
                @select="changeSelect"
              />
              <TheSelect
                type="lang"
                :options="lang"
                :select-title="titles.lang"
                :selected="changeTitle('lang')"
                @select="changeSelect"
              />
              <TheSelect
                v-if="isActivated.serviceType"
                type="serviceType"
                :options="serviceType"
                :select-title="titles.serviceType"
                :selected="changeTitle('serviceType')"
                @select="changeSelect"
              />
              <TheSelect
                v-if="isActivated.has"
                type="has"
                :options="has"
                :select-title="titles.has"
                :selected="changeTitle('has')"
                @select="changeSelect"
              />

              <TheSearchBtns
                :add-filters="addFilters"
                :is-disabled="addButtonDisabled"
                @change-add-filter="changeAddFilter"
                @clear="clearFilters"
              />
              <TheSort
                :result-term="resultTerm"
                :result-limit="resultLimit"
                :current-limit="currentLimit"
                :current-term="currentTerm"
                @limit="selectResultLimit"
                @term="selectResultTerm"
              />
            </template>
          </LazySearchFilter>

          <TransactionPerformers
            author="Амирхан Т."
            geo="Ташкент, Юнусабадский район"
            registeredTime="12 месяцев"
            :levelNum="12"
            level="Любитель"
            :stars="2"
            :is-watched="false"
          />
          <TransactionPerformers
            author="Амирхан Т."
            geo="Ташкент, Юнусабадский район"
            registeredTime="12 месяцев"
            :levelNum="12"
            level="Любитель"
            :stars="2"
            :is-watched="false"
          />
          <TransactionPerformers
            author="Амирхан Т."
            geo="Ташкент, Юнусабадский район"
            registeredTime="12 месяцев"
            :levelNum="1"
            level="Новичок"
            :stars="1"
            :is-watched="false"
          />
          <TransactionPerformers
            author="Амирхан Т."
            geo="Ташкент, Юнусабадский район"
            registeredTime="12 месяцев"
            :levelNum="12"
            level="Любитель"
            :stars="2"
            :is-watched="false"
          />
          <TransactionPerformers
            author="Амирхан Т."
            geo="Ташкент, Юнусабадский район"
            registeredTime="12 месяцев"
            :levelNum="12"
            level="Любитель"
            :stars="3"
            :is-watched="false"
          />
          <TransactionPerformers
            author="Амирхан Т."
            geo="Ташкент, Юнусабадский район"
            registeredTime="12 месяцев"
            :levelNum="12"
            level="Любитель"
            :stars="2"
            :is-watched="false"
          />
          <TransactionPerformers
            author="Амирхан Т."
            geo="Ташкент, Юнусабадский район"
            registeredTime="12 месяцев"
            :levelNum="12"
            level="Любитель"
            :stars="2"
            :is-watched="false"
          />
          <TransactionPerformers
            author="Амирхан Т."
            geo="Ташкент, Юнусабадский район"
            registeredTime="12 месяцев"
            :levelNum="12"
            level="Любитель"
            :stars="2"
            :is-watched="false"
          />

          <ThePagination />
        </Main>

        <!-- aside -->
        <Aside>
          <h2 class="text-center">Полезные плюшки</h2>
          <TheTabs />
          <h2 class="text-center mt3">Дополнительные функции</h2>
          <TheNewTrans
            name="Текущий договор"
            link="/"
            tooltip="Цифровой договор, снижающий риски игроков. Отклонение договора при значительных рисках."
          />
          <TheNewTrans
            name="Новое объявление"
            link="/"
            tooltip="Оказание услуг профессионалами, которые умеют держать слово."
          />
          <TheNewTrans
            name="Новый проект"
            link="/"
            tooltip="Создание команды профессионалов для решения комплексных задач и организации мероприятий"
          />
        </Aside>
      </el-row>
    </div>

    <!-- footer -->
    <Footer />
  </div>
</template>

<script>
import { filter, modules } from '@/custom/filters'

export default {
  head() {
    return {
      title: this.title,
      title: 'Lavzee | ' + this.title
    }
  },
  data() {
    return {
      title: 'Исполнители',
      addButtonDisabled: false,
      addFilters: [
        { name: 'Оказание услуг', value: 'serviceType', isActive: false },
        { name: 'Требуются', value: 'has', isActive: false }
      ],
      isActivated: {
        serviceType: false,
        has: false
      },
      ...filter
    }
  },
  methods: {
    ...modules
  }
}
</script>
