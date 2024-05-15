import filterModules from './modules/filter.modules'

export const filter = {
  ...filterModules,

  /* Sort */
  resultTerm: [
    { name: 'Показать все', value: 0 },
    { name: 'Cамые последние', value: 1 },
    { name: 'Скоро заканчивающиеся', value: 2 },
  ],
  resultLimit: [
    { number: 10 },
    { number: 25 },
    { number: 50 }
  ],
  currentLimit: 10,
  currentTerm: 0
}

export const modules = {
  changeSelect(option, type) {
    const item = this.selected.find(i => i.type === type)

    if (item) {
      if (option.value === 0) {
        item.select = ''
        item.value = 0
        return
      } 
      item.select = option.name
      item.value = option.value
    }
    else {
      if (option.value === 0) {
        return this.selected.push({ type: type, select: '', value: 0 })
      } 
      this.selected.push({ type: type, select: option.name, value: option.value })
    }
  },

  changeFilterTab(option, type) {
    const item = this.selected.find(i => i.type === type)
    if (item) item.value = option.value
  },

  changeTitle(item) {
    const find = this.selected.find(i => i.type === item)
    if (find) return find.select
  },

  selectFilterTab(item) {
    const find = this.selected.find(i => i.type === item)
    if (find) return find.value
  },

  clearFilters() {
    this.selected.forEach(filters => {
      filters.select = ''
      filters.value = 0
    })

    this.currentLimit = 10,
      this.currentTerm = 0,
      this.addButtonDisabled = false,
      this.addFilters.forEach(person => person.isActive = false)
    Object.keys(this.isActivated).map(key => this.isActivated[key] = false)
  },
  selectResultTerm(option) {
    this.currentTerm = option.value
  },
  selectResultLimit(option) {
    this.currentLimit = option.number
  },
  changeAddFilter(item) {
    const find = this.addFilters.find(i => i.value === item.value)
    find.isActive = !find.isActive
    this.isActivated[item.value] = !this.isActivated[item.value]

    const count = this.addFilters.filter(i => i.isActive === true)
    if (count.length === 2) return this.addButtonDisabled = true
  }
}