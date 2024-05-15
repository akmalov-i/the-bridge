export default {
  titles: {},

  /* Категории */
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

  selected: [
    { type: 'allCountries', select: 'Ташкент', value: 0 },
    { type: 'projectName', value: null },
    { type: 'projectDescription', value: null },
  ],
}