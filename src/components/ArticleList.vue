
<template>
  <!-- 三十五   list的基础用法-->

  <van-cell-group>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 二十五 组件单元格的封装 -->
        <!-- <van-cell title="单元格" value="内容" label="描述信息" /> -->
        <!-- 三十四 数据的循环遍历 -->
        <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          value="内容"
          label="描述信息"
        />
        <!-- <van-cell title="单元格" value="内容" label="描述信息" />
    <van-cell title="单元格" value="内容" label="描述信息" />
    <van-cell title="单元格" value="内容" label="描述信息" />
    <van-cell title="单元格" value="内容" label="描述信息" />
    <van-cell title="单元格" value="内容" label="描述信息" />
    <van-cell title="单元格" value="内容" label="描述信息" />
    <van-cell title="单元格" value="内容" label="描述信息" />
    <van-cell title="单元格" value="内容" label="描述信息" />
    <van-cell title="单元格" value="内容" label="描述信息" />
    <van-cell title="单元格" value="内容" label="描述信息" />
    <van-cell title="单元格" value="内容" label="描述信息" />
    <van-cell title="单元格" value="内容" label="描述信息" />
    <van-cell title="单元格" value="内容" label="描述信息" /> -->
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
// 三十二 拿取数据，先引入
import { getArticleList } from '@/api/home'
export default {
  // 三十一
  // name: 'active',
  name: 'ArticleList',

  // 三十 数据的接收
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    // 三十三
    this.getArticleList()
  },
  data () {
    // 三十三
    return {
      timestamp: Date.now(),
      articleList: [],
      // 三十五   list的基础用法
      loading: false,
      finished: false,

      refreshing: false
    }
  },
  methods: {
    // 三十三 发送ajax请求
    // 异步捕获
    // async getArticleList () {
    //   try {
    //     const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
    //     console.log(res)
    //     this.timestamp = res.data.data.pre_timestamp
    //     this.articleList = res.data.data.results
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
    // 三十六
    async getArticleList () {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({
          channel_id: this.id,
          timestamp: this.timestamp
        })
        console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        // 若数据全部加载完毕，则直接将finished设置为true
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.data.results)
        // 数据更新完毕后，将loading设置为false
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    // 三十五   list的基础用法
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      console.log('下拉刷新触发了')
      this.finished = false // 防止用户把数据加载 结束
      this.loading = false // 重新加载数据
      this.timestamp = Date.now()// 获取第一页数据，就要把时间戳更新为当前时间
      this.getArticleList() // 调用ajax
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
