import React, { Component } from 'react';

import { Drawer, Button } from 'antd';

import './index.less'

class RightPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

  /**
   * @functionName getFooterDom
   * @return {Object} 返回结果
   * @description 获取页脚dom
   * @author 张航
   * @date 2022-02-10 14:15:47
   * @version V1.0.0
   */
  getFooterDom () {
    return (
      <div style={{textAlign: 'right'}}>
          <Button type="primary">保存</Button>
          <Button>取消</Button>
      </div>
    )
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

	componentDidMount() {
		this.init();
	}

	render() {

    const { 
      visible = false,
      title = '新增',
      body = ''
    } = this.props
		return (
      <Drawer 
        title={title} 
        placement="right" 
        visible={visible}
        footer={
          this.getFooterDom()
        }
        >
        {
          body
        }
      </Drawer>
		);
	}
}
export default RightPanel;
