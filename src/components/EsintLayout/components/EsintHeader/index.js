import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'

import { Layout, Menu } from 'antd';

import {
  HomeOutlined,
  UserOutlined
} from '@ant-design/icons';

import './index.less'

class EsintLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '/'
    };
  }

  handleClick ({key = ''}) {
    this.props.history.push({
      pathname: key
    });
    this.setState({
      current: key
    });
  }

  /**
   * @functionName init
   * @description 页面初始化
   * @author 张航
   * @date 2022-01-11 11:15:44
   * @version V1.0.0
   */
  init () {
    const {location} = this.props;
    const {pathname} = location;
    this.setState({
      current: pathname
    })
  }

  componentDidMount () {
    this.init();
  }

  render () {
    const { current } = this.state
    return (
      <Layout.Header>
        <div className="logo">
          LOGO
        </div>
        <Menu
          onClick={(key) => this.handleClick(key)}
          selectedKeys={[current]}
          mode="horizontal"
        // theme="dark"
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            首页
          </Menu.Item>
          <Menu.Item key="/list" icon={<UserOutlined />}>
            人员管理
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}
export default withRouter(EsintLayout);
