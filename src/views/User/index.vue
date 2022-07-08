<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link @click="showInput">
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="proflie.photo"
        width=".9rem"
        height=".9rem"
      />
    </van-cell>
    <van-cell
      title="昵称"
      @click="isNmaeShow = true"
      :value="proflie.name"
      is-link
    />
    <van-cell
      title="性别"
      :value="proflie.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      title="生日"
      :value="proflie.birthday"
      is-link
      @click="isBirthdayShow = true"
    />
    <van-popup position="bottom" style="height: 100%" v-model="isNmaeShow"
      ><van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onNameCancel"
        @click-right="onNameSave"
      />
      <van-field
        :value="proflie.name"
        @input="name = $event"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-popup>
    <!-- 生日切换 -->
    <van-popup position="bottom" v-model="isBirthdayShow"
      ><van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
      />
    </van-popup>
    <input
      type="file"
      style="display: none"
      accept="image/jpeg,image/png,image/gif,image/jpg"
      ref="file"
      @change="onChange"
    />
    <van-popup v-model="isAvatarShow" position="bottom" style="height: 100%">
      <UpdateAvatar
        :img-src.sync="imgSrc"
        @close="isAvatarShow = false"
      ></UpdateAvatar>
    </van-popup>
  </div>
</template>

<script>
import UpdateAvatar from './components/UpdateAvatar.vue'
import { getUserProfile, updateUserProfile } from '@/api/user'
export default {
  async created () {
    try {
      const res = await getUserProfile()
      this.proflie = res.data.data
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      proflie: {}, // 个人简介
      isNmaeShow: false,
      name: '',
      isBirthdayShow: false,
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2022, 10, 1),
      // currentDate: new Date(2021, 0, 17)
      birthday1: '',
      isAvatarShow: false,
      imgSrc: ''
    }
  },
  methods: {
    onNameCancel () {
      this.isNmaeShow = false
    },
    async onNameSave () {
      // const res = await this.save()
      // console.log(res)
      await this.save()
      this.save()
      this.isNmaeShow = false
    },
    async save () {
      try {
        const res = await updateUserProfile(this.proflie)
        this.proflie.name = this.name
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    onConfirm () {
      this.proflie.birthday = this.birthday1
      this.save()
      this.isBirthdayShow = false
    },
    showInput () {
      // 用js模拟人的点击操作
      this.$refs.file.click()
    },
    onChange () {
      const url = window.URL.createObjectURL(this.$refs.file.files[0])
      console.log(url)
      this.imgSrc = url
      this.isAvatarShow = true
    }
  },
  // 因为van-cell单元要的是字符串 1990-11-20 但是datetimepicker选择器里面的要的数据v-moudle 是日期  所以要用computed来转换
  computed: {
    currentDate: {
      get () {
        return new Date(this.proflie.birthday)
      },
      set (newVal) {
        this.birthday1 = newVal.getFullYear() + '-' + (newVal.getMonth() + 1) + '-' + newVal.getDate()
      }
    }
  },
  watch: {},
  filters: {},
  components: { UpdateAvatar }
}
</script>

<style scoped lang='less'>
/deep/.van-nav-bar__text {
  color: #fff;
}
</style>
