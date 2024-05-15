<template>
  <div>
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'status', order: 'descending' }"
      class="table user-wrap"
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
                <nuxt-img :src="scope.row.avatar" preset="offer" />
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
      <el-table-column prop="status" label="Статус" sortable min-width="120" />
      <el-table-column
        prop="chapter"
        label="Уровень"
        sortable
        min-width="120"
      />
      <el-table-column prop="category" label="Рейтинг" min-width="120" />
      <el-table-column label="Время регистрации" min-width="200" sortable>
        <template #default="scope">
          <div class="public-date space-between">
            <div class="start">
              <span class="timer center">
                <timerSvg />
              </span>
              {{ scope.row.publicTime }}
            </div>
            <nuxt-link to="/#">
              <button class="btn right ml1">
                <ArrowSvg />
              </button>
            </nuxt-link>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div>
      <ThePagination />
    </div>
  </div>
</template>

<script>
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import timerSvg from '@/assets/icons/timer.svg?inline'
import avatarSvg from '@/assets/icons/avatar.svg?inline'

export default {
  data() {
    return {
      tableData: [
        {
          name: 'Амирхан Т.',
          rate: 4,
          avatar: 'avatar2.jpg',
          status: 'Заявки',
          category: 'Не имеется',
          chapter: 'Стажёр',
          publicTime: '31.11.2021'
        },
        {
          name: 'Амирхан Т.',
          rate: 1,
          avatar: 'avatar4.jpg',
          status: 'Заявки',
          category: 'Не имеется',
          chapter: 'Стажёр',
          publicTime: '16.11.2021'
        },
        {
          name: 'Амирхан Т.',
          rate: 5,
          avatar: 'avatar3.jpg',
          status: 'Заявки',
          category: 'Не имеется',
          chapter: 'Стажёр',
          publicTime: '08.11.2021'
        },
        {
          name: 'Амирхан Т.',
          rate: 2,
          avatar: 'avatar5.jpg',
          status: 'Заявки',
          category: 'Не имеется',
          chapter: 'Стажёр',
          publicTime: '06.11.2021'
        },
        {
          name: 'Амирхан Т.',
          rate: 2,
          avatar: 'avatar6.jpg',
          status: 'Заявки',
          category: 'Не имеется',
          chapter: 'Стажёр',
          publicTime: '01.11.2021'
        },
        {
          name: 'Амирхан Т.',
          rate: 2,
          avatar: 'avatar7.jpg',
          status: 'Заявки',
          category: 'Не имеется',
          chapter: 'Стажёр',
          publicTime: '10.11.2021'
        },
        {
          name: 'Амирхан Т.',
          rate: 2,
          avatar: 'avatar8.jpg',
          status: 'Заявки',
          category: 'Не имеется',
          chapter: 'Стажёр',
          publicTime: '09.11.2021'
        }
      ]
    }
  },
  methods: {
    formatter(row, column) {
      return row.address
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