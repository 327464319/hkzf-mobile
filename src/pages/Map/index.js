import react from 'react'
import './map.scss'
import  NavHeader from './../../components/NavHeader/index';
export default class Map extends react.Component{
  renderMap () {
    var map = new window.BMapGL.Map("container");
    var point = new window.BMapGL.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
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