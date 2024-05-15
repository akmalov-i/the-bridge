<template>
  <div>
    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
    </Navbar>

    <div class="page-container">
      <el-row type="flex" justify="space-between">
        <Main>
          <TheBreadcrumb
            firstText="Главная"
            link="/user"
            addText="Мой профиль"
            :secondText="title"
          />
          <h1>{{ title }}</h1>
          <LazySearchFilter :top="false">
            <template #bottom>
              <div class="select-wrap">
                <p>Мой</p>
                <el-select v-model="search.stage" placeholder="Выбрать">
                  <el-option
                    v-for="item in stage"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="select-wrap">
                <p>Стадия</p>
                <el-select v-model="search.myStatus" placeholder="Выбрать">
                  <el-option
                    v-for="item in myStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <TheSort
                :result-term="resultTerm"
                :result-limit="resultLimit"
                :current-limit="config.params.limits"
                :current-term="config.params.currentTerm"
                @limit="selectResultLimit"
                @term="selectResultTerm"
              />
            </template>
          </LazySearchFilter>
          <el-skeleton v-if="loading" style="width: 100%" :count="10" animated>
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
  </div>
</template>

<script>
import { search, searchActions } from '@/content/search-modules'

export default {
  middleware: ['user-auth'],
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
  mounted() {
    const { message } = this.$route.query
    const { mode } = this.$route.query

    switch (message) {
      case 'created':
        this.$message.warning({
          showClose: true,
          message: 'Заявка на публикацию отправлена в модерацию! '
        })
        this.search.stage = 'Applications for publication'
        break
    }

    switch (mode) {
      case 'finds':
        this.search.myStatus = 'Lost and Found'
        break
    }
  },
  data() {
    return {
      title: 'Мои транзакции',
      posts: [],
      loading: true,
      search: {
        myStatus: 'Executor',
        stage: 'Active'
      },
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
            myStatus: '',
            stage: ''
          }
        }
      },
      ...search
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
