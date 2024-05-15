<template>
  <div>
    <el-table
      :data="tableDataGetter"
      class="table user-wrap exp"
      style="width: 100%"
    >
      <el-table-column lazy label="Пользователь" min-width="70">
        <template #default="scope">
          <div class="user">
            <div class="info">
              <p style="line-height: 100%">{{ scope.row.user }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="Телефон" min-width="50" />
      <el-table-column prop="title" label="Название" min-width="90" />
      <el-table-column prop="date" label="Дата публикации" min-width="60" />
      <el-table-column lazy min-width="20">
        <template #default="scope">
            <button class="btn delete center" :class="{active: scope.row.checked}">
              <eyeSvg />
            </button>
        </template>
      </el-table-column>
      <el-table-column lazy min-width="30">
        <template #default="scope">
          <nuxt-link :to="`/admin/exp/${scope.row._id}`">
            <button class="btn delete center">
              <ArrowSvg />
            </button>
          </nuxt-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import eyeSvg from '@/assets/icons/eye.svg?inline'
import moment from 'moment'

export default {
  async fetch() {
    const data = await this.$store.dispatch('experience/fetch', this.config)
    this.postCount = data.postCount
    let post = data.posts
    let replacer = []

    for (let i = 0; i < post.length; i++) {
      let box = {}
      let user = await this.$store.dispatch('user/fetchByIdExp', post[i].userId)
      box.title = post[i].title
      box.checked = post[i].checked
      box._id = post[i]._id
      box.date = moment(new Date(post[i].dateOfCreation).toISOString())
        .locale('ru')
        .format('D MMM YYYY HH:mm')
      box.user = user[0].name + ' ' + user[0].surname
      box.phone = user[0].telephone
      replacer.push(box)
    }

    this.tableData = replacer
  },
  data() {
    return {
      isOpen: false,
      config: {
        params: {
          currentTerm: -1,
          page: 1,
          limits: 10,
          search: ''
        }
      },
      tableData: []
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
    },
    async filter(data) {
      this.postCount = data.postCount
      let post = data.posts
      let replacer = []

      for (let i = 0; i < post.length; i++) {
        let box = {}
        let user = await this.$store.dispatch(
          'user/fetchByIdExp',
          post[i].userId
        )
        box.title = post[i].title
        box._id = post[i]._id
        box.date = moment(new Date(post[i].dateOfCreation).toISOString())
          .locale('ru')
          .format('D MMM YYYY HH:mm')
        box.user = user[0].name + ' ' + user[0].surname
        box.phone = user[0].telephone
        replacer.push(box)
      }

      this.tableData = replacer
    }
  },
  components: {
    ArrowSvg,
    eyeSvg
  },
  computed: {
    tableDataGetter() {
      return this.tableData
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.delete.active {
  border-color: $blue;
  background: $blue;

  svg {
    fill: $white;
  }
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

  &:hover {
    background: $orange;
    border: 1px solid $orange;
  }

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
