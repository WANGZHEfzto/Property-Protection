import request from '@/utils/request'
import requestFile from '@/utils/requestFile'

// 我的业务
export function getList_user(url, data, params) {
  return request({
    url: url,
    method: 'post',
    data,
    params
  })
}
export function getDetailById_user(url, params) {
  return request({
    url: url,
    method: 'post',
    params
  })
}
// 检索

export function addQqpd(data, params) {
  return request({
    url: '/qqpd/addqqpdzx',
    method: 'post',
    data,
    params
  })
}

export function searchAdminList(url, data, params) {
  return request({
    url: url,
    method: 'post',
    data,
    params
  })
}
// 获取详情

export function getShjlDetailById(url, params) {
  return request({
    url: url,
    method: 'post',
    params
  })
}
export function updateInfo(url, data, params) {
  return request({
    url: url,
    method: 'post',
    data,
    params
  })
}

// 统计

export function getNumList() {
  return request({
    url: '/all/selectAllCount',
    method: 'post'
  })
}
export function searchAjtjList(data) {
  return request({
    url: '/all/alsqtj',
    method: 'post',
    data
  })
}
export function searchQqrList(data) {
  return request({
    url: '/all/qqrtj',
    method: 'post',
    data
  })
}
export function searchCylyList(data) {
  return request({
    url: '/all/cylytj',
    method: 'post',
    data
  })
}
export function searchQtList(url, data, params) {
  return request({
    url: url,
    method: 'post',
    data,
    params
  })
}
export function addWqyz(data, params) {
  return request({
    url: '/wqyz/addwqyz',
    method: 'post',
    data,
    params
  })
}
export function addjftj(data, params) {
  return request({
    url: '/jftj/addjftj',
    method: 'post',
    data,
    params
  })
}

// 报表导出

export function exportFile_qqr(data) {
  return requestFile('/all/downQqrtjToExcel', data, '请求人统计列表.xlsx')
}

export function exportFile_qt(url, data, name) {
  return requestFile(url, data, name)
}
