<template>
  <div>
    <!-- 三 头部样式 -->
    <!-- 登录成功后 -->
    <!-- 四 判断tokan值 v-if  v-else-->
    <!-- <div
      class="header header-login"
      v-if="$store.state.user && $store.state.user.token"
    > -->

    <!-- // 五 用辅助函数简化 判断tokan值 v-if  v-else -->
    <div class="header header-login" v-if="user && user.token">
      <!-- 头像 -->
      <div class="avatar">
        <div class="left">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
          />
          <!-- 十四 -->
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button" @click="$router.push('/user')">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>8</p>
          <!-- <p>{{userInfo.art_count}}</p> -->
          <p>头条</p>
        </li>
        <li>
          <p>66</p>
          <p>关注</p>
        </li>
        <li>
          <p>88</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>88</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 未登录 -->
    <!-- 六 点击绑定事件 -->
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <!-- Grid 宫格 -->
    <!-- 用插槽的方式自定义图标 先单标签变双标签 -->
    <van-grid :column-num="2">
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell-group
      ><van-cell title="消息通知" is-link /> <van-cell title="小智同学" is-link
    /></van-cell-group>
    <!-- 退出按钮 -->
    <!-- <van-button
      class="logout"
      type="default"
      block
      v-if="$store.state.user && $store.state.user.token"
      >退出登录</van-button
    > -->
    <!-- // 五 用辅助函数简化 判断tokan值 v-if  v-else -->

    <!-- 八 绑定点击事件 点击退出后要有提示框的提示 -->
    <van-button
      class="logout"
      type="default"
      block
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
// 十 导入getUserInfo
import { getUserInfo } from '@/api/user'
// 五 用辅助函数简化 判断tokan值 v-if  v-else
import { mapState } from 'vuex'
export default {
  // 十三 准备一个空对象
  name: 'My',
  // 十一 做发送请求的判断
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log('res', res)
        // 十三
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      // 十三
      userInfo: {}
    }
  },
  methods: {
    // 八 绑定点击事件 点击退出后要有提示框的提示
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    //  五 用辅助函数简化 判断tokan值 v-if  v-else
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
//  三 头部样式
.header {
  width: 750px;
  height: 401px;
  // background-color: #3296fa;
  opacity: 0.7;
  background: rgba(50, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  p {
    font-size: 28px;
    font-weight: 400;
    // padding: 0;
    // margin: 0;
    color: #ffffff;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    margin-bottom: 55px;
    padding-left: 32px;
    padding-right: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      width: 116px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      font-weight: 400;
      color: #666666;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        // width: 153px;
        font-size: 30px;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
}
.list {
  display: flex;
  // justify-content: space-between;
  li {
    flex: 1;
    text-align: center;
    p {
      color: #ffffff;
      font-weight: 400;
      &:nth-child(1) {
        font-size: 36px;
      }
      &:nth-child(2) {
        font-size: 23px;
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/.van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: #d86262;
}
</style>
