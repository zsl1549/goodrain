import React, { Component } from 'react';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

class DataSource extends Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <div>
        <h1>环境对接</h1>
      </div>
    );
  }
}

export default DataSource;
