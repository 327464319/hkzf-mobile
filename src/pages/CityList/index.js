import React from 'react'
import { NavBar,Toast } from 'antd-mobile'
import './index.scss'
import { getCity, getCityHot } from './../../api/area';
import { getCurrentCity } from './../../util/index';
import { List, AutoSizer } from 'react-virtualized';
// 索引（A、B等）的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50

// 封装处理字母索引的方法
const formatCityIndex = letter => {
  switch (letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default:
      return letter
  }
}

// 有房源的城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']

export default class CityList extends React.Component{
  state = {
    cityList: {},
    cityIndex: [],
    // 指定右侧字母索引列表高亮的索引号
    activeIndex: 0,
  }
  listComponent=React.createRef()
  // 动态计算高度
  getRowHeight = ({ index }) => {
    // 索引的高度 + 数量 * 每个城市的高度
    let { cityIndex, cityList } = this.state;
    return cityList[cityIndex[index]].length * NAME_HEIGHT + TITLE_HEIGHT;
  }
rowRenderer =({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style, // Style object to be applied to row (to position it)
  }) =>{
  let letter = this.state.cityIndex[index]
  let citys = this.state.cityList[letter]
  return (
    <div
      key={key}
      style={style}
      className="city"
    >
      <div className="title">{formatCityIndex(letter)}</div>
      {citys.map(item => {
        return (
          <div className="name" key={item.value} onClick={() => this.changeCity(item.label, item.value)}>{item.label}</div>
        )
      })}</div>
  )
  }
  changeCity = (label, value) => {
    if (HOUSE_CITY.indexOf(label) > -1) {
      // 说明是有房源数据的城市
      localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
      this.props.history.go(-1)
    } else {
      // 没有房源城市，提示用户
      Toast.info('当前城市没有房源', 1);
    }
  }
 async getCityList () {
  let res=  await getCity(1)
   const { cityList, cityIndex } = this.formatCityData(res.data.body)
   let hotRes = await getCityHot()
   cityList['hot'] = hotRes.data.body
   cityIndex.unshift('hot')
   // 获取当前定位城市
   const curCity = await getCurrentCity()
   cityList['#'] = [curCity]
   cityIndex.unshift('#')
    // console.log(cityList, cityIndex, curCity)
   this.setState({
     cityList,
     cityIndex
   })
  
  }
  formatCityData (list) {
    let cityList = {}
    let cityIndex = []
    list.forEach(item => {
      let first = item.short.slice(0, 1).toUpperCase()
      if (cityList[first]) {
        cityList[first].push(item) 
      } else {
        cityList[first]=[item]
      }
      cityIndex.push(first)
    })
    cityIndex = [...new Set(cityIndex)].sort()
    return {
      cityList,cityIndex
    }
  }
  renderCityIndex () {
    return this.state.cityIndex.map((item, index) => {
    

      return (
        <li className="city-index-item" key={item} onClick={() => {
         
          // 拿到List组件的实例
          this.listComponent.current.scrollToRow(index)
        }}>
          {/*判断一下，如果高亮状态的索引等于当前索引，那么就设置高亮样式*/}
          <span className={this.state.activeIndex === index ? 'index-active' : ''}>{item === 'hot' ? '热' : item}</span>
        </li>
      )
    })
  }
  // 获取每一行参数
  rowRendered =({ startIndex })=> {
    if (this.state.activeIndex !== startIndex) {
      //避免不必要的渲染
      this.setState({
        activeIndex: startIndex
      })
    }
    
  }
  async componentDidMount () {
    await this.getCityList()
    // this.listComponent.current.measureAllRows()

  }
  render () {
    return <div className="citylist">
      <NavBar
        // 模式 默认值是 dark
        mode="light"
        // 左侧小图片
        icon={<i className='iconfont icon-back' />}
        // 左侧按钮的点击事件
        onLeftClick={() => this.props.history.go(-1)}
      >城市列表</NavBar>
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={this.listComponent}
            height={height}
            rowCount={this.state.cityIndex.length}
            rowHeight={this.getRowHeight}
            rowRenderer={this.rowRenderer}
            width={width}
            onRowsRendered={
              this.rowRendered
            }
          />
        )}
      </AutoSizer>
      {/* 右侧索引列表 */}
      <ul className="city-index">
        {
          this.renderCityIndex()
        }
      </ul>
    </div>
  }
}