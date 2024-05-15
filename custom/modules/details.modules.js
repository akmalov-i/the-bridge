export default {
  titles: {
    tools: 'Инструменты/материалы',
    knowledge: 'Образования',
    car: 'Наличие авто',
  },

  /* Категории */
  car: [
    { name: 'Не указано', value: 0 },
    { name: 'Отсувствует', value: 1 },
    { name: 'Присутствует', value: 2 },
  ],
  tools: [
    { name: 'Не указано', value: 0 },
    { name: 'Не имеются', value: 1 },
    { name: 'Имеются', value: 2 },
  ],
  knowledge: [
    { name: 'Не указано', value: 0 },
    { name: 'Не имеется', value: 1 },
    { name: 'Среднее', value: 2 },
    { name: 'Среднее специальное', value: 3 },
    { name: 'Высшее', value: 4 },
    { name: 'Двойное высшее', value: 5 }
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

  selected: [
    { type: 'tools', select: 'Не указано', value: 0 },
    { type: 'knowledge', select: 'Не указано', value: 0 },
    { type: 'car', select: 'Не указано', value: 0 },
    { type: 'allCountries', select: 'Ташкент', value: 0 },
  ],
}