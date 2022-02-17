import React, { Component } from 'react';

import { Button, Modal, Card, InfiniteScroll, PullToRefresh } from 'antd-mobile';

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
      panelTitle: '新增',
      hasMore: false
    };
  }

  /**
   * @functionName getListData
   * @param {Object} page 分页参数
   * @param {Boolean} refresh 是否刷新
   * @description 获取表格数据
   * @author 张航
   * @date 2022-02-10 09:55:55
   * @version V1.0.0
   */
  async getListData (page = {}, refresh = false) {
    const { get } = api;

    const { pageNo = 1, pageSize = 2 } = page
    await axiosApi.post({
      url: get,
      data: {
        pageNo,
        pageSize
      }
    }).then(res => {
      const { response } = res;
      const hasMore = (response.pageNo * response.pageSize) < response.count;

      let { data } = this.state;
      if(refresh) {
        data = response.users
      } else {
        data = [...data, ...response.users];
      }
      
      this.setState({
        data,
        total: response.count,
        current: response.pageNo,
        pageSize: response.pageSize,
        hasMore
      })
    });

    return this.state.hasMore;
  }
  /**
   * @functionName loadMore
   * @description 加载更多
   * @author 张航
   * @date 2022-02-17 10:42:16
   * @version V1.0.0
   */
  loadMore () {
    const { current = 1, pageSize = 2 } = this.state;
    const pageNo = current + 1;
    return this.getListData({ pageNo, pageSize });
    
  }

  /**
   * @functionName doRefresh
   * @description 刷新列表
   * @author 张航
   * @date 2022-02-17 11:13:14
   * @version V1.0.0
   */
  doRefresh () {
    this.getListData({}, true);
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
    const { id } = data
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
    this.props.history.push({
      pathname: `edit/${row.id}`,
      // state: row
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
      pathname: 'edit/0'
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
      data = {},
      hasMore
    } = this.state;
    return (
      <div>
        <div className="handle-box"
          onClick={() => this.creatBtn()}>
          <AddOutline />
        </div>
        <PullToRefresh onRefresh={() => this.doRefresh()}>
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
                    <div style={{ textAlign: 'left' }}>
                      <div>年龄：{item.userAge}</div>
                      <div>性别：{item.userSex}</div>
                      <div>邮箱：{item.userMail}</div>
                      <div>手机号：{item.userPhone}</div>
                      <div>地址：{item.userAddress}</div>
                    </div>
                    <div style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                      <Button
                        color='primary'
                        size='small'
                        style={{ marginRight: '6px' }}
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
        </PullToRefresh>
        <InfiniteScroll loadMore={() => this.loadMore()} hasMore={hasMore} />
      </div>
    );
  }
}
export default EsintList;
