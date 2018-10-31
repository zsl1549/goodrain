import React, { Component } from 'react';
import { Form, Input, Select, Button, Icon, message } from 'antd';
import { connect } from 'dva';
// import { searchUserList } from '../utils/user-api-util';
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({}) => ({}))
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenant: '',
    };
  }
  handleKeydown = (e)=>{
    if(e.keyCode == 13){
      this.loadList();
    }
  }
  handleSearch = e => {
    this.loadList();
  };
  loadList = () =>{
    if (this.state.tenant == '') {
      message.info('您还没有输入搜索内容！', 2);
    } else {
      const {tenant} = this.state
      const {pageNumber,pageSize,dispatch} = this.props
      dispatch({
        type:'consoleuser/searchUser',
        payload: {
          pageSize,
          pageNumber,
          tenant
        },
        callback: (data) => {
          const { onSearch } = this.props;
          onSearch && onSearch(data);
        }
      })
    }
  }
  getData = () => {
    return this.state.tenant;
  };
  onChange = e => {
    this.setState({ tenant: e.target.value });
  };

  render() {
    return (
      <Form layout="inline" style={{ display: 'inline-block' }}>
        <FormItem>
          <Input
            style={{ width: '200px', fontSize: '12px' }}
            placeholder="请输入用户名/手机号/邮箱进行查询"
            onChange={this.onChange}
            onKeyDown={this.handleKeydown}
          />
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={this.handleSearch} icon="search">
            搜索
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Search;
