<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="item in commentList"
        :key="item.com_id"
        :item="item"
        @replay-show="$emit('replay-show',$event)"
      ></CommentItem>
      <van-cell v-for="(item, index) in commentList" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">hello</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}。</p>
          <p>
            <span style="margin-right: 10px">{{
              item.pubdate | dateformat
            }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- <van-cell>
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <span style="color: #466b9d" slot="title">hello</span>
      <div slot="label">
        <p style="color: #363636">我出去跟别人说我的是。。。</p>
        <p>
          <span style="margin-right: 10px">3天前</span>
          <van-button size="mini" type="default">回复</van-button>
        </p>
      </div>
      <van-icon slot="right-icon" name="like-o" />
    </van-cell> -->
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentList } from '@/api/comment'
export default {
  // 父向子传值的接收
  props: {
    type: {
      type: String,
      required: true,
      // props自定义校验函数
      validator (value) {
        return ['a', 'c'].includes(value) // 数据只能是a或者是c才能验证通过
      }
    },
    source: {
      type: [Number, String],
      required: true
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        offset: null,
        limit: 5,
        type: this.type,
        source: this.source
      },
      // commentList: [],

      loading: false,
      finished: false

    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        // const res = await getCommentList({ source: this.source, type: this.type, offset: this.offset, limit: this.limit }) //太繁琐
        console.log(res)

        // 判断数据是否全部加载完毕
        // 数据全部加载完毕 则直接将finished设置成true即可
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        // 4子向父传值
        this.$emit('set-count', res.data.data.total_count)
        // this.commentList = res.data.data.results  //只能保留一条数据 没办法分页
        this.commentList.push(...res.data.data.results) // 保留每一页数据
        // 本次返回结果的最后一个评论id,作为请求下一页数据的offset参数，若本次无具体数据，则值为null
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false // 每次当前页面数据拿回来，就把loading转圈效果关闭掉
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      // console.log(123)
      this.getCommentList()// 获取下一页数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    CommentItem
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
