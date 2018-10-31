import React, { Component } from 'react';
import { connect } from 'dva';
import Search from '@/components/ConsoleUserSearch';
import UserTable from '@/components/ConsoleUserTable';
import CreateUser from '@/components/CreateUser'
import { Row, Col, Card, Button, message} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

@connect(({}) => ({}))
class TeamManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageSize: 25,
      pageNumber: 1,
      total: 0,
      visibleCreate: false,
      loading: true
    };
  }

  componentWillMount() {
    this.loadList();
  }

  // 添加用户
  handleCreate = () => {
    this.setState({ visibleCreate: true });
  };

  handleCreateOk = (data) => {
		this.setState({visibleCreate: false});
		message.success(data.msg_show||'创建成功',2,()=>{
      this.loadList();
    })
	}

  onPageChange = (pageNumber, pageSize) => {
    this.setState({pageNumber},()=>{
       this.loadList();
    })
  };

  handleDel = () => {
    message.success('删除成功',2,()=>{
      this.loadList();
    });
		
  }

  handleCreateCancel = () => {
		this.setState({visibleCreate: false});
  }

  saveSearch = (search) =>{
    this.search = search;
  }

  onSearch = (data) => {
    this.setState({
      total: data.total
    })
		this.setState({list:data.list})
	}

  // 加载列表
  loadList() {
    const { pageSize, pageNumber } = this.state;
    const {dispatch} = this.props
    dispatch({
      type: 'consoleuser/getAllUserList',
      payload: {
        pageSize,
        pageNumber,
      },
      callback: data => {
        this.setState({ 
          list:  data.list,
          total: data.total,
          loading: false
        });
      },
    });
  }

  render() {
    const { total, pageNumber, pageSize, list, visibleCreate,loading  } = this.state;
    return (
      <GridContent>
        <Card
          title={
            <Row className="btns-area" style={{display:"flex",alignItems:"center"}}>
              <Search ref={this.saveSearch} onSearch={this.onSearch} pageNumber={pageNumber} pageSize={pageSize} />
              <Button onClick={this.handleCreate} type="primary" icon="plus" style={{marginLeft:"115%"}}>
                添加用户
              </Button>
            </Row>
          }
        >
          <UserTable
            onDel={this.handleDel}
            pagination={{
              total,
              onChange: this.onPageChange,
              current: pageNumber,
              pageSize,
            }}
            dataSource={list}
            loading={loading}
          />
          {visibleCreate && <CreateUser onOk={this.handleCreateOk} onCancel={this.handleCreateCancel} visible={visibleCreate} />}
          
        </Card>
      </GridContent>
    );
  }
}

export default TeamManage;
