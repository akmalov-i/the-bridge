<template>
  <div v-if="fileList.length > 0">
    <p class="file-title mt2">Прикреплённые файлы:</p>
    <ul class="file-list">
      <li class="item" v-for="(file, idx) in fileList" :key="file.filename">
        <el-tooltip placement="top-start">
          <template #content>
            <div class="tooltip">
              <b>Скачать файл</b><br />
              Название файла: {{ file.originalname }} <br />
              Размер файла:
              {{
                file.size > 1048576
                  ? Math.round(file.size / 1024 / 1024) + ' MB'
                  : Math.round(file.size / 1024) + ' KB'
              }}
            </div>
          </template>
          <a
            :href="'/files/' + file.filename"
            target="_blank"
            :download="file.filename"
            @click="downloadMessage"
          >
            <i class="el-icon-document"></i>
            <span class="item-name"
              >{{ idx + 1 }}. {{ file.originalname }}</span
            >
          </a>
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    fileList: Array
  },
  data() {
    return {}
  },
  methods: {
    downloadMessage() {
      this.$message('Сейчас начнётся закачка файла')
    }
  }
}
</script>

<style lang="scss" scoped>
.file-list {
  margin-top: 1.4rem;
  display: grid;
  grid-column-gap: 2%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-items: stretch;
  list-style: none;
  font-size: 1.4rem;
  font-weight: 400;
  color: #606266;
}

.file-title {
  font-size: 1.2rem;
  color: $gray;
}

.item {
  border: 1px solid #ccc;
  border-radius: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #606266;
  white-space: nowrap;
  line-height: 1.8;
  transition: 0.4s;

  a {
    display: flex;
    padding: 0.7rem 1.8rem;

    i {
      margin: 0.4rem 0.4rem 0.4rem 0;
    }

    i::before {
      content: '\e785';
      transition: 0.4s;
    }

    &:hover {
      i::before {
        color: $white;
      }
    }
  }

  &:hover {
    cursor: pointer;
    background: $blue;
    color: $white;
    border: 1px solid $blue;

    .item-name {
      color: $white;
    }
  }

  .item-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 0.4s;
  }
}

.tooltip {
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// @media (max-width: 1440px) {
//   .file-list {
//     display: flex;
//     flex-direction: column;

//     .item {
//       margin-bottom: 0.8rem;
//     }
//   }
// }
</style>
