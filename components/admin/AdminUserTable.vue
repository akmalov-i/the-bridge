<template>
  <div>
    <el-table
      :data="tableDataGetter"
      @sort-change="change"
      class="table"
      style="width: 100%"
    >
      <el-table-column lazy label="Пользователь" min-width="300">
        <template #default="scope">
          <div class="user">
            <!-- if hasn't avatar -->
            <div v-if="!scope.row.avatar">
              <div class="avatar-img center">
                <avatarSvg />
              </div>
            </div>
            <!-- if has avatar -->
            <div v-else>
              <div class="avatar-img">
                <nuxt-img :src="'avatars' + scope.row.avatar" preset="offer" />
              </div>
            </div>
            <div class="info">
              <p style="line-height: 100%">{{ scope.row.name }}</p>
              <el-rate
                v-model="scope.row.rate"
                disabled
                disabled-void-color="#7d7d7d75"
                class="stars"
                :max="5"
                :colors="['#1374F6', '#1374F6', '#1374F6']"
              >
              </el-rate>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="Статус"
        sortable="custom"
        min-width="120"
        :class-name="classNames.status"
      />
      <el-table-column
        prop="chapter"
        label="Уровень"
        min-width="120"
        :class-name="classNames.chapter"
      />
      <el-table-column
        prop="rate"
        label="Рейтинг"
        sortable="custom"
        min-width="120"
        :class-name="classNames.rate"
      />
      <el-table-column
        prop="dateOfCreation"
        label="Время регистрации"
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
            <nuxt-link :to="`/admin/users/${scope.row._id}`">
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
        :total="usersCount"
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
import avatarSvg from '@/assets/icons/avatar.svg?inline'
import moment from 'moment'

export default {
  async fetch() {
    const requests = await this.$store.dispatch('admin/fetchUsers', this.config)
    this.filter(requests)
  },
  data() {
    return {
      usersCount: 0,
      loading: true,
      classNames: {
        status: 'ascending',
        rate: 'ascending',
        dateOfCreation: 'ascending'
      },
      config: {
        params: {
          currentTerm: -1,
          page: 1,
          limits: 10,
          search: '',
          filters: {
            status: '', // заявки, текущие, черный список
            chapter: '' // Novice users, Advanced users, Aces
          }
        }
      },
      tableData: []
    }
  },
  methods: {
    filter(data) {
      this.usersCount = data.usersCount
      let users = data.users
      let replacer = []

      for (let i = 0; i < users.length; i++) {
        let box = {}

        box.name = users[i].name + ' ' + users[i].surname.slice(0, 1) + '.'

        switch (users[i].status) {
          case 'application':
            box.status = 'Заявки'
            break
          case 'cancelled':
            box.status = 'Чёрный список'
            break
          case 'active':
            box.status = 'Текущие'
            break
        }
        box.status = 'Заявки'
        box.rate = users[i]?.rating?.stars || 0
        box.chapter = 'Новичок'
        box.avatar = users[i].imageUrl
        box._id = users[i]._id
        box.dateOfCreation = moment(
          new Date(users[i].dateOfCreation).toISOString()
        )
          .locale('ru')
          .format('D MMM YYYY HH:mm')
        replacer.push(box)
      }

      this.tableData = replacer
    },
    async load(pager) {
      if (typeof pager === 'number') {
        this.config.params.page = pager
      } else {
        this.config.params.page = 1
      }
      try {
        const requests = await this.$store.dispatch(
          'admin/fetchUsers',
          this.config
        )
        this.filter(requests)
        this.loading = false
      } catch (e) {}
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
    },
    formatter(row, column) {
      return row.address
    }
  },
  computed: {
    tableDataGetter() {
      return this.tableData
    }
  },
  components: {
    ArrowSvg,
    timerSvg,
    avatarSvg
  }
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.el-rate {
  height: auto;
}

.info {
  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 1.4rem;
    color: $black;
    margin-bottom: 0.6rem;
    max-width: 175px;
  }
}

.avatar-img {
  min-height: 56px;
  min-width: 56px;
  max-height: 56px;
  max-width: 56px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 2rem;
  background: $azure;

  svg {
    fill: $blue;
  }
}

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
