<template>
  <div class="search-btns">
    <button
      class="btn add-filter center"
      @click="showDropdown"
      :disabled="isDisabled"
    >
      <p>+</p>
      <div v-if="!isDisabled">
        <ul class="add-filter-drop" v-if="isOpen" v-click-outside="hideDropdown">
        <h4>Выбрать фильтры</h4>

        <li
          v-for="item in options"
          :key="item.value"
          @click="switchToggle(item)"
          :class="{ active: item.isActive }"
        >
          <p>{{ item.name }}</p>
          <div class="switch">
            <span class="circle"></span>
          </div>
        </li>
      </ul>
      </div>
    </button>
    <button class="btn clear-filter center" @click="clearFilters">
      <filterClearSvg />
    </button>
  </div>
</template>

<script>
import filterClearSvg from '@/assets/icons/filter-clear.svg?inline'
import vClickOutside from 'v-click-outside'

export default {
  emits: ['clear'],
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array
    },
  },
  data(){
    return {
      isOpen: false
    }
  },
  methods: {
    clearFilters() {
      this.$emit('clear'),
      this.isOpen = false
    },
    switchToggle(item) {
      this.$emit('change-add-filter', item)
    },
    showDropdown() {
      this.isOpen = true
    },
    hideDropdown() {
      this.isOpen = false
    }
  },
  components: {
    filterClearSvg
  }
}
</script>
