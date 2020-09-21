import request from '@/utils/request'

const mainApi = {
  outApi: '/v1/outApi',
  webSites: '/v1/box/webSites'
}

/**
 * outApi
 */
export function outApi (parameter) {
  return request({
    url: mainApi.outApi,
    method: 'post',
    data: parameter
  })
}

/**
 * webSites
 */
export function webSites (parameter) {
  return request({
    url: mainApi.webSites,
    method: 'get',
    data: parameter
  })
}
