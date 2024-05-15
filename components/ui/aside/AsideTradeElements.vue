<template>
  <div>
    <h2 class="text-center">Новое объявление</h2>
    <TheNewTrans
      name="Купить"
      link="/create/trade?message=purchase"
      tooltip="Цифровой договор, снижающий риски игроков. Отклонение договора при значительных рисках."
      :active="active === 1"
    />
    <TheNewTrans
      name="Продать"
      link="/create/trade?message=sale"
      tooltip="Оказание услуг профессионалами, которые умеют держать слово."
      :active="active === 2"
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
