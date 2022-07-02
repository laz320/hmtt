import request from '@/utils/request'

/**
 *搜索联想数据列表
 * @param {搜索关键词} q
 * @returns
 */
export const getSuggestList = (q) => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}

// 解构赋值
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: {
      page, per_page, q
    }
  })
}
