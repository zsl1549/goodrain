import React, {Component} from 'react';
import {Form, Input} from 'antd';
import TenantSelect from '@/components/TeamSleect';

const FormItem = Form.Item;

@Form.create()
class CreateUserForm extends Component {
	constructor(props){
		super(props);
		this.state={
			tenant:''
		}
	}
	shouldComponentUpdate(nextProps, nextState){
		return true;
	}

	checkTenant = (rule, value, callback) =>{
		if (value && value.tenant.length>0) {
	      callback();
	      return;
	    }
	    callback('请选择团队');
	}

	handleChange=(value)=>{
		this.setState({tenant:value})
	}
	render(){
		const { form } = this.props;
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
		return (
  <Form>
    <FormItem
      {...formItemLayout}
      label="用户名"
    >
      {form.getFieldDecorator('user_name', {rules: [{ required: true, message: '请填写用户名!' }]})(
        <Input placeholder="请填写用户名!" />
			)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="密码"
    >
      {form.getFieldDecorator('password', {rules: [{ required: true, message: '请填写密码!' }]})(
        <Input type="password" placeholder="请填写密码!" />
      )}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="所属团队"
    >
      {form.getFieldDecorator('tenant', {rules: [{ required: true, message: '请选择团队!', }]})(
        <TenantSelect placeholder="请输入团队名称进行查询"  onChange={this.state.handleChange}/>
		  )}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="邮箱"
    >
      {form.getFieldDecorator('email', {
		            rules: [
		            	{ required: true, message: '请填写邮箱!' },
		            	{ type: 'email', message: '邮箱格式不正确!' }
		            ]
		          })(
		<Input type="text" placeholder="请填写邮箱!" />
								)}
			</FormItem>
		</Form>
		)
	}
}

export default CreateUserForm