<template>
  <div
    class="auth-component-wrap"
    :class="{ active: val === data }"
    @click="$emit('update:data', val)"
  >
    <p>{{ title }}</p>
    <div class="round"></div>
  </div>
</template>

<script>
export default {
  props: {
    val: {
      type: String,
      default: false
    },
    title: {
      type: String,
      require: true
    },
    data: {
      type: String,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-component-wrap {
  cursor: pointer;
  background: $light-gray;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.2rem;
  margin-right: 1.6rem;
  transition: 0.4s;

  &.active {
    background: $orange;
    transition: 0.4s;
    .round {
      &::before {
        opacity: 1;
      }
    }

    p {
      color: $white;
    }
  }

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: $black;
    margin-right: 4rem;
    transition: 0.4s;
    white-space: nowrap;
  }
  .round {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: $white;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.4s;
    &::before {
      content: '';
      opacity: 0;
      background: #a1a1a1;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      transition: 0.4s;
      position: absolute;
    }
  }
}
</style>