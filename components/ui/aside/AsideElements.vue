<template>
  <div>
    <h2 class="text-center">Полезные плюшки</h2>
    <TheTabs />
    <h2 class="text-center mt3">Дополнительные функции</h2>
    <TheNewTrans
      name="Текущий договор"
      link="/create/contract"
      tooltip="Цифровой договор, снижающий риски игроков. Отклонение договора при значительных рисках."
      :active="active === 1"
    />
    <TheNewTrans
      name="Новое объявление"
      link="/create/service"
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
