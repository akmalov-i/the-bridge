<template>
  <div>
    <LazyPopup
      v-if="postCancelModal"
      :is-open="postCancelModal"
      title="Вы точно хотите удалить данный файл?"
      content="После нажатия кнопки «Да» файл будет удалён"
    >
      <button class="btn azure" @click="removeImage">Да</button>
      <button class="btn azure" @click="postCancelModal = false">Нет</button>
    </LazyPopup>
    <div class="wrapper">
      <div class="carousel-header">
        <h2>Мое портфолио</h2>
        <el-upload
          v-if="isMe"
          class="upload-demo"
          :class="{ disabled: portfolio.length > 9 }"
          action="#"
          ref="upload"
          :limit="1"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleImageChange"
        >
          <div
            class="portfolio-edit"
            :class="{ disabled: portfolio.length > 9 }"
          >
            +
          </div>
        </el-upload>
      </div>
      <div class="carousel">
        <div class="carousel-wrap">
          <div class="empty" v-if="portfolio.length === 0">
            <p>Пользователь пока не заполнил эту секцию</p>
          </div>
          <client-only v-else>
            <swiper class="swiper" :options="swiperOption">
              <swiper-slide v-for="(item, idx) in portfolio" :key="idx">
                <div class="item">
                  <div v-if="isMe" class="icon" @click="updatePortfolio(idx)">
                    <deleteSvg class="delete" />
                  </div>
                  <nuxt-img
                    :src="`portfolio${item}`"
                    class="zoom"
                    preset="work"
                    @click="zoomImage(item)"
                  />
                  <div class="zoom-wrap">
                    <photoZoomSvg />
                  </div>
                </div>
              </swiper-slide>

              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev">
                <i class="iconfont icon-arrow-down"></i>
              </div>
              <div class="swiper-button-next" slot="button-next">
                <i class="iconfont icon-arrow-up"></i>
              </div>
            </swiper>
          </client-only>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <nuxt-img class="dialog" :src="`portfolio${dialogImageUrl}`" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import photoZoomSvg from '@/assets/icons/photo-zoom.svg?inline'
import deleteSvg from '@/assets/icons/delete.svg?inline'

export default {
  props: {
    portfolio: {
      type: Array,
      required: true
    },
    isMe: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      postCancelModal: false,
      dialogImageUrl: '',
      dialogVisible: false,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 35,
        slidesPerGroup: 3,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        breakpoints: {
          1440: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 40
          },
          0: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 40
          }
        }
      },
      config: {
        _id: this.$route.params.id,
        params: {}
      },
      main: {
        image: ''
      }
    }
  },
  methods: {
    updatePortfolio(idx) {
      let updatePortfolio = this.portfolio.filter(
        (i) => i != this.portfolio[idx]
      )
      this.config.params.portfolio = updatePortfolio
      this.postCancelModal = true
    },
    async removeImage() {
      try {
        await this.$store.dispatch('user/updateProfile', this.config)
        this.postCancelModal = false
        this.$refs.upload.clearFiles()
        this.$nuxt.refresh()
        this.$message.error('Файл успешно был удалён!')
      } catch (e) {}
    },
    zoomImage(item) {
      this.dialogImageUrl = item
      this.dialogVisible = true
    },
    async handleImageChange(file, fileList) {
      if (this.portfolio.length >= 10) {
        return this.$message.warning(
          'Достигнуто максимальное количество работ!'
        )
      }
      const isJPG = file.raw.type === 'image/jpeg'
      const isLarge = file.raw.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('Файл должен быть в JPG формате!')
        this.$refs.upload.clearFiles()
      }
      if (!isLarge) {
        this.$message.error('Размер файла не должно превышать 2MB!')
        this.$refs.upload.clearFiles()
      }
      if (isJPG && isLarge) {
        this.main.image = file.raw

        const formData = {
          id: this.$route.params.id,
          image: this.main.image
        }

        try {
          await this.$store.dispatch('user/updatePortfolio', formData)
          this.$refs.upload.clearFiles()
          this.$message.success('Ваша работа добавлена!')
          this.$nuxt.refresh()
        } catch (e) {}
      }
    }
  },
  components: {
    photoZoomSvg,
    deleteSvg
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 1.6rem;
  padding: 2.4rem;
  width: 100%;
  background: $white;
  border-radius: 8px;
  position: relative;
}

.wrap {
  left: 0;
  top: 0;
  position: absolute;
}

.empty {
  height: 235px;
  p {
    font-family: Gilroy;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.8rem;
    font-weight: 500;
    color: rgba(158, 158, 158, 0.4);
  }
}

.disabled {
  opacity: 0.8;
  pointer-events: none;
}

.dialog {
  width: 100%;
  border-radius: 8px;
}

.swiper {
  .item {
    &:hover .icon {
      animation: fadeIn 0.4s forwards;
    }
    .icon {
      background: $coral;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      opacity: 0;
      align-items: center;
      display: flex;
      justify-content: center;
      transition: 0.4s;
      position: absolute;
      top: 10px;
      right: 10px;
      user-select: none;
      pointer-events: none;
      z-index: 333;

      &:hover {
        background: lighten($coral, 8%);
      }
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          user-select: unset;
          pointer-events: unset;
          cursor: pointer;
          opacity: 1;
        }
      }
    }

    .delete {
      fill: $white;
    }
  }
}

.portfolio-edit {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: -40px;
  width: 32px;
  height: 32px;
  background: $blue;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
  font-family: 'Roboto', sans-serif;
  color: #ffffff;
  font-size: 1.8rem;
  padding-left: 1px;

  &:hover {
    background: $orange;
  }
}

.carousel {
  display: flex;
  align-items: center;
  justify-content: center;

  &-header {
    position: absolute;
    top: 2.4rem;
    left: 2.4rem;
    z-index: 150;
  }
}
.carousel-wrap {
  width: 830px;
}

.zoom {
  object-fit: contain;
  cursor: pointer;
}

.zoom-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: $white;
  border-radius: 50%;
  user-select: none;
  opacity: 0;
  transition: 0.4s;
  user-select: none;
  pointer-events: none;
}

.swiper-slide .item {
  height: 180px;
}

.swiper-slide .item {
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  &:hover {
    .zoom-wrap {
      opacity: 1;
    }

    img {
      filter: brightness(70%);
    }
  }
}

.swiper-button-prev,
.swiper-button-next {
  background: $white;
  border-radius: 50%;
  border: 1px solid rgba(125, 125, 125, 0.32);
  width: 32px;
  height: 32px;
  transition: 0.4s;

  &:hover {
    border: 1px solid $orange;
    background: $orange;

    &::after {
      color: $white;
    }
  }
}

.swiper-container {
  height: 235px;
  display: flex;
  align-items: flex-end;
}

.swiper-pagination {
  font-family: 'Gilroy';
  font-style: normal;
  position: absolute;
  font-size: 1.6rem;
  left: unset;
  width: unset;
  height: unset;
  text-align: unset;
  top: 6px;
  right: 50px;
  color: $gray;
  font-weight: 500;
  &.swiper-pagination-fraction {
    user-select: none;
    pointer-events: none;
  }
}

.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 23px;
}

.swiper-button-next.swiper-button-disabled,
.swiper-button-prev.swiper-button-disabled {
  opacity: 1;
}

.swiper-button-prev {
  left: unset;
  right: 100px;
}

.swiper-button-next {
  left: unset;
  right: 0px;
}

.swiper-slide {
  margin-top: 47px;
}

.swiper-button-prev:after {
  color: $gray;
  font-size: 0.8rem;
  font-weight: 500;
  width: 6px;
  height: 8px;
  transition: 0.4s;
}

.swiper-button-next:after {
  color: $gray;
  font-size: 0.8rem;
  font-weight: 500;
  width: 4px;
  height: 8px;
}

@media (min-width: 1440px) {
  .carousel-wrap {
    width: 925px;
  }
}
</style>
