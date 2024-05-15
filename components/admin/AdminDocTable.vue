<template>
  <div>
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'status', order: 'descending' }"
      class="table user-wrap doc"
      style="width: 100%"
    >
      <el-table-column lazy label="Пользователь" min-width="250">
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
      <el-table-column prop="status" label="Документ" min-width="120">
        <template #default="scope">
          <nuxt-link class="download-file center" :to="'/' + scope.row.doc">
            <docfileSvg />
            <p>Открыть</p>
          </nuxt-link>
        </template>
      </el-table-column>
      <el-table-column prop="chapter" label="Вес файла" min-width="100" />
      <el-table-column label="Дата" min-width="230" sortable>
        <template #default="scope">
          <div class="public-date space-between">
            <div class="start">
              <span class="timer center">
                <calendarSvg />
              </span>
              {{ scope.row.publicTime }}
            </div>
            <div class="action-btns start">
              <button class="btn center">
                <CheckSvg />
              </button>
              <button class="btn center">
                <XSvg />
              </button>
            </div>
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
import calendarSvg from '@/assets/icons/calendar.svg?inline'
import avatarSvg from '@/assets/icons/avatar.svg?inline'
import docfileSvg from '@/assets/icons/docfile.svg?inline'
import CheckSvg from '@/assets/icons/check.svg?inline'
import XSvg from '@/assets/icons/x.svg?inline'

export default {
  data() {
    return {
      tableData: [
        {
          name: 'Амирхан Т.',
          rate: 4,
          avatar: 'avatar8.jpg',
          doc: '',
          chapter: '4.49 мб',
          category: 'Услуги',
          publicTime: '31.11.2021'
        },
        {
          name: 'Амирхан Т.',
          rate: 4,
          avatar: '',
          doc: '',
          chapter: '4.49 мб',
          category: 'Услуги',
          publicTime: '31.11.2021'
        },
        {
          name: 'Амирхан Т.',
          rate: 4,
          avatar: 'avatar7.jpg',
          doc: '',
          chapter: '4.49 мб',
          category: 'Услуги',
          publicTime: '31.11.2021'
        },
        {
          name: 'Амирхан Т.',
          rate: 4,
          avatar: 'avatar8.jpg',
          doc: '',
          chapter: '4.49 мб',
          category: 'Услуги',
          publicTime: '31.11.2021'
        },
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
    calendarSvg,
    avatarSvg,
    docfileSvg,
    CheckSvg,
    XSvg
  }
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.action-btns {
  button {
    background: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(229, 229, 229, 0.72);
    transition: 0.4s;

    &:hover:first-child {
      background: $green;
      border-color: $green;

      svg {
        fill: $white;
      }
    }

    &:hover:last-child {
      background: $coral;
      border-color: $coral;

      svg {
        fill: $white;
      }
    }

    &:first-child {
      margin-right: 2.4rem;
    }

    svg {
      fill: $gray;
      transition: 0.4s;
    }
  }
}

.el-rate {
  height: auto;
}

.download-file {
  width: 110%;
  height: 100%;
  color: $blue;

  p {
    margin-left: 0.7rem;
  }
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
  width: 100%;

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