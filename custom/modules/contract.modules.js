export default {
  titles: {
    tradeCategory: 'Цель объявлений',
    contractType: 'Раздел объявлений',
    mainCategory: 'Основная категория',
    subCategory: 'Подкатегория',
    country: 'Страна',
    city: 'Город',
    deadline: 'Сроки',
    priceType: 'Условие оплаты',
    payTerms: 'Определение стоимости',
    currency: 'Валюта',
    deliveryCategory: 'Доставка',
    needDeliveryCategory: 'Доставка',
  },

  /* Категории */
  contractType: [
    { name: 'Услуги', value: 'services' },
    { name: 'Торг', value: 'trades' },
  ],
  mainCategory: [
    { name: 'Ремонт и стройка', value: 'repair' },
    { name: 'Транспорт', value: 'transport' },
    { name: 'Аренда', value: 'rent' },
    { name: 'Клининг', value: 'cleaning' },
    { name: 'Образование', value: 'knowledge' },
    { name: 'Здоровье', value: 'health' },
    { name: 'Виртуальные услуги', value: 'virtual' },
  ],
  tradeCategory: [
    { name: 'Покупка', value: 'buy' },
    { name: 'Продажа', value: 'sell' },
  ],
  knowledge: [
    { name: 'Языки', value: 'languages', underList: 'knowledgeLang' },
    { name: 'Математика', value: 1 },
    { name: 'Физика', value: 2 },
    { name: 'Химия', value: 3 },
    { name: 'Биология', value: 4 },
  ],
  knowledgeLang: [
    { name: 'Английский', value: 0, mainCategory: 'knowledge', mainValue: 'languages'},
    { name: 'Русский', value: 1, mainCategory: 'knowledge', mainValue: 'languages' },
    { name: 'Узбекский', value: 2, mainCategory: 'knowledge', mainValue: 'languages' },
  ],
  deliveryCategory: [
    { name: 'Самовывоз', value: 0 },
    { name: 'По городу', value: 1 },
    { name: 'По региону', value: 2 },
    { name: 'По стране', value: 3 },
  ],
  needDeliveryCategory: [
    { name: 'Требуется', value: 0 },
    { name: 'Не требуется', value: 1 },
  ],
  cleaning: [
    { name: 'Квартира/Ч. Cектор', value: 'appartment', underList: 'sectorCleaning' },
    { name: 'Офис', value: 1 },
    { name: 'Территория', value: 2 },
  ],
  sectorCleaning: [
    { name: 'Малая уборка', value: 0, mainCategory: 'cleaning', mainValue: 'appartment' },
    { name: 'Средняя уборка', value: 1, mainCategory: 'cleaning', mainValue: 'appartment' },
    { name: 'Генеральная уборка', value: 2, mainCategory: 'cleaning', mainValue: 'appartment' },
  ],
  health: [
    { name: 'Массаж', value: 0 },
    { name: 'Дефектология', value: 1 },
    { name: 'Мед.сестра', value: 2 },
    { name: 'Поиск лекарств', value: 3 },
    { name: 'Другое', value: 4 }
  ],
  rent: [
    { name: 'Недвижимости', value: 'estate', underList: 'placeRent' },
    { name: 'Места Хранения', value: 1 },
    { name: 'Автомобиля', value: 2 },
    { name: 'Прокат вещей', value: 3 },
  ],
  placeRent: [
    { name: 'Короткий срок (<3 дня)', value: 0, mainCategory: 'rent', mainValue: 'estate' },
    { name: 'Средний срок (<месяц)', value: 1, mainCategory: 'rent', mainValue: 'estate' },
    { name: 'Долгий срок (> месяц)', value: 2, mainCategory: 'rent', mainValue: 'estate' },
  ],
  repair: [
    { name: 'Муж на час', value: 0 },
    { name: 'Мелкий ремонт', value: 1 },
    { name: 'Средний ремонт', value: 2 },
    { name: 'Крупный ремонт', value: 3 },
    { name: 'Кап. строительство', value: 4 },
    { name: 'Другое', value: 5 }
  ],
  transport: [
    { name: 'Пассажир', value: 'passenger', underList: 'passenger' },
    { name: 'Бандероль (<2кг)', value: 1 },
    { name: 'Посылка (2-20кг)', value: 2 },
    { name: 'Малый груз (20-200кг)', value: 3 },
    { name: 'Крупный груз (200кг-2т)', value: 4 },
    { name: 'Тоннажный груз (2т+)', value: 5 },
  ],
  passenger: [
    { name: 'Внутри города', value: 'inCity', mainCategory: 'transport', mainValue: 'passenger' },
    { name: 'Меж. городов', value: 'throughCities', mainCategory: 'transport', mainValue: 'passenger' },
    { name: 'Меж. регионов', value: 'throughRegions', mainCategory: 'transport', mainValue: 'passenger' },
    { name: 'Международный', value: 'throughCountries', mainCategory: 'transport', mainValue: 'passenger' },
  ],
  virtual: [
    { name: 'Переводы', value: 0 },
    { name: 'Бухгалтерский учет', value: 1 },
    { name: 'SMM / Маркетинг', value: 2 },
    { name: 'Web-Разработка', value: 3 },
    { name: 'Работа с текстом', value: 4 },
    { name: 'Другое', value: 5 }
  ],
  level: [
    { name: 'Показать все', value: 0 },
    { name: 'Новичок', value: 1 },
    { name: 'Любитель', value: 2 },
    { name: 'Профи', value: 3 },
    { name: 'Эксперт', value: 4 },
    { name: 'Гуру', value: 5 },
  ],
  allCountries: [
    { name: 'Узбекистан', value: 'uzbekistan' },
    { name: 'Казахстан', value: 'kazakhstan' },
    { name: 'Таджикистан', value: 'tadjikistan' },
    { name: 'Киргизия', value: 'kyrgyzistan' },
    { name: 'Россия', value: 'russia' },
    { name: 'США', value: 'usa' },
  ],
  uzbekistan: [
    { name: 'Ташкент', value: 0 },
    { name: 'Самарканд', value: 1 },
    { name: 'Бухара', value: 2 },
    { name: 'Хива', value: 3 },
    { name: 'Хорезм', value: 4 },
  ],
  kazakhstan: [
    { name: 'Алмата', value: 0 },
    { name: 'Шымкент', value: 1 },
    { name: 'Астана', value: 2 },
  ],
  country: [
    { name: 'Узбекистан', value: 0 },
    { name: 'Казахстан', value: 1 },
    { name: 'Таджикистан', value: 2 },
    { name: 'Киргизия', value: 3 },
    { name: 'Россия', value: 4 },
    { name: 'США', value: 5 },
  ],
  city: [
    { name: 'Ташкент', value: 0 },
    { name: 'Самарканд', value: 1 },
    { name: 'Бухара', value: 2 },
  ],
  deadline: [
    { name: 'Указать дедлайн', value: 0 },
    { name: 'Указать период', value: 1 }
  ],
  priceType: [
    { name: 'Полная оплата', value: 0 },
    { name: 'Помесячная', value: 1 },
    { name: 'Кредитный договор', value: 2 },
  ],
  payTerms: [
    { name: 'Фиксированная оплата', value: 0 },
  ],
  currency: [
    { name: 'USD', value: 0 },
    { name: 'EURO', value: 1 },
    { name: 'UZS', value: 2 },
    { name: 'RUB', value: 3 },
    { name: 'KZT', value: 4 },
    { name: 'TJS', value: 5 },
    { name: 'KGS', value: 6 }
  ],

  selected: [
    { type: 'contractType', select: 'Услуги', value: 'services' },
    { type: 'ads', select: 'Услуги', value: 0 },
    { type: 'mainCategory', select: 'Ремонт и стройка', value: 'repair' },
    { type: 'tradeCategory', select: 'Покупка', value: 'buy' },
    { type: 'subCategory', select: 'Муж на час', value: 0, underList: null },
    { type: 'country', select: 'Узбекистан', value: 0 },
    { type: 'city', select: 'Ташкент', value: 0 },
    { type: 'deliveryCategory', select: 'Самовывоз', value: 0 },
    { type: 'needDeliveryCategory', select: 'Требуется', value: 0 },
    { type: 'deadline', select: 'Указать дедлайн', value: 0 },
    { type: 'payTerms', select: 'Фиксированная оплата', value: 0 },
    { type: 'priceType', select: 'Полная оплата', value: 0 },
    { type: 'currency', select: 'USD', value: 0 },
    { type: 'allCountries', select: 'Ташкент', value: 0 },
    { type: 'allCountriesTo', select: 'Ташкент', value: 0 },
    { type: 'projectName', value: null },
    { type: 'projectDescription', value: null },
    { type: 'budget', value: null },
  ],
}