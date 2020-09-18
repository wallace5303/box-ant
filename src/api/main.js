import request from '@/utils/request'

const mainApi = {
  webSites: '/v1/box/webSites'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: ''
 * }
 * @param parameter
 * @returns {*}
 */
export function webSites (parameter) {
  return request({
    url: mainApi.webSites,
    method: 'get',
    data: parameter
  })
}
