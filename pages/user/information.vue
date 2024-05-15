<template>
  <div>
    <div class="bg mb24">
      <userSettingsEdit />
      <userSettingsUpload />
    </div>
    <div class="btn primary mb24">Отправить данные</div>
    <div class="bg mb24">
      <userSettingsLimit />
    </div>
    <div class="bg mb24">
      <userSettingsLevel />
    </div>
    <div class="btn cancel">Удалить аккаунт</div>
  </div>
</template>

<script>
export default {
  layout: 'rsu',
  middleware: ['user-auth'],
  head() {
    return {
      title: `Lavzee | ${this.title}`
    }
  },
  data() {
    return {
      title: 'Личные настройки'
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  background: $white;
  padding: 3.3rem;
  border-radius: 8px;
  width: 100%;
}

.btn.cancel {
  background: $coral;
  color: $white;

  &:hover {
    background: lighten($coral, 4%);
  }
}

.btn.primary {
  color: $white;
  padding: 2rem 0;
  font-family: 'Roboto', sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
}
</style>