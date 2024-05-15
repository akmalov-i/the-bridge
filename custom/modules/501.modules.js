export default {
  titles: {
    serviceType: 'Раздел',
    graceCategory: 'Заявки на',
    category: 'Категория',
    country: 'Страна',
    city: 'Город',
    currency: 'Бюджет',
    cardType: 'Канал помощи',
    cardType2: 'Канал помощи',
    cardType3: 'Канал помощи',
  },

  /* Категории */
  serviceType: [
    { name: 'Нуждаюсь', value: 'getHelp' },
    { name: 'Помогу', value: 'willHelp' }
  ],
  graceCategory: [
    { name: 'Мат.помощь', value: 0 },
  ],
  category: [
    { name: 'Образование', value: 0 },
  ],
  cardType: [
    { name: 'Uzcard', value: 0 },
    { name: 'VISA', value: 1 },
    { name: 'PayPal', value: 2 },
  ],
  cardType2: [
    { name: 'Uzcard', value: 0 },
    { name: 'VISA', value: 1 },
    { name: 'PayPal', value: 2 },
  ],
  cardType3: [
    { name: 'Uzcard', value: 0 },
    { name: 'VISA', value: 1 },
    { name: 'PayPal', value: 2 },
  ],
  level: [
    { name: 'Показать все', value: 0 },
    { name: 'Новичок', value: 1 },
    { name: 'Любитель', value: 2 },
    { name: 'Профи', value: 3 },
    { name: 'Эксперт', value: 4 },
    { name: 'Гуру', value: 5 }
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
    { type: 'serviceType', select: 'Нуждаюсь', value: 'getHelp' },
    { type: 'graceCategory', select: 'Мат.помощь', value: 0 },
    { type: 'category', select: 'Образование', value: 0 },
    { type: 'cardType', select: 'Uzcard', value: 0 },
    { type: 'cardType2', select: 'Uzcard', value: 0 },
    { type: 'cardType3', select: 'Uzcard', value: 0 },
    { type: 'country', select: 'Узбекистан', value: 0 },
    { type: 'city', select: 'Ташкент', value: 0 },
    { type: 'currency', select: 'USD', value: 0 },
    { type: 'allCountries', select: 'Ташкент', value: 0 },
    { type: 'allCountriesTo', select: 'Ташкент', value: 0 },
    { type: 'projectName', value: null },
    { type: 'projectDescription', value: null },
    { type: 'budget', value: null },
    { type: 'budget2', value: null },
    { type: 'budget3', value: null },
  ],
}