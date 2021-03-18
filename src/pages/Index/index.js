import React from 'react'
import { Carousel, Flex, Grid, WingBlank} from 'antd-mobile';
import { getSwiper,getGroups,getNews } from './../../api/home';
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
import './index.scss'
import { getCurrentCity } from './../../util/index';
// 导航菜单的数据
const navs = [{
    id: 0,
    img: nav1,
    title: '整租',
    path: '/home/list'
}, {
    id: 1,
    img: nav2,
    title: '合租',
    path: '/home/list'
}, {
    id: 2,
    img: nav3,
    title: '地图找房',
    path: '/home/map'
}, {
    id: 3,
    img: nav4,
    title: '去出租',
    path: '/home/list'
}]
export default class Index extends React.Component {
  state = {
    data: [],
    imgHeight: 212,
    isSwipers: false,
    // 租房小组状态
    groups: [],
    news: [],
    curCityName:'长沙'
  }
  
  async getSwipers () {
    // 请求数据
    let { data: res } = await getSwiper()
    // 把获取到的值设置给state
    this.setState({
      data: res.body,
      isSwipers:true
    })
  
  }
  async getGroups () {
    // 请求数据
    let { data: res } = await getGroups()
    // 把获取到的值设置给state
    this.setState({
      groups: res.body,
    })

  }
  async getNews () {
    // 请求数据
    let { data: res } = await getNews()
    // 把获取到的值设置给state
    this.setState({
      news: res.body,
    })

  }
  renderSwipers () {
    return (this.state.data.map(val => (
      <a
        key={val}
        href="http://www.alipay.com"
        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
      >
        <img
          src={`http://localhost:8080${val.imgSrc}`}
          alt=""
          style={{ height: '100%', verticalAlign: 'top' }}
        />
      </a>
    )))
  }
  renderNavs() {
    return navs.map(item => {
        return (
            <Flex.Item key={item.id} onClick={()=>{this.props.history.push(item.path)}}>
                <img src={item.img} alt="" />
                <h2>{item.title}</h2>
            </Flex.Item>
        )
    })
  }
  renderGroups (item) {
    return (
      <Flex className="group-item" justify="around" >
        <div className="desc">
          <p className="title">{item.title}</p>
          <span className="info">{item.desc}</span>
        </div>
        <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
      </Flex>
    )
  }
  renderNews () {
    return this.state.news.map(item => {
      return (
        <div className="news-item" key={item.id}>
          <div className="imgwrap">
            <img
              className="img"
              src={`http://localhost:8080${item.imgSrc}`}
              alt=""
            />
          </div>
          <Flex className="content" direction="column" justify="between">
            <h3 className="title">{item.title}</h3>
            <Flex className="info" justify="between">
              <span>{item.from}</span>
              <span>{item.date}</span>
            </Flex>
          </Flex>
        </div>
      )
    })
  }
 async componentDidMount () {
    // simulate img loading
    this.getSwipers()
    this.getGroups()
    this.getNews()
   const curCity = await getCurrentCity()
    this.setState({
      curCityName: curCity.label
    })
  }
  render () {
    let { history } = this.props
    return (
      <div className='index'>
        <Flex className='search-box'>
          {/* 左侧白色区域 */}
          <Flex className="search">
            {/* 位置 */}
            <div className="location" onClick={() => history.push('/citylist')}>
              <span className="name">{this.state.curCityName}</span>
              <i className="iconfont icon-arrow" />
            </div>

            {/* 搜索表单 */}
            <div className="form">
              <i className="iconfont icon-seach" />
              <span className="text">请输入小区或地址</span>
            </div>
          </Flex>
          {/* 右侧地图图标 */}
          <i className="iconfont icon-map" onClick={() => history.push('/map')}/>
        </Flex>
        <div className="swiper">
               {
          this.state.isSwipers?(<Carousel
          autoplay={true}
          infinite
          autoplayInterval={2000}
        >
          {this.renderSwipers()}
        </Carousel>):('')
        }
        </div>
   
        <Flex className="nav">
        {this.renderNavs()}
        </Flex>
        {/* 租房小组 */}
        <div className="group">
          <h3 className="group-title">
            租房小组 <span className="more">更多</span>
          </h3>
          <Grid data={this.state.groups}
          
            columnNum={2}
          
            square={false}
           
            hasLine={false}
        
            renderItem={item => this.renderGroups(item)} />
        </div>
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    );
  }
}