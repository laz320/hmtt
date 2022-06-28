// 32
import request from '@/utils/request'
// 十二 只有在VUE组件中才能用this.$store 在ji中没有这个this 所以只能
import store from '@/store'

/**
 * 33 获取短信验证码
 *
 * @param {*} mobile
 * @returns 返回的是promise
 */
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

/**
 *登录
 * @param {mobile,code} params
 * @return promise
 */
// 45 封装接口
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 九 封装接口 获取用户的个人资料
export const getUserInfo = () => {
  return request({
    url: 'user',
    // 十二
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
