<template>
  <div>
    <div class="channel_container">
      <div class="title">
        <h3>我的频道</h3>
        <!-- 22222 -->
        <van-button
          size="small"
          plain
          type="danger"
          round
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <!-- v-for数据的循环渲染  :style="{}添加样式的动态绑定 -->
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <!-- 3333 -->
          <div
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
            @click="onClick(index)"
          >
            {{ item.name }}
            <!-- 22222 -->
            <van-icon
              v-show="isCloseShow"
              name="close"
              v-if="index !== 0"
            /></div
        ></van-col>
      </van-row>
    </div>
    <div class="channel_container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id">
          <!-- 4444 van-ellipsis内置样式-->
          <div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div></van-col
        >
        <!-- <van-col span="6"><div class="inner">123</div></van-col>
        <van-col span="6"><div class="inner">123</div></van-col>
        <van-col span="6"><div class="inner">123</div></van-col>
        <van-col span="6"><div class="inner">123</div></van-col>
        <van-col span="6"><div class="inner">123</div></van-col>
        <van-col span="6"><div class="inner">123</div></van-col> -->
      </van-row>
    </div>
  </div>
</template>

<script>
// lllll
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  // lllll
  name: 'ChannelPanel',
  // 父向子传值的接收
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  // lllll
  async created () {
    try {
      const res = await getAllArticleList()
      console.log(res)
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      // lllll
      recommendChannels: [],
      // 22222
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      // 根据id找到当前的点击的索引
      const index = this.recommendChannels.findIndex(item => item.id === id)
      // 根据索引把当前点击的这一项添加到recommendChannels数组中
      this.channels.push(this.recommendChannels[index])
      // 根据索引  splice移除当前点击的那一项
      this.recommendChannels.splice(index, 1)
    },
    // 3333 子向父传值
    onClick (index) {
      if (this.isCloseShow) {
        // 推荐不能删除 需排除
        if (index === 0) return
        // 4444 删除
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.recommendChannels.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 切换高亮active
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler (newVal) {
        const arr = []
        if (this.$store.state.user && this.$store.state.user.token) {
          // 登录过
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          //
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel_container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 16px;
    h3 {
      font-size: 32px;
      font-weight: 400;
      color: #333333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
    }
  }
  .inner {
    width: 160px;
    height: 86px;
    background: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    font-weight: 400;
    color: #222222;
    text-align: center;
    line-height: 86px;
    margin-left: 14px;
    margin-top: 22px;
    position: relative;
    .van-icon-close {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
    }
  }
}
</style>
