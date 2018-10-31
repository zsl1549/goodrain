import React, { Component } from 'react';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

class Show extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: true,
  };

  render() {
    return (
      <div>
        <h1>个性表现</h1>
      </div>
    );
  }
}

export default Show;
