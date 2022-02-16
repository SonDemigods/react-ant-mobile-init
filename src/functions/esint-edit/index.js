import React, { Component } from 'react';

import { Button, Modal, Form, Input, Stepper, Selector } from 'antd-mobile';

import { axiosApi } from '../../utils';

import api from '../../config/api';

import './index.less'

class EsintEdit extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();

    this.state = {
      data: []
    };
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
      this.back();
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
      this.back();
    });
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
   * @functionName getFooterDom
   * @return {Object} 返回结果
   * @description 获取页脚dom
   * @author 张航
   * @date 2022-02-10 14:15:47
   * @version V1.0.0
   */
  getFooterDom () {
    return (
      <div style={{ marginTop: '10px' }}>
        <Button
          color="primary"
          block
          size='large'
          onClick={() => this.saveBtn()}
        >保存</Button>
      </div>
    )
  }

  /**
   * @functionName back
   * @description 返回上一页
   * @author 张航
   * @date 2022-02-16 18:08:17
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
  init () {
    const {state = {}} = this.props.location;
    this.setFormData(state);
  }

  componentDidMount () {
    this.init();
  }

  render () {
    const {
      data = {}
    } = this.state;
    return (
      <div>
        
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
              {/* <Input placeholder="请填写年龄" /> */}
              <Stepper />
              {/* <InputNumber style={{width: '100%'}} placeholder="请填写年龄" /> */}
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
              <Selector
                columns={2}
                // multiple
                options={[
                  { label: '男', value: '男' },
                  { label: '女', value: '女' }
                ]}
              />
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

          {this.getFooterDom()}
      </div>
    );
  }
}
export default EsintEdit;
