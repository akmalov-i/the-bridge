<template>
  <div v-if="data.length > 0">
    <ul>
      <li v-for="(item, idx) in data" :key="idx">
        <div class="left">
          <div class="avatar">
            <avatarSvg />
          </div>
          <div class="name">
            <h3>{{ item.name }}&nbsp;{{ item.surname.slice(0,1) + '.' }}</h3>
            <a :href="`tel:${item.telephone}`">{{ item.telephone }}</a>
          </div>
        </div>
        <div class="sub-buttons">
          <div
            class="sub-button edit"
            :class="{ active: idx === button }"
            @click="editSub(item, idx)"
          >
            <editSvg />
          </div>
          <div class="sub-button delete" @click="removeSub(item)">
            <deleteSvg />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import avatarSvg from '@/assets/icons/avatar.svg?inline'
import editSvg from '@/assets/icons/edit2.svg?inline'
import deleteSvg from '@/assets/icons/delete.svg?inline'

export default {
  emits: ['update:editing', 'update:button'],
  props: {
    data: {
      type: Array,
      required: true
    },
    button: {
      required: true
    }
  },
  methods: {
    async removeSub(item) {
      try {
        const formData = {
          id: this.$route.params.id,
          subsNP: {
            telephone: item.telephone
          }
        }

        await this.$store.dispatch('user/removeSubsNP', formData)
        this.$message.success('Субзаказчик успешно был удалён')
        this.$emit('update:button', null)
        this.$emit('update:editing', null)
        this.$nuxt.refresh()
      } catch (e) {}
    },
    editSub(item, idx) {
      if (idx === this.button) {
        this.$emit('update:button', null)
        this.$emit('update:editing', null)
      } else {
        this.$emit('update:editing', item)
        this.$emit('update:button', idx)
      }
    }
  },
  components: {
    avatarSvg,
    editSvg,
    deleteSvg
  }
}
</script>

<style lang="scss" scoped>
ul {
  border: 1px solid $light-gray;
  border-radius: 4px;

  li {
    padding: 1.6rem 3.2rem;
    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
      border-bottom: 1px solid $light-gray;
    }
  }

  .left {
    display: flex;
    align-items: center;
    margin-right: 2.4rem;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: $azure;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.8rem;
    }
    svg {
      fill: $blue;
    }
  }

  .name {
    h3 {
      font-weight: 500;
      font-size: 1.4rem;
      margin-bottom: 0.2rem;
    }

    a {
      font-size: 1.2rem;
      color: $gray;
      font-weight: 400;
    }
  }
}

.sub-buttons {
  display: flex;
  align-items: center;
}

.sub-button {
  width: 32px;
  height: 32px;
  border: 1px solid $light-gray;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
  cursor: pointer;

  &:hover,
  &.active {
    border-color: $blue;
    background: $blue;

    svg {
      fill: $white;
    }
  }

  &:last-child {
    &:hover {
      border-color: $coral;
      background: $coral;

      svg {
        fill: $white;
      }
    }
  }

  &:first-child {
    margin-right: 0.8rem;
  }

  svg {
    fill: rgba(125, 125, 125, 0.52);
    width: 16px;
    height: 16px;
    transition: 0.4s;
  }
}
</style>
