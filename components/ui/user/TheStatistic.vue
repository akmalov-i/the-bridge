<template>
  <div class="statistic">
    <h2>Характеристики</h2>
    <div class="statistic-wrap">
      <div
        class="reliability"
        :class="{
          'red-rel': data.reliability <= 54,
          'coral-rel': data.reliability >= 55 && data.reliability <= 70,
          'orange-rel': data.reliability >= 71 && data.reliability <= 84,
          'green-rel': data.reliability >= 85 && data.reliability <= 100
        }"
      >
        <div class="reliability-top">
          <p>Надежность</p>
          <span>{{ data.reliability || 0 }}%</span>
        </div>
        <div class="reliability-middle" :style="`width:${data.reliability}%`"></div>
        <div class="reliability-bottom">
          Требовании и обязанности: - Установка и обслуживание компьютерной.
        </div>
      </div>
      <div class="others">
        <div class="others-item">
          <v-progress-circular
            :rotate="-90"
            :size="135"
            :width="10"
            :value="data.honesty"
            color="primary"
            :class="{
              'red-line': data.honesty <= 54,
              'coral-line': data.honesty >= 55 && data.honesty <= 70,
              'orange-line': data.honesty >= 71 && data.honesty <= 84,
              'green-line': data.honesty >= 85 && data.honesty <= 100
            }"
          >
            {{ data.honesty }}%
          </v-progress-circular>
          <p>Честность</p>
        </div>
        <div class="others-item">
          <v-progress-circular
            :rotate="-90"
            :size="135"
            :width="10"
            :value="data.punctuality"
            color="primary"
            :class="{
              'red-line': data.punctuality <= 54,
              'coral-line': data.punctuality >= 55 && data.punctuality <= 70,
              'orange-line': data.punctuality >= 71 && data.punctuality <= 84,
              'green-line': data.punctuality >= 85 && data.punctuality <= 100
            }"
          >
            {{ data.punctuality }}%
          </v-progress-circular>
          <p>Пунктуальность</p>
        </div>
        <div class="others-item">
          <v-progress-circular
            :rotate="-90"
            :size="135"
            :width="10"
            :value="data.neatness"
            color="primary"
            :class="{
              'red-line': data.neatness <= 54,
              'coral-line': data.neatness >= 55 && data.neatness <= 70,
              'orange-line': data.neatness >= 71 && data.neatness <= 84,
              'green-line': data.neatness >= 85 && data.neatness <= 100
            }"
          >
            {{ data.neatness }}%
          </v-progress-circular>
          <p>Чистоплотность</p>
        </div>
        <div class="others-item">
          <v-progress-circular
            :rotate="-90"
            :size="135"
            :width="10"
            :value="data.quality"
            color="primary"
            :class="{
              'red-line': data.quality <= 54,
              'coral-line': data.quality >= 55 && data.quality <= 70,
              'orange-line': data.quality >= 71 && data.quality <= 84,
              'green-line': data.quality >= 85 && data.quality <= 100
            }"
          >
            {{ data.quality }}%
          </v-progress-circular>
          <p>Качество</p>
        </div>
        <div class="others-item">
          <v-progress-circular
            :rotate="-90"
            :size="135"
            :width="10"
            :value="data.efficiency"
            color="primary"
            :class="{
              'red-line': data.efficiency <= 54,
              'coral-line': data.efficiency >= 55 && data.efficiency <= 70,
              'orange-line': data.efficiency >= 71 && data.efficiency <= 84,
              'green-line': data.efficiency >= 85 && data.efficiency <= 100
            }"
          >
            {{ data.efficiency }}%
          </v-progress-circular>
          <p>Оперативность</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      reliability: 100,
    }
  }
}
</script>

<style lang="scss" scoped>
.statistic {
  background: $white;
  border-radius: 8px;
  width: 100%;
  margin-top: 1.6rem;
  padding: 3.2rem 2.4rem;

  &-wrap {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
}

.reliability {
  width: 100%;
  height: 182px;
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
      width: 90%;
      height: 1.2rem;
      border-radius: 12px;
      background: $orange;
      opacity: 0.32;
    }
  }

  &-bottom {
    font-weight: 300;
    font-size: 1.4rem;
    padding-top: 1.3rem;
    margin-top: 2rem;
    border-top: 1px solid $light-gray;
  }
}

.others {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 3.1rem;
  border-left: 1px solid $light-gray;

  &-item {
    p {
      font-weight: 500;
      font-size: 1.6rem;
      margin-top: 1.6rem;
      padding-top: 1.2rem;
      color: $black;
      text-align: center;
      border-top: 1px solid $light-gray;
    }
  }
}
</style>