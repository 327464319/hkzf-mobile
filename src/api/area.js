import request from '../util/request'
export function getCity (level) {
  return request({
    url: `/area/city?level=${level}`,
    method: 'get'
  })
}
export function getCityHot () {
  return request({
    url: `/area/hot`,
    method: 'get'
  })
}
export function getCityInfo (name) {
  return request({
    url: `/area/info`,
    method: 'get',
    params:{
      name
    }
  })
}
export function getAreaMap (id) {
  return request({
    url: `/area/map`,
    method: 'get',
    params: {
      id
    }
  })
}