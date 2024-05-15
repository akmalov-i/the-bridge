<template>
  <div>
    <TheSearch :hint="true" />
    <hr />

    <div class="mode-editing">
      <TheBreadcrumb firstText="Главная" :secondText="title" />
      <div v-if="mode === 'editing'" class="item orange">Редактирование</div>
      <div v-if="mode === 'dublicate'" class="item">Дубликат</div>
    </div>
    <h1 v-show="titleShow" class="text-blue">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    titleShow: {
      type: Boolean,
      required: true
    },
    mode: {
      type: String
    }
  }
}
</script>
