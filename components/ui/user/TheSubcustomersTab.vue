<template>
  <div>
    <div class="select-tab space-between">
      <div
        class="center tab"
        :class="{ active: activate == 'first' }"
        @click="change('first')"
      >
        Физ.лицо
      </div>
      <div
        class="center tab"
        :class="{ active: activate == 'second' }"
        @click="change('second')"
      >
        Юр.лицо
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  emits: ['active'],
  data() {
    return {
      activate: 'first'
    }
  },
  methods: {
    change(item) {
      this.activate = item
      this.$emit('active', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-tab {
  height: 44px;
  max-width: 25rem;
  min-width: 23rem;
}
</style>