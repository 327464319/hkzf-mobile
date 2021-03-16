import React from 'react'
import { Route } from 'react-router-dom'
import News from './../News/index';
import { TabBar } from 'antd-mobile';
import './index.css'
import Index from './../Index/index';
import Profile from './../Profile/index';
import List from './../List/index';
const tabItems = [{
  title: '首页',
  icon: 'icon-ind',
  path: '/home/index'
},
{
  title: '找房',
  icon: 'icon-findHouse',
  path: '/home/list'
},
{
  title: '资讯',
  icon: 'icon-infom',
  path: '/home/news'
},
{
  title: '我的',
  icon: 'icon-my',
  path: '/home/profile'
}]
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.location.pathname,
    };
  }
  renderTabarItem () {
    return (
      tabItems.map(v => (
        <TabBar.Item
          title={v.title}
          key={v.title}
          icon={<i className={`iconfont ${v.icon}`}></i>
          }
          selectedIcon={<i className={`iconfont ${v.icon}`}></i>
          }
          selected={this.state.selectedTab === v.path}
          onPress={() => {
            this.setState({
              selectedTab: v.path,
            });
            this.props.history.push(v.path)
          }}
          data-seed="logId"
        />
      ))
    )
  }

  render () {

    return <div className='home'>
      <Route path='/home/index' component={Index}></Route>
      <Route path='/home/list' component={List}></Route>
      <Route path='/home/news' component={News}></Route>
      <Route path='/home/profile' component={Profile}></Route>
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#21b97a"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          {this.renderTabarItem()}
        </TabBar>
      </div>

    </div>
  }
}