import React, {Component} from 'react';
import {Form, Input, Switch, Radio, Tooltip} from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
class NoticeForm extends Component {
	shouldComponentUpdate(nextProps, nextState){
		return true;
	}
	render(){
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
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
				label="标题"
				>
					  {getFieldDecorator('title', {
			            rules: [{ required: true, message: '请输入公告标题' }]
			          })(
			            <Input placeholder="请输入公告标题" />
			          )}
				</FormItem>
				<FormItem
				{...formItemLayout}
				label="公告内容"
				>
					  {getFieldDecorator('content', {
			            rules: [{ required: true, message: '请填写公告内容!' }]
			          })(
			            <TextArea autosize placeholder="请填写要发布的公告内容" />
			          )}
				</FormItem>
				<FormItem
				{...formItemLayout}
				label="公告等级"
				>
					  {getFieldDecorator('level', {
					  	initialValue: 'low',
			            rules: [{ required: true, message: '请填写公告内容!' }]
			          })(
			            	<RadioGroup>
			            	    <Tooltip title="高等级会以主动弹出框的形式出现在Rainbond">
						        <RadioButton value="high">高</RadioButton>
						        </Tooltip>
						        <RadioButton value="mid">中</RadioButton>
						        <RadioButton value="low">低</RadioButton>
						    </RadioGroup>
			          )}
				</FormItem>
                <FormItem
				{...formItemLayout}
				label="公告链接"
				>
					  {getFieldDecorator('a_tag_url', {
			            rules: [{ required: false }]
			          })(
			            <Input placeholder="选填" />
			          )}
				</FormItem>
				<FormItem
				{...formItemLayout}
				label="是否启用"
				>
					  {getFieldDecorator('active', {valuePropName: 'checked', initialValue: true})(
			             <Switch />
			          )}
				</FormItem>
			</Form>
		)
	}
}

const noticeForm = Form.create()(NoticeForm);


export default noticeForm