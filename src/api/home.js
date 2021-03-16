import request from '../util/request'
export function getSwiper (orgId) { // 获取活动参加候选人员
  return request({
    url: `/home/swiper`,
    method: 'get'
  })
}