import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { 
    Card, 
    Row, 
    Col, 
    Button,
    Dropdown,
    Icon,
    Menu,
    Tabs
 } from 'antd';

import { formatMessage } from 'umi/locale';
import DescriptionList from '@/components/DescriptionList';
import styles from './index.less';

const TabPane = Tabs.TabPane;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

@connect(({ loading }) => ({
    submitting: loading.effects['node/fetchNodeInfo']
  }))
class NodeDetailIndex extends Component {

    state = {
        loading: true,
        node:{},
        instances: [],
        currentNodeID:"",
    }

    componentWillMount(){
        this.loadData()
    }

    loadData = () => {
        this.loadNodeInfo()
    }

    loadNodeInfo = () => {
        const { dispatch, match } =  this.props
        const { regionID, nodeID } = match.params
        dispatch({
            type: 'node/fetchNodeInfo',
            payload: {
              regionID,
              nodeID
            },
            callback: (info) =>{
                if (info.bean){
                    this.setState({node:info.bean})
                    this.setState({instances:info.list})
                    this.setState({loading:false})
                    this.setState({currentNodeID:nodeID})
                }
            }
        })
    }

    tabchange = (key) => {
        switch (key) {
            case "monitor":
                break
            case "instance":
                break
            case "service":
                break
            default:
        }
    }

    render(){
        const {
            loading, 
            node, 
            currentNodeID,
            instances
        } = this.state
        const { match } = this.props
        const { nodeID } = match.params
        if (currentNodeID!=="" && nodeID !== currentNodeID){
            this.loadData()
         }
          const menu = (
            <Menu>
              <Menu.Item key="1">选项一</Menu.Item>
              <Menu.Item key="2">选项二</Menu.Item>
              <Menu.Item key="3">选项三</Menu.Item>
            </Menu>
          );
          const actions = (
            <Fragment>
              <ButtonGroup>
                <Button>操作</Button>
                <Button>操作</Button>
                <Dropdown overlay={menu} placement="bottomRight">
                  <Button>
                    <Icon type="ellipsis" />
                  </Button>
                </Dropdown>
              </ButtonGroup>
              <Button type="primary">主操作</Button>
            </Fragment>
          )
        return (
          <PageHeaderWrapper
            title={node&&node.ip||formatMessage({id:'app.node.detail.basic.title'})}
            action={actions}
            logo={
              <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
            }
          >
            <Row gutter={16}>
              <Col span={12}>
                <Card
                  bordered={false}
                  title={formatMessage({id:'app.node.detail.basic.title'})}
                  loading={false}
                  bodyStyle={{paddingBottom:0}}
                >
                  <DescriptionList col={2} style={{ marginBottom: 24 }}>
                    <Description term="节点ID">sadadasdadadd</Description>
                    <Description term="内网IP">192.168.0.1</Description>
                    <Description term="类型">管理节点</Description>
                    <Description term="所属数据中心">阿里云-上海</Description>
                    <Description term="标签"><a>编辑标签</a></Description>
                  </DescriptionList>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  bordered={false}
                  title={formatMessage({id:'app.node.detail.system.title'})}
                  loading={false}
                  bodyStyle={{paddingBottom:0}}
                >
                  <DescriptionList col={2} style={{ marginBottom: 24 }}>
                    <Description term="CPU">16 Core/ Amd64</Description>
                    <Description term="内存">64 GB</Description>
                    <Description term="磁盘">500 GB</Description>
                    <Description term="操作系统">Centos 7.4</Description>
                    <Description term="内核版本">1.10</Description>
                    <Description term="Docker版本">1.6.4</Description>
                  </DescriptionList>
                </Card>
              </Col>
            </Row>
            <Tabs defaultActiveKey="1" onChange={this.tabchange}>
              <TabPane tab={formatMessage({id:'app.node.detail.tab.monitor'})} key="monitor">Content of Tab Pane 1</TabPane>
              <TabPane tab={formatMessage({id:'app.node.detail.tab.service'})} key="service">Content of Tab Pane 3</TabPane>
              <TabPane tab={formatMessage({id:'app.node.detail.tab.instance'})} key="instance">Content of Tab Pane 2</TabPane>
            </Tabs>,
          </PageHeaderWrapper>
        )
    }
}

export default NodeDetailIndex