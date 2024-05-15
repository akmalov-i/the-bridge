<template>
  <div class="sort start">
    <div class="sort-title start" @click="toggle">
      <p>Сортировать</p>
      <arrowSvg :class="{ active: isSortOpen }" />
    </div>

    <div class="sort-drop" v-if="isSortOpen" v-click-outside="sortClose">
      <ul class="result-term">
        <li
          v-for="option in resultTerm"
          :key="option.value"
          :class="[currentTerm === option.value ? 'active' : '']"
          @click="changeResultTerm(option)"
        >
          {{ option.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import arrowSvg from '@/assets/icons/arrow.svg?inline'
import vClickOutside from 'v-click-outside'

export default {
  emits: ['term', 'limit'],
  props: {
    resultTerm: {
      type: Array,
      required: true
    },
    currentTerm: {
      type: Number,
      required: true
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      isSortOpen: false
    }
  },
  methods: {
    toggle() {
      this.isSortOpen = !this.isSortOpen
    },
    sortClose() {
      this.isSortOpen = false
    },
    changeResultTerm(option) {
      this.$emit('term', option)
      this.sortClose()
    },
    changeResultLimit(option) {
      this.$emit('limit', option)
      this.sortClose()
    }
  },
  components: {
    arrowSvg
  }
}
</script>

<style lang="scss" scoped>
.sort {
  font-size: 1.4rem;
  position: relative;
  justify-self: end;
  grid-column: 6;
  user-select: none;

  .sort-title:hover {
    cursor: pointer;
  }

  p {
    font-weight: 400;
    color: $gray;
  }

  svg {
    fill: $gray;
    transition: 0.4s;

    &.active {
      transform: rotate(180deg);
    }
  }
}
</style>