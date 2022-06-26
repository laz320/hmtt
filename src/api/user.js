// 32
import request from '@/utils/request'

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
