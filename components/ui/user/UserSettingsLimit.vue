<template>
  <div>
    <h2>Текущие ограничения</h2>
    <div class="grid2">
      <div class="item space-between mr3">
        <p>Лимит на транзакцию (услуги)</p>
        <span>$25</span>
      </div>
      <div class="item space-between">
        <p>Лимит на кредит/страховку/кассу</p>
        <span>$5+</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid2 {
  width: 100%;
}
.item {
  padding: 2.4rem;
  border-radius: 8px;
  background: rgba(237, 76, 79, 0.1);
  font-weight: 700;
  font-size: 1.4rem;
  p {
    color: $red;
  }
  span {
    color: $blue;
  }
}
</style>