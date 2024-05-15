import TransModules from './modules/finds.modules'

export const varriables = {
  found: true,
  edit: true,
  showPopup: false,
  destination: '',
  popupTitle: '',
  popupLink: '',
  popupText: '',
  firstButtonText: '',
  secondButtonText: '',
  picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
  formattedDate: null,
  calendarVisible: false,
  timeVisible: false,
  settedCountry: 'Узбекистан',
  projectName: '',
  projectDescription: '',
  time: '12:00',
  fileList: [],
  ...TransModules,
}

export const modules = {
  send() {
    this.$refs.upload.submit()
  },
  changeTransportCountry(country) {
    this.settedCountry = country.name
  },
  destinationPush() {
    const item = this.selected.find(i => i.type === 'destination')
    item.select = this.destination
  },
  changeTransportCity(city) {
    const item = this.uzbekistan.find(i => i.name === city.name)
    const allCountries = this.selected.find(i => i.type === 'allCountries')
    allCountries.select = item.name
    allCountries.value = item.value
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
  changeTitle(item) {
    const find = this.selected.find(i => i.type === item)
    if (find) return find.select
  },
  changeSelect(option) {
    const find = this.selected.find(i => i.type === 'category')

    if (find) {
      find.select = option.name
      find.value = option.value
    }

    if (option.value === 'found') {
      this.found = true
    } else if (option.value === 'lost') {
      this.found = false
    }
  },
  changeEdit() {
    if (this.projectName.length === 0 || this.projectDescription.length === 0) {
      return this.$message.info('Впишите название и детали!')
    }
    else if (this.projectName.length <= 8 || this.projectDescription.length <= 15) {
      return this.$message.info('Название и детали нужно указать подробно!')
    }
    else if (this.period && this.picker === this.tomorrow) {
      return this.$message.info('Даты сроков должны отличаться хотя бы на день!')
    }
    else if (this.destination === '' || this.destination.length < 3) {
      this.$message.info('Необходимо указать место потери или находки!')
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