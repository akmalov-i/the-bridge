<template>
  <div class="new-transaction" :class="{ active: active }">
    <nuxt-link :to="link">
      <p>
        {{ name }}
        <el-tooltip placement="top">
          <template #content>
            <div class="tooltip">
              {{ tooltip }}
            </div>
          </template>
          <QuestionSvg />
        </el-tooltip>
      </p>
      <button class="btn right">
        <ArrowSvg />
      </button>
    </nuxt-link>
  </div>
</template>

<script>
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import QuestionSvg from '@/assets/icons/question.svg?inline'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: String,
      required: true
    }
  },
  components: {
    ArrowSvg,
    QuestionSvg
  }
}
</script>

<style lang="scss" scoped>
.new-transaction {
  list-style: none;

  &.active a {
    background: $blue;
    color: $white;
    p svg {
      stroke: $white;
    }
  }
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(22, 22, 22, 0.05);
    color: $black;
    padding: 2.4rem;
    border-radius: 12px;
    text-decoration: none;
    margin-bottom: 0.8rem;
    transition: all 0.4s;

    &:hover {
      background: $blue;
      color: $white;

      p svg {
        stroke: $white;
      }

      .btn.right {
        background: $orange;
      }

      .btn.right svg {
        fill: $white;
      }
    }

    p {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 1.4rem;
      white-space: nowrap;

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

      svg {
        transform: rotate(-90deg);
        fill: $blue;
        transition: 0.4s;
      }
    }
  }
}
</style>
