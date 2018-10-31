import React, { Component } from 'react';
import {connect} from 'dva';
import {Select} from 'antd';

const Option = Select.Option;

@connect(({}) => ({}))
class Selectios extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  	    data: [],
        tenant: undefined
    }
  }
  handleSearch = (value) => {
    this.props.dispatch({
      type:'global/searchTenant',
      payload: {
        tenant: value
      },
      callback: data => {
        this.setState({ data: (data.list||[])})
      }
    })
  }
  handleChange = (key) => {
    //setState异步回调
    this.setState({ tenant:key },()=>{
      const {tenant} = this.state;
      this.props.onChange(tenant);
    });
  }
  componentWillUnmount(){
  	this.setState({data:[], tenant:''});
  }
  render() {
      var  options = this.state.data.map(d => <Option key={d.tenant_alias}>{d.tenant_alias}</Option>);
    return (
      <Select
        showSearch
        placeholder={this.props.placeholder}
        value={this.state.tenant}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange}
        notFoundContent={null}
        onSearch={this.handleSearch}
        style={this.props.style}
      >
        {options}
      </Select>
    );
  }
}

export default Selectios;