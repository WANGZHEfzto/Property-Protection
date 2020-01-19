import request from '@/utils/request'

export const AUTH_LOGIN_URL = '/txn999999'
export const AUTH_USERINFO_URL = 'user/info'

export function login(username, password, identify, identifyCode) {
  return request({
    url: AUTH_LOGIN_URL,
    method: 'post',
    params: {
      account: username,
      password: password,
      identify: identify,
      identifyCode: identifyCode
    }
  })
}

export function getInfo(token) {
  return request({
    url: AUTH_USERINFO_URL,
    method: 'get',
    params: { token }
  })
}

export function userlogout() {
  return request({
    url: '/txnLogout',
    method: 'post'
  })
}

export function updateUserRegInfo(data) {
  return request({
    url: '/txnUpdateUserRegInfo',
    method: 'post',
    data
  })
}

export function hdlogin(username, password) {
  return request({
    url: '/txn777777',
    method: 'post',
    data: {
      account: username,
      password: password
    }
  })
}

export function refreshIdCode() {
  return request({
    url: '/txnRefreshIdCode',
    method: 'post'
  })
}

