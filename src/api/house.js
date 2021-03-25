import request from '../util/request'
export function getHouseById (id) {
  return request({
    url: `/houses?cityId=${id}`,
    method: 'get'
  })
}