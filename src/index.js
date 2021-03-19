import React from 'react';
import ReactDOM from 'react-dom';
import 'react-virtualized/styles.css';
import 'antd-mobile/dist/antd-mobile.css';
import './assets/fonts/iconfont.css'
//最后导入组件，让自己写的组件样式最后生效，样式权重一样，后来者居上
import App from './App';
import './index.css';
ReactDOM.render(
 <App />,
document.getElementById('root')
);

