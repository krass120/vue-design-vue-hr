/*
  登录
*/
import request from '../utils/request'

export function login (data) {
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'POST',
    data
  })
}
