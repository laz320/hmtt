// 十八
import request from '@/utils/request'

export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}
// 二十八  获取文章列表接口的封装
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: {
      channel_id: channel_id,
      timestamp: timestamp
    }
  })
}
export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}
// lllll
// 获取所有的频频列表数据（按需导出 export 表达式）
export const saveChannels = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
