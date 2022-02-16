import React, { Component } from 'react';

import { Table } from 'antd-mobile';

import './index.less'

class EsintDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {}
  }

	/**
   * @functionName init
   * @description 页面初始化
   * @author 张航
   * @date 2022-01-11 11:15:44
   * @version V1.0.0
   */
	init () {
    console.log(this.props);
	}

	componentDidMount() {
		this.init();
	}

	render() {
    const {name = ''} = this.props.location.state
		return (
				<div>
					{name}
				</div>
		);
	}
}
export default EsintDetails;
