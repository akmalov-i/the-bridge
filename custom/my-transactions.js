import filterModules from './modules/my-transaction.filter.modules'

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
      item.select = option.name
      item.value = option.value
    }
    else {
      this.selected.push({ type: type, select: option.name, value: option.value })
    }
  },

  changeTitle(item) {
    const find = this.selected.find(i => i.type === item)
    if (find) return find.select
  },

  selectResultTerm(option) {
    this.currentTerm = option.value
  },
  selectResultLimit(option) {
    this.currentLimit = option.number
  }
}