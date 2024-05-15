<template>
  <el-menu router :default-active="$route.path">
    <el-menu-item index="/admin">
      <div class="left start">
        <div class="cookie">
          <cookieSvg />
        </div>
        Транзакции
        <span class="center ml08" v-if="application > 0">{{
          application
        }}</span>
      </div>
      <div class="arrow">
        <arrowSvg />
      </div>
    </el-menu-item>
    <el-menu-item index="/admin/users">
      <div class="left start">
        <div class="cookie">
          <cookieSvg />
        </div>
        Пользователи
        <span class="center ml08" v-if="usersCount > 0">{{ usersCount }}</span>
      </div>
      <div class="arrow">
        <arrowSvg />
      </div>
    </el-menu-item>
    <el-menu-item index="/admin/auths">
      <div class="left start">
        <div class="cookie">
          <cookieSvg />
        </div>
        Заявки на регистрацию
        <span class="center ml08" v-if="false">4</span>
      </div>
      <div class="arrow">
        <arrowSvg />
      </div>
    </el-menu-item>
    <el-menu-item index="/admin/docs">
      <div class="left start">
        <div class="cookie">
          <cookieSvg />
        </div>
        Документы
        <span class="center ml08" v-if="false">12</span>
      </div>
      <div class="arrow">
        <arrowSvg />
      </div>
    </el-menu-item>
    <div class="mb5">
      <el-menu-item index="/admin/invite">
        <div class="left start">
          <div class="cookie">
            <cookieSvg />
          </div>
          Новое приглашение
          <span class="center ml08" v-if="false">12</span>
        </div>
        <div class="arrow">
          <arrowSvg />
        </div>
      </el-menu-item>
    </div>
    <el-menu-item index="/admin/experience">
      <div class="left start">
        <div class="cookie">
          <cookieSvg />
        </div>
        Опыты
        <span class="center ml08" v-if="expCount > 0">{{ expCount }}</span>
      </div>
      <div class="arrow">
        <arrowSvg />
      </div>
    </el-menu-item>
    <el-menu-item index="/admin/501">
      <div class="left start">
        <div class="cookie">
          <cookieSvg />
        </div>
        Новая публикация 501(с)(3)
        <span class="center ml08" v-if="false">12</span>
      </div>
      <div class="arrow">
        <arrowSvg />
      </div>
    </el-menu-item>
  </el-menu>
</template>

<script>
import cookieSvg from 'assets/icons/cookie.svg?inline'
import arrowSvg from 'assets/icons/arrow.svg?inline'

export default {
  async fetch() {
    const application = await this.$store.dispatch('admin/aside')
    this.application = application.count
    this.usersCount = application.usersCount
    this.expCount = application.expCount
  },
  data() {
    return {
      usersCount: 0,
      application: 0,
      expCount: 0
    }
  },
  components: {
    cookieSvg,
    arrowSvg
  }
}
</script>

<style lang="scss" scoped>
.cookie {
  svg {
    fill: $gray;
    transition: 0.4s;
    margin-right: 0.6rem;
    opacity: 0.8;
  }
}

ul {
  border: none;
  background: transparent;
}

.left {
  display: flex;

  span {
    background: $coral;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 1.2rem;
    color: $white;
  }
}

.el-menu-item {
  height: 50px;
}

.arrow {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: $orange;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-90deg);
  transition: 0.4s;
  opacity: 0;

  svg {
    fill: $white;
  }
}

li {
  color: rgba(125, 125, 125, 0.72);
  height: unset;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background: $white;
}

.el-menu .el-menu-item:not(:last-child) {
  border-bottom: none;
  margin-bottom: 0.8rem;
}

.el-menu .el-menu-item.is-active {
  background: $blue;
  color: $white;

  svg {
    fill: $white;
    opacity: 1;
  }
  .arrow {
    opacity: 1;
  }
}

.el-menu .el-menu-item:hover {
  background: $blue;
  color: $white;

  svg {
    fill: $white;
    opacity: 1;
  }
  .arrow {
    opacity: 1;
  }
}
</style>
