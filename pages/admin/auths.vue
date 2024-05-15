<template>
  <div class="admin-wrap">
    <div class="space-between">
      <button class="btn mr3 cancel">Отклонить</button>
      <button class="btn mr3 blu">Требуется доп. инфо</button>
      <button class="btn green">Одобрить</button>
    </div>
    <div class="invite-content preview">
      <div class="preview-title">
        <h2>{{ title }}</h2>
      </div>

      <div class="preview-textarea grid mb2">
        Требовании и обязанности: - Установка и обслуживание компьютерной и
        офисной техники, оргтехники. - Установка, настройка и обновление
        офисного и прикладного
      </div>

      <div class="grid3 mb2">
        <div class="settings-input mr3 no-select">
          <label for="name">Имя</label>
          <input type="text" id="name" value="Тимурхан" />
        </div>
        <div class="settings-input mr3 no-select">
          <label for="name">Фамилия</label>
          <input type="text" id="name" value="Абдуллаев" />
        </div>
        <div class="settings-input no-select">
          <label for="name">Дата рождения</label>
          <input type="text" id="name" value="29.11.2021" />
        </div>
      </div>
      <div class="grid3 mb2">
        <div class="settings-input mr3 no-select">
          <label for="name">Город проживания</label>
          <input type="text" id="name" value="Бухара" />
        </div>
        <div class="settings-input mr3 no-select">
          <label for="name">Номер телефона</label>
          <input type="text" id="name" value="+998946581143" />
        </div>
        <div class="settings-input no-select">
          <label for="name">E-mail</label>
          <input type="text" id="name" value="may_name@yahoo.com" />
        </div>
      </div>
      <div class="grid3 mb2">
        <div class="settings-input mr3 no-select">
          <label for="name">Пользователь</label>
          <input type="text" id="name" value="Исполнитель" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head() {
    return {
      title: 'Lavzee | ' + this.title
    }
  },
  data() {
    return {
      title: 'Приглашение на Регистрацию'
    }
  },
  components: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.admin-wrap {
  background: $white;
  width: 100%;
  border-radius: 8px;
  padding: 2.4rem;
}

.settings-input {
  input {
    background: transparent;
    border: 1px solid rgba(125, 125, 125, 0.32);
  }
}
</style>