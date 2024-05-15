<template>
  <div class="new-offer" @click="$emit('open-sidebar')">
    <div class="open-new-offers">
      <p>
        {{ name }}
        <el-tooltip placement="top">
          <template #content>
            <div class="tooltip">{{ tooltip }}</div>
          </template>
          <QuestionSvg />
        </el-tooltip>
      </p>
      <button class="btn right with-counter">
        <slot />
        <div v-if="counterTurner && counter > 0">
          <span v-if="counter < 100" class="counter">{{ counter }}</span>
          <span v-else class="counter">...</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import QuestionSvg from '@/assets/icons/question.svg?inline'

export default {
  emits: ['open-sidebar'],
  props: {
    name: {
      type: String,
      required: true
    },
    tooltip: {
      type: String,
      required: true
    },
    counterTurner: {
      type: Boolean,
      default: true
    },
    counter: {
      Number: String,
      default: 0
    }
  },
  components: {
    ArrowSvg,
    QuestionSvg
  }
}
</script>

<style lang="scss" scoped>
.new-offer {
  list-style: none;
  margin-bottom: 3.2rem;

  .with-counter {
    position: relative;

    .counter {
      width: auto;
      padding: 2px 4px;
      min-width: 16px;
      min-height: 16px;
      max-width: 24px;
      background: $coral;
      position: absolute;
      top: -10%;
      right: -10%;
      border-radius: 50%;
      line-height: 100%;
      color: $white;
      font-weight: 400;
      font-size: 1.2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &.active .open-new-offers {
    background: $blue;
    color: $white;
    p svg {
      stroke: $white;
    }
  }
  .open-new-offers {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $light-blue;
    color: $black;
    padding: 2.4rem;
    border-radius: 12px;
    text-decoration: none;
    margin-bottom: 0.8rem;
    transition: all 0.4s;

    &:hover {
      .btn.right {
        background: $orange;
      }
    }

    p {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 1.4rem;
      white-space: nowrap;
      color: $blue;
      transition: 0.4s;

      svg {
        stroke: $gray;
        margin-left: 0.8rem;
        transition: 0.4s;
      }
    }

    .btn.right {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      background: $blue;

      svg {
        fill: $white;
        transition: 0.4s;
      }
    }
  }
}
</style>
