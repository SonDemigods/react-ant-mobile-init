import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'

import { NavBar } from 'antd-mobile';

import './index.less'

class EsintLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '/'
    };
  }

  /**
   * @functionName getTitle
   * @return {String} 返回标题
   * @description 获取标题名称
   * @author 张航
   * @date 2022-02-16 17:27:47
   * @version V1.0.0
   */
  getTitle () {
    return localStorage.getItem('navTitle') || '标题'
  }

  /**
   * @functionName back
   * @description 返回上一页
   * @author 张航
   * @date 2022-02-16 17:26:13
   * @version V1.0.0
   */
  back () {
    this.props.history.go(-1);
  }

  /**
   * @functionName init
   * @description 页面初始化
   * @author 张航
   * @date 2022-01-11 11:15:44
   * @version V1.0.0
   */
  init () {}

  componentDidMount () {
    this.init();
  }

  render () {
    return (
      <NavBar className="layout-header" onBack={() => this.back()}>{this.getTitle()}</NavBar>
    );
  }
}
export default withRouter(EsintLayout);
