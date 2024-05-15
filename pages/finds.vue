<template>
  <v-app>
    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
      <TheBreadcrumb firstText="Главная страница" :secondText="title" :absolute="true" />
    </Navbar>

    <div class="page-container">
      <el-row type="flex" justify="space-between">
        <Main>
          <h1>{{ title }}</h1>
          <search-filter>
            <template #top>
              <TheSearch @typing="searchEvent" />
              <div class="select-wrap">
                <p>Все категории</p>
                <el-cascader
                  v-model="config.params.filters.mainCategory"
                  :options="trades"
                  :props="{ checkStrictly: true }"
                  @change="load"
                ></el-cascader>
              </div>
              <SquareSwitch
                :options="squareSwitch"
                :select.sync="config.params.filters.button"
                :active.sync="squareSwitchActiveIdx"
              />
            </template>

            <template #bottom>
              <div class="select-wrap">
                <p>Статус</p>
                <el-select
                  v-model="config.params.filters.finds"
                  placeholder="Выбрать"
                  @change="load"
                >
                  <el-option
                    v-for="item in finds"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="select-wrap">
                <p>Локация</p>
                <el-select
                  v-model="config.params.filters.location"
                  placeholder="Выбрать"
                  @change="load"
                >
                  <el-option
                    v-for="item in location"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="select-wrap" v-if="filterStatus.source">
                <p>Источник</p>
                <el-select
                  v-model="config.params.filters.source"
                  placeholder="Выбрать"
                  @change="load"
                >
                  <el-option
                    v-for="item in source"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>

              <SearchSelect
                :options="filters"
                :is-disabled="addButtonDisabled"
                @change-add-filter="changeAddFilter"
                @clear="clearFilters"
              />
              <TheSort
                :result-term="resultTerm"
                :result-limit="resultLimit"
                :current-limit="config.params.limits"
                :current-term="config.params.currentTerm"
                @limit="selectResultLimit"
                @term="selectResultTerm"
              />
            </template>
          </search-filter>
          <el-skeleton
            v-if="loading"
            style="width: 100%"
            :count="config.params.limits"
            animated
          >
            <template slot="template">
              <el-skeleton-item
                variant="text"
                style="
                  height: 105px;
                  border-radius: 12px;
                  margin-bottom: 0.8rem;
                "
              />
            </template>
          </el-skeleton>

          <div v-for="post in posts" :key="post._id">
            <LazyTransactionFinds :post="post" />
          </div>
          <div class="center mb3">
            <el-pagination
              layout="prev, pager, next"
              :total="postCount"
              :background="true"
              :page-size="config.params.limits"
              :current-page="config.params.page"
              @current-change="load"
            >
            </el-pagination>
          </div>
        </Main>

        <Aside>
          <AsideFindsElements />
        </Aside>
      </el-row>
    </div>

    <Footer />
  </v-app>
</template>

<script>
import { search, searchActions } from '@/content/search-modules'

export default {
  head() {
    return {
      title: 'Lavzee | ' + this.title
    }
  },
  async fetch() {
    this.config.params.filters.button = 'Find'
    const requests = await this.$store.dispatch('finds/fetchFinds', this.config)
    this.loading = false
    this.posts = requests.posts
    this.postCount = requests.postCount
  },
  data() {
    return {
      ...search,
      title: 'Бюро находок',
      posts: [],
      postCount: null,
      loading: true,
      config: {
        params: {
          currentTerm: -1,
          page: 1,
          limits: 10,
          search: '',
          filters: {
            mainCategory: [''],
            button: 'Find',
            finds: '',
            location: '',
            source: ''
          }
        }
      },
      filters: [{ name: 'Источник', value: 'source', isActive: false }],
      filterStatus: {
        source: false
      },
      squareSwitch: [
        {
          label: 'Найдено',
          value: 'Find'
        },
        {
          label: 'Потеряно',
          value: 'Lost'
        }
      ],
      squareSwitchActiveIdx: 0
    }
  },
  methods: {
    async load(pager) {
      if (typeof pager === 'number') {
        this.config.params.page = pager
      } else {
        this.config.params.page = 1
      }
      const requests = await this.$store.dispatch(
        'finds/fetchFinds',
        this.config
      )
      this.loading = false
      this.posts = requests.posts
      this.postCount = requests.postCount
    },
    searchEvent(searchString) {
      this.config.params.search = `${searchString}`
      this.load()
    },
    ...searchActions
  },
  watch: {
    'config.params.filters.button': function (val) {
      this.config.params.filters.button = val
      this.load()
    }
  }
}
</script>
