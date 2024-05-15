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

    <h2 class="mb2">Мои впечатления</h2>
    <div class="details space-around">
      <div class="details-item mr4">
        <nuxt-img src="/png/1.png" />
        <p>Мало деталей</p>
        <span>0</span>
      </div>
      <div class="details-item mr4">
        <nuxt-img src="/png/2.png" />
        <p>Низкая цена</p>
        <span>12</span>
      </div>
      <div class="details-item mr4">
        <nuxt-img src="/png/3.png" />
        <p>Подозрительно</p>
        <span>0</span>
      </div>
      <div class="details-item mr4">
        <nuxt-img src="/png/4.png" />
        <p>Необычно</p>
        <span>10</span>
      </div>
      <div class="details-item hover" @click="openDetails">
        <nuxt-img src="/png/5.png" />
        <p>Другое</p>
        <span>0</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    openDetails() {
      this.isOpen = !this.isOpen
    },
    closeDetails() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes bg {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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

.details {
  border-radius: 12px;
  border: 1px solid rgba(125, 125, 125, 0.32);
  padding: 1.6rem;

  &-item {
    border-radius: 4px;
    padding: 0.8rem;
    background: $light-blue;
    border: 1px solid #1374f6;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 9rem;

    &.hover {
      cursor: pointer;
      img {
        transition: 0.4s;
      }

      &:hover {
        img {
          transform: scale(1.05);
        }
      }
    }

    span {
      font-weight: 500;
      font-size: 12px;
      color: $blue;
      position: absolute;
      top: 0.8rem;
      right: 0.8rem;
    }

    p {
      margin-top: 0.6rem;
      color: $blue;
      font-size: 1.4rem;
      font-weight: 500;
    }
  }
}
</style>
