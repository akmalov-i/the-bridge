<template>
  <div>
    <h2>До следующего уровню</h2>
    <div
      class="reliability mb1"
      :class="{
        'red-rel': reliability <= 54,
        'coral-rel': reliability >= 55 && reliability <= 70,
        'orange-rel': reliability >= 71 && reliability <= 84,
        'green-rel': reliability >= 85 && reliability <= 100
      }"
    >
      <div class="reliability-top">
        <p>Общий рейтинг ({{reliability}}/100)</p>
        <span>{{ reliability }}%</span>
      </div>
      <div class="reliability-middle" :style="`width:${reliability}%`"></div>
    </div>
    <div
      class="reliability mb1"
      :class="{
        'red-rel': reliability2 <= 54,
        'coral-rel': reliability2 >= 55 && reliability2 <= 70,
        'orange-rel': reliability2 >= 71 && reliability2 <= 84,
        'green-rel': reliability2 >= 85 && reliability2 <= 100
      }"
    >
      <div class="reliability-top">
        <p>Общий рейтинг ({{reliability2}}/100)</p>
        <span>{{ reliability2 }}%</span>
      </div>
      <div class="reliability-middle" :style="`width:${reliability2}%`"></div>
    </div>
    <div
      class="reliability mb1"
      :class="{
        'red-rel': reliability3 <= 54,
        'coral-rel': reliability3 >= 55 && reliability3 <= 70,
        'orange-rel': reliability3 >= 71 && reliability3 <= 84,
        'green-rel': reliability3 >= 85 && reliability3 <= 100
      }"
    >
      <div class="reliability-top">
        <p>Общий рейтинг ({{reliability3}}/100)</p>
        <span>{{ reliability3 }}%</span>
      </div>
      <div class="reliability-middle" :style="`width:${reliability3}%`"></div>
    </div>
    <div
      class="reliability mb1"
      :class="{
        'red-rel': reliability4 <= 54,
        'coral-rel': reliability4 >= 55 && reliability4 <= 70,
        'orange-rel': reliability4 >= 71 && reliability4 <= 84,
        'green-rel': reliability4 >= 85 && reliability4 <= 100
      }"
    >
      <div class="reliability-top">
        <p>Общий рейтинг ({{reliability4}}/100)</p>
        <span>{{ reliability4 }}%</span>
      </div>
      <div class="reliability-middle" :style="`width:${reliability4}%`"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reliability: 78,
      reliability2: 78,
      reliability3: 78,
      reliability4: 78,
    }
  }
}
</script>

<style lang="scss" scoped>
.reliability {
  width: 100%;
  height: 109px;
  background: rgba(231, 153, 68, 0.05);
  border-radius: 8px;
  padding: 3.2rem 1.6rem;
  margin-right: 3.2rem;
  color: $black;
  position: relative;

  &.red-rel {
    background: rgba(237, 76, 79, 0.1);
    .reliability-middle,
    .reliability-middle:after {
      background: $red;
    }
  }

  &.coral-rel {
    background: rgba(237, 76, 79, 0.1);
    .reliability-middle,
    .reliability-middle:after {
      background: $coral;
    }
  }

  &.orange-rel {
    background: rgba(231, 153, 68, 0.05);
    .reliability-middle,
    .reliability-middle:after {
      background: $orange;
    }
  }

  &.green-rel {
    background: rgba(95, 231, 68, 0.05);
    .reliability-middle,
    .reliability-middle:after {
      background: $green;
    }
  }

  &-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    color: $blue;

    p {
      font-size: 1.6rem;
      font-weight: 500;
    }
    span {
      font-size: 1.4rem;
      font-weight: 400;
    }
  }

  &-middle {
    height: 1.2rem;
    border-radius: 12px;
    background: $orange;
    transition: 0.4s;

    &:after {
      content: '';
      position: absolute;
      width: 97%;
      height: 1.2rem;
      border-radius: 12px;
      background: $orange;
      opacity: 0.32;
    }
  }
}
</style>