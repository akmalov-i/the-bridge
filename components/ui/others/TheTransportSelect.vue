<template>
  <div class="select">
    <div
      class="select-title focus"
      :class="{active: areOptionsVisible }"
      @click="areOptionsVisible = !areOptionsVisible"
    >
      <h4>{{ selectTitle }}</h4>
      <p>{{ selected }}</p>
      <slot />
      <ArrowSvg />
    </div>

    <div
      class="transport-delivery"
      v-if="areOptionsVisible"
      v-click-outside="hideSelect"
    >
      <div class="head">
        <h4>{{ selectTitle }}</h4>
      </div>
      <div class="body">
        <div class="select">
          <div
            class="select-title focus"
            :class="{ active: dropdownVisible }"
            @click="dropdownVisible = !dropdownVisible"
          >
            <h4>Страна</h4>
            <p>{{ selectedCountry }}</p>
            <slot />
            <ArrowSvg />
          </div>

          <ul
            class="options"
            v-if="dropdownVisible"
            v-click-outside="hideDropdown"
          >
            <li
              v-for="country in countries"
              :key="country.value"
              @click="changeCountry(country)"
            >
              {{ country.name }}
            </li>
          </ul>
        </div>
        <div class="select">
          <div
            class="select-title focus"
            :class="{ active: dropdownVisible2 }"
            @click="dropdownVisible2 = !dropdownVisible2"
          >
            <h4>Город</h4>
            <p>{{ selected }}</p>
            <slot />
            <ArrowSvg />
          </div>

          <ul
            class="options"
            v-if="dropdownVisible2"
            v-click-outside="hideDropdown2"
          >
            <li
              v-for="city in cities"
              :key="city.value"
              @click="changeCity(city)"
            >
              {{ city.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowSvg from '@/assets/icons/arrow.svg?inline'
import vClickOutside from 'v-click-outside'

export default {
  emits: ['select', 'selectCity', 'selectCountry'],
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    countries: {
      type: Array
    },
    cities: {
      type: Array
    },
    selectTitle: {
      type: String
    },
    selected: {
      type: String
    },
    selectedCountry: {
      type: String
    },
    selectedCity: {
      type: String
    }
  },
  data() {
    return {
      areOptionsVisible: false,
      dropdownVisible: false,
      dropdownVisible2: false
    }
  },
  methods: {
    changeCountry(country) {
       this.$emit('selectCountry', country)
       this.hideDropdown()
    },
    changeCity(city) {
      this.$emit('selectCity', city)
      this.hideSelect()
    },
    hideSelect() {
      this.areOptionsVisible = false
      this.hideDropdown()
      this.hideDropdown2()
    },
    hideDropdown() {
      this.dropdownVisible = false
    },
    hideDropdown2() {
      this.dropdownVisible2 = false
    }
  },
  components: {
    ArrowSvg
  }
}
</script>
