<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="$router.go(-1)"
        @search="onSearch"
        autofocus
        @focus="isSearch = false"
      />
    </form>
    <!-- 当搜索框空的时候 显示搜索历史 -->
    <!-- 当搜索框中有值的时候  显示搜索建议 当回车的时候显示搜索结果-->
    <!-- 绑定自定义事件  @search="onSearch"-->
    <SearchHistory v-if="searchText === ''" @search="onSearch"></SearchHistory>
    <template v-else>
      <!-- :searchText="searchText"父向子传值 -->
      <SearchResult v-if="isSearch" :searchText="searchText"></SearchResult>
      <SearchSuggest
        v-else
        :searchText="searchText"
        @search="onSearch"
      ></SearchSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchSuggest from './components/SearhSuggest'
import SearchResult from './components/SearchResult'

export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false // 默认没有回车
    }
  },
  methods: {
    //
    onSearch (str) {
      this.isSearch = true
      this.searchText = str
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult
  }
}
</script>

<style scoped lang='less'>
</style>
