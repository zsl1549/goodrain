import React, { Component } from 'react';
import {connect} from 'dva';
import {Select} from 'antd';

const Option = Select.Option;

@connect(({}) => ({}))
class TenantSelect extends Component {
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

  handleChange = (value) => {
    this.setState({tenant:value},()=>{
      this.props.onChange && this.props.onChange(value)
    })
    
  }

  componentWillUnmount(){
  	this.setState({data:[], tenant:''})
  }

  render() {
      var  options = this.state.data.map((d,index) => <Option value={d.tenant_name} key={index}>{d.tenant_alias}</Option>);
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

export default TenantSelect;