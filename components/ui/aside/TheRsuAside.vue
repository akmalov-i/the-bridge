<template>
  <div>
    <div class="rsu mb08">
      <h2>Количество RSU</h2>
      <div class="item">
        <div class="item-left center">
          <div class="rsu-circle">
            <span></span>
          </div>

          <p>Оформлен депозит:</p>
          <el-tooltip placement="top">
            <template #content>
              <div class="tooltip">Какой-то текст</div>
            </template>
            <div class="icon">
              <questionSvg class="questionSvg" />
            </div>
          </el-tooltip>
        </div>
        <div class="item-right">16</div>
      </div>

      <div class="item">
        <div class="item-left center">
          <div class="rsu-circle">
            <span></span>
          </div>

          <p>На рассмотрении:</p>
          <el-tooltip placement="top">
            <template #content>
              <div class="tooltip">Какой-то текст</div>
            </template>
            <div class="icon">
              <questionSvg class="questionSvg" />
            </div>
          </el-tooltip>
        </div>
        <div class="item-right">2</div>
      </div>

      <div class="item">
        <div class="item-left center">
          <div class="rsu-circle">
            <span></span>
          </div>

          <p>Потолок уровня:</p>
          <el-tooltip placement="top">
            <template #content>
              <div class="tooltip">Какой-то текст</div>
            </template>
            <div class="icon">
              <questionSvg class="questionSvg" />
            </div>
          </el-tooltip>
        </div>
        <div class="item-right">25</div>
      </div>
    </div>
    <div class="rsu-item mb08 space-between">
      <p>Текущая стоимость 1 RSU</p>
      <span>$25</span>
    </div>
    <div class="rsu-item mb08 space-between">
      <p>Ближайщий вывод</p>
      <span>173 дня</span>
    </div>
  </div>
</template>

<script>
import questionSvg from 'assets/icons/question.svg?inline'

export default {
  components: {
    questionSvg
  }
}
</script>

<style lang="scss" scoped>
.rsu {
  border-radius: 8px;
  background: $white;
  padding: 3.2rem 2.4rem;
}

.rsu-item {
  padding: 2.4rem;
  border-radius: 8px;
  background: $white;
  font-weight: 700;
  font-size: 1.4rem;
  p {
    color: $green;
  }
  span {
    color: $blue;
  }
}

.item {
  padding: 1rem 1.6rem;
  border-radius: 30px;
  background: $azure;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;

  p {
    font-size: 1.4rem;
    color: $black;
    font-weight: 400;
    margin-right: 0.8rem;
  }

  .questionSvg {
    cursor: pointer;
    stroke: $gray;
  }

  &-right {
    color: $blue;
    font-weight: 700;
    font-size: 1.4rem;
  }
}

.rsu-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: $blue;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin-right: 1rem;

  span {
    background: $white;
    border-radius: 50%;
    width: 12px;
    height: 12px;
  }
}
</style>