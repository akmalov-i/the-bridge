<template>
  <v-app>
    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
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
                  :options="mainCategory"
                  :props="{ checkStrictly: true }"
                  @change="load"
                ></el-cascader>
              </div>
              <SearchTab />
            </template>

            <template #bottom>
              <div class="select-wrap">
                <p>Цена</p>
                <el-select
                  v-model="config.params.filters.determiningTheCost"
                  placeholder="Выбрать"
                  @change="load"
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
                <p>Вид услуг</p>
                <el-select
                  v-model="config.params.filters.typeOfServices"
                  placeholder="Выбрать"
                  @change="load"
                >
                  <el-option
                    v-for="item in typeOfServices"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div
                class="select-wrap"
                v-if="filterStatus.minLevelForTheApplication"
              >
                <p>Мин. уровень</p>
                <el-select
                  v-model="config.params.filters.minLevelForTheApplication"
                  placeholder="Выбрать"
                  @change="load"
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
              <div class="select-wrap" v-if="filterStatus.adFrom">
                <p>Объявление от...</p>
                <el-select
                  v-model="config.params.filters.adFrom"
                  placeholder="Выбрать"
                  @change="load"
                >
                  <el-option
                    v-for="item in adFrom"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="select-wrap" v-if="filterStatus.currency">
                <p>Валюта</p>
                <el-select
                  v-model="config.params.filters.currency"
                  placeholder="Выбрать"
                  @change="load"
                >
                  <el-option
                    v-for="item in currency"
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
            <LazyTransaction :post="post" />
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
          <AsideElements />
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
    const requests = await this.$store.dispatch('post/fetch', this.config)
    this.loading = false
    this.posts = requests.posts
    this.postCount = requests.postCount
  },
  data() {
    return {
      ...search,
      title: 'Разовые услуги',
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
            determiningTheCost: '',
            typeOfServices: '',
            minLevelForTheApplication: '',
            adFrom: '',
            currency: ''
          }
        }
      },
      filters: [
        {
          name: 'Мин. Уровень',
          value: 'minLevelForTheApplication',
          isActive: false
        },
        { name: 'Объявление от..', value: 'adFrom', isActive: false },
        { name: 'Валюта', value: 'currency', isActive: false }
      ],
      filterStatus: {
        minLevelForTheApplication: false,
        adFrom: false,
        currency: false
      }
    }
  },
  methods: {
    async load(pager) {
      if (typeof pager === 'number') {
        this.config.params.page = pager
      } else {
        this.config.params.page = 1
      }
      try {
        const requests = await this.$store.dispatch('post/fetch', this.config)
        this.loading = false
        this.posts = requests.posts
        this.postCount = requests.postCount
      } catch (e) {}
    },
    searchEvent(searchString) {
      this.config.params.search = `${searchString}`
      this.load()
    },
    ...searchActions
  }
}
</script>
