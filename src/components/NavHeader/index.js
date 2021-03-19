import { NavBar } from 'antd-mobile';
import style from './index.module.css'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
function NavHeader ({ history, children, leftClick}) {
  let defaultClick = () => history.go(-1)
  return (
    <div>
      <NavBar
        className={style.amNavbar}
        // 模式 默认值是 dark
        mode="light"
        // 左侧小图片
        icon={<i className='iconfont icon-back' />}
        // 左侧按钮的点击事件
        onLeftClick={leftClick || defaultClick}
      >{children}</NavBar>
    </div>
  )
}
NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  leftClick:PropTypes.func
}
export default withRouter(NavHeader)