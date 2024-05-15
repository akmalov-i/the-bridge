<template>
  <div class="pro-wrap">
    <p>
      {{ title }} <span v-if="showMaxNumber">(максимум {{ maxNumber }})</span>
    </p>
    <!-- выбранный список -->
    <ul>
      <li
        class="selected"
        v-for="(item, idx) in selectedList"
        :key="item.value"
        @click="deleteSelected(item, idx)"
      >
        {{ item.label }}
        <span>&#10006;</span>
      </li>
      <div
        class="pro-open"
        :class="{ disabled: count == maxNumber }"
        @click="openDrop"
      >
        <equalizerSvg />
      </div>
    </ul>
    <!-- весь список -->
    <ul
      class="drop"
      :class="{ disabled: count == maxNumber }"
      v-if="isDropOpen"
      v-click-outside="hideDrop"
    >
      <li
        v-for="item in wholeList"
        :key="item.value"
        @click="throwItem(item)"
        :class="{
          disabled: selectedList.find((element) => element.value === item.value)
        }"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
import equalizerSvg from 'assets/icons/equalizer.svg?inline'
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  emits: ['addSelect', 'deleteSelected'],
  props: {
    selectedList: {
      type: Array,
      required: true
    },
    wholeList: {
      type: Array,
      required: true
    },
    maxNumber: {
      type: Number,
      default: 3
    },
    showMaxNumber: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isDropOpen: false,
      count: 0
    }
  },
  methods: {
    hideDrop() {
      this.isDropOpen = false
    },
    openDrop() {
      if (this.count != this.maxNumber) {
        this.isDropOpen = true
      }
    },
    throwItem(item) {
      this.$emit('addSelect', item)
      const found = this.wholeList.find((i) => i.value === item.value)
      found.disabled = true
      this.count++
      if (this.count == this.maxNumber) {
        this.hideDrop()
      }
    },
    deleteSelected(item, idx) {
      this.$emit('deleteSelected', item, idx)
      const found = this.wholeList.find((i) => i.value === item.value)
      found.disabled = false
      this.count--
    }
  },
  components: {
    equalizerSvg
  }
}
</script>

<style lang="scss" scoped>
.pro-wrap {
  position: relative;

  .selected {
    user-select: none;
  }
}

p {
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  color: $gray;
  font-weight: 400;
}

ul {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  min-height: 46px;
  background: $azure;
  list-style: none;
  z-index: 10;
  padding: 0.9rem 3rem 0 1.6rem;
  border: 1px solid rgba(19, 116, 246, 0.32);
  border-radius: 4px;
  position: relative;

  svg {
    position: absolute;
    right: 1.6rem;
    top: 1.1rem;
    cursor: pointer;
    z-index: 10;
  }

  li {
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0.6rem 0.8rem;
    color: $black;
    background: $white;
    border-radius: 4px;
    margin-right: 1.2rem;
    margin-bottom: 0.9rem;
    transition: 0.4s;
    cursor: pointer;

    span {
      font-size: 1rem;
    }

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      background: $black;
      color: $white;
    }
  }

  &.drop {
    padding: 2rem 3rem 0 2rem;
    background: $white;
    position: absolute;
    border: none;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    top: 110%;

    &.disabled {
      user-select: none;
      pointer-events: none;
    }

    li {
      border: 1px solid rgba(125, 125, 125, 0.52);
      color: rgba(125, 125, 125, 0.52);
      background: $white;
      margin-right: 2rem;
      margin-bottom: 2rem;
      transition: 0.4s;

      &.disabled {
        background: $black;
        color: $white;
        border-color: $black;
        user-select: none;
        pointer-events: none;
      }

      &:hover {
        cursor: pointer;
        background: $blue;
        color: $white;
        border-color: $blue;
      }
    }
  }
}

.pro-open {
  transition: 0.4s;

  &.disabled {
    opacity: 0.4;
    user-select: none;
    pointer-events: none;
  }
}
</style>
