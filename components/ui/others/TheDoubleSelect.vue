<template>
  <div class="select double-select-wrap">
    <div
      class="select-title"
      :class="{ focus: selected, active: areOptionsVisible }"
    >
      <h4 v-if="selectTitle">{{ selectTitle }}</h4>
      <input
        type="text"
        v-model="number"
        @input="acceptNumber"
        maxlength="12"
        placeholder="Сумма..."
      />
      <span class="line"></span>
      <div class="trigger" @click="areOptionsVisible = !areOptionsVisible">
        <p v-if="selected">{{ selected }}</p>
        <slot />
        <ArrowSvg />
      </div>
    </div>
    <ul class="options" v-if="areOptionsVisible" v-click-outside="hideSelect">
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option, type)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import vClickOutside from 'v-click-outside'

export default {
  emits: ['select'],
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    options: {
      type: Array,
      default: []
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
    },
    defaultNumber: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      areOptionsVisible: false,
      number: this.defaultNumber
    }
  },
  methods: {
    selectOption(option, type) {
      this.$emit('select', option, type)
      this.hideSelect()
    },
    hideSelect() {
      this.areOptionsVisible = false
    },
    acceptNumber() {
      this.number = this.number.replace(/\D/g, '')
      this.$emit('input', this.number)
    }
  },
  components: {
    ArrowSvg
  }
}
</script>
