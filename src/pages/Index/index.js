import React from 'react'
import { Carousel } from 'antd-mobile';
import { getSwiper } from './../../api/home';
export default class Index extends React.Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 212,
  }
  async getSwipers () {
    // 请求数据
    let { data: res } = await getSwiper('/home/swiper')
    // 把获取到的值设置给state
    this.setState({
      data: res.body
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
          style={{ width: '100%', verticalAlign: 'top' }}
        />
      </a>
    )))
  }
  componentDidMount () {
    // simulate img loading
    this.getSwipers()
  }
  render () {
    return (
      <div className='index'>
        <Carousel
          autoplay={true}
          infinite
          autoplayInterval={2000}
        >
          {this.renderSwipers()}
        </Carousel>
      </div>
    );
  }
}