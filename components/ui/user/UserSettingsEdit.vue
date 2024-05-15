<template>
  <div>
    <div class="grid2 space-between mb2">
      <div class="settings-input mr3">
        <label for="name">Имя</label>
        <input
          type="text"
          id="name"
          placeholder="Ваш имя"
          maxlength="25"
          v-model="name"
          @input="accept('name')"
        />
      </div>
      <div class="settings-input">
        <label for="lastname">Фамилия</label>
        <input
          type="text"
          id="lastname"
          placeholder="Ваша фамилия"
          maxlength="25"
          v-model="lastname"
          @input="accept('lastname')"
        />
      </div>
    </div>
    <div class="grid2 space-between">
      <div class="settings-input mr3">
        <label for="userID">User ID</label>
        <input
          type="text"
          id="userID"
          placeholder="Ваш User ID"
          maxlength="20"
          v-model="userID"
          @input="acceptID('userID')"
        />
      </div>
      <div class="settings-input">
        <label for="age">Возраст</label>
        <input
          type="text"
          id="age"
          placeholder="Ваш возраст"
          maxlength="2"
          v-model="age"
          @input="acceptNumber('age')"
        />
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      lastname: '',
      age: '',
      userID: ''
    }
  },
  methods: {
    acceptNumber(item) {
      const regex = this[item].replace(/[^0-9]+/g, '').trim()
      if (this[item].length !== 0) this[item] = regex
    },
    acceptID(item) {
      const regex = this[item].replace(/[^a-zA-Z0-9_]+/g, '').trim()
      if (this[item].length !== 0) this[item] = regex
    },
    accept(item) {
      const regex = this[item].replace(/[^a-zA-ZА-Яа-я]+/g, '').trim()
      let regexWithUpper = ''
      if (regex != 0) {
        regexWithUpper = regex[0].toUpperCase() + regex.slice(1)
      }
      if (this[item].length !== 0) this[item] = regexWithUpper
    }
  }
}
</script>

<style lang="scss" scoped>
hr {
  height: 1px;
  width: 100%;
  background: $light-gray;
  min-width: 200px;
  margin: 2.4rem 0;
}

.grid2 {
  width: 100%;
}
</style>