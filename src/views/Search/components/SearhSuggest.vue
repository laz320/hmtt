<template>
  <div>
    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
    <!-- <van-cell title="单元格" icon="search"> </van-cell> -->
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item"
      icon="search"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
    <!-- <van-cell title="单元格" icon="search"> </van-cell>
    <van-cell title="单元格" icon="search"> </van-cell> -->
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
// 响应式数据写在data 非响应式写在export default上面  这样性能高一点
let timer = null
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 因为这块要渲染的不是普通的字符串，而是html片段，所以必须要用v-html v-html是属性绑定，所以不能用过滤器，只能写在methods中
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newVal)
            console.log(res)
            this.list = res.data.data.options
          } catch (err) {
            console.log(err)
          }
        }, 900)
      },
      immediate: true // 立即监听 组件在创建的时候就会监听一次
    }
  },
  // 组件被销毁 要清理掉定时器，避免内存泄漏
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}

</script>

<style scoped lang='less'>
</style>
