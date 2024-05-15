<template>
  <div>
    <el-upload
      class="upload-area"
      ref="upload"
      action="#"
      :limit="1"
      :before-upload="beforeAvatarUpload"
    >
      <uploadSvg />
      <p>Обновить подтверждающий документ</p>
    </el-upload>
    <div class="upload-text">
      <hr />
      <p>Мы рекомендуем использовать изображение в формате: JPG;</p>
    </div>
  </div>
</template>

<script>
import uploadSvg from 'assets/icons/upload.svg?inline'

export default {
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const MAX_SIZE = 2
      const isFile = file.type === 'image/jpeg'
      const isLarge = file.size / 1024 / 1024 < MAX_SIZE

      if (!isFile) {
        this.$message.error('Недопустимый формат!')
      } else if (!isLarge) {
        this.$message.error(`Файл должен быть не больше ${MAX_SIZE}MB!`)
      }
      return isFile && isLarge
    }
  },
  components: {
    uploadSvg
  }
}
</script>

<style lang="scss" scoped>
.upload-area {
  border: 1px dashed $gray;
  width: 100%;
  padding: 4.2rem;
  border-radius: 8px;
  background: #f3f3f3;
  color: $black;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    border-color: $blue;
    background: $light-blue;
  }

  p {
    margin-top: 1.2rem;
    text-align: center;
    max-width: 187px;
  }
}

.upload-text {
  margin: auto;
  font-family: 'Gilroy';
  font-weight: 400;
  font-size: 1.2rem;
  color: $black;
  max-width: 234px;
  text-align: center;
}

hr {
  height: 1px;
  width: 100%;
  background: $light-gray;
  min-width: 200px;
  margin: 2.4rem 0;
}
</style>