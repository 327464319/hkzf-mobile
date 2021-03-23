import react from 'react'
import './map.scss'
import NavHeader from './../../components/NavHeader/index';
import { getAreaMap } from '../../api/area';
import { getCurrentCity } from './../../util/index';
import styles from './index.module.css'
import { Toast } from 'antd-mobile';
// 覆盖物样式
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}
export default class Map extends react.Component{
 async renderMap () {
   var map = new window.BMapGL.Map("container");
   this.map=map
   const { label, value } = await getCurrentCity()
   const coder = new window.BMapGL.Geocoder()
   coder.getPoint(label, point => {
     map.centerAndZoom(point, 11);
     map.addControl(new window.BMapGL.NavigationControl())
     map.addControl(new window.BMapGL.ScaleControl())
   
   },label)
      this.renderOverlays(value)
  }
  async renderOverlays (id) {
    Toast.loading('加载中...',0)
    const { data: { body: data } } = await getAreaMap(id)
    Toast.hide()
  const {nextZoom,type}= this.getTypeAndZoom()
  data.forEach(item=>this.addOverlay(item,nextZoom,type))
  }
  addOverlay (item, nextZoom, type) {
    // 遍历房源信息，创建对应的覆盖物
    
      // 给每一条数据添加覆盖物
      // 得到返回的经纬度信息
      let { coord: { longitude, latitude }, label: areaName, count, value } = item
      // 创建覆盖物
    const point = new window.BMapGL.Point(longitude, latitude)
      let label = new window.BMapGL.Label('', {
        position: point,
        offset: new window.BMapGL.Size(-35, -35)
      })
    
    if (type === 'circle') {
      this.setCircle(areaName, count,label,point,nextZoom,value)
    } else {
      this.setRect(areaName, count,label, point, nextZoom,value)
   }
      // 给label添加唯一标识
      label.id = value
      // 添加到地图上
      this.map.addOverlay(label)
  }
  setCircle (areaName,count,label, point, nextZoom, value) {
    // 设置覆盖物内容
    label.setContent(`<div class="${styles.bubble}">
    <p >${areaName}</p>
    <p>${count}套</p>
  </div>`)
    // 设置样式
    label.setStyle(labelStyle)
    // 添加点击事件
    label.addEventListener('click',  ()=> {
      // 当点击了覆盖物，要以当前点击的覆盖物为中心来放大地图
      this.map.centerAndZoom(point, nextZoom);
      // 解决清除覆盖物的时候，百度地图js报错问题
      setTimeout( ()=> {
        this.map.clearOverlays()

      }, 0)
      this.renderOverlays(value)
    })
  }
  setRect (areaName, count,label, point, nextZoom, value) {
    // 设置房源覆盖物内容
    label.setContent(`
      <div class="${styles.rect}">
        <span class="${styles.housename}">${areaName}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"></i>
      </div>
    `)

    // 设置样式
    label.setStyle(labelStyle)
  }
  getTypeAndZoom () {
    const zoom = this.map.getZoom()
    if (zoom >= 10 && zoom <= 12) {
      return {nextZoom:13,type:'circle'}
    } else if (zoom > 12 && zoom <= 14) {
      return { nextZoom: 15, type: 'circle' }
    } else {
      return { nextZoom: 15, type: 'rect' }
    }
  }
  componentDidMount () {
    this.renderMap()
   
    
  }
  leftClick =() =>{
    this.props.history.go(-1)
  }
  render () {
    return (
     
      <div className='map'>
        <NavHeader leftClick={this.leftClick}>地图找房</NavHeader>
       <div id="container"></div>
      </div>
    )
  }
}