import React, {Component} from 'react';
import { connect } from 'dva';
import {Form, Input, Icon, Select} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

@connect(({region}) => ({
	region
}))
class TeamForm extends Component {
	constructor(props){
		super(props)
		this.state = {
			dataCenterList:[]
		}
	}
	componentWillMount(){
		this.loadDataCenter();
	}
	loadDataCenter(){
		const {region} = this.props;
		const {regions} = region;
		console.log(regions)
		this.setState({
			dataCenterList: regions
		})
	}
	
	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 4 }
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 18 }
	      }
	    };
	    const dataCenterList = this.state.dataCenterList;
		return (
			<Form>
				<FormItem
				{...formItemLayout}
				label="团队名称"
				>
					  {getFieldDecorator('tenant_name', {
			            rules: [{ required: true, message: '请填写团队名称!' }]
			          })(
			            <Input placeholder="请填写团队名称!" />
			          )}
				</FormItem>

				<FormItem
				{...formItemLayout}
				label="数据中心"
				>
					  {getFieldDecorator('useable_regions', {
					  	initialValue:[],
			            rules: [{ required: true, message: '请选择数据中心!' }]
			          })(
			            <Select
						    multiple
						    style={{ width: '100%' }}
						    placeholder="请选择数据中心"
						  >
						   {
								dataCenterList.map((item, index) => {
									return (
										<Option key={index} value={''+item.region_name}>{item.region_alias}</Option>
									)
								})
							}
						  </Select>
			          )}
				</FormItem>
			</Form>
		)
	}
}

const teamForm = Form.create()(TeamForm);


export default teamForm