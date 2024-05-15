<template>
  <div class="modal" v-if="status">
    <div class="overlay"></div>
    <div class="popup">
      <div class="cancel" @click="$emit('update:status', false)">
        <cancelSvg />
      </div>
      <div class="popup__head">
        <h3 class="mb3">Дополнительная информация</h3>
        <hr />
        <div class="content">
          <div class="slot">
            <div class="icon">
              <geoSvg />
            </div>
            <p>{{ data.fromCity.label }}</p>
          </div>
          <div class="slot">
            <div class="icon">
              <phoneSvg />
            </div>
            <p>{{ data.telephone }}</p>
          </div>
          <div class="slot">
            <div class="icon">
              <mailSvg />
            </div>
            <p>{{ data.email }}</p>
          </div>
          <div class="slot">
            <div class="icon">
              <expSvg />
            </div>
            <p>{{ data.exp.label }}</p>
          </div>
          <div class="slot" v-if="data.langs.length > 0">
            <div class="icon">
              <langSvg />
            </div>
            <div class="detail-column">
              <p v-for="(item, idx) in data.langs" :key="item.value">
                {{ item.label }}<span v-if="idx != data.profession.length - 1">,&#160;</span>
              </p>
            </div>
          </div>
          <div class="slot" v-if="data.profession.length > 0">
            <div class="icon">
              <skillsSvg />
            </div>
            <div class="detail-column">
              <p v-for="(item, idx) in data.profession" :key="item.value">
                {{ item.label }}<span v-if="idx != data.profession.length - 1">,&#160;</span>
              </p>
            </div>
          </div>
          <div class="slot">
            <div class="icon">
              <carSvg />
            </div>
            <p>{{ data.car.label }}</p>
          </div>
          <div class="slot">
            <div class="icon">
              <toolsSvg />
            </div>
            <p>{{ data.tools.label }}</p>
          </div>
        </div>
        <hr />
        <div class="left mb2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import cancelSvg from '@/assets/icons/x.svg?inline'
import geoSvg from '@/assets/icons/adds/geo.svg?inline'
import toolsSvg from '@/assets/icons/adds/tools.svg?inline'
import carSvg from '@/assets/icons/adds/car.svg?inline'
import langSvg from '@/assets/icons/adds/lang.svg?inline'
import expSvg from '@/assets/icons/adds/exp.svg?inline'
import mailSvg from '@/assets/icons/adds/mail.svg?inline'
import phoneSvg from '@/assets/icons/adds/phone.svg?inline'
import skillsSvg from '@/assets/icons/adds/skills.svg?inline'

export default {
  props: {
    status: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {},
  components: {
    cancelSvg,
    geoSvg,
    toolsSvg,
    carSvg,
    langSvg,
    expSvg,
    mailSvg,
    phoneSvg,
    skillsSvg
  }
}
</script>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;

  .detail-column {
    display: flex;
    flex-wrap: wrap;
  }

  .content {
    height: 315px;
    overflow: auto;

    .slot {
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0.8rem 1.6rem;
      background: $azure;
      min-height: 56px;
      width: 100%;
      margin-bottom: 0.8rem;

      .icon {
        min-height: 40px;
        min-width: 40px;
        width: 40px;
        height: 40px;
        background: $blue;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 3.2rem;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          right: -1.6rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 24px;
          background: $light-gray;
        }
      }

      p {
        line-height: 130%;
        font-weight: 400;
        font-size: 14px;
      }
    }
  }

  hr {
    margin-top: 2rem;
    margin-bottom: 2rem;
    height: 1px;
    opacity: 0.5;
    background: $light-gray;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.8;
    }
  }

  @keyframes up {
    0% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .select-wrap.select-drop {
    .drop-p {
      position: relative;
      left: 0;
      font-size: 1.4rem;
    }
    .select {
      width: 100%;
      background: #f0f0ff;
      border: 1px solid rgba(19, 116, 246, 0.32);
      color: #161616;
      border-radius: 4px;
      height: 51px;
    }
  }

  .cancel {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px $azure solid;
    background: $white;
    z-index: 3;
    transition: 0.4s;

    &:hover {
      background: $azure;
    }

    svg {
      fill: $blue;
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: $black;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    animation: fadeIn 0.7s forwards;
  }

  .popup {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 390px;
    z-index: 1;
    background: $white;
    border-radius: 8px;
    padding: 8.8rem 3.2rem 3.2rem;
    margin: 2rem;
    animation: up 0.7s forwards;

    .select-drop {
      position: relative;
      z-index: 1999;
    }

    h3 {
      font-weight: 500;
      font-size: 2rem;
      color: $black;
    }

    .left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
}
</style>
