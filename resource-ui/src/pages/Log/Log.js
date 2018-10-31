import React, { Component } from 'react';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

class Log extends Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <div>
        <h1>日志管理</h1>
      </div>
    );
  }
}

export default Log;
