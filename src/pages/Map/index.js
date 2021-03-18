import react from 'react'
import './map.scss'
export default class Map extends react.Component{
  renderMap () {
    var map = new window.BMapGL.Map("container");
    var point = new window.BMapGL.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
  }
  componentDidMount () {
    this.renderMap()
  }
  render () {
    return (
      <div className='map'>
       <div id="container"></div>
      </div>
    )
  }
}