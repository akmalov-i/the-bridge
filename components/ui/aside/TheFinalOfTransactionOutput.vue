<template>
  <div class="final-of-transaction">
    <h2 class="center">
      <span
        v-if="
          (author && feedAuthor && feedExecutor && !feedExecutor.doNotShow) ||
          (!author && feedAuthor && feedExecutor && !feedAuthor.doNotShow)
        "
        >Отзывы:</span
      >
      <span v-else>Мой отзыв:</span>
    </h2>
    <div class="center">
      <SquareSwitch
        class="review-switch mb2"
        :options="squareSwitch"
        :select.sync="button"
        :active.sync="switchSetter"
        v-if="
          (author && feedAuthor && feedExecutor && !feedExecutor.doNotShow) ||
          (!author && feedAuthor && feedExecutor && !feedAuthor.doNotShow)
        "
      />
    </div>
    <!-- if you have 2 feedbacks -->
    <div
      v-if="
        (author && feedAuthor && feedExecutor && !feedExecutor.doNotShow) ||
        (!author && feedAuthor && feedExecutor && !feedAuthor.doNotShow)
      "
    >
      <div
        class="wrap-final-of-transaction"
        v-if="
          (feedAuthor && author && button === 'About me') ||
          (feedAuthor &&
            !author &&
            button === 'My review' &&
            !feedAuthor.doNotShow)
        "
      >
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
              <div class="avatar-img">
                <nuxt-img
                  :src="'avatars' + authorData[0].imageUrl"
                  preset="offer"
                  v-if="authorData[0].imageUrl"
                />
                <AvatarSvg v-else />
              </div>
            </div>
            <div class="status">
              <p>{{ authorData[0].name }} {{ authorData[0].surname }}</p>
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
          </nuxt-link>
        </div>

        <div class="start recommendation-wrap">
          <div
            class="recommend center"
            :class="{ active: feedExecutor.recommend }"
          >
            <p>Рекомендую</p>
            <fingerSvg />
          </div>

          <div
            class="not-recommend center"
            :class="{ active: !feedExecutor.recommend }"
          >
            <p>Не рекомендую</p>
            <fingerSvg />
          </div>
        </div>

        <div class="text" v-if="feedExecutor.textarea">
          {{ feedExecutor.textarea }}
        </div>
        <div class="item space-between">
          <p>Пунктуальность</p>
          <el-rate
            v-model="feedExecutor.punctuality"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Качество работы</p>
          <el-rate
            v-model="feedExecutor.quality"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Оперативность</p>
          <el-rate
            v-model="feedExecutor.efficiency"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Опрятность</p>
          <el-rate
            v-model="feedExecutor.neatness"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Честность</p>
          <el-rate
            v-model="feedExecutor.honesty"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
      </div>

      <div
        class="wrap-final-of-transaction"
        v-if="
          (feedExecutor && !author && button === 'About me') ||
          (feedExecutor &&
            author &&
            button === 'My review' &&
            !feedExecutor.doNotShow)
        "
      >
        <div class="author start">
          <nuxt-link
            target="_blank"
            :to="`/user/${executorData[0]._id}`"
            class="start pointer"
          >
            <div class="avatar center">
              <div class="avatar__level">
                <userTimeSvg style="width: 30px" />
              </div>
              <div class="avatar-img">
                <nuxt-img
                  :src="'avatars' + executorData[0].imageUrl"
                  preset="offer"
                  v-if="executorData[0].imageUrl"
                />
                <AvatarSvg v-else />
              </div>
            </div>
            <div class="status">
              <p>{{ executorData[0].name }} {{ executorData[0].surname }}</p>
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
          </nuxt-link>
        </div>

        <div class="start recommendation-wrap">
          <div
            class="recommend center"
            :class="{ active: feedAuthor.recommend }"
          >
            <p>Рекомендую</p>
            <fingerSvg />
          </div>

          <div
            class="not-recommend center"
            :class="{ active: !feedAuthor.recommend }"
          >
            <p>Не рекомендую</p>
            <fingerSvg />
          </div>
        </div>

        <div class="text" v-if="feedAuthor.textarea">
          {{ feedAuthor.textarea }}
        </div>
        <div class="item space-between">
          <p>Пунктуальность</p>
          <el-rate
            v-model="feedAuthor.punctuality"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Качество работы</p>
          <el-rate
            v-model="feedAuthor.quality"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Оперативность</p>
          <el-rate
            v-model="feedAuthor.efficiency"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Опрятность</p>
          <el-rate
            v-model="feedAuthor.neatness"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Честность</p>
          <el-rate
            v-model="feedAuthor.honesty"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
      </div>
    </div>

    <!-- if you have 1 feedback -->
    <div v-else>
      <div
        class="wrap-final-of-transaction"
        v-if="
          (feedAuthor && author && button === 'About me') ||
          (feedAuthor &&
            !author &&
            button === 'My review' &&
            !feedAuthor.doNotShow)
        "
      >
        <div class="author start">
          <nuxt-link
            target="_blank"
            :to="`/user/${executorData[0]._id}`"
            class="start pointer"
          >
            <div class="avatar center">
              <div class="avatar__level">
                <userTimeSvg style="width: 30px" />
              </div>
              <div class="avatar-img">
                <nuxt-img
                  :src="'avatars' + executorData[0].imageUrl"
                  preset="offer"
                  v-if="executorData[0].imageUrl"
                />
                <AvatarSvg v-else />
              </div>
            </div>
            <div class="status">
              <p>{{ executorData[0].name }} {{ executorData[0].surname }}</p>
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
          </nuxt-link>
        </div>

        <div class="start recommendation-wrap">
          <div
            class="recommend center"
            :class="{ active: feedAuthor.recommend }"
          >
            <p>Рекомендую</p>
            <fingerSvg />
          </div>

          <div
            class="not-recommend center"
            :class="{ active: !feedAuthor.recommend }"
          >
            <p>Не рекомендую</p>
            <fingerSvg />
          </div>
        </div>

        <div class="text" v-if="feedAuthor.textarea">
          {{ feedAuthor.textarea }}
        </div>
        <div class="item space-between">
          <p>Пунктуальность</p>
          <el-rate
            v-model="feedAuthor.punctuality"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Качество работы</p>
          <el-rate
            v-model="feedAuthor.quality"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Оперативность</p>
          <el-rate
            v-model="feedAuthor.efficiency"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Опрятность</p>
          <el-rate
            v-model="feedAuthor.neatness"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Честность</p>
          <el-rate
            v-model="feedAuthor.honesty"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
      </div>
      <div
        class="wrap-final-of-transaction"
        v-if="
          (feedExecutor && !author && button === 'About me') ||
          (feedExecutor &&
            author &&
            button === 'My review' &&
            !feedExecutor.doNotShow)
        "
      >
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
              <div class="avatar-img">
                <nuxt-img
                  :src="'avatars' + authorData[0].imageUrl"
                  preset="offer"
                  v-if="authorData[0].imageUrl"
                />
                <AvatarSvg v-else />
              </div>
            </div>
            <div class="status">
              <p>{{ authorData[0].name }} {{ authorData[0].surname }}</p>
              <el-rate
                v-model="data.status.statusAuthor.stars"
                disabled
                disabled-void-color="#7d7d7d75"
                class="stars"
                :max="5"
                :colors="['#1374F6', '#1374F6', '#1374F6']"
              >
              </el-rate></div
          ></nuxt-link>
        </div>

        <div class="start recommendation-wrap">
          <div
            class="recommend center"
            :class="{ active: feedExecutor.recommend }"
          >
            <p>Рекомендую</p>
            <fingerSvg />
          </div>

          <div
            class="not-recommend center"
            :class="{ active: !feedExecutor.recommend }"
          >
            <p>Не рекомендую</p>
            <fingerSvg />
          </div>
        </div>

        <div class="text" v-if="feedExecutor.textarea">
          {{ feedExecutor.textarea }}
        </div>
        <div class="item space-between">
          <p>Пунктуальность</p>
          <el-rate
            v-model="feedExecutor.punctuality"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Качество работы</p>
          <el-rate
            v-model="feedExecutor.quality"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Оперативность</p>
          <el-rate
            v-model="feedExecutor.efficiency"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Опрятность</p>
          <el-rate
            v-model="feedExecutor.neatness"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
        <div class="item space-between">
          <p>Честность</p>
          <el-rate
            v-model="feedExecutor.honesty"
            disabled
            disabled-void-color="#7d7d7d75"
            :colors="['#1374F6', '#1374F6', '#1374F6']"
            :max="5"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fingerSvg from '@/assets/emoji/finger.svg?inline'
import AvatarSvg from '@/assets/icons/avatar.svg?inline'
import userTimeSvg from '@/assets/icons/user-time.svg?inline'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    authorData: {
      type: Array,
      required: true
    },
    executorData: {
      type: Array,
      required: true
    },
    author: {
      type: Boolean,
      required: true
    }
  },
  async fetch() {
    const config = {
      params: {
        authorId: this.data.author,
        executorId: this.data.executor
      }
    }
    try {
      const feeds = await this.$store.dispatch('feedback/postFeeds', config)
      this.feedAuthor = feeds.feedAuthor
      this.feedExecutor = feeds.feedExecutor
      if (
        (this.author &&
          this.feedAuthor &&
          this.feedExecutor &&
          !this.feedExecutor.doNotShow) ||
        (!this.author &&
          this.feedAuthor &&
          this.feedExecutor &&
          !this.feedAuthor.doNotShow)
      ) {
        this.button = 'My review'
        this.switchSetter = 1
      }
    } catch (e) {}
  },
  data() {
    return {
      feedAuthor: null,
      feedExecutor: null,
      button: 'About me',
      switchSetter: 1,
      squareSwitch: [
        {
          label: 'Обо мне',
          value: 'About me'
        },
        {
          label: 'Мой отзыв',
          value: 'My review'
        }
      ]
    }
  },
  methods: {
    setRecommendation(set) {
      this.recommend = set
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
.final-of-transaction {
  .review-switch {
    height: 44px;
    width: 300px;
  }
}

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
    transition: 0.4s;

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

  .text {
    word-break: break-word;
    background: $white;
    border-radius: 4px;
    padding: 1.6rem 1.2rem;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 1.4rem;
    line-height: 170%;
    margin-bottom: 1.6rem;
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
