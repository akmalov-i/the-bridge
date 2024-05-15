export default {
  titles: {
    categories: 'Все категории',
    price: 'Цена',
    clients: 'Объявление от..',
    transFrom: 'Заявка от..',
    transTo: 'Заявка на..',
    level: 'Мин. Уровень',
    currency: 'Валюта',
    lang: 'Язык',
    has: 'Требуются',
    delivery: 'Доставка',
    status: 'Состояние',
    current: 'Статус',
    location: 'Локация',
    location501: 'Локация',
    source: 'Источник',
    stuff: 'Тип',
    serviceType: 'Вид услуг',
    priceCorridor: 'Ценовая вилка'
  },

  /* Категории */
  categories: [
    { label: 'Показать все', value: 0 },
    { label: 'Транспорт', value: 1 },
    { label: 'Ремонт', value: 2 },
    { label: 'Аренда', value: 3 },
    { label: 'Здоровье', value: 4 },
    { label: 'Клининг', value: 5 },
    { label: 'Образование', value: 6 },
    { label: 'Виртуальные услуги', value: 7 },
    { label: 'Другое', value: 8 },
  ],
  price: [
    { label: 'Показать все', value: 0 },
    { label: 'Аукцион', value: 1 },
    { label: 'Фиксированная', value: 2 }
  ],
  clients: [
    { label: 'Показать все', value: 0 },
    { label: 'Физ.лицо', value: 1 },
    { label: 'Юр.лицо', value: 2 }
  ],
  transFrom: [
    { label: 'Показать все', value: 0 },
    { label: 'Физ.лицо', value: 1 },
    { label: 'Юр.лицо', value: 2 }
  ],
  transTo: [
    { label: 'Показать все', value: 0 },
    { label: 'Услугу', value: 1 },
    { label: 'Товар', value: 2 }
  ],
  level: [
    { label: 'Показать все', value: 0 },
    { label: 'Новичок', value: 1 },
    { label: 'Любитель', value: 2 },
    { label: 'Профи', value: 3 },
    { label: 'Эксперт', value: 4 },
    { label: 'Гуру', value: 5 }
  ],
  serviceType: [
    { label: 'Показать все', value: 0 },
    { label: 'Персонально', value: 1 },
    { label: 'Виртуально', value: 2 }
  ],
  current: [
    { label: 'Показать все', value: 0 },
    { label: 'Текущие', value: 1 },
    { label: 'Архив', value: 2 }
  ],
  stuff: [
    { label: 'Показать все', value: 0 },
    { label: 'Услуга', value: 1 },
    { label: 'Товар', value: 2 }
  ],
  has: [
    { label: 'Показать все', value: 0 },
    { label: 'Своё авто', value: 1 },
    { label: 'Свои инструменты', value: 2 },
    { label: 'Свои материалы', value: 3 },
  ],
  status: [
    { label: 'Показать все', value: 0 },
    { label: 'Новые', value: 1 },
    { label: 'Б/У', value: 2 }
  ],
  delivery: [
    { label: 'Показать все', value: 0 },
    { label: 'Есть', value: 1 },
    { label: 'Нет', value: 2 }
  ],
  location: [
    { label: 'Показать все', value: 0 },
    { label: 'Город', value: 1 },
    { label: 'Страна', value: 2 }
  ],
  location501: [
    { label: 'Показать все', value: 0 },
    { label: 'Текущий Город', value: 1 },
    { label: 'Страна', value: 2 }
  ],
  source: [
    { label: 'Показать все', value: 0 },
    { label: 'Автор', value: 1 },
    { label: 'Репост', value: 2 },
    { label: 'Бюро находок', value: 3 },
  ],
  lang: [
    { label: 'Показать все', value: 0 },
    { label: 'English', value: 1 },
    { label: 'Русский', value: 2 },
    { label: 'Узбек тили', value: 3 },
    { label: 'Қазақ тілі', value: 4 },
    { label: 'Тоҷикӣ', value: 5 },
    { label: 'Español', value: 6 },
    { label: 'Française', value: 7 },
    { label: 'Deutsche', value: 8 },
    { label: 'Italiano', value: 9 },
  ],
  currency: [
    { label: 'Показать все', value: 0 },
    { label: 'USD', value: 1 },
    { label: 'EURO', value: 2 },
    { label: 'UZS', value: 3 },
    { label: 'RUB', value: 4 },
    { label: 'KZT', value: 5 },
    { label: 'TJS', value: 6 },
    { label: 'KGS', value: 7 }
  ],
  priceCorridor: [
    { label: 'Показать все', value: 0 },
    { label: 'До $50', value: 1 },
    { label: '$50-$200', value: 2 },
    { label: '$200-$500', value: 3 },
    { label: '$500-$2000', value: 4 },
    { label: '$2000-$5000', value: 5 },
    { label: '$5000 и больше', value: 6 },
  ],
  selected: [
    { type: 'finds', value: 0 },
    { type: 'help', value: 0 },
    { type: 'sale', value: 0 },
  ],
}