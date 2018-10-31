import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal } from 'antd';
const confirm = Modal.confirm;
@connect(({}) => ({}))
class UserTable extends Component {
  handleEdit = data => {
    const { onEdit } = this.props;
    onEdit && onEdit(data);
  };

  handleDel = data => {
    const self = this;
    const { onDel} = this.props;
    confirm({
      title: '删除确认',
      content: '确定要删除此用户吗？',
      onOk() {
        self.props.dispatch({
          type: 'consoleuser/deleteUser',
          payload: {
            userId: data.user_id
          },
          callback: (data) => {
            onDel && onDel(data);
          }
        })
      },
    });
  };

  rowKey = (data) => data.user_id

  render() {
    const columns = [
      {
        title: '用户名',
        dataIndex: 'nick_name',
        align: 'center',
        width:"20%"
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        align: 'center',
        width:"20%"
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        align: 'center',
        width:"20%"
      },
      {
        title: '参与团队情况',
        dataIndex: 'tenants',
        width:"30",
        align: 'center',
        render: (text, record, index) => text.map(item => (
          <a
            target="_blank"
            href="javascript:;"
            style={{ margin: '0 10px 0 0' }}
          >
            {item}
          </a>
            )),
      },
      {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width:"10%",
        render: (data, record, index) => (
          <div>
            <Button onClick={this.handleDel.bind(this, record)}>删除</Button>
          </div>
          ),
      },
    ];
    const { dataSource, pagination, loading} = this.props;
    return (
      <Table
        scroll={{ y: window.outerHeight-450 }}
        rowKey={this.rowKey}
        bordered
        columns={columns}
        pagination={pagination}
        dataSource={dataSource}
        loading={loading}
      />
    );
  }
}

export default UserTable;
