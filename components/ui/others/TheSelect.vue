<template>
  <div class="select">
    <div
      class="select-title"
      :class="{ focus: selected, active: areOptionsVisible }"
      @click="areOptionsVisible = !areOptionsVisible"
    >
      <h4 v-if="selectTitle">{{ selectTitle }}</h4>
      <p v-if="selected">{{ selected }}</p>
      <slot />
      <ArrowSvg />
    </div>

    <ul class="options" v-if="areOptionsVisible" v-click-outside="hideSelect">
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option, type)"
        :class="{ drop: option.underList }"
      >
        {{ option.name }}
        <ArrowSvg v-if="option.underList" />
      </li>
    </ul>
    <div v-if="subOptions && dropShow" v-click-outside="hideSubOptions">
      <ul class="underlist">
        <li v-for="subOption in subOptions" :key="subOption.value" @click="selectSubOption(subOption)">
          {{ subOption.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import vClickOutside from 'v-click-outside'

export default {
  emits: ['select', 'selectSubOption'],
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    options: {
      type: Array
    },
    subOptions: {
      type: Array
    },
    type: {
      type: String,
      required: true
    },
    selectTitle: {
      type: String
    },
    selected: {
      type: String
    }
  },
  data() {
    return {
      areOptionsVisible: false,
      dropShow: false,
    }
  },
  methods: {
    selectOption(option, type) {
      if (option.underList) {
        this.dropShow = !this.dropShow
        this.$emit('subCategoryProp', option.underList)
      } else {
        this.$emit('select', option, type)
        this.hideSelect()
      }
    },
    hideSelect() {
      this.areOptionsVisible = false
    },
    hideSubOptions() {
      this.dropShow = false
    },
    selectSubOption(subOption) {
      this.$emit('selectSubOption', subOption)
      this.hideSubOptions()
    }
  },
  components: {
    ArrowSvg
  }
}
</script>
