<template>
  <div class="sidebar" :class="{ 'sidebar-in': open }">
    <div class="overlay"></div>
    <div class="body">
      <div class="close">
        <div class="close-button" @click="$emit('close-sidebar')">
          <closeSvg />
        </div>
      </div>
      <div class="top">
        <h2>{{ title }}</h2>
        <div :class="{ 'disable-the-sort-trade': isFocused }">
          <slot name="sort" />
        </div>
      </div>
      <div class="offer-wrap">
        <div v-if="isFocused" class="disable"></div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import closeSvg from '@/assets/icons/close.svg?inline'

export default {
  emits: ['close-sidebar'],
  props: {
    open: {
      type: Boolean,
      default: false
    },
    showSort: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: 'Мои предложения'
    },
    isFocused: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resultTerm: [
        { name: 'Показать все', value: 0 },
        { name: 'Cамые последние', value: 1 },
        { name: 'Высокая цена', value: 2 },
        { name: 'Низкая цена', value: 3 },
        { name: 'Отклоненные', value: 4 }
      ]
    }
  },
  components: {
    closeSvg
  }
}
</script>

<style lang="scss" scoped>
@keyframes opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.disable-the-sort-trade {
  user-select: none;
  pointer-events: none;
  opacity: 0.6;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1999;
  font-size: 1.4rem;
  user-select: none;
  pointer-events: none;

  &.sidebar-in {
    user-select: unset;
    pointer-events: all;

    .overlay {
      animation: opacity 0.4s forwards;
    }

    .body {
      transform: translateX(0%);
    }
  }
}
.overlay {
  opacity: 0;
  width: 100%;
  height: 100%;
  background: #000000ca;
}

.close {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5rem;
}

.offer-wrap {
  position: relative;
}

.disable {
  height: 100%;
  width: 100%;
  background: $light-blue;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.7;
  z-index: 10;
  animation: in 0.4s forwards;
}

@keyframes in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.7;
  }
}

.body {
  position: absolute;
  overflow: auto;
  padding: 3.2rem;
  right: 0;
  top: 0;
  background: $light-blue;
  width: 600px;
  height: 100%;
  transition: 0.4s;
  transform: translateX(120%);

  &::-webkit-scrollbar {
    display: none;
  }

  .close-button {
    cursor: pointer;
    width: 48px;
    height: 48px;
    background: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
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

  .top {
    margin-bottom: 2.4rem;
    h2 {
      margin-bottom: 0;
    }

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
