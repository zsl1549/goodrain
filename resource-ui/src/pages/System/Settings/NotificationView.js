import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import { List, Row, Card, Button, message,Modal} from 'antd';
import CreateNotice from '@/components/NotificationView/CreatNotice'

const confirm = Modal.confirm;
@connect(({}) => ({}))

class NotificationView extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:'',
      page_size: 50,
      page_num: 1,
      visibleCreate: false,
      visibleUpdate: false,
      editData:''
    }
  }

  componentDidMount(){
    this.load();
  }
  handlePagition(page){
    this.setState({
      page_num:page
    },()=>{
      this.load();
    })
  }
  /**删除 */
  handleDel(item){
    const that = this;
    confirm({
      title: '删除确认',
      content: '确定要删除此公告吗？',
      onOk(){
        that.props.dispatch({
          type:"platformSetting/delNotification",
          payload:{
            announcement_id:item.announcement_id
          },
          callback:data=>{
            console.log(data)
            message.success(data.msg_show||'删除成功',2,()=>{
              that.load();
            })
          }
        })
      }
    })
  }
  /**修改 */
  handleMod(item){
    this.setState({
      editData: item,
      visibleUpdate:true
    })
  }
  /**添加 */
  handleAdd(item){
    // alert(item.announcement_id)
    this.setState({
      visibleCreate:true
    })
  }
  handleCreateOk=()=>{
    this.setState({visibleCreate: false});
		message.success('创建成功');
		this.load();
  }
  handleCreateCancel =()=>{
    this.setState({visibleCreate: false});
  }
  handleEditCancel =()=>{
    this.setState({visibleUpdate: false});
  }
  handleEditOk =(data)=>{
    this.setState({visibleUpdate: false});
		message.success(data.msg_show,2,()=>{
      this.load();
    });
  }
  /**初始化 */
  load(){
    const {page_num,page_size} = this.state;
    this.props.dispatch({
      type:'platformSetting/notification',
      payload:{
        page_num,
        page_size
      },
      callback:(data)=>{
        this.setState({data:data.list})
      }
    })
  }
  render() {
    const {data,visibleCreate,visibleUpdate} = this.state;
    return (
       <div>
         <List
       dataSource={data}
       bordered={false}
       pagination={{
         onChange: (page) => {
           this.handlePagition(page);
          }
        }}
        renderItem={item => (
          <List.Item>
           <Card 
           style={{width:"100%"}}
           bodyStyle={{padding:"5px 24px"}}
           headStyle={{borderBottom:"0px solid black"}}
           bordered={false}
           title={item.title}>
           {item.content}
             <Card
             bodyStyle={{padding:"5px 0px",color:"#c9c9c9"}}
             bordered={false}
             >
              {item.create_time} | 公告等级:[{item.level=='high'?'高':item.level=='mid'?'中':'低'}]
              <Button type="primary" size="small" style={{float:"right"}} onClick={this.handleDel.bind(this, item)}>删除</Button>
              <Button type="primary" size="small" style={{float:"right",margin:"0 2px"}} onClick={this.handleMod.bind(this, item)}>修改</Button>
              <Button type="primary" size="small" style={{float:"right"}} onClick={this.handleAdd.bind(this, item)}>添加</Button>
             </Card>

             {visibleCreate && <CreateNotice onOk={this.handleCreateOk} onCancel={this.handleCreateCancel} visible={this.state.visibleCreate}/>}
             {visibleUpdate && <CreateNotice data={this.state.editData} onOk={this.handleEditOk} onCancel={this.handleEditCancel} visible={this.state.visibleUpdate}/>}
           </Card>
         </List.Item>
       )}
     /> 
       </div>
    );
  }
}

export default NotificationView;
