export default {
  titles: {
    status: 'Мой статус',
    stage: 'Стадия',
  },

  /* Категории */
  status: [
    { name: 'Исполнитель', value: 0 },
    { name: 'Заказчик', value: 1 },
    { name: 'Бюро находок', value: 2 },
  ],
  stage: [
    { name: 'Заявки на публикацаю', value: 0 },
    { name: 'Активные', value: 1 },
    { name: 'Архив', value: 2 }
  ],
  selected: [
    { type: 'status', select: 'Исполнитель', value: 0 },
    { type: 'stage', select: 'Заявки на публикацаю', value: 0 }
  ],
}