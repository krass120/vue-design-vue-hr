/*
  内容管理
*/
import request from '../utils/request'

export function getList (data) {
  return request({
    url: '/mp/v1_0/articles',
    method: 'get',
    params: data
  })
}
