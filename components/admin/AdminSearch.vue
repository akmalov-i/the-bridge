<template>
  <div class="search search-other">
    <SearchSvg class="search-icon" :class="{ active: findValue }" />
    <input type="search" placeholder="Поиск..." v-model="findValue" />
    <CrossSvg class="cross-icon" v-if="findValue" @click="clearFindValue" />

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
  props: {
    hint: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      findValue: null
    }
  },
  methods: {
    clearFindValue() {
      this.findValue = null
    }
  },
  // watch: {
  //   findValue: (val) => {
  //     console.log(val)
  //   }
  // },
  components: {
    SearchSvg,
    CrossSvg
  }
}
</script>
