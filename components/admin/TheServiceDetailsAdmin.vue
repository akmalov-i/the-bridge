<template>
  <div>
    <div class="details-popup center" v-if="isOpen">
      <div class="popup">
        <div class="top space-between">
          <h2>Другие причины</h2>
          <div class="cancel" @click="closeDetails">&#10006;</div>
        </div>
        <div class="mb2">
          <div v-for="(item, idx) in reactions.another" :key="idx">
            <TheDetailsComponent :data="item" />
          </div>
        </div>
      </div>
    </div>

    <h2 class="mb2">Мои впечатления:</h2>
    <div class="details space-around">
      <div class="details-item hover mr4">
        <span>{{ reactions.fewDetails.length }}</span>
        <nuxt-img src="/png/1.png" />
        <p>Мало деталей</p>
      </div>
      <div class="details-item hover mr4">
        <span>{{ reactions.lowPrice.length }}</span>
        <nuxt-img src="/png/2.png" />
        <p>Низкая цена</p>
      </div>
      <div class="details-item hover mr4">
        <span>{{ reactions.suspiciously.length }}</span>
        <nuxt-img src="/png/3.png" />
        <p>Подозрительно</p>
      </div>
      <div class="details-item hover mr4">
        <span>{{ reactions.unusual.length }}</span>
        <nuxt-img src="/png/4.png" />
        <p>Необычно</p>
      </div>
      <div class="details-item hover" @click="openDetails">
        <span>{{ reactions.another.length }}</span>
        <nuxt-img src="/png/5.png" />
        <p>Другое</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postId: {
      type: String,
      required: true
    },
    reactions: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      isOpen: false,
      textarea: '',
      validate: false
    }
  },
  methods: {
    openDetails() {
      this.isOpen = true
    },
    closeDetails() {
      this.isOpen = false
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

.btn.edit[disabled] {
  background: lighten($blue, 15%);
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
    height: 350px;
    border-radius: 8px;
    padding: 2.4rem;
    overflow: auto;
  }

  .item {
    padding-bottom: 1.4rem;
  }

  .top {
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
  padding: 1.6rem;
  user-select: none;

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
    transition: background 0.3s, opacity 0.3s;

    &.disabled {
      opacity: 0.8;
      pointer-events: none;
    }

    &.active {
      background: $blue;
      pointer-events: none;
      opacity: 1;

      p,
      span {
        color: $white;
      }
    }

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
