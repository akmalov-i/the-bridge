<template>
  <div>
    <h2 class="text-center">Новое объявление</h2>
    <TheNewTrans
      name="Найдено"
      link="/create/finds?message=find"
      tooltip="Цифровой договор, снижающий риски игроков. Отклонение договора при значительных рисках."
    />
    <TheNewTrans
      name="Потеряно"
      link="/create/finds?message=lost"
      tooltip="Оказание услуг профессионалами, которые умеют держать слово."
    />
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Number
    }
  }
}
</script>
