<template>
  <div>
    <!-- 5 标签栏的路由模式 -->
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">
        首页
        <!-- 8 更换图标 -->
        <!-- <template #icon>
        <i class="toutiao toutiao-shouye"></i>
      </template> -->
        <i class="toutiao toutiao-shouye" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="search"
        >视频
        <i class="toutiao toutiao-shipin" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item replace to="/question" icon="search"
        >问答
        <i class="toutiao toutiao-wenda" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="search"
        >我的
        <i class="toutiao toutiao-wode" slot="icon"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// 9
.toutiao{
  font-size: 40px;
}
//   /deep/ 深度选择器
/deep/ .van-tabbar-item__text{
  font-size: 20px !important;
}
</style>
