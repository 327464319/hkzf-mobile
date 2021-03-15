import React from 'react'
import {Route} from 'react-router-dom'
import News from './../News/index';
export default class Home extends React.Component{
  render () {
    return <div>
      首页2
       <Route path='/home/news' component={News}></Route>
     
    </div>
  }
}