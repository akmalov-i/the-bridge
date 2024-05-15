<template>
  <div :style="{ 'min-height': '680px' }">
    <div class="settings-container">
      <div class="settings-header">
        <div class="header-left">
          <h2 class="mb1">{{ this.title }}</h2>
          <p class="context">
            Рыбатекст используется дизайнерами, проектировщиками и
            фронтендерами, когда нужно быстро
          </p>
        </div>
        <div class="header-right">
          <TheSubcustomersTab @active="setActive" />
        </div>
      </div>
      <hr />
      <!-- физическое лицо -->
      <div class="sub-body" v-if="natPerson">
        <div class="left">
          <TheSub
            :data="main.subsNP"
            :editing.sync="NPData"
            :update-editing.sync="NPData"
            :button.sync="NPButton"
            :update-button.sync="NPButton"
          />
        </div>
        <div class="right">
          <TheSubSet
            v-if="NPData"
            :key="NPData.telephone"
            :data="NPData"
            :editing.sync="NPData"
            :update-editing.sync="NPData"
            :button.sync="NPButton"
            :update-button.sync="NPButton"
          />
          <TheSubEdit v-else />
        </div>
      </div>
      <!-- юридическое лицо -->
      <div class="sub-body" v-else>
        <div class="left">
          <TheSub2
            :data="main.subsLE"
            :editing.sync="LEData"
            :update-editing.sync="LEData"
            :button.sync="LEButton"
            :update-button.sync="LEButton"
          />
        </div>
        <div class="right">
          <TheSubSet2
            v-if="LEData"
            :key="LEData.telephone"
            :data="LEData"
            :editing.sync="LEData"
            :update-editing.sync="LEData"
            :button.sync="LEButton"
            :update-button.sync="LEButton"
          />
          <TheSubEdit2 v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'userSettings',
  middleware: ['admin-auth'],
  async validate({ params }) {
    return Boolean(params.id)
  },
  head() {
    return {
      title: 'Lavzee | ' + this.title
    }
  },
  async asyncData({ store, params }) {
    let user = await store.dispatch('user/fetchById', params.id)

    return {
      main: {
        subsNP: user.subsNP,
        subsLE: user.subsLE
      }
    }
  },
  data() {
    return {
      title: 'Суб заказчики',
      natPerson: true,
      NPData: null,
      NPButton: null,
      LEData: null,
      LEButton: null
    }
  },
  methods: {
    setActive(item) {
      item == 'first' ? (this.natPerson = true) : (this.natPerson = false)
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.context {
  max-width: 415px;
  font-size: 1.4rem;
  color: $gray;
  font-weight: 400;
  line-height: 150%;
}

label {
  display: flex;
  align-items: center;
}

hr {
  height: 1px;
  width: 100%;
  background: $light-gray;
  min-width: 200px;
  margin: 2.4rem 0;
}

.sub-body {
  display: grid;
  grid-template-columns: 2fr 1fr;
  .left {
    padding-right: 4rem;
    border-right: 1px solid $light-gray;
    margin-right: 4rem;
  }
}
</style>
