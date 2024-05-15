<template>
  <div>
    <div class="details-popup center" v-if="isOpen">
      <div class="popup">
        <div class="top space-between">
          <h2>Другие причины</h2>
          <div class="cancel" @click="closeDetails">&#10006;</div>
        </div>

        <div class="item">
          <div class="person">
            <nuxt-img src="avatar5.jpg" preset="avatar" />
            <h3>Амирхан Т.</h3>
          </div>
          <div class="comments">
            Требовании и обязанности: Требовании и обязанности:
          </div>
        </div>

        <div class="item">
          <div class="person">
            <nuxt-img src="avatar5.jpg" preset="avatar" />
            <h3>Амирхан Т.</h3>
          </div>
          <div class="comments">
            Требовании и обязанности: Требовании и обязанности:
          </div>
        </div>

        <div class="item">
          <div class="person">
            <nuxt-img src="avatar5.jpg" preset="avatar" />
            <h3>Амирхан Т.</h3>
          </div>
          <div class="comments">
            Требовании и обязанности: Требовании и обязанности:
          </div>
        </div>

        <div class="item">
          <div class="person">
            <nuxt-img src="avatar5.jpg" preset="avatar" />
            <h3>Амирхан Т.</h3>
          </div>
          <div class="comments">
            Требовании и обязанности: Требовании и обязанности:
          </div>
        </div>

        <div class="item">
          <div class="person">
            <nuxt-img src="avatar5.jpg" preset="avatar" />
            <h3>Амирхан Т.</h3>
          </div>
          <div class="comments">
            Требовании и обязанности: Требовании и обязанности:
          </div>
        </div>

        <div class="item">
          <div class="person">
            <nuxt-img src="avatar5.jpg" preset="avatar" />
            <h3>Амирхан Т.</h3>
          </div>
          <div class="comments">
            Требовании и обязанности: Требовании и обязанности:
          </div>
        </div>

        <div class="item">
          <div class="person">
            <nuxt-img src="avatar5.jpg" preset="avatar" />
            <h3>Амирхан Т.</h3>
          </div>
          <div class="comments">
            Требовании и обязанности: Требовании и обязанности:
          </div>
        </div>
      </div>
    </div>

    <el-table
      :data="tableData"
      :default-sort="{ prop: 'status', order: 'descending' }"
      class="table user-wrap blacklist"
      style="width: 100%"
    >
      <el-table-column lazy label="Имя и фамилия" min-width="90">
        <template #default="scope">
          <div class="user">
            <div class="info">
              <p style="line-height: 100%">{{ scope.row.name }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="Телефон" min-width="50" />
      <el-table-column prop="address" label="Адресс" min-width="100" />
      <el-table-column prop="status" label="Файл" min-width="40">
        <template #default="scope">
          <nuxt-link class="download-file center" :to="'/' + scope.row.doc">
            <p>Открыть</p>
          </nuxt-link>
        </template>
      </el-table-column>
      
      <el-table-column label="" width="100" >
        <template #default="scope">
          <button class="btn custom center" @click="openDetails">
            {{ scope.row.reports }}
          </button>
        </template>
      </el-table-column>

      <el-table-column label="" width="80">
        <template #default>
          <button class="btn delete center">
            <DeleteSvg />
          </button>
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
import DeleteSvg from '@/assets/icons/delete.svg?inline'

export default {
  data() {
    return {
      isOpen: false,
      tableData: [
        {
          name: 'Амирхан Тамерланов',
          doc: '',
          number: '+998909732014',
          address: 'Ташкент, Юнусабадский район',
          category: 'Услуги',
          reports: 'Заметки'
        },
        {
          name: 'Амирхан Тамерланов',
          doc: '',
          number: '+998909732014',
          address: 'Ташкент, Юнусабадский район',
          category: 'Услуги',
          reports: 'Заметки'
        },
        {
          name: 'Амирхан Тамерланов',
          doc: '',
          number: '+998909732014',
          address: 'Ташкент, Юнусабадский район',
          category: 'Услуги',
          reports: 'Заметки'
        },
        {
          name: 'Амирхан Тамерланов',
          doc: '',
          number: '+998909732014',
          address: 'Ташкент, Юнусабадский район',
          category: 'Услуги',
          reports: 'Заметки'
        }
      ]
    }
  },
  methods: {
    formatter(row, column) {
      return row.address
    },
    openDetails() {
      this.isOpen = !this.isOpen
    },
    closeDetails() {
      this.isOpen = !this.isOpen
    }
  },
  components: {
    ArrowSvg,
    DeleteSvg
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

.delete {
  border: 1px solid rgba(229, 229, 229, 0.72);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  min-width: 40px;
  background: $white;

  svg {
    fill: $gray;
  }
}

.details-popup {
  background: #000000b7;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1999;
  animation: bg 0.4s forwards;

  .popup {
    background: $white;
    width: 564px;
    height: 644px;
    border-radius: 8px;
    padding: 2.4rem;
    overflow: auto;
  }

  .item {
    padding-bottom: 1.4rem;
    border-bottom: 1px solid #e5e5e5;
  }

  .top {
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 2.4rem;

    h2 {
      margin-bottom: 0 !important;
    }

    .cancel {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: $azure;
      font-size: 2rem;
      color: $blue;
    }
  }

  .person {
    display: flex;
    align-items: center;
    margin-bottom: 1.4rem;
    margin-top: 1.4rem;

    img {
      height: 56px;
      width: 56px;
      border-radius: 50%;
      margin-right: 0.8rem;
    }

    h3 {
      margin-bottom: 0;
    }
  }

  .comments {
    border-radius: 4px;
    background: #f3f3f3;
    padding: 1.6rem;
    font-size: 1.4rem;
    font-weight: 300;
  }
}

.btn.custom {
  width: 100%;
  background: none;
  color: $blue;
}
</style>