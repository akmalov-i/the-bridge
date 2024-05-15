export const search = {
  mainCategory: [
    {
      value: '',
      label: 'Показать все'
    },
    {
      value: 'Transport',
      label: 'Транспорт',
      children: [
        {
          label: 'Пассажир',
          value: 'Passenger'
        },
        {
          label: 'Бандероль (<2кг)',
          value: 'Parcel (<2кг)'
        },
        {
          label: 'Посылка (2-20кг)',
          value: 'Package (2-20kg)'
        },
        {
          label: 'Малый груз (20-200кг)',
          value: 'Small cargo (20-200kg)'
        },
        {
          label: 'Крупный груз (200кг-2т)',
          value: 'Large cargo (200kg-2t)'
        },
        {
          label: 'Тоннажный груз (2т+)',
          value: 'Tonnage cargo (2t+)'
        }
      ]
    },
    {
      value: 'Rent',
      label: 'Аренда',
      children: [
        {
          label: 'Недвижимость',
          value: 'Realty'
        },
        {
          label: 'Склад / Временное хранение',
          value: 'Storage Locations'
        },
        {
          label: 'Транспорт',
          value: 'Transport'
        },
        {
          label: 'Прокат вещей',
          value: 'Rental of things'
        },
        {
          label: 'Другое',
          value: 'Other'
        }
      ]
    },
    {
      value: 'Installation and repair',
      label: 'Установка и ремонт',
      children: [
        {
          value: 'Appliances',
          label: 'Бытовая техника'
        },
        {
          value: 'Plumbing and heating',
          label: 'Сантехника и отопление'
        },
        {
          value: 'Electrics',
          label: 'Электрика'
        },
        {
          value: 'Doors and Locks',
          label: 'Двери и Замки'
        },
        {
          value: 'Windows, floor, walls and ceiling',
          label: 'Окна, пол, стены и потолок'
        },
        {
          value: 'Furniture',
          label: 'Мебель'
        },
        {
          value: 'Prom. equipment',
          label: 'Пром. оборудование'
        },
        {
          value: 'Other',
          label: 'Другое'
        }
      ]
    },
    {
      value: 'Construction',
      label: 'Строительство',
      children: [
        {
          label: 'Внутренняя отделка',
          value: 'Interior decoration'
        },
        {
          label: 'Электро-монтаж',
          value: 'Electrical installation'
        },
        {
          label: 'Ремонт под ключ',
          value: 'Turnkey repair'
        },
        {
          label: 'Другое',
          value: 'Other'
        }
      ]
    },
    {
      value: 'Freelance',
      label: 'Фриланс',
      children: [
        { label: 'Деловые услуги', value: 'Business services' },
        { label: 'Дизайн + Web', value: 'Design + Web' },
        { label: 'IT услуги', value: 'IT services' },
        { label: 'Фото-Видео услуги', value: 'Photo and Video services' },
        { label: 'Переводы', value: 'Transfers' },
        { label: 'Работа с текстом', value: 'Working with text' },
        { label: 'Другое', value: 'Other' }
      ]
    },
    {
      value: 'Education',
      label: 'Образование',
      children: [
        {
          label: 'Языки',
          value: 'Languages'
        },
        {
          label: 'Абитуриенты',
          value: 'Applicants'
        },
        {
          label: 'Индивидуальный инструктор',
          value: 'Individual instructor'
        }
      ]
    },
    {
      value: 'Cleaning',
      label: 'Уборка',
      children: [
        {
          label: 'Квартира/Дом',
          value: 'Apartment/House'
        },
        {
          label: 'Офис',
          value: 'Office'
        },
        {
          label: 'Пром. территория',
          value: 'Industrial territory'
        },
        {
          label: 'Другое',
          value: 'Other'
        }
      ]
    },
    {
      value: 'Home Staff',
      label: 'Домашний Персонал',
      children: [
        { label: 'Няни', value: 'Babysitters' },
        { label: 'Сад и огород', value: 'Garden and vegetable garden' },
        { label: 'Уход за животными', value: 'Animal care' },
        { label: 'Другое', value: 'Other' }
      ]
    },
    {
      value: 'Beauty and Health',
      label: 'Красота и Здоровье',
      children: [
        { label: 'Массаж', value: 'Massage' },
        { label: 'Дефектология', value: 'Defectology' },
        { label: 'Мед.сестра / Сиделка', value: 'Nurse' },
        { label: 'Диетология', value: 'Dietetics' },
        { label: 'Альтернативная медицина', value: 'alternative medicine' },
        { label: 'Другое', value: 'Other' }
      ]
    },
    {
      value: 'Organization of Events',
      label: 'Организация Мероприятий',
      children: [
        { label: 'Организатор мероприятий', value: 'Event Organizer' },
        { label: 'Музыка и танцы', value: 'Music and dancing' },
        { label: 'Тамада и ведущие', value: 'Toastmasters and presenters' },
        { label: 'Модели и хостесс', value: 'Models and hostesses' },
        { label: 'Кейтеринг', value: 'Catering' },
        { label: 'Другое', value: 'Other' }
      ]
    },
    {
      value: 'Tourism and emigration',
      label: 'Туризм и эмиграция',
      children: [
        { label: 'Гиды и переводчики', value: 'Guides and translators' },
        { label: 'Визы и ПМЖ', value: 'Visas and permanent residence' },
        { label: 'Проживание и билеты', value: 'Accommodation and tickets' },
        { label: 'Экскурсии и походы', value: 'Excursions and hikes' },
        { label: 'Другое', value: 'Other' }
      ]
    },
    {
      value: 'Service stations and auto services',
      label: 'СТО и авто-услуги',
      children: [
        { label: 'Тюнинг авто', value: 'Car tuning' },
        { label: 'Ремонт авто', value: 'Car repair' },
        { label: 'Обслуживание авто', value: 'Car maintenance' },
        { label: 'Поиск деталей', value: 'Search for details' },
        { label: 'Помощь в дороге', value: 'Help on the road' },
        { label: 'Другое', value: 'Other' }
      ]
    }
  ],
  trades: [
    {
      value: '',
      label: 'Показать все'
    },
    {
      label: 'Одежда',
      value: 'Clothes',
      children: [
        { label: 'Женская одежда', value: 'Womens clothing' },
        { label: 'Мужская одежда', value: 'Mens clothing' },
        { label: 'Другое', value: 'Other' }
      ]
    },
    {
      label: 'Электроника',
      value: 'Electronics',
      children: [
        { label: 'Бытовая техника', value: 'Appliances' },
        { label: 'Промышленная техника', value: 'Industrial machinery' },
        {
          label: 'Фото-Видео-Аудио Техника',
          value: 'Photo-Video-Audio Equipment'
        },
        { label: 'Аксессуары', value: 'Accessories' },
        { label: 'Другое', value: 'Other' }
      ]
    },
    {
      label: 'Телефоны',
      value: 'Phones',
      children: [
        { label: 'Смартфоны', value: 'Smartphones' },
        { label: 'Прочие телефоны', value: 'Other phones' },
        { label: 'Аксессуары', value: 'Accessories' },
        { label: 'Другое', value: 'Other' }
      ]
    },
    {
      label: 'Компьютеры',
      value: 'Computers',
      children: [
        { label: 'Ноутбуки', value: 'Laptops' },
        { label: 'Стационарные Компьютеры', value: 'Stationary Computers' },
        { label: 'Комплектующие', value: 'Parts' },
        { label: 'Периферия', value: 'Periphery' },
        { label: 'Другое', value: 'Other' }
      ]
    },
    {
      label: 'Дом и сад',
      value: 'House and garden',
      children: [
        { label: 'Мебель', value: 'Furniture' },
        {
          label: 'Строительство и инструменты',
          value: 'Construction and tools'
        },
        { label: 'Сад и огород', value: 'Garden and vegetable garden' },
        { label: 'Аксессуары', value: 'Accessories' },
        { label: 'Другое', value: 'Other' }
      ]
    },
    {
      label: 'Здоровье и спорт',
      value: 'Health and sports',
      children: [
        { label: 'Косметика + парфюм', value: 'Cosmetics + perfume' },
        {
          label: 'Спорт. инвентарь и питание',
          value: 'Sport. inventory and food'
        },
        { label: 'Другое', value: 'Other' }
      ]
    },
    {
      label: 'Детский мир',
      value: 'Childrens world',
      children: [
        { label: 'Детская одежда', value: 'Childrens clothing' },
        { label: 'Детская мебель', value: 'Childrens furniture' },
        { label: 'Коляски и транспорт', value: 'Strollers and transport' },
        { label: 'Игрушки', value: 'Toys' },
        { label: 'Другое', value: 'Other' }
      ]
    },
    {
      label: 'Транспорт',
      value: 'Transport',
      children: [
        { label: 'Авто + мото', value: 'Auto + Moto' },
        { label: 'Промышленный транспорт', value: 'Industrial transport' },
        { label: 'Комплектующие', value: 'Parts' },
        { label: 'Аксессуары', value: 'Accessories' },
        { label: 'Другое', value: 'Other' }
      ]
    },
    {
      label: 'Другое',
      value: 'Other'
    }
  ],
  determiningTheCost: [
    {
      value: '',
      label: 'Показать все'
    },
    {
      value: 'Fixed mainstay',
      label: 'Фиксированная оплата'
    },
    {
      value: 'Auction',
      label: 'Аукцион'
    }
  ],
  typeOfServices: [
    {
      value: '',
      label: 'Показать все'
    },
    {
      value: 'Personally',
      label: 'Персонально'
    },
    {
      value: 'Virtually',
      label: 'Виртуально'
    }
  ],
  minLevelForTheApplication: [
    {
      value: '',
      label: 'Показать все'
    },
    {
      value: 'Novice users',
      label: 'Начинающие пользователи'
    },
    {
      value: 'Advanced users',
      label: 'Продвинутые пользователи'
    },
    {
      value: 'Aces',
      label: 'Асы'
    }
  ],
  adFrom: [
    {
      value: '',
      label: 'Показать все'
    },
    {
      value: 'Individual',
      label: 'Физ.лицо'
    },
    {
      value: 'Legal entity',
      label: 'Юр.лицо'
    }
  ],
  currency: [
    {
      value: '',
      label: 'Показать все'
    },
    {
      value: 'USD',
      label: 'USD'
    },
    {
      value: 'EURO',
      label: 'EURO'
    },
    {
      value: 'UZS',
      label: 'UZS'
    },
    {
      value: 'RUB',
      label: 'RUB'
    },
    {
      value: 'KZT',
      label: 'KZT'
    },
    {
      value: 'TJS',
      label: 'TJS'
    },
    {
      value: 'KGS',
      label: 'KGS'
    }
  ],
  tradeDelivery: [
    {
      value: '',
      label: 'Показать все'
    },
    {
      value: 'Not required',
      label: 'Не требуется'
    },
    {
      value: 'Is required',
      label: 'Требуется'
    }
  ],
  condition: [
    {
      value: '',
      label: 'Показать все'
    },
    {
      value: 'Not required',
      label: 'Новые'
    },
    {
      value: 'Is required',
      label: 'Б/У'
    }
  ],
  stage: [
    {
      value: 'Active',
      label: 'Активные'
    },
    {
      value: 'Applications for publication',
      label: 'Заявки на публикацию'
    },
    {
      value: 'Archive',
      label: 'Архив'
    }
  ],
  myStatus: [
    {
      value: 'Executor',
      label: 'Исполнитель'
    },
    {
      value: 'Customer',
      label: 'Заказчик'
    },
    {
      value: 'Lost and Found',
      label: 'Бюро находок'
    }
  ],
  priceFork: [
    { label: 'Показать все', value: '' },
    { label: 'До $50', value: [0, 50, 'USD'] },
    { label: '$50-$200', value: [50, 200, 'USD'] },
    { label: '$200-$500', value: [200, 500, 'USD'] },
    { label: '$500-$2000', value: [500, 2000, 'USD'] },
    { label: '$2000-$5000', value: [2000, 5000, 'USD'] },
    { label: '$5000 и больше', value: [5000, 10000000000, 'USD'] }
  ],
  location: [
    { label: 'Показать все', value: '' },
    { label: 'Город', value: 'City' },
    { label: 'Страна', value: 'Country' }
  ],
  finds: [
    { label: 'Показать все', value: '' },
    { label: 'Текущие', value: 'Current' },
    { label: 'Архив', value: 'Archive' }
  ],
  source: [
    { label: 'Показать все', value: '' },
    { label: 'Автор', value: 'Author' },
    { label: 'Репост', value: 'Repost' },
    { label: 'Бюро находок', value: 'Lost and Found' }
  ],

  addButtonDisabled: false,
  resultTerm: [
    { name: 'Cамые новые', value: -1 },
    { name: 'Скоро заканчивающиеся', value: 1 }
  ],
  resultLimit: [{ number: 10 }, { number: 25 }, { number: 50 }]
}

export const searchActions = {
  changeAddFilter(item) {
    const find = this.filters.find((i) => i.value === item.value)
    find.isActive = !find.isActive
    this.filterStatus[item.value] = !this.filterStatus[item.value]
    const count = this.filters.filter((i) => i.isActive === true)
    if (count.length === 2) this.addButtonDisabled = true
    this.clearAddFilter()
  },
  selectResultTerm(option) {
    this.config.params.currentTerm = option.value
    this.load()
  },
  async selectResultLimit(option) {
    this.config.params.limits = option.number
    this.load()
  },
  async clearFilters() {
    this.config.params.currentTerm = -1
    this.config.params.page = 1
    this.config.params.limits = 10
    this.config.params.search = ''
    Object.keys(this.config.params.filters).map((key) => {
      this.config.params.filters[key] = ''
    })
    if (
      this.config.params.filters.button == '' &&
      (this.squareSwitchActiveIdx == 0 || this.squareSwitchActiveIdx == 1)
    ) {
      switch (this.$route.fullPath) {
        case '/trade':
          this.config.params.filters.button = 'Purchase'
          break
        case '/finds':
          this.config.params.filters.button = 'Find'
          break
      }
      this.squareSwitchActiveIdx = 0
    }
    Object.keys(this.filterStatus).map(
      (key) => (this.filterStatus[key] = false)
    )
    this.filters.forEach((item) => (item.isActive = false))
    this.addButtonDisabled = false
    this.clearAddFilter()
  },
  clearAddFilter() {
    const countOff = this.filters.filter((i) => i.isActive === false)
    for (let i = 0; i < countOff.length; i++) {
      let a = countOff[i].value
      this.config.params.filters[a] = ''
    }
    this.load()
  }
}
