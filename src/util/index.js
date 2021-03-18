import { getCityInfo } from "../api/area";
import { Toast } from 'antd-mobile';


export const getCurrentCity = () => {
  const localCity = JSON.parse(localStorage.getItem('hkzf_city'))
  if (!localCity) {
    return new Promise((resolve, reject) => {
      if(!window.BMapGL) return Toast.fail('当前无网络，无法获取当前城市！',1)
      const BMapCity = new window.BMapGL.LocalCity()
      BMapCity.get(data => {
        getCityInfo(data.name).then((data) => {
          localStorage.setItem('hkzf_city', JSON.stringify(data.data.body))
          resolve(data.data.body)
        }, (e) => {
          reject(e)
        })
      })
   })
  }
  return Promise.resolve(localCity)
 }