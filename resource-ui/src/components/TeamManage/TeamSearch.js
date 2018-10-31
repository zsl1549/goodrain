import React, { Component } from 'react';
import { connect } from 'dva';
import {Form, Input, Select, Button, Icon } from 'antd';
import Selectios from './selections';

const Option = Select.Option;
const FormItem = Form.Item;

connect(({}) => ({}))
class TeamSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tenant_alias:''
		}
	}
	handleSearch = (e) => {
		const { onSearch } = this.props;
		onSearch && onSearch(this.state.tenant_alias);
	}
	onChange = (value) => {
		this.setState({ tenant_alias: value})
	}
	render() {
		const { team } = this.state;
		return (
			<Form layout="inline" style={{display:'inline-block'}}>
				<FormItem>
					<Selectios  placeholder="请输入团队别名进行查询"  style={{width:200}} onChange={this.onChange}/>
				</FormItem>
				<FormItem>
					<Button type="primary" onClick={this.handleSearch} icon="search">搜索</Button>
				</FormItem>
			</Form>
		)
	}
}

export default TeamSearch;