import React, { Component } from 'react';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

class Notice extends Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <div>
        <h1>公告管理</h1>
      </div>
    );
  }
}

export default Notice;
