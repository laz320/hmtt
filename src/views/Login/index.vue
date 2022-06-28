<template>
  <div>
    <!-- 14 NavBar 导航栏 -->
    <!-- <van-nav-bar title="登录" left-arrow /> -->
    <!-- 15 用插槽修改图标 把单标签改为双标签  slot插槽-->

    <!-- 七 绑定点击事件 往回退一步的操作 -->
    <van-nav-bar title="登录" @click-left="$router.back()">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <!-- 20 form 表单 -->
    <!-- 28 进行调整 -->
    <!-- 校验规则 pattern:按F1 搜索手机-->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '不符合手机的格式' },
        ]"
      >
        <!-- 23 字体图标  插槽的方式(先把单标签改为双标签)-->
        <!-- 29 校验规则 pattern：-->
        <!-- <i class="toutiao toutiao-shouji" slot="left-icon"></i> -->

        <!-- 56 改写 -->
        <MyIcon name="shouji" slot="left-icon"></MyIcon>
      </van-field>
      <van-field
        v-model.trim="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码长度必须是6位' },
        ]"
      >
        <!-- 24 字体图标  插槽的方式(先把单标签改为双标签)-->
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <!-- 25 字体图标  插槽的方式 插入按钮-->

        <template #button>
          <!-- 34 倒计时 -->
          <!-- 37 做判断 -->
          <!-- 42 倒计时到点就关闭 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="isCountDownShow = false"
          />

          <!-- 30 添加native-type:"button" -->
          <!-- 38 绑定事件-->
          <van-button
            @click="onSendSms"
            v-else
            size="small"
            round
            class="yzm"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// 43 导入接口
// 46 login
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    // 21（拷贝）
    return {
      // username: '',
      // password: ''

      // 27
      mobile: '13911111111', // 手机号
      code: '246810', // 短信验证码
      // 35 time 属性表示倒计时总时长，单位为毫秒。
      time: 5 * 1000,
      // 36默认不显示倒计时效果
      isCountDownShow: false

    }
  },
  methods: {

    // 22（拷贝）
    // 47 调用封装后的ajax
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        // 50
        this.$store.commit('setUser', res.data.data)
        // 一 登录成功后的跳转
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
      }
    },

    // 39 校验函数
    async onSendSms () {
      // 异常捕获
      try {
        await this.$refs.form.validate('mobile')
        // 41显示时倒计时
        this.isCountDownShow = true

        // 44 发送ajax
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败')
        }

        // console.log('校验通过')
      } catch (err) {
        console.log(err)
        console.log('校验失败')
        // 40 轻提示
        this.$toast.fail('手机格式不对')
      }
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// 26
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  line-height: 80px;
  .van-button__text {
    zoom: 0.95;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  font-size: 30px;
  color: #fff;
}
// .van-count-down {
//   position: fixed;
//   right: 18x;
// }
// .yzm {
//   position: fixed;
//   right: 10x;
// }
</style>
