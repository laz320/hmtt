<template>
  <div>
    <!-- 二十七 fixed定位 -->
    <van-nav-bar fixed>
      <template #title>
        <van-button type="info" icon="search" class="search-btn">
          搜素
        </van-button>
      </template>
    </van-nav-bar>
    <!-- animated 动画效果 -->
    <van-tabs v-model="active" animated>
      <!-- 二十四 单元格
      <van-cell-group>
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group> -->
      <!-- 二十三 v-for-->
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 二十九 父向子传值 -->
        <ArticleList :id="item.id"></ArticleList
      ></van-tab>
      <!-- <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
      <van-tab title="标签 6">内容 6</van-tab> -->
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>

        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      :style="{ height: '100%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <!-- 父向子传值 -->
      <!-- 3333 -->
      <ChannelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from './components/ChannelPanel.vue'

// 二十六 引入
import ArticleList from '@/components/ArticleList.vue'
// 二十
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
// 设置变量
const CHANNELS = 'CHANNELS'

export default {
  // 十九
  name: 'Home',
  created () {
    // 二十
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      // 二十二
      channels: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    // 二十一
    // 1、没有登录第一次打开app，本地存储没有， 只能发送ajax请求
    // 2、没有登录，但是第二次打开，有可能修改过 这样的话本地存储就有值，就去本地存储拿
    // 3、有登录就发送ajax拿
    async getMyChannels () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          console.log('res', res)
          // 二十三
          this.channels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},

  filters: {},
  components: {
    // 二十六 注册
    ArticleList,
    ChannelPanel
  }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  // opacity: 0.2;
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  //  unset 把本来设置的样式去掉
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  // height: 6px;
  background-color: #3296fa;
}
.menu {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
  // position: fixed;
  // right: 0;
}
/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
