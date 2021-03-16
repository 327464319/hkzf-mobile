import React from 'react'
import { Carousel ,Flex} from 'antd-mobile';
import { getSwiper } from './../../api/home';
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
import './index.scss'
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
    isSwipers:false
  }
  async getSwipers () {
    // 请求数据
    let { data: res } = await getSwiper('/home/swiper')
    // 把获取到的值设置给state
    this.setState({
      data: res.body,
      isSwipers:true
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
  componentDidMount () {
    // simulate img loading
    this.getSwipers()
  }
  render () {
    return (
      <div className='index'>
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
      </div>
    );
  }
}