import React, { Component } from 'react';

import { Button, Modal, Toast, Card } from 'antd-mobile';

import { AddOutline } from 'antd-mobile-icons'

import { axiosApi } from '../../utils';

import api from '../../config/api';

import './index.less'

class EsintList extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();

    this.state = {
      data: [],
      total: 0,
      current: 1,
      panelShow: false,
      panelType: 0,
      panelTitle: '新增'
    };
  }

  /**
   * @functionName getListData
   * @param {Object} page 参数
   * @description 获取表格数据
   * @author 张航
   * @date 2022-02-10 09:55:55
   * @version V1.0.0
   */
  getListData (page = {}) {
    const {get} = api;

    const { pageNo = 1, pageSize = 1 } = page
    axiosApi.post({
      url: get,
      data: {
        pageNo,
        pageSize
      }
    }).then(res => {
      console.log(res);
      const { response } = res
      this.setState({
        data: response.users,
        total: response.count,
        current: response.pageNo,
        pageSize: response.pageSize
      })
    });
  }

  /**
   * @functionName changeList
   * @param {Object} page 参数
   * @description 分页改变
   * @author 张航
   * @date 2022-02-14 15:39:39
   * @version V1.0.0
   */
  changeList (page) {
    console.log(page)
    const {current:pageNo, pageSize} = page;
    this.getListData({pageNo, pageSize});
  }

  /**
   * @functionName deleteData
   * @param {Object} data 表单数据
   * @description 删除数据
   * @author 张航
   * @date 2022-02-14 14:39:36
   * @version V1.0.0
   */
  deleteData (data) {
    const {id} = data
    axiosApi.post({
      url: api.delete,
      data: {
        ids: [id]
      }
    }).then(res => {
      this.getListData();
    });
  }

  /**
   * @functionName deleteBtn
   * @param {Object} row 行数据
   * @description 删除按钮
   * @author 张航
   * @date 2022-02-14 10:05:10
   * @version V1.0.0
   */
  deleteBtn (row) {
    console.log(row);
    Modal.confirm({
      title: '是否删除该数据？',
      content: '',
      okText: '确定',
      // okType: 'danger',
      cancelText: '取消',
      okButtonProps: {
        danger: true
      },
      onOk: () => {
        this.deleteData(row);
      },
      onCancel () {
        console.log('Cancel');
      },
    });
  }

  /**
   * @functionName editBtn
   * @param {Object} row 行数据
   * @description 编辑按钮
   * @author 张航
   * @date 2022-02-14 10:03:47
   * @version V1.0.0
   */
  editBtn (row) {
    console.log(row)
    this.props.history.push({
      pathname: 'edit',
      state: row
    })
  }

  /**
   * @functionName creatBtn
   * @description 新增按钮
   * @author 张航
   * @date 2022-02-14 11:20:52
   * @version V1.0.0
   */
  creatBtn () {
    this.props.history.push({
      pathname: 'edit'
    })
  }

  /**
   * @functionName toPage
   * @param {Object} row 行数据
   * @description 跳转页面
   * @author 张航
   * @date 2022-02-07 15:27:22
   * @version V1.0.0
   */
  toPage (row) {
    this.props.history.push({
      pathname: 'details',
      state: row
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
    this.getListData()
  }

  componentDidMount () {
    this.init();
  }

  render () {
    const {
      columns = [],
      data = {},
      total = 0,
      current = 1,
      pageSize = 1,
      panelShow,
      panelTitle
    } = this.state;
    return (
      <div>
        <div className="handle-box"
        onClick={() => this.creatBtn()}>
          <AddOutline />
        </div>
        <div>
          {
            data.map(item => {
              return (
                <Card
                  title={
                    <div style={{ fontWeight: 'normal' }}>
                      {item.userName}
                    </div>
                  }
                  // onBodyClick={() => this.onBodyClick()}
                  // onHeaderClick={() => this.onHeaderClick()}
                  style={{ borderRadius: '16px' }}
                  key={item.id}
                >
                  <div style={{textAlign: 'left'}}>
                    <div>年龄：{item.userAge}</div>
                    <div>性别：{item.userSex}</div>
                    <div>邮箱：{item.userMail}</div>
                    <div>手机号：{item.userPhone}</div>
                    <div>地址：{item.userAddress}</div>
                  </div>
                  <div style={{textAlign: 'right'}}  onClick={e => e.stopPropagation()}>
                    <Button
                      color='primary'
                      size='small'
                      style={{marginRight: '6px'}}
                      onClick={() => this.editBtn(item)}
                    >
                      编辑
                    </Button>
                    <Button
                      color='danger'
                      size='small'
                      onClick={() => this.deleteBtn(item)}
                    >
                      删除
                    </Button>
                  </div>
                </Card>
              )
            })

          }  
        </div>  
      </div>
    );
  }
}
export default EsintList;
