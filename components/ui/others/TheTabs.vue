<template>
  <div class="tabs-wrap">
    <ul class="tabs space-between">
      <li
        class="center"
        v-for="item in tabs"
        :key="item.value"
        @click="selectTab(item)"
        :class="{ active: item.value === currentTab }"
      >
        {{ item.name }}
      </li>
    </ul>

    <div class="tabs-content">
      <div class="item-wrap" v-for="item in tabContent" :key="item.value">
        <div class="wrap" v-if="item.value === currentTab">
          <p>{{ item.name }}</p>
          <button class="btn square-big" @click="goto(item)">
            Перейти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    beforeEach: {
      type: Boolean,
      default: false
    }
  },
  emits: ['popupProps'],
  data() {
    return {
      tabs: [
        { name: 'Торг', value: 1 },
        { name: 'Бюро находок', value: 2 },
        { name: '501(c)(3)', value: 3 }
      ],
      tabContent: [
        {
          name: 'Прозрачность сделки. Рассрочка без процентов. Продавцы и Покупатели, дорожащие репутацией.',
          value: 1,
          link: '/trade'
        },
        {
          name: 'Помощь в поиске. Объявления без регистрации. Возможность анонимного возврата.',
          value: 2,
          link: '/finds'
        },
        {
          name: 'Опора надежды. Прозрачность для нуждающихся в поддержке или спонсорской помощи.',
          value: 3,
          link: '/501'
        }
      ],
      currentTab: 1
    }
  },
  methods: {
    selectTab(item) {
      this.currentTab = item.value
    },
    goto(item) {
      if (this.beforeEach) {
        this.$emit('popupProps', item.link)
      } else {
        this.$router.push(item.link)
      }
    }
  }
}
</script>
