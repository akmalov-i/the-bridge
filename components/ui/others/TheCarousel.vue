<template>
  <div>
    <div class="carousel" v-show="false">
      <div
        class="carousel-item"
        v-for="(item, idx) in carouselData"
        :key="item.id"
      >
        <div
          :style="'transform: translateX(-' + slideTransition + 'px)'"
          class="step"
          :class="{ 'is-active': currentSlide == idx }"
          @click="selectStep(idx)"
        >
          <nuxt-img :src="item.img" preset="comments" />
          <p>Шаг №{{ idx + 1 }}</p>
        </div>
      </div>
    </div>
    <div class="carousel-details" v-if="carouselData.length > 0">
      <b>Детали №{{ currentSlide + 1 }}:</b> -
      {{ carouselData[currentSlide].details }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    carouselData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentSlide: 0,
      slideTransition: 0
    }
  },
  methods: {
    selectStep(idx) {
      this.currentSlide = idx
      this.slideTransition = this.currentSlide * 70
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  border-top: 1px solid $light-gray;
  padding-top: 1.6rem;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  position: relative;
  user-select: none;

  &-details {
    b {
      font-weight: 500;
    }
    word-break: break-word;
    max-width: 500px;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 170%;
    padding: 1.2rem;
    border: 1px solid $light-gray;
    border-radius: 4px;
    margin-top: 1.6rem;
    margin-bottom: 1.2rem;
  }

  &::after {
    position: absolute;
    content: '';
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 0) 0%,
      rgba(255, 255, 255, 1) 54%,
      rgba(255, 255, 255, 1) 100%
    );
    width: 30px;
    height: 100%;
    top: 0;
    right: 0;
  }
}

.carousel-item {
  height: 40px;
}

.step {
  position: absolute;
  cursor: pointer;
  width: 118px;
  display: flex;
  align-items: center;
  transition: 0.4s;

  &.is-active {
    p {
      background: $blue;
      border: 1px solid $blue;
      color: $white;
    }
  }

  img {
    border-radius: 50%;
    min-width: 40px;
    max-width: 40px;
    max-height: 40px;
    max-height: 40px;
    background-size: cover;
    margin-right: 0.8rem;
  }

  p {
    font-size: 1.4rem;
    font-weight: 400;
    color: $blue;
    padding: 0.3rem 0.6rem;
    border: 1px solid $light-gray;
    border-radius: 4px;
    transition: 0.22s;
  }
}

.carousel-item:nth-child(1) {
  transform: translateX(0px);
}
.carousel-item:nth-child(2) {
  transform: translateX(140px);
}
.carousel-item:nth-child(3) {
  transform: translateX(280px);
}
.carousel-item:nth-child(4) {
  transform: translateX(420px);
}
.carousel-item:nth-child(5) {
  transform: translateX(560px);
}
</style>
