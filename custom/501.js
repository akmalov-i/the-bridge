import TransModules from './modules/501.modules'

export const varriables = {
  edit: true,
  period: false,
  showPopup: false,
  forWhom: '',
  telephone: '',
  card: '',
  card2: '',
  card3: '',
  isCard2: false,
  isCard3: false,
  curator: '',
  popupTitle: '',
  popupLink: '',
  popupText: '',
  firstButtonText: '',
  secondButtonText: '',
  picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
  formattedDate: null,
  calendarVisible: false,
  timeVisible: false,
  withUnderList: false,
  withUnderListName: '',
  settedCountry: 'Узбекистан',
  settedCountry2: 'Узбекистан',
  category: '',
  projectName: '',
  projectDescription: '',
  subCategory: '',
  time: '12:00',
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
  acceptNumber(item) {
    const regex = this[item].replace(/\D/g, '')
    if (this[item].length !== 0) this[item] = '+' + regex
  },
  acceptCard(item) {
    const regex = this[item].replace(/\D/g, '')
    if (this[item].length !== 0) this[item] = regex
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
  },
  setBudget(val) {
    const item = this.selected.find(i => i.type === 'budget')
    if (item) item.value = val
  },
  dateFormat() {
    return this.picker.toString().split('-').reverse().join('.')
  },
  datePickerFormat() {
    return this.picker2
  },
  hideCalendar() {
    this.calendarVisible = false
  },
  hideTime() {
    this.timeVisible = false
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
  enableCard() {
    if (this.isCard2) {
      this.isCard3 = true
    } else {
      this.isCard2 = true
    }
  },
  disableCard() {
    if (!this.isCard3) {
      this.isCard2 = false
      this.card2 = ''
    } else {
      this.isCard3 = false
      this.card3 = ''
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
    else if (this.forWhom.length < 4) {
      return this.$message.info('Впишите для кого/для чего')
    }
    else if (this.curator.length < 3) {
      return this.$message.info('Впишите имя куратора')
    }
    else if (this.telephone.length < 9) {
      return this.$message.info('Впишите контактные данные')
    }
    else if (this.budget === null || this.budget === '') {
      this.$message.info('Необходимо указать бюджет!')
    }
    else if (this.card.length <= 12) {
      return this.$message.info('Укажите корректные данные карты')
    }
    else if (this.isCard2 && this.card2.length <= 12) {
      return this.$message.info('Укажите корректные данные 2-й карты')
    }
    else if (this.isCard3 && this.card3.length <= 12) {
      return this.$message.info('Укажите корректные данные 3-й карты')
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