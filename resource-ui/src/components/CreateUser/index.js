import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import CreateUserForm  from '@/components/CreatUserForm';

@connect(({}) => ({}))
class CreateUser extends Component {

  onOk = () => {
    const {onOk, dispatch } = this.props;
    this.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        dispatch({
          type: 'consoleuser/addUser',
          payload:{
            ...values,
            tenant_name: values.tenant
          },
          callback: (data) =>{
            if (onOk){
              onOk(data)
            } 
          }  
        },
        )
      }
    });
  };

  saveForm = form => {
    this.form = form;
  };

  afterClose = () => {
    this.reset();
  };

  reset() {
    this.form.resetFields();
  }

  render() {
    const { visible, onCancel } = this.props;
    return (
      <Modal
        visible={visible}
        title="添加用户"
        onOk={this.onOk}
        onCancel={onCancel}
        afterClose={this.afterClose}
      >
        <CreateUserForm ref={this.saveForm} />
      </Modal>
    );
  }
}

export default CreateUser;
