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

      <!-- <div class="result-limit">
        <h4>Кол-во результатов</h4>
        <div class="disc-wrap start">
          <div
            v-for="option in resultLimit"
            :key="option.number"
            :class="[currentLimit === option.number ? 'active' : '', 'disc']"
            @click="changeResultLimit(option)"
          >
            {{ option.number }}
          </div>
        </div>
      </div> -->
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
    resultLimit: {
      type: Array,
      required: true
    },
    currentLimit: {
      type: Number,
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
/* .filter .sort .sort-drop .result-term {
  position: relative;
  padding-bottom: 0.8rem;

  &:after {
    content: '';
    position: absolute;
    width: 85%;
    height: 1px;
    background: $light-gray;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
} */
</style>