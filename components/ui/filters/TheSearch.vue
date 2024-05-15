<template>
  <div class="search search-other">
    <SearchSvg class="search-icon" :class="{ active: findValue }" />
    <input
      type="search"
      placeholder="Поиск..."
      v-model="findValue"
      @input="$emit('typing', $event.target.value)"
    />
    <CrossSvg class="cross-icon" v-if="findValue || clearBtnAlways" @click="clearFindValue" />

    <div class="search-hint" v-if="hint" v-show="findValue">
      <nuxt-link :to="`/trade?search=${findValue}`" class="column-start">
        <p class="word">
          <span class="word">{{ findValue }}</span>
        </p>
        <p>
          <span>Искать на стр «Торг»</span>
        </p>
      </nuxt-link>
      <nuxt-link :to="`/?search=${findValue}`" class="column-start">
        <p class="word">
          <span>{{ findValue }}</span>
        </p>
        <p>
          <span>Искать на стр «Разовые услуги»</span>
        </p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import SearchSvg from '@/assets/icons/search.svg?inline'
import CrossSvg from '@/assets/icons/cross.svg?inline'

export default {
  emits: ['typing'],
  props: {
    hint: {
      type: Boolean,
      default: false
    },
    clearBtnAlways: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      findValue: ''
    }
  },
  methods: {
    clearFindValue() {
      this.findValue = ''
      this.$emit('typing', this.findValue)
    }
  },
  components: {
    SearchSvg,
    CrossSvg
  }
}
</script>
