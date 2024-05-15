<template>
  <div>
    <div class="t-row" v-for="(item, idx) in count" :key="idx">
      <input
        type="text"
        class="text-input"
        :placeholder="`Номер телефона (${idx + 2} участник)`"
        maxlength="15"
        v-model="item.value"
        @input="validation(item)"
      />
      <div class="addiction" v-if="idx === 0">
        <button class="btn add-filter center" @click.prevent="addNumber">
          +
        </button>
      </div>
      <div class="addiction" v-else>
        <button class="btn delete center" @click.prevent="removeNumber(idx)">
          <deleteSvg />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import deleteSvg from '@/assets/icons/delete.svg?inline'

export default {
  data() {
    return {
      count: [{ value: '' }]
    }
  },
  methods: {
    addNumber() {
      if (this.count.length !== 4) {
        this.count.push({ value: '' })
      }
      this.$emit('update:updateNumbers', this.count)
    },
    removeNumber(idx) {
      this.count.splice(idx, 1)
    },
    validation(item) {
      const regex = item.value.replace(/\D/g, '')
      if (item.value.length !== 0) {
        item.value = '+' + regex
      }
      this.$emit('update:updateNumbers', this.count)
    }
  },
  components: {
    deleteSvg
  }
}
</script>

<style>
</style>