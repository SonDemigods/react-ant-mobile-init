import React, { Component } from 'react';

import { Layout, Menu } from 'antd';

import {
  UserOutlined
} from '@ant-design/icons';

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
      <Layout.Sider>
        <Menu
          style={{ width: 256 }}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            用户管理
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}
export default EsintLayout;
