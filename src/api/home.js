import request from '../util/request'
export function getSwiper () { 
  return request({
    url: `/home/swiper`,
    method: 'get'
  })
}
export function getGroups () { 
  return request({
    url: `/home/groups`,
    method: 'get'
  })
}

export function getNews () {
  return request({
    url: `home/news?area=AREA%7C88cff55c-aaa4-e2e0`,
    method: 'get'
  })
}