<template>
  <div class="wrap" :class="[owner ? 'right' : 'left']">
    <div class="text">
      <pre>
        {{ message.text }}
      </pre>
      <div class="time">
        {{ $moment(message.dateOfCreation).locale('ru').format('LL HH:mm') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    owner: Boolean
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;

  &.left {
    display: flex;
    justify-content: flex-start;

    .text {
      border-radius: 0px 8px 8px 8px;
      background: $blue;
      min-width: 180px;
      max-width: 520px;
      padding: 1.4rem 1.4rem 2.7rem 1.4rem;
      margin-bottom: 0.4rem;
    }
  }

  &.right {
    display: flex;
    justify-content: flex-end;

    .text {
      border-radius: 8px 8px 0px 8px;
      background: $white;
      border: 1px solid rgba(112, 124, 151, 0.25);
      min-width: 180px;
      max-width: 520px;
      padding: 1.4rem 1.4rem 2.7rem 1.4rem;
      margin-bottom: 0.4rem;
      margin-right: 2rem;

      .time {
        bottom: 0.6rem;
        right: 1.2rem;
        color: #707c97;
      }

      pre {
        color: #707c97;
      }
    }
  }
}

.text {
  position: relative;
  word-break: break-word;

  pre {
    line-height: 135%;
    font-weight: 400;
    color: $white;
    font-size: 1.4rem;
    white-space: pre-line;
    font-family: 'Roboto', sans-serif;
  }
  .time {
    font-size: 1.1rem;
    font-weight: 500;
    position: absolute;
    color: $white;
    bottom: 0.6rem;
    right: 1.2rem;
  }
}
</style>
