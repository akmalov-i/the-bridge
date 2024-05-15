import TransModules from './modules/contract.modules'
const today = new Date()
const doubleToday = new Date(today)
const tomorrow = doubleToday.setDate(doubleToday.getDate() + 1)

export const varriables = {
  edit: true,
  period: false,
  tradeCategoryIs: false,
  showPopup: false,
  needDelivery: false,
  popupTitle: '',
  telephone2: '',
  telephone3: '',
  telephone4: '',
  telephone5: '',
  isTelephone3: false,
  isTelephone4: false,
  isTelephone5: false,
  popupLink: '',
  popupText: '',
  firstButtonText: '',
  secondButtonText: '',
  questionTooltip: true,
  today: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
  picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
  tomorrow: new Date(tomorrow - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
  formattedDate: null,
  calendarVisible: false,
  timeVisible: false,
  timeVisible2: false,
  formattedDate2: null,
  calendarVisible2: false,
  transportDelivery: false,
  withUnderList: false,
  withUnderListName: '',
  settedCountry: 'Узбекистан',
  settedCountry2: 'Узбекистан',
  category: 'repair',
  projectName: '',
  projectDescription: '',
  countryByIp: '',
  subCategory: '',
  time: '12:00',
  time2: '12:00',
  budget: '',
  fileList: [],
  ...TransModules,
}

export const modules = {
  send() {
    this.$refs.upload.submit()
  },
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
  changeTransportCountry(country) {
    this.settedCountry = country.name
  },
  changeTransportCity(city) {
    const item = this.uzbekistan.find(i => i.name === city.name)
    const allCountries = this.selected.find(i => i.type === 'allCountries')
    allCountries.select = item.name
    allCountries.value = item.value
  },
  changeTransportCountry2(country) {
    this.settedCountry2 = country.name
  },
  changeTransportCity2(city) {
    const item = this.uzbekistan.find(i => i.name === city.name)
    const allCountries = this.selected.find(i => i.type === 'allCountriesTo')
    allCountries.select = item.name
    allCountries.value = item.value
  },
  changeBudget(number) {
    this.budget = number
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
  setBudget(val) {
    const item = this.selected.find(i => i.type === 'budget')
    if (item) item.value = val
  },
  acceptNumber(item) {
    const regex = this[item].replace(/\D/g, '')
    if (this[item].length !== 0) this[item] = '+' + regex
  },
  dateFormat() {
    return this.picker.toString().split('-').reverse().join('.')
  },
  dateFormat2() {
    return this.tomorrow.toString().split('-').reverse().join('.')
  },
  datePickerFormat() {
    return this.picker2
  },
  hideCalendar() {
    this.calendarVisible = false
  },
  hideCalendar2() {
    this.calendarVisible2 = false
  },
  hideTime() {
    this.timeVisible = false
  },
  hideTime2() {
    this.timeVisible2 = false
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
  changeSubCategory(item) {
    return this[item]
  },
  changeSubProp(item) {
    this.subCategory = item
  },
  enableTelephone() {
    if (this.isTelephone3) {
      if (this.isTelephone4) {
        this.isTelephone5 = true
      } else {
        this.isTelephone4 = true
      }
    } else {
      this.isTelephone3 = true
    }
  },
  disableTelephone() {
    if (!this.isTelephone5) {
      if (!this.isTelephone4) {
        this.isTelephone3 = false
        this.telephone3 = ''
      } else {
        this.isTelephone4 = false
        this.telephone4 = ''
      }
    } else {
      this.isTelephone5 = false
      this.telephone5 = ''
    }
  },
  fileCheck(file) {
    const MAX_SIZE = 50

    const isFile = file.type === 'image/jpeg'
      || file.type === 'image/png'
      || file.type === 'text/plain'
      || file.type === 'application/x-zip-compressed'
      || file.type === 'application/x-zip'
      || file.type === 'application/pdf'
      || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      || file.type === 'application/vnd.ms-excel'
      || file.type === 'application/msword'
      || file.type === 'audio/mpeg'
      || file.type === 'video/mp4'
      || file.type === 'video/avi'

    const isLarge = file.size / 1024 / 1024 < MAX_SIZE

    if (!isFile) {
      this.$message.error('Недопустимый формат!')
    }
    else if (!isLarge) {
      this.$message.error(`Файл должен быть не больше ${MAX_SIZE}MB!`)
    }
    return isFile && isLarge
  },
  popupProps(tabLink) {
    this.popup(
      'Вы уверены что хотите перейти?',
      'После нажатия кнопки «Да» вас перекинет на страницу и внесенные изменения не сохранятся',
      'Да',
      'Нет',
      tabLink
    )
  },
  popup(
    popupTitle = 'Set the value',
    popupText = 'Set the value',
    firstButtonText = 'Set the value',
    secondButtonText = 'Set the value',
    link = '/'
  ) {
    this.popupTitle = popupTitle
    this.popupText = popupText
    this.firstButtonText = firstButtonText
    this.secondButtonText = secondButtonText
    this.popupLink = link
    this.showPopup = true
  },
  goTo() {
    this.$router.push(this.popupLink)
  },
  popupClose() {
    this.showPopup = false
  },
  changeEdit() {
    if (this.projectName.length === 0 || this.projectDescription.length === 0) {
      return this.$message.info('Впишите название и детали проекта!')
    }
    else if (this.projectName.length <= 8 || this.projectDescription.length <= 15) {
      return this.$message.info('Название и детали проекта нужно указать подробно!')
    }
    else if (this.telephone2 === '') {
      this.$message.info('Необходимо указать номер 2-го участника!')
    }
    else if (this.isTelephone3 && this.telephone3 === '') {
      this.$message.info('Необходимо указать номер 3-го участника!')
    }
    else if (this.isTelephone4 && this.telephone4 === '') {
      this.$message.info('Необходимо указать номер 4-го участника!')
    }
    else if (this.isTelephone5 && this.telephone5 === '') {
      this.$message.info('Необходимо указать номер 5-го участника!')
    }
    else if (this.period && this.picker === this.tomorrow) {
      return this.$message.info('Даты сроков должны отличаться хотя бы на день!')
    }
    else if (this.budget === null || this.budget === '') {
      this.$message.info('Необходимо указать бюджет!')
    } 
    else {
      const name = this.selected.find(i => i.type === 'projectName')
      const description = this.selected.find(i => i.type === 'projectDescription')
      name.value = this.projectName
      description.value = this.projectDescription
      this.edit = false
    }

    this.fileList = this.$refs.upload.uploadFiles
  },
}