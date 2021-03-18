import { getCityInfo } from "../api/area";


export const getCurrentCity = () => {
  const localCity = JSON.parse(localStorage.getItem('hkzf_city'))
  if (!localCity) {
    return new Promise((resolve, reject) => {
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