<template>
  <div class="wrap" :class="{ closed: !isOpen }">
    <div class="overlay"></div>
    <div class="popup">
      <div class="popup__head">
        <h3>{{ title }}</h3>
      </div>
      <div class="popup__content">
        <p>
          {{ content }}
        </p>
      </div>
      <div class="popup__btn">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
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
    isOpen: {
      type: Boolean,
      default: false
    }
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

  h3 {
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 28px;
    text-align: center;
    margin-bottom: 1.2rem;
    color: $black;
  }

  &__content {
    margin-bottom: 3.2rem;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;

    p {
      font-size: 1.4rem;
      max-width: 480px;
    }
  }

  &__btn {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 3%;
  }
}
</style>
