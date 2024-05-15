<template>
  <div class="budget-custom">
    <p>{{ title }}</p>
    <input
      v-if="!budgetPreview"
      type="text"
      class="left"
      v-model="number"
      @input="validate"
      maxlength="9"
      placeholder="Сумма"
    />
    <div class="left" v-else>
      {{ budgetPreview }}
    </div>

    <span class="line"></span>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    budget: String,
    budgetPreview: String,
    options: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.number = this.budget
  },
  data() {
    return {
      number: null
    }
  },
  methods: {
    validate: function () {
      this.number = this.number.replace(/\D/g, '')
      return this.$emit('update:updateBudget', this.number)
    }
  },
  watch: {
    budget(val) {
      if(val === null) {
        this.number = null
      }
    }
  }
}
</script>
