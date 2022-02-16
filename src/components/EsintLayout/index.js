import React, { Component } from 'react';

import { HashRouter } from 'react-router-dom'

import EsintHeader from './components/EsintHeader';

import BasicRoute from '../../routes'

import './index.less'

class EsintLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @functionName init
   * @description 页面初始化
   * @author 张航
   * @date 2022-01-11 11:15:44
   * @version V1.0.0
   */
  init () {
  }

  componentDidMount () {
    this.init();
  }

  render () {
    return (
      <HashRouter>
        <EsintHeader />
        <div className="layout-main">
          <BasicRoute />
        </div>
      </HashRouter>
    );
  }
}
export default EsintLayout;
