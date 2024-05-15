import TransModules from './modules/details.modules'

export const varriables = {
  questionTooltip: true,
  transportDelivery: false,
  telephone: '+998909423620',
  exp: '',
  email: 'Pavel.3020@gmail.com',
  settedCountry: 'Узбекистан',
  settedCountry2: 'Узбекистан',
  ...TransModules,
}

export const modules = {
  changeUnderlist(option) {
    const item = this.selected.find(i => i.type === 'subCategory')
    if (item) {
      item.select = option.name
      item.underList = option.value

      const categoryMap = this[option.mainCategory]
      const valueMap = categoryMap.find(i => i.value === option.mainValue)
      this.withUnderListName = valueMap.name
      this.withUnderList = true
    }
  },
  changeCountry(country) {
    this.settedCountry = country.name
  },
  changeCity(city) {
    const item = this.uzbekistan.find(i => i.name === city.name)
    const allCountries = this.selected.find(i => i.type === 'allCountries')
    allCountries.select = item.name
    allCountries.value = item.value
  },
  changeSelect(option, type) {
    const item = this.selected.find(i => i.type === type)

    if (item) {
      item.select = option.name
      item.value = option.value
    }

    if (type === 'mainCategory') {
      this.category = option.value
      const patch = this[option.value]
      const selectedItem = this.selected.find(i => i.type === 'subCategory')
      if (patch[0].underList) {
        const patchWithUnderList = this[patch[0].underList]
        selectedItem.select = patchWithUnderList[0].name
        selectedItem.value = patchWithUnderList[0].value

        this.withUnderListName = patch[0].name
        this.withUnderList = true
      } else {
        selectedItem.select = patch[0].name
        selectedItem.value = patch[0].value
        this.withUnderList = false
      }
      selectedItem.underList = null
    }

    if (type === 'subCategory') {
      const selectedItem = this.selected.find(i => i.type === 'subCategory')
      selectedItem.underList = null
      this.withUnderList = false
    }

    if (type === 'deadline' && option.value === 1) {
      this.period = true
    } else if (type === 'deadline' && option.value === 0) {
      this.period = false
      this.tomorrow = new Date(tomorrow - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)
    }

    if (type === 'mainCategory' && option.value === 'transport') {
      this.transportDelivery = true
    } else if (type === 'mainCategory' && option.value !== 'transport') {
      this.transportDelivery = false
    }

    if (this.tradeCategoryIs && type === 'tradeCategory' && option.value === 'buy') {
      this.needDelivery = true
    } else if (this.tradeCategoryIs && type === 'tradeCategory' && option.value !== 'buy') {
      this.needDelivery = false
    }

    if (type === 'contractType' && option.value === 'trades') {
      this.tradeCategoryIs = true
      this.needDelivery = true
    } else if (type === 'contractType' && option.value !== 'trades') {
      this.tradeCategoryIs = false
      this.needDelivery = false
    }
  },
  acceptNumber(item) {
    const regex = this[item].replace(/\D/g, '')
    if (this[item].length !== 0) this[item] = '+' + regex
  },
  changeTitle(item) {
    const find = this.selected.find(i => i.type === item)
    if (find) return find.select
  },
  titleWithUnderList() {
    if (this.withUnderList) {
      return this.titles.subCategory + ' | ' + this.withUnderListName
    } else {
      return this.titles.subCategory
    }
  },
}