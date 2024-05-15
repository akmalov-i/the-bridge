<template>
  <div>
    <el-table
      :data="tableDataGetter"
      @sort-change="change"
      class="table"
      style="width: 100%"
    >
      <el-table-column prop="title" label="Название" min-width="300" />
      <el-table-column
        prop="status"
        label="Статус"
        sortable="custom"
        min-width="120"
        :class-name="classNames.status"
      />
      <el-table-column
        prop="chapter"
        label="Раздел"
        sortable="custom"
        min-width="120"
        :class-name="classNames.chapter"
      />
      <el-table-column prop="adsSection" label="Категория" min-width="120" />
      <el-table-column
        prop="dateOfCreation"
        label="Время публикации"
        min-width="200"
        sortable="custom"
        :class-name="classNames.dateOfCreation"
      >
        <template #default="scope">
          <div class="public-date space-between">
            <div class="start">
              <span class="timer center">
                <timerSvg />
              </span>
              {{ scope.row.dateOfCreation }}
            </div>

            <nuxt-link :to="`/admin/transaction/${scope.row._id}`">
              <button class="btn right ml1">
                <ArrowSvg />
              </button>
            </nuxt-link>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="center">
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
  </div>
</template>

<script>
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import timerSvg from '@/assets/icons/timer.svg?inline'
import moment from 'moment'

export default {
  async fetch() {
    const requests = await this.$store.dispatch('admin/fetch', this.config)
    this.filter(requests)
  },
  data() {
    return {
      tableData: [],
      postCount: 0,
      loading: true,
      classNames: {
        status: 'ascending',
        chapter: 'ascending',
        dateOfCreation: 'ascending'
      },
      config: {
        params: {
          currentTerm: -1,
          page: 1,
          limits: 10,
          search: '',
          filters: {
            status: 'application',
            chapter: 'service'
          }
        }
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
        const requests = await this.$store.dispatch('admin/fetch', this.config)
        this.filter(requests)
        this.loading = false
      } catch (e) {}
    },
    formatter(row, column) {
      return row.address
    },
    change(sort) {
      if (sort.prop === 'dateOfCreation') {
        switch (sort.order) {
          case 'ascending':
            this.config.params.currentTerm = -1
            this.classNames.dateOfCreation = 'ascending'
            break
          case 'descending':
            this.config.params.currentTerm = 1
            this.classNames.dateOfCreation = 'descending'
            break
          case null:
            this.config.params.currentTerm = -1
            this.classNames.dateOfCreation = ''
            break
        }
        this.load(this.config)
      }
      if (sort.prop === 'status') {
        switch (sort.order) {
          case 'ascending':
            this.config.params.filters.status = 'application'
            this.classNames.status = 'ascending'
            break
          case 'descending':
            this.config.params.filters.status = 'cancelled'
            this.classNames.status = 'descending'
            break
          case null:
            this.config.params.filters.status = 'active'
            this.classNames.status = ''
            break
        }
        this.load(this.config)
      }
      if (sort.prop === 'chapter') {
        switch (sort.order) {
          case 'ascending':
            this.config.params.filters.chapter = 'service'
            this.classNames.chapter = 'ascending'
            break
          case 'descending':
            this.config.params.filters.chapter = 'trade'
            this.classNames.chapter = 'descending'
            break
          case null:
            this.config.params.filters.chapter = 'service'
            this.classNames.chapter = ''
            break
        }
        this.load(this.config)
      }
    },
    filter(data) {
      this.postCount = data.postCount
      let post = data.posts
      let replacer = []

      for (let i = 0; i < post.length; i++) {
        let box = {}
        box.title = post[i].title
        switch (post[i].status) {
          case 'application':
            box.status = 'Заявки'
            break
          case 'cancelled':
            box.status = 'Отмененные'
            break
          case 'active':
            box.status = 'Текущие'
            break
        }
        switch (post[i].chapter) {
          case 'service':
            box.status = 'Услуги'
            break
          case null:
            box.status = 'Услуги'
            break
          case 'trade':
            box.status = 'Торг'
            break
        }
        if (post[i]?.mainCategoryLabel) {
          box.adsSection = post[i].mainCategoryLabel
        } else {
          box.adsSection = post[i].subcategoryLabel.label
        }
        box.chapter = post[i].adsSection === 'Services' ? 'Услуги' : 'Торг'
        box._id = post[i]._id
        box.dateOfCreation = moment(
          new Date(post[i].dateOfCreation).toISOString()
        )
          .locale('ru')
          .format('D MMM YYYY HH:mm')
        replacer.push(box)
      }

      this.tableData = replacer
    }
  },
  computed: {
    tableDataGetter() {
      return this.tableData
    }
  },
  components: {
    ArrowSvg,
    timerSvg
  }
}
</script>

<style lang="scss" scoped>
.public-date {
  .btn.right {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 1px solid rgba(229, 229, 229, 0.72);
    transition: 0.4s;

    &:hover {
      background: $orange;
      border: 1px solid $orange;

      svg {
        fill: $white;
      }
    }

    svg {
      transform: rotate(-90deg);
      fill: rgba(125, 125, 125, 0.72);
      transition: 0.4s;
    }
  }

  .timer {
    margin-right: 0.6rem;
    svg {
      fill: rgba(125, 125, 125, 0.72);
    }
  }
}

.table {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.pagination {
  justify-content: flex-end;
  padding: 0 2.4rem;
  background: $white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
