import React, { Component } from 'react';

import { ConfigProvider, Table, Drawer, Button, Modal, Form, Input, InputNumber, Select } from 'antd';

import zhCN from 'antd/lib/locale/zh_CN';

import { ExclamationCircleOutlined } from '@ant-design/icons';

// import RightPanel from '../../components/RightPanel';

import { axiosApi } from '../../utils';

import api from '../../config/api';

import './index.less'

class EsintList extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();

    this.state = {
      columns: [
        {
          title: '姓名',
          dataIndex: 'userName',
          key: 'userName',
          render: (text, record) => <a onClick={() => this.toPage(record)}>{text}</a>,
        },
        {
          title: '年龄',
          dataIndex: 'userAge',
          key: 'userAge',
        },
        {
          title: '性别',
          dataIndex: 'userSex',
          key: 'userSex',
        },
        {
          title: '电话',
          dataIndex: 'userPhone',
          key: 'userPhone',
        },
        {
          title: '邮箱',
          dataIndex: 'userMail',
          key: 'userMail',
        },
        {
          title: '地址',
          dataIndex: 'userAddress',
          key: 'userAddress',
        },
        {
          title: '操作',
          dataIndex: '',
          key: 'x',
          render: (text, record, index) => {
            return (
              <div>
                <Button
                  type="primary"
                  style={{ marginRight: '6px' }}
                  onClick={() => this.editBtn(record)}
                >编辑</Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => this.deleteBtn(record)}
                >删除</Button>
              </div>
            )
          },
        },
      ],
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
   * @functionName updateData
   * @param {Object} data 表单数据
   * @description 更新数据
   * @author 张航
   * @date 2022-02-14 14:39:32
   * @version V1.0.0
   */
  updateData (data) {
    axiosApi.post({
      url: api.update,
      data
    }).then(res => {
      this.getListData();
      this.closePanel();
    });
  }

  /**
   * @functionName createData
   * @param {Object} data 表单数据
   * @description 新增数据
   * @author 张航
   * @date 2022-02-14 14:39:36
   * @version V1.0.0
   */
  createData (data) {
    axiosApi.post({
      url: api.create,
      data
    }).then(res => {
      this.getListData();
      this.closePanel();
    });
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
      icon: <ExclamationCircleOutlined />,
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
    this.setState({
      panelTitle: '编辑',
      panelType: 1
    });
    this.openPanel(row);
  }

  /**
   * @functionName saveBtn
   * @description 保存按钮
   * @author 张航
   * @date 2022-02-14 11:20:52
   * @version V1.0.0
   */
  saveBtn () {
    const dom = this.formRef.current;

    dom.validateFields().then(res => {
      const { panelType } = this.state
      if (panelType === 1) {
        this.updateData(res);
      } else {
        this.createData(res);
      }
    }).catch(err => {
      console.log(err)
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
    this.setState({
      panelShow: true,
      panelTitle: '新增',
      panelType: 0
    })
  }

  /**
   * @functionName openPanel
   * @description 打开面板
   * @author 张航
   * @date 2022-02-10 17:15:11
   * @version V1.0.0
   */
  openPanel (data = {}) {
    this.setState({
      panelShow: true
    }, () => {
      this.setFormData(data);
    });
  }

  /**
   * @functionName closePanel
   * @description 关闭面板
   * @author 张航
   * @date 2022-02-14 10:02:12
   * @version V1.0.0
   */
  closePanel () {
    this.resetFormData();
    this.setState({
      panelShow: false
    });
  }

  /**
   * @functionName setFormData
   * @param {Object} data 数据
   * @description 设置表单数据
   * @author 张航
   * @date 2022-02-14 15:55:51
   * @version V1.0.0
   */
  setFormData (data) {
    this.formRef.current.setFieldsValue(data);
  }

  /**
   * @functionName resetFormData
   * @description 重置表单数据
   * @author 张航
   * @date 2022-02-14 15:55:27
   * @version V1.0.0
   */
  resetFormData () {
    this.formRef.current.resetFields();
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
   * @functionName getFooterDom
   * @return {Object} 返回结果
   * @description 获取页脚dom
   * @author 张航
   * @date 2022-02-10 14:15:47
   * @version V1.0.0
   */
  getFooterDom () {
    return (
      <div style={{ textAlign: 'right' }}>
        <Button
          type="primary"
          style={{ marginRight: '6px' }}
          onClick={() => this.saveBtn()}
        >保存</Button>
        <Button onClick={() => this.closePanel()}>取消</Button>
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
        <div className="handle-box">
          <Button
            type="primary"
            onClick={() => this.creatBtn()}
          >新增</Button>
        </div>
        <ConfigProvider locale={zhCN}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => {
            return record.id
          }}
          pagination={{
            defaultCurrent: 1,
            showSizeChanger: true,
            showQuickJumper: true,
            total: total,
            current: current,
            pageSize: pageSize
          }}
          onChange={(pagination) => this.changeList(pagination)}
        />
        </ConfigProvider>
        

        <Drawer
          title={panelTitle}
          placement="right"
          closable={false}
          visible={panelShow}
          footer={
            this.getFooterDom()
          }
        >
          <Form
            ref={this.formRef}
            labelCol={{ span: 5 }}
          >
            <Form.Item
              name="id"
              label="主键"
              hidden
            >
              <Input placeholder="请填写主键" />
            </Form.Item>
            <Form.Item
              name="userName"
              label="姓名"
              rules={[
                {
                  required: true,
                  message: '请填写姓名!',
                },
              ]}
            >
              <Input placeholder="请填写姓名" />
            </Form.Item>
            <Form.Item
              name="userAge"
              label="年龄"
              rules={[
                {
                  type: 'number',
                  min: 0,
                  message: '年龄不能小于0!',
                },
                {
                  type: 'number',
                  max: 150,
                  message: '年龄不能大于150!',
                },
                {
                  required: true,
                  type: 'number',
                  message: '请填写年龄!',
                },
              ]}
            >
              <InputNumber style={{width: '100%'}} placeholder="请填写年龄" />
            </Form.Item>
            <Form.Item
              name="userSex"
              label="性别"
              rules={[
                {
                  required: true,
                  message: '请选择性别!',
                },
              ]}
            >
              <Select
                placeholder="请选择性别"
                allowClear
              >
                <Select.Option value="男">男</Select.Option>
                <Select.Option value="女">女</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="userPhone"
              label="手机号"
              rules={[
                {
                  required: true,
                  message: '请填写手机号!',
                },
              ]}
            >
              <Input placeholder="请填写手机号" />
            </Form.Item>
            <Form.Item
              name="userMail"
              label="邮箱"
              rules={[
                {
                  type: 'email',
                  message: '请填写正确的邮箱!',
                },
                {
                  required: true,
                  message: '请填写邮箱!',
                },
              ]}
            >
              <Input placeholder="请填写邮箱" />
            </Form.Item>
            <Form.Item
              name="userAddress"
              label="地址"
              rules={[
                // {
                //   required: true,
                //   message: '请填写地址!',
                // },
              ]}
            >
              <Input placeholder="请填写地址" />
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}
export default EsintList;
