<template>
  <div>
    <!-- navigation -->
    <Navbar>
      <Location />
      <TheLogo />
      <TheSettings />
    </Navbar>

    <div class="page-owner">
      <div class="content-container">
        <div class="top">
          <div class="top-left">
            <TheFace :face="face" :squareSwitchActiveIdx.sync="onWork" />
          </div>
          <div class="top-right">
            <TheAboutMe :about="about" />
            <ThePortfolio :portfolio="portfolio" :isMe="isMe" />
          </div>
        </div>
        <div class="bottom">
          <TheStatistic :data="status" />
        </div>
      </div>
    </div>

    <div class="reviews" v-if="reviews.length < 0">
      <div class="content-container">
        <h2>Отзывы</h2>
        <div class="reviews-tabs">
          <div class="status-change">
            <div class="select-tab space-between">
              <div
                class="center tab"
                @click="selectTab('')"
                :class="{ active: tab === '' }"
              >
                Все
              </div>
              <div
                v-for="(item, idx) in searchCategories"
                :key="idx"
                class="center tab"
                :class="{ active: tab === item[2] }"
                @click="selectTab(item[2])"
              >
                {{ item[1] }}
              </div>
            </div>
          </div>
          <TheSortTrade
            :resultTerm="resultTerm"
            :currentTerm="currentTerm"
            @term="termChange"
            :style="{ 'z-index': 100 }"
          />
        </div>
        <div class="reviews-wrap" v-for="item in reviews" :key="item._id">
          <TheReview :data="item" />
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
export default {
  middleware: ['user-auth'],
  head() {
    return {
      title: 'Lavzee | ' + this.title
    }
  },
  validate({ params }) {
    return Boolean(params.id)
  },
  async asyncData({ store, params }) {
    let isMe = false
    let userId = await store.getters['auth/userId']
    let user = await store.dispatch('user/fetchById', params.id)
    let status = user.rating

    const config = {
      params: {
        userId: params.id,
        hidden: 'false'
      }
    }
    let reviews = await store.dispatch('feedback/userFeeds', config)
    if (params.id === userId) isMe = true

    return {
      isMe: isMe,
      status,
      reviews,
      paramsId: params.id,
      userId,
      face: {
        name: user.name,
        surname: user.surname.slice(0, 1) + '.',
        links: user.links,
        profession: user.profession,
        imageUrl: user.imageUrl,
        car: user.car,
        tools: user.tools,
        knowledge: user.knowledge,
        langs: user.langs,
        exp: user.exp,
        telephone: user.telephone,
        email: user.email,
        fromCity: user.fromCity,
        fromCountry: user.fromCountry,
        isMe: isMe,
        id: userId,
        stars: status.stars
      },
      portfolio: user.portfolio,
      about: { textarea: user.textarea, exp: user.exp },
      onWork: user.onWork
    }
  },
  created() {
    let array = [],
      counts = {},
      sortable = []

    for (let i = 0; i < this.reviews.length; i++) {
      let box = {
        source: this.reviews[i].postId.mainCategory,
        label: this.reviews[i].postId.mainCategoryLabel
      }
      array.push(box)
    }

    array.forEach((x) => {
      counts[x.source] = [parseInt(counts[x.source] || 0) + 1]
      counts[x.source].push(x.label, x.source)
    })

    for (let content in counts) {
      sortable.push(counts[content])
    }

    sortable.sort((a, b) => {
      return b[0] - a[0]
    })

    if (sortable.length > 5) sortable.length = 5

    this.searchCategories = sortable
  },
  data() {
    return {
      searchCategories: [],
      title: 'Мой профиль',
      tab: '',
      currentTerm: -1,
      resultTerm: [
        { name: 'Высокий рейтинг', value: -1 },
        { name: 'Низкий рейтинг', value: 1 },
        { name: 'Самые новые', value: 2 },
        { name: 'Самые ранние', value: 3 }
      ]
    }
  },
  methods: {
    async termChange(option) {
      this.currentTerm = option.value
      this.load()
    },
    selectTab(tab) {
      this.tab = tab
      this.load()
    },
    async load() {
      const config = {
        params: {
          userId: this.paramsId,
          resultTerm: this.currentTerm,
          tab: this.tab,
          hidden: 'false'
        }
      }
      try {
        const reviews = await this.$store.dispatch('feedback/userFeeds', config)
        this.reviews = reviews
      } catch (e) {}
    }
  },
  watch: {
    async onWork(val) {
      try {
        const config = { _id: this.$route.params.id }
        config.params = {
          onWork: val
        }
        await this.$store.dispatch('user/updateProfile', config)
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 0rem;
  border-bottom: none;
}
.page-owner {
  padding: 3.2rem;
  background: $azure;
}

.top {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-column-gap: 1.2%;
}

.content-container {
  max-width: 1360px;
  margin: 0 auto;
}

.bottom {
  max-width: 1400px;
  margin: auto;
}

.reviews {
  padding: 0 3.2rem 3.2rem;
  h2 {
    margin-top: 3.2rem;
  }
}

.reviews-tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3.2rem;
}

.status-change {
  text-align: center;
  height: 44px;

  .select-tab {
    max-width: unset;
    min-width: unset;
  }

  .tab {
    padding-right: 3.2rem;
    padding-left: 3.2rem;
  }
}
</style>
