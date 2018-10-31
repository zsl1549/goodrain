import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Breadcrumb } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

class Monitor extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: true,
  };

  render() {
    return (
      <GridContent>
        <h1>节点监控</h1>
      </GridContent>
    );
  }
}

export default Monitor;
