<template>
  <div class="select">
    <div
      class="select-title"
      :class="{ focus: selected, active: areOptionsVisible }"
      @click="areOptionsVisible = !areOptionsVisible"
    >
      <h4 v-if="selectTitle">{{ selectTitle }}</h4>
      <p v-if="selected">{{ selected }}</p>
      <ArrowSvg />
    </div>

    <ul class="options" v-if="areOptionsVisible" v-click-outside="hideSelect">
      <nuxt-link :to="firstLink">
        <li>Услуги</li>
      </nuxt-link>
      <nuxt-link :to="secondLink">
        <li>Торг</li>
      </nuxt-link>
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
    selectTitle: {
      type: String
    },
    firstLink: {
      type: String
    },
    secondLink: {
      type: String
    },
    selected: {
      type: String
    }
  },
  data() {
    return {
      areOptionsVisible: false
    }
  },
  methods: {
    hideSelect() {
      this.areOptionsVisible = false
    }
  },
  components: {
    ArrowSvg
  }
}
</script>
