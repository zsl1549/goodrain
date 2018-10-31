import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Icon, Card, Row, Col, Input, notification, Modal } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeader from '@/components/PageHeader';
import { routerRedux } from 'dva/router';
import style from './index.less';
import RegionNodeList from '@/components/regions/NodeList';
import { formatMessage } from 'umi/locale';
import { Pie } from '@/components/Charts';
import { computeRatio } from '@/utils/resource';
import EditRegion from '@/components/regions/EditRegion'
import AddNode from '@/components/regions/AddNode';

const { confirm } = Modal;
const { Search } = Input;
const ButtonGroup = Button.Group;

@connect(({ region, loading }) => ({
  submitting: loading.effects['region/fetchRegionInfo'],
  regions: region.regions,
}))
class RegionIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {},
      nodes: [],
      nodePage: 1,
      nodePageSize: 10,
      nodeNum: 0,
      currentRegionID: '',
      loading: true,
      resourceLoading: true,
      regionResource: null,
      editRegion: false,
      addNode: false,
      serviceHealths: [],
      serviceHealthsLoading: true,
      groupsLoading: true,
    };
  }

  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ currentRegionID: '' });
    this.loadRegionInfo();
    this.loadNodelist();
    this.loadRegionResource();
  };

  loadNodelist = (search) => {
    const { dispatch, match } = this.props;
    const { regionID } = match.params;
    dispatch({
      type: 'node/fetchNodesList',
      payload: {
        regionID,
        search_key: search
      },
      callback: info => {
        this.setState({ nodes: info.list });
        this.setState({ nodeNum: info.total || info.list.length });
        this.setState({ currentRegionID: regionID });
        this.setState({ loading: false });
      },
    });
  };

  loadRegionInfo = () => {
    const { dispatch, match } = this.props;
    const { regionID } = match.params;
    dispatch({
      type: 'region/fetchRegionInfo',
      payload: {
        regionID,
      },
      callback: info => {
        // if region not exist,rewrite to /
        if (JSON.stringify(info) === '{}') {
          dispatch(
            routerRedux.push({
              pathname: '/',
            })
          );
        }
        this.setState({ region: info });
      },
    });
  };

  loadRegionResource = () => {
    const { dispatch, match } = this.props;
    const { regionID } = match.params;
    dispatch({
      type: 'region/fetchRegionResource',
      payload: {
        regionID,
      },
      callback: info => {
        this.setState({ resourceLoading: false });
        if (info.data) {
          this.setState({ regionResource: info.data.bean });
        }
      },
    });
  };

  loadRegionServiceHealth = () => {
    const { dispatch, match } = this.props;
    const { regionID } = match.params;
    dispatch({
      type: 'region/getRegionServiceHealth',
      payload: {
        regionID,
      },
      callback: info => {
        if (info.data) {
          this.setState({ serviceHealths: info.data.list });
          this.setState({ serviceHealthsLoading: false });
        }
      },
    });
  };

  handleRegionStatus = action => {
    const { dispatch, match } = this.props;
    const { regionID } = match.params;
    const { loadRegionInfo } = this;
    confirm({
      title: formatMessage({ id: 'app.confirm.regionstatus' }),
      content: formatMessage({ id: 'app.confirm.regionstatusbody' }),
      onOk() {
        dispatch({
          type: 'region/setRegionStatus',
          payload: {
            regionID,
            action,
          },
          callback: () => {
            loadRegionInfo();
          },
        });
      },
    });
  };

  handleDeleteRegion = () => {
    const { dispatch, match } = this.props;
    const { regionID } = match.params;
    confirm({
      title: formatMessage({ id: 'app.confirm.delete' }),
      content: formatMessage({ id: 'app.confirm.deleteregion' }),
      onOk() {
        dispatch({
          type: 'region/deleteRegion',
          payload: {
            regionID,
          },
          callback: () => {
            notification.info({
              message: '删除成功',
            });
            dispatch(
              routerRedux.push({
                pathname: '/',
              })
            );
          },
        });
      },
    });
  };

  handleSearchNode = search => {
    this.loadNodelist(search)
  };

  handleEditRegion = () => {
    this.setState({ editRegion: true });
  };

  handleAddNode = () => {
    this.setState({ addNode: true });
  }

  hideAddNode = () => {
    this.setState({ addNode: false });
  }

  AddNode = () => {
    notification.info({
      message:formatMessage({id:"app.node.form.success"}),
    })
    this.setState({ addNode: false });
    this.loadNodelist()
  }

  EditRegion = () => {
    notification.info({
      message:formatMessage({id:"app.region.regionmodal.success"}),
    })
    this.loadRegionInfo()
    this.setState({ editRegion: false });
  };

  hideEditRegion = () => {
    this.setState({ editRegion: false });
  };

  GetAction = () => {
    const { region } = this.state;
    const menu = (
      <Menu>
        <Menu.Item
          key="1"
          onClick={() => {
            this.handleEditRegion();
          }}
        >
          {formatMessage({ id: 'app.region.action.edit' })}
        </Menu.Item>
        {(region.status === '1' || region.status === '3') && (
          <Menu.Item
            key="2"
            onClick={() => {
              this.handleRegionStatus('offline');
            }}
          >
            {formatMessage({ id: 'app.region.action.down' })}
          </Menu.Item>
        )}
        {region.status === '2' && (
          <Menu.Item
            key="2"
            onClick={() => {
              this.handleRegionStatus('online');
            }}
          >
            {formatMessage({ id: 'app.region.action.up' })}
          </Menu.Item>
        )}
        {region.status === '2' && (
          <Menu.Item key="3" onClick={this.handleDeleteRegion}>
            {formatMessage({ id: 'app.region.action.delete' })}
          </Menu.Item>
        )}
      </Menu>
    );
    return (
      <Fragment>
        <ButtonGroup>
          <Button onClick={this.handleAddNode}>
            {formatMessage({ id: 'app.region.action.addnode' })}
          </Button>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button>
              <Icon type="ellipsis" />
            </Button>
          </Dropdown>
        </ButtonGroup>
        {region.status === '1' && (
          <Button
            onClick={() => {
              this.handleRegionStatus('maintain');
            }}
            type="primary"
          >
            {formatMessage({ id: 'app.region.action.setmaintenance' })}
          </Button>
        )}
        {region.status === '3' && (
          <Button
            onClick={() => {
              this.handleRegionStatus('cancel_maintain');
            }}
            type="primary"
          >
            {formatMessage({ id: 'app.region.action.cacelmaintenance' })}
          </Button>
        )}
      </Fragment>
    );
  };

  GetTitle = name => (
    <span className={style.title}>
      <div style={{display:"table-cell", marginRight:16}}>
        Dashboard:
      </div>
      <div className={style.titlename}>{name}</div>
    </span>
  );

  GetRegionStatus() {
    const { region } = this.state;
    switch (region.status) {
      case '0':
        return (
          <span style={{ color: 'blue' }}>{formatMessage({ id: 'app.region.status.edit' })} </span>
        );
      case '1':
        return (
          <span style={{ color: 'green' }}>
            {formatMessage({ id: 'app.region.status.running' })}
          </span>
        );
      case '2':
        return (
          <span style={{ color: 'blue' }}>{formatMessage({ id: 'app.region.status.down' })}</span>
        );
      case '3':
        return (
          <span style={{ color: 'blue' }}>
            {formatMessage({ id: 'app.region.status.maintenance' })}
          </span>
        );
      default:
        return formatMessage({ id: 'app.region.status.unknow' });
    }
  }

  render() {
    const Info = ({ title, value, bordered }) => (
      <div className={style.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    const { match } = this.props;
    const { regionID } = match.params;
    const {
      region,
      nodes,
      nodeNum,
      nodePage,
      nodePageSize,
      currentRegionID,
      loading,
      resourceLoading,
      regionResource,
      editRegion,
      addNode,
      serviceHealths,
      serviceHealthsLoading,
      groupsLoading
    } = this.state;
    if (currentRegionID !== '' && regionID !== currentRegionID) {
      this.loadData();
    }
    const nodepagination = {
      current: nodePage,
      pageSize: nodePageSize,
      total: nodeNum,
    };
    const nodeextra = (
      <Search
        placeholder="input node name or ip"
        onSearch={value => {
          this.handleSearchNode(value);
        }}
        style={{ width: 200 }}
      />
    );
    return (
      <GridContent>
        <div className={style.standardList}>
          <PageHeader title={this.GetTitle(region.region_alias)} action={this.GetAction()} />
          <Card style={{ marginTop: 16 }} loading={false}>
            <Row gutter={24}>
              <Col span={6}>
                <Info
                  title={formatMessage({ id: 'app.region.info.type' })}
                  value={region.scope ? formatMessage({ id: `app.region.regionmodal.scope.${region.scope}` }):formatMessage({ id: `app.region.info.private` })}
                  bordered
                />
              </Col>
              <Col span={6}>
                <Info
                  title={formatMessage({ id: 'app.region.info.version' })}
                  value={(region.version&&region.version.split("-",1)[0]) || '3.7.2'}
                  bordered
                />
              </Col>
              <Col span={6}>
                <Info
                  title={formatMessage({ id: 'app.region.info.nodeNum' })}
                  value={nodeNum}
                  bordered
                />
              </Col>
              <Col span={6}>
                <Info
                  title={formatMessage({ id: 'app.region.info.status' })}
                  value={this.GetRegionStatus()}
                />
              </Col>
            </Row>
          </Card>
          <Card style={{ border: 0 }} loading={resourceLoading}>
            <Row gutter={24}>
              <Col span={8}>
                {regionResource && (
                  <Pie
                    percent={computeRatio(regionResource.used_memory, regionResource.total_memory)}
                    subTitle={formatMessage({ id: 'app.region.resource.memory' })}
                    total={`${computeRatio(
                      regionResource.used_memory,
                      regionResource.total_memory
                    )}%`}
                    height={140}
                  />
                )}
              </Col>
              <Col span={8}>
                {regionResource && (
                  <Pie
                    percent={computeRatio(regionResource.used_cpu, regionResource.total_cpu)}
                    subTitle={formatMessage({ id: 'app.region.resource.cpu' })}
                    total={`${computeRatio(regionResource.used_cpu, regionResource.total_cpu)}%`}
                    height={140}
                  />
                )}
              </Col>
              <Col span={8}>
                {regionResource && (
                  <Pie
                    percent={computeRatio(regionResource.used_disk, regionResource.total_disk)}
                    subTitle={formatMessage({ id: 'app.region.resource.disk' })}
                    total={`${computeRatio(regionResource.used_disk, regionResource.total_disk)}%`}
                    height={140}
                  />
                )}
              </Col>
            </Row>
          </Card>
          <Card
            bodyStyle={{ paddingTop: 0 }}
            title={formatMessage({ id: 'app.region.nodelist' })}
            extra={nodeextra}
            style={{ marginTop: 16 }}
            loading={false}
          >
            <RegionNodeList regionID={regionID} loadNodes={this.loadNodelist} nodes={nodes} loading={loading} pagination={nodepagination} />
          </Card>
          {editRegion && <EditRegion onOk={this.EditRegion} onCancel={this.hideEditRegion} region={region} />}
          {addNode && <AddNode onOk={this.AddNode} onCancel={this.hideAddNode} regionID={regionID} />}
          <Row style={{marginTop: 16}} gutter={24}>
            <Col span={12}>
              <Card bodyStyle={{ paddingTop: 0 }} title={formatMessage({id: "app.region.servicehealty.title"})} loading={serviceHealthsLoading} />
            </Col>
            <Col span={12}>
              <Card bodyStyle={{ paddingTop: 0 }} title={formatMessage({id: "app.region.groups.title"})} loading={groupsLoading} />
            </Col>
          </Row>
        </div>
      </GridContent>
    );
  }
}

export default RegionIndex;
