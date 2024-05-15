<template>
  <div>
    <h2>Отзыв</h2>
    <div class="status">
      <div class="status-change">
        <div class="select-tab space-between">
          <div class="active center tab">Обо мне</div>
          <div class="center tab">Мой отзыв</div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="top">
        <div class="img">
          <nuxt-img src="avatar4.jpg" preset="offer" />
        </div>
        <div class="username">
          <h3>Атаханов.К</h3>
          <div class="rate">
            <el-rate
              v-model="top"
              disabled
              disabled-void-color="#AAC2FF"
              class="stars"
              :max="5"
              :colors="['#1374F6', '#FFFFFF', '#AAC2FF']"
            >
            </el-rate>
          </div>
        </div>
      </div>
      <div class="middle">
        <p>
          Установка и обслуживание компьютерной и офисной техники, оргтехники. -
          Установка, настройка и обновление офисного и прикладного ПО
          требовании.Требовании и обязанности.Требовании и обязанности: -
          Установка и обслуживание компьютерной и офисной техники, оргтехники.
        </p>
      </div>
      <div class="bottom">
        <div class="rate-item">
          <p>Пунктуальность</p>
          <el-rate
            v-model="first"
            disabled
            disabled-void-color="#7d7d7d75"
            class="stars big"
            :max="5"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
          >
          </el-rate>
        </div>
        <div class="rate-item">
          <p>Качество работы</p>
          <el-rate
            v-model="second"
            disabled
            disabled-void-color="#7d7d7d75"
            class="stars big"
            :max="5"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
          >
          </el-rate>
        </div>
        <div class="rate-item">
          <p>Оперативность</p>
          <el-rate
            v-model="third"
            disabled
            disabled-void-color="#7d7d7d75"
            class="stars big"
            :max="5"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
          >
          </el-rate>
        </div>
        <div class="rate-item">
          <p>Опрятность</p>
          <el-rate
            v-model="fourth"
            disabled
            disabled-void-color="#7d7d7d75"
            class="stars big"
            :max="5"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
          >
          </el-rate>
        </div>
        <div class="rate-item">
          <p>Вежливость</p>
          <el-rate
            v-model="fifth"
            disabled
            disabled-void-color="#7d7d7d75"
            class="stars big"
            :max="5"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
          >
          </el-rate>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      top: 3,
      first: 2,
      second: 1,
      third: 5,
      fourth: 2,
      fifth: 4,
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-top: 2.4rem;
  padding: 3.2rem 2.4rem;
  background: $azure;
  border-radius: 4px;
}

.rate-item {
  padding: 1.8rem 1.6rem;
  border-radius: 8px;
  background: $white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: 0.4rem;

  &::after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 28px;
    width: 1px;
    background: #e5e5e5;
  }

  .el-rate {
    height: unset !important;
  }

  p {
    font-size: 1.4rem;
    font-weight: 500;
  }
}

.top {
  display: flex;
  margin-bottom: 1.6rem;

  .username {
    margin-left: 1.4rem;
  }

  h3 {
    margin-bottom: 0.3rem;
  }

  img {
    border-radius: 8px;
  }

  .img {
    width: 57px;
    height: 57px;
  }
}

.rate {
  background: $blue;
  border-radius: 24px;
  width: 86px;
  padding: 0.8rem;
  height: 26px;
}

.status {
  width: 70%;
}

.middle {
  background: $white;
  border-radius: 4px;
  margin-bottom: 1.6rem;

  p {
    padding: 1.6rem 1.2rem;
    font-weight: 300;
    font-size: 14px;
    line-height: 170%;
    color: $black;
  }
}

.status-change {
  height: 44px;

  .select-tab {
    max-width: unset;
    min-width: unset;
  }

  .tab {
    padding-right: 2rem;
    padding-left: 2rem;
  }
}
</style>