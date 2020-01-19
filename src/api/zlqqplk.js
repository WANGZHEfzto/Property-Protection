import request from '@/utils/request'

export function searchPlk(data, params) {
  return request({
    url: '/zlqqplk/searchPlk',
    method: 'post',
    data,
    params
  })
}
export function categoryColumn(data) {
  return request({
    url: '/zlqqplk/categoryColumn ',
    method: 'post',
    data
  })
}
export function catalog(params) {
  return request({
    url: '/zlqqplk/catalog',
    method: 'post',
    params
  })
}
export function download(params) {
  return request({
    url: '/zlqqplk/download',
    method: 'post',
    params
  })
}

