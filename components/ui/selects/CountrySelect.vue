<template>
  <div class="select" ref="counters" :class="{ focus: isOpen }" @click="open">
    <div class="select-title">
      <slot name="title" />
      <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
    </div>

    <div class="transport-delivery" v-if="isOpen" v-click-outside="close">
      <div class="body">
        <slot name="country" />
        <slot name="city" />
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import ArrowSvg from '@/assets/icons/arrow.svg?inline'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  mounted() {
    const select = document.querySelectorAll('.el-select')
    const cascader = document.querySelectorAll('.el-cascader')

    const target = [...select, ...cascader]
    target.forEach((e) => {
      e.addEventListener('click', () => {
        this.isOpen = false
      })
    })
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    }
  },
  components: {
    ArrowSvg
  }
}
</script>

<style lang="scss" scoped>
.el-icon-arrow-up {
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 0;
  z-index: 2;
  color: #c0c4cc;
  font-size: 14px;
  transform: rotateZ(180deg);
  transition: transform 0.3s;
}

.select-wrap p {
  user-select: none;
}

.select-title {
  color: #606266;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select.focus .el-icon-arrow-up {
  transform: rotateZ(0deg);
}
</style>
