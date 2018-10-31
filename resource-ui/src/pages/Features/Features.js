import React, { Component } from 'react';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

class Features extends Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <div>
        <h1>特性管理</h1>
      </div>
    );
  }
}

export default Features;
