<template>
  <el-form
    ref="form"
    :model="form"
    @submit.native.prevent="onSubmit"
    class="final-of-transaction"
  >
    <h2 class="center">Итоговый отзыв</h2>
    <div class="wrap-final-of-transaction">
      <div class="author start">
        <nuxt-link
          target="_blank"
          :to="`/user/${authorData[0]._id}`"
          class="start pointer"
        >
          <div class="avatar center">
            <div class="avatar__level">
              <userTimeSvg style="width: 30px" />
            </div>
            <div class="avatar-img" v-if="!author">
              <nuxt-img
                :src="'avatars' + authorData[0].imageUrl"
                preset="offer"
                v-if="authorData[0].imageUrl"
              />
              <AvatarSvg v-else />
            </div>
            <div class="avatar-img" v-else>
              <nuxt-img
                :src="'avatars' + executorData[0].imageUrl"
                preset="offer"
                v-if="executorData[0].imageUrl"
              />
              <AvatarSvg v-else />
            </div>
          </div>
          <div class="status">
            <div v-if="!author">
              <p>{{ authorData[0].name }} {{ authorData[0].surname }}</p>
              <el-rate
                v-model="data.status.statusExecutor.stars"
                disabled
                disabled-void-color="#7d7d7d75"
                class="stars"
                :max="5"
                :colors="['#1374F6', '#1374F6', '#1374F6']"
              >
              </el-rate>
            </div>

            <div v-else>
              <p>{{ executorData[0].name }} {{ executorData[0].surname }}</p>
              <el-rate
                v-model="data.status.statusAuthor.stars"
                disabled
                disabled-void-color="#7d7d7d75"
                class="stars"
                :max="5"
                :colors="['#1374F6', '#1374F6', '#1374F6']"
              >
              </el-rate>
            </div>
          </div>
        </nuxt-link>
      </div>

      <div class="start recommendation-wrap">
        <div
          class="recommend center"
          :class="{ active: form.recommend === 'yes' }"
          @click="setRecommendation('yes')"
        >
          <p>Рекомендую</p>
          <fingerSvg />
        </div>

        <div
          class="not-recommend center"
          :class="{ active: form.recommend === 'no' }"
          @click="setRecommendation('no')"
        >
          <p>Не рекомендую</p>
          <fingerSvg />
        </div>
      </div>

      <div class="item space-between">
        <p>Пунктуальность</p>
        <el-rate
          v-model="form.punctuality"
          disabled-void-color="#7d7d7d75"
          :colors="['#1374F6', '#1374F6', '#1374F6']"
          :max="5"
        />
      </div>
      <div class="item space-between">
        <p>Качество работы</p>
        <el-rate
          v-model="form.quality"
          disabled-void-color="#7d7d7d75"
          :colors="['#1374F6', '#1374F6', '#1374F6']"
          :max="5"
        />
      </div>
      <div class="item space-between">
        <p>Оперативность</p>
        <el-rate
          v-model="form.efficiency"
          disabled-void-color="#7d7d7d75"
          :colors="['#1374F6', '#1374F6', '#1374F6']"
          :max="5"
        />
      </div>
      <div class="item space-between">
        <p>Опрятность</p>
        <el-rate
          v-model="form.neatness"
          disabled-void-color="#7d7d7d75"
          :colors="['#1374F6', '#1374F6', '#1374F6']"
          :max="5"
        />
      </div>
      <div class="item space-between">
        <p>Честность</p>
        <el-rate
          v-model="form.honesty"
          disabled-void-color="#7d7d7d75"
          :colors="['#1374F6', '#1374F6', '#1374F6']"
          :max="5"
        />
      </div>
    </div>
    <el-form-item prop="textarea">
      <el-input
        v-model="form.textarea"
        type="textarea"
        placeholder="Напишите отзыв..."
        show-word-limit
        class="main-textarea"
        maxlength="500"
        resize="none"
      />
    </el-form-item>
    <div class="start">
      <el-checkbox
        v-model="form.doNotShow"
        label="Не показывать"
        size="large"
      />
    </div>
    <el-button
      type="primary"
      class="btn send"
      native-type="submit"
      :loading="loading"
    >
      Отправить
    </el-button>
  </el-form>
</template>

<script>
import fingerSvg from '@/assets/emoji/finger.svg?inline'
import AvatarSvg from '@/assets/icons/avatar.svg?inline'
import userTimeSvg from '@/assets/icons/user-time.svg?inline'

export default {
  emits: ['created'],
  props: {
    data: {
      type: Object,
      required: true
    },
    authorData: {
      required: true
    },
    executorData: {
      required: true
    },
    author: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        textarea: '',
        recommend: null,
        punctuality: null,
        quality: null,
        efficiency: null,
        neatness: null,
        honesty: null,
        doNotShow: false
      },
      loading: false
    }
  },
  methods: {
    setRecommendation(set) {
      this.form.recommend = set
    },
    onSubmit() {
      if (this.form.recommend === null) {
        return this.$message.warning({
          showClose: true,
          message: 'Выберите "Рекомендую" либо "Не рекомендую"!'
        })
      }
      if (!this.form.recommend || this.form.recommend === 'no') {
        if (this.form.textarea.length < 1) {
          return this.$message.warning({
            showClose: true,
            message: 'Объяснить причину не рекомендации в отзывах!'
          })
        }
        if (this.form.textarea.length < 10) {
          return this.$message.warning({
            showClose: true,
            message:
              'Напишите по подробнее, на поле не должно быть меньше 10 символов!'
          })
        }
      }

      let count = 0
      if (this.form.punctuality != 0) count++
      if (this.form.quality != 0) count++
      if (this.form.efficiency != 0) count++
      if (this.form.neatness != 0) count++
      if (this.form.honesty != 0) count++

      if (count < 2) {
        return this.$message.warning({
          showClose: true,
          message: 'Минимум 2 категории для отзыва!'
        })
      }

      let res = {
        punctuality: this.form.punctuality,
        quality: this.form.quality,
        efficiency: this.form.efficiency,
        neatness: this.form.neatness,
        honesty: this.form.honesty
      }
      let val = Object.values(res)
      val = val.filter((num) => num != 0)

      if (
        Math.min(...val) <= 3 &&
        this.form.textarea.length < 10 &&
        this.form.recommend === 'no'
      ) {
        return this.$message.warning({
          showClose: true,
          message:
            'Объяснить причину низкой оценки в отзывах! (минимум 10 символов)'
        })
      }

      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            executorId: this.data.executorId,
            authorId: this.data.authorId,
            textarea: this.form.textarea,
            doNotShow: this.form.doNotShow,
            postId: this.data.postId,
            from: this.data.userId,
            to: this.author ? this.data.executorId : this.data.authorId,
            punctuality: this.form.punctuality == 0 ? 5 : this.form.punctuality,
            quality: this.form.quality == 0 ? 5 : this.form.quality,
            efficiency: this.form.efficiency == 0 ? 5 : this.form.efficiency,
            neatness: this.form.neatness == 0 ? 5 : this.form.neatness,
            honesty: this.form.honesty == 0 ? 5 : this.form.honesty,
            recommend: this.form.recommend,
            author: this.author
          }

          try {
            const newFeedback = await this.$store.dispatch(
              'feedback/create',
              formData
            )
            this.$emit('created', newFeedback)
            this.loading = false
            this.$message.success({
              showClose: true,
              message: 'Отзыв отправлен!'
            })
            this.$nuxt.refresh()
          } catch (e) {}
        }
      })
    }
  },
  components: {
    fingerSvg,
    AvatarSvg,
    userTimeSvg
  }
}
</script>

<style lang="scss" scoped>
.wrap-final-of-transaction {
  background: $azure;
  border-radius: 4px;
  padding: 3.2rem 2.4rem;
  position: relative;

  .recommendation-wrap {
    margin-bottom: 2.8rem;
  }

  .recommend {
    margin-right: 0.9rem;
    svg {
      transform: rotate(180deg);
    }
  }

  .recommend,
  .not-recommend {
    background: rgba(0, 0, 0, 0.75);
    padding: 0.8rem 1.6rem;
    border-radius: 24px;
    cursor: pointer;
    transition: 0.4s;

    &:hover,
    &.active {
      background: $blue;
    }

    p {
      margin-right: 0.4rem;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 1.2rem;
      color: $white;
    }
  }

  p {
    font-size: 1.4rem;
    color: $black;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
  }

  .item {
    background: $white;
    height: 50px;
    width: 100%;
    border-radius: 8px;
    padding: 1.2rem;
    padding-left: 1.6rem;
    padding-right: 3.4rem;
    position: relative;
    margin-bottom: 0.4rem;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      right: 50%;
      height: 28px;
      width: 1px;
      background: #e5e5e5;
    }
  }
}
.author {
  margin-bottom: 1.6rem;
  font-weight: 500;
  font-size: 1.6rem;
  color: $black;
  position: relative;

  .status p {
    font-size: 1.8rem;
  }

  .avatar {
    background: $blue;
    width: 56px;
    height: 56px;
    border-radius: 12px;
    margin-right: 1.2rem;
    position: relative;

    &-img {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: 12px;
    }

    &__level {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: $blue;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: $white;
      font-size: 1.6rem;
      border: 1px solid $white;

      svg {
        width: 10px;
        height: 10px;
      }
    }
  }

  svg {
    fill: $white;
  }
}
</style>
