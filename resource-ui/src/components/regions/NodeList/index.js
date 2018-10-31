import React, { PureComponent } from 'react';
import { Table,Tag,Modal } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Link } from 'dva/router';
import { connect } from 'dva';

const { confirm } = Modal;

@connect()
class NodeList extends PureComponent { 
    constructor(props) {
      super(props);
      this.state={

      }
    }

    getTagColor = (role) => {
      switch (role){
        case "manage":
          return "blue"
        case "compute":
          return "green"  
        default:
          return "blue"
      }
    }

    getStatuColor = (status) => {
      switch (status){
        case "运行中":
          return "green"
        case "compute":
          return "green"  
        default:
          return "blue"
      }
    }

    getNodeStatus = (node) => {
      let message =""
      let color ="#52c41a"
      message+=formatMessage({id:`app.node.status.${node.status}`})
      if (node.unschedulable){
        message+=`(${formatMessage({id:`app.node.scheduler.false`})})`
        color="#1890ff"
      }
      if (!node.node_health){
        message+=`(${formatMessage({id:`app.node.health.false`})})`
        color="red"
      }
      return <span style={{color}}>{message}</span>
    }

    handleNodeAction = (nodeID, action) => {
      const { dispatch, regionID, loadNodes } =  this.props
      confirm({
        title: formatMessage({ id: 'app.confirm.nodeaction' }),
        content: formatMessage({ id: `app.confirm.nodeaction.${action}` }),
        onOk() {
          dispatch({
              type: 'node/setNodeStatus',
              payload: {
                regionID,
                nodeID,
                action
              },
              callback: () =>{
                if (loadNodes) {
                  loadNodes()
                }
              }
          })
        }
      })
    }

    getAction = (node) => {
      const deleteAction = (<a style={{marginRight:16}} onClick={()=>{this.handleNodeAction(node.uuid, "delete")}}><FormattedMessage id="app.node.action.delete" /></a>)
      const downAction = (<a style={{marginRight:16}} onClick={()=>{this.handleNodeAction(node.uuid, "offline")}}><FormattedMessage id="app.node.action.down" /></a>)
      const upAction = (<a style={{marginRight:16}} onClick={()=>{this.handleNodeAction(node.uuid, "online")}}><FormattedMessage id="app.node.action.up" /></a>)
      const reschedulerAction = (<a style={{marginRight:16}} onClick={()=>{this.handleNodeAction(node.uuid, "reschedulable")}}><FormattedMessage id="app.node.action.rescheduler" /></a>)
      const unschedulerAction = (<a style={{marginRight:16}} onClick={()=>{this.handleNodeAction(node.uuid, "unschedulable")}}><FormattedMessage id="app.node.action.unscheduler" /></a>)
      
      const actionlist = []
      switch (node.status){
        case "running":
          actionlist.push(downAction)
          actionlist.push(deleteAction)
          break
        case "offline":
          actionlist.push(upAction)
          actionlist.push(deleteAction)
          break
        default:
          actionlist.push(deleteAction)
      }
      // compute node
      if (node.role.indexOf("compute")>-1){
        if (node.unschedulable){
          actionlist.push(reschedulerAction)
        } else{
          actionlist.push(unschedulerAction)
        }
        }
      return (
        <span>
          {actionlist.map(item =>item)}
        </span>)
    }

    render(){
        const rowKey = (row) => row.host_id
        const { nodes, loading, pagination, regionID} = this.props
        const columns = [{
            title: formatMessage({id:"app.region.nodelist.hostname"}),
            dataIndex: 'host_name',
            key: 'host_name',
            render: (name,record) =>(
              <Link to={`/nodes/${regionID}/${record.uuid}`}>{name}</Link>
            )
          }, {
            title: formatMessage({id:"app.region.nodelist.role"}),
            dataIndex: 'role',
            key: 'role',
            render: (_,record) =>(
              <span>
                {record.role.map(item =><Tag color={this.getTagColor(item)} key={record.uuid+item}>{formatMessage({id:`app.node.role.${item}`})}</Tag>)}
              </span>
            )
          }, {
            title: formatMessage({id:"app.region.nodelist.ip"}),
            dataIndex: 'internal_ip',
            key: 'internal_ip',
          }, {
            title: formatMessage({id:"app.region.nodelist.resource"}),
            dataIndex: 'resource',
            key: 'address',
            render: (_,record) =>(
              <ul style={{marginBottom:0, paddingLeft:0}}>
                <li key={`${record.uuid}memory`}><span>{record.role.indexOf("compute")>-1?<FormattedMessage id="app.node.resource.memory" />:<FormattedMessage id="app.node.resource.actualmemory" />}</span> {Math.round(record.available_memory/1024/1024/1024)} GB</li>
                <li key={`${record.uuid}cpu`}><span>{record.role.indexOf("compute")>-1?<FormattedMessage id="app.node.resource.cpu" />:<FormattedMessage id="app.node.resource.actualcpu" />}:</span> {record.available_cpu} Core</li>
              </ul>
            )
          }, {
            title: formatMessage({id:"app.region.nodelist.status"}),
            dataIndex: 'status',
            key: 'status',
            render: (_,record) =>(
              this.getNodeStatus(record)
            )
          }, {
            title: formatMessage({id:"app.table.action"}),
            dataIndex: 'action',
            key: 'action',
            render: (_,node) =>(
              this.getAction(node)
            )
          }];
          return <Table 
            loading={loading} 
            rowKey={rowKey} 
            dataSource={nodes} 
            columns={columns}
            pagination={pagination}
          />
    }
}

export default NodeList