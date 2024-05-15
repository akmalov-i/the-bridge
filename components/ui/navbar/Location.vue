<template>
  <el-col :span="4" class="start">
    <div class="location">
      <button class="btn primary" :class="{ active: open }" @click="toggle">
        <p>{{ currentLocation.label }}</p>
        <arrowSvg />
      </button>

      <div class="location-drop" v-if="open" v-click-outside="closeSelect">
        <div class="top">
          <h4>Выберите свое расположение</h4>
        </div>
        <div class="middle">
          <div class="select-wrap">
            <div class="select-wrap mb2">
              <p>Страна</p>
              <el-select v-model="countrySelected" placeholder="Выбрать">
                <el-option
                  v-for="item in countries"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
            <div class="select-wrap">
              <p>Город</p>
              <el-select v-model="citySelected" placeholder="Выбрать">
                <el-option
                  v-for="item in cities"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="bottom">
          <button class="btn carrot" @click="filterApply">
            Применить фильтры
          </button>
        </div>
      </div>
    </div>
  </el-col>
</template>

<script>
import arrowSvg from '@/assets/icons/arrow.svg?inline'
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      open: false,
      currentLocation: {
        label: 'Ташкент',
        value: 'Tashkent'
      },
      countrySelected: 'Узбекистан',
      citySelected: 'Ташкент',
      countries: [
        {
          label: 'Узбекистан',
          value: 'Uzbekistan'
        },
        {
          label: 'Казахстан',
          value: 'Kazakhstan'
        },
        {
          label: 'Россия',
          value: 'Russia'
        },
        {
          label: 'Украина',
          value: 'Ukraine'
        },
        {
          label: 'Киргизистан',
          value: 'Kyrgyzistan'
        }
      ],
      cities: [
        {
          label: 'Ташкент',
          value: 'Tashkent'
        },
        {
          label: 'Нур-султан',
          value: 'Nur-sultan'
        },
        {
          label: 'Москва',
          value: 'Moscow'
        },
        {
          label: 'Киев',
          value: 'Kiev'
        },
        {
          label: 'Бишкек',
          value: 'Bishkek'
        }
      ]
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    countrySelect(option) {
      this.countrySelected = option.name
    },
    citySelect(option) {
      this.citySelected = option.name
    },
    closeSelect() {
      this.open = false
    },
    filterApply() {
      this.closeSelect()
      this.currentLocation = this.citySelected
    },
  },
  components: {
    arrowSvg
  }
}
</script>