import React, { Component } from 'react';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

class CloudAuthorize extends Component {
  state = {
    loading: true,
    projectName: '资源管理后台',
  };

  render() {
    return (
      <div>
        <h1>云帮授权</h1>
      </div>
    );
  }
}

export default CloudAuthorize;
