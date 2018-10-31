import React, { Component } from 'react';
import { connect } from 'dva';
import {Link} from 'react-router-dom';
import {Card, Modal, Icon, Button, Table, message} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import TeamSearch from '@/components/TeamManage/TeamSearch';
import TeamForm from '@/components/TeamManage/TeamForm';
const confirm = Modal.confirm;

@connect(({}) => ({}))
class TeamManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        dataSource: [],
        showAddTeam: false,
        toAddMemberTeam: false,
        pageNumber : 1,
		    pageSize : 50,
        total : 0,
        Eid:''
    };
  }

  componentDidMount(){
    this.loadList();
    this.props.dispatch({
      type:"teamManage/queryEid",
      callback:(data)=>{
        this.setState({Eid: data.bean.eid})
      }
    })
  }

  onPageChange = (pageNumber) => {
    this.setState({pageNumber},()=>{
        this.loadList();
     })
  }

  handleSearch = (tenant_alias)=>{
    this.props.dispatch({
      type:'teamManage/searchTeam',
      payload:{
        tenant_alias
      },
      callback:data=>{
        this.setState({
          total: data.list.length,
          dataSource: data.list
        });
      }
    })
    
  }
  loadList(){
      const {pageNumber,pageSize} = this.state;
      this.props.dispatch({
          type:'teamManage/searchAllTeam',
          payload: {
              pageNumber,
              pageSize
          },
          callback: data => {
              this.setState({ 
                  dataSource: (data.list||[]),
                  total:data.total,
                  loading:false
              })
          }
      })
  }
  
  handleCreateTeam = () => {
    const Eid = this.state.Eid;
    console.log(Eid)
		this.teamForm.validateFields((err, values) => {
			if(!err){
        this.props.dispatch({
          type: 'teamManage/createTeam',
          payload:{
            tenant_name: values['tenant_name'],
            enterprise_id: Eid,
            useable_regions: values['useable_regions']
          },
          callback:(data)=>{
            this.handleCancelCreateTeam();
            message.success(data.msg_show,2,()=>{
              this.reloadList();
            })
          }
        })
			}
		})
  }
  reloadList(){
    this.setState({
      pageNumber:1
    },()=>{
      this.loadList();
    })
	}
  
  handleCancelCreateTeam = () =>{
		this.setState({showAddTeam: false})
  }
  saveTeamFrom = (form) => {
		this.teamForm = form;
  }
  showCreateTeam = () =>{
		this.setState({showAddTeam: true})
	}
  handleDelete = (data) => {
    const tenant_name = data.tenant_name;
    confirm({
	    title: '删除确认',
	    content: '确定要删除此团队吗？',
	    onOk :()=> {
        this.props.dispatch({
          type:'teamManage/deleteTeam',
          payload:{
            tenant_name
          },
          callback:(data)=>{
            console.log(data)
            message.success(decodeURIComponent(data.msg_show),2,()=>{
              this.reloadList();
            })
          }
        })
	    }
	  });
  }
  render() {
    const columns = [
      {
        title: '团队别名',
        dataIndex: 'tenant_alias',
        width:"25%"
      },
      {
        title: '团队名称',
        dataIndex: 'tenant_name',
        width:"25%"
      }, 
      {
        title: '成员数量',
        dataIndex: 'user_num',
        width:"25%"
      },
      {
        title: '操作',
          dataIndex: 'action',
          width:"25%",
          key: 'action',
          render:(data, record,index) => {
            return (
                <div>
                    <Button onClick={this.handleDelete.bind(this, record)}>删除</Button>
                </div>
            )
          }
      }
      ];
    const {dataSource,pageNumber,pageSize,total,showAddTeam,toAddMemberTeam,loading} = this.state;
    return (
      <GridContent>
        <Card title={<div style={{display:"flex",alignItems:"center"}}>
					<TeamSearch onSearch={this.handleSearch} />
					<Button  onClick={this.showCreateTeam} type="primary" icon="plus" style={{marginLeft:"115%"}}>创建团队</Button>
					</div>}>
          <Table 
          scroll={{ y: window.outerHeight-450 }}
          loading={loading} bordered columns={columns}  pagination={{total:total, pageNumber: pageNumber, pageSize: pageSize, onChange:this.onPageChange}}  dataSource={dataSource} />
				</Card>
				{
					showAddTeam && <Modal
						title="创建团队"
						visible = {true}
						onOk={this.handleCreateTeam}
						onCancel = {this.handleCancelCreateTeam}
					>
						<TeamForm ref={this.saveTeamFrom}  />
					</Modal>
				}
				{
					toAddMemberTeam && <AddTeamMember tenantName={toAddMemberTeam.tenant_name} onOk={this.onAddMemberOk} onCancel={this.handleCancelAddMember} />
				}
      </GridContent>
    );
  }
}

export default TeamManage;
