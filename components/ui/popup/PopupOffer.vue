<template>
  <div class="wrap" :class="{ closed: !isOpen }">
    <div class="overlay"></div>
    <div class="popup">
      <div class="cancel" @click="cancelAction">
        <cancelSvg />
      </div>
      <div class="popup__head">
        <h3>{{ title }}</h3>
      </div>
      <div class="popup__content">
        <p>
          {{ content }}
        </p>
      </div>
      <div class="popup__btn">
        <div class="budget">
          <div class="left">
            {{
              new Intl.NumberFormat('en-US', { style: 'decimal' }).format(
                budget
              )
            }}
          </div>
          <div class="right">{{ currency }}</div>
        </div>

        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import cancelSvg from '@/assets/icons/x.svg?inline'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    budget: {
      type: String,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cancelAction() {
      this.$emit('cancel')
    }
  },
  components: {
    cancelSvg
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2001;

  .budget {
    user-select: none;
    border-radius: 4px;
    background: $light-blue;
    padding: 2rem;
    display: flex;
    align-items: center;

    .left {
      margin-right: 6rem;
    }

    .right {
      padding-left: 1.6rem;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        background: $light-gray;
        width: 1px;
        height: 100%;
      }
    }

    .left,
    .right {
      font-style: normal;
      font-weight: 500;
      font-size: 1.4rem;
    }
  }

  &.closed {
    animation: close 0.3s forwards;
  }
}

@keyframes close {
  0% {
    opacity: 1;
    user-select: unset;
    pointer-events: unset;
  }
  100% {
    opacity: 0;
    user-select: none;
    pointer-events: none;
  }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  background: $black;
  opacity: 0.8;
  width: 100%;
  height: 100%;
  z-index: 0;
}

@keyframes up {
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.popup {
  position: relative;
  z-index: 1;
  background: $white;
  border-radius: 8px;
  padding: 3.6rem 3.6rem;
  margin: 2rem;
  animation: up 0.7s forwards;

  .cancel {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $light-blue;
    z-index: 3;
    transition: 0.4s;

    &:hover {
      background: $blue;
      svg {
        fill: $white;
      }
    }

    svg {
      fill: $blue;
      transition: 0.4s;
    }
  }

  h3 {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 28px;
    text-align: left;
    margin-bottom: 1.2rem;
    color: $black;
  }

  &__content {
    margin-bottom: 1.5rem;
    width: 100%;
    display: flex;
    background: #f3f3f3;
    border-radius: 4px;
    padding: 2rem 1.6rem;
    word-break: break-word;

    p {
      font-style: normal;
      font-weight: 400;
      line-height: 170%;
      font-size: 1.4rem;
      max-width: 480px;
    }
  }

  .primary {
    color: $white;
  }

  &__btn {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 3%;
  }
}
</style>
