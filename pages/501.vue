<template>
  <div>
    <!-- navigation -->
    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
      <TheBreadcrumb firstText="Главная страница" :secondText="title" :absolute="true" />
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
              <TheFilterTab
                type="finds"
                :options="filterTab"
                :selected="selectFilterTab('finds')"
                @select="changeFilterTab"
              />
            </template>

            <template #bottom>
              <TheSelect
                type="current"
                :options="current"
                :select-title="titles.current"
                :selected="changeTitle('current')"
                @select="changeSelect"
              />
              <TheSelect
                type="transTo"
                :options="transTo"
                :select-title="titles.transTo"
                :selected="changeTitle('transTo')"
                @select="changeSelect"
              />
              <TheSelect
                v-if="isActivated.transFrom"
                type="transFrom"
                :options="transFrom"
                :select-title="titles.transFrom"
                :selected="changeTitle('transFrom')"
                @select="changeSelect"
              />
              <TheSelect
                v-if="isActivated.location501"
                type="location501"
                :options="location501"
                :select-title="titles.location501"
                :selected="changeTitle('location501')"
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

          <Transaction501
            title="Отвезти корм приюту"
            recently="10 мин назад"
            geo="Ташкент, Юнусабадский район"
            deadlineDate="22 марта, 2021"
            :quickly="true"
            grace-name="Услуга"
            :is-open="false"
            :is-watched="false"
          />
          <Transaction501
            title="Починить кран"
            recently="10 мин назад"
            geo="Ташкент, Юнусабадский район"
            currency="USD"
            :price="3000"
            deadlineDate="22 марта, 2021"
            :quickly="false"
            grace-name=""
            :is-open="false"
            :is-watched="false"
          />
          <Transaction501
            title="Поездка на турнир"
            recently="10 мин назад"
            geo="Ташкент, Юнусабадский район"
            currency="USD"
            :price="4000"
            deadlineDate="22 марта, 2021"
            grace-name=""
            :quickly="true"
            :is-open="false"
            :is-watched="false"
          />
          <Transaction501
            title="Еда для приюта"
            recently="10 мин назад"
            geo="Ташкент, Юнусабадский район"
            deadlineDate="22 марта, 2021"
            :quickly="true"
            grace-name="Услуга"
            :is-open="false"
            :is-watched="false"
          />
          <Transaction501
            title="Помощь первоклашкам"
            recently="10 мин назад"
            geo="Ташкент, Юнусабадский район"
            deadlineDate="22 марта, 2021"
            :quickly="true"
            grace-name="Услуга"
            :is-open="false"
            :is-watched="false"
          />
          <Transaction501
            title="Обивка мебели"
            recently="10 мин назад"
            geo="Ташкент, Юнусабадский район"
            deadlineDate="22 марта, 2021"
            :quickly="true"
            grace-name="Услуга"
            :is-open="false"
            :is-watched="false"
          />
          <Transaction501
            title="Операция для ребенка"
            recently="10 мин назад"
            geo="Ташкент, Юнусабадский район"
            deadlineDate="22 марта, 2021"
            grace-name=""
            :quickly="true"
            currency="USD"
            :price="2000"
            :is-open="false"
            :is-watched="false"
          />
          <ThePagination />
        </Main>

        <Aside>
          <h2 class="text-center">Новое объявление</h2>
          <TheNewTrans
            name="Оказать Помощь"
            link="/create501?item=willHelp"
            tooltip="Цифровой договор, снижающий риски игроков. Отклонение договора при значительных рисках."
          />
          <TheNewTrans
            name="Принять Помощь"
            link="/create501?item=getHelp"
            tooltip="Оказание услуг профессионалами, которые умеют держать слово."
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
      title: '501(с)(3)',
      addButtonDisabled: false,
      filterTab: [
        { name: 'Нуждаюсь', value: 0 },
        { name: 'Помогу', value: 1 },
      ],
      addFilters: [
        { name: 'Заявка от ...', value: 'transFrom', isActive: false },
        { name: 'Локация', value: 'location501', isActive: false },
      ],
      isActivated: {
        transFrom: false,
        location501: false,
      },
      ...filter
    }
  },
  methods: {
    ...modules
  }
}
</script>
