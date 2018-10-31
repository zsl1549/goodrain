import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal} from 'antd';
import NoticeForm  from './CreatNoticeForm';


@connect(({}) => ({}))
class CreateNotice extends Component {
	constructor(props) {
		super(props);
	}
	onOk = (e) => {
		const { onOk, dispatch, data } = this.props;

		this.form.validateFields((err, values) => {
			if(!err){
				if(data){
					console.log(data)
                    dispatch({
						type:'platformSetting/updateNotice',
						payload:{
							title:values.title,
							content:values.content,
							a_tag_url:values.a_tag_url,
							active:values.active,
							level:values.level,
							announcement_id:data.announcement_id
						},
						callback:(data)=>{
							onOk && onOk(data);
						}
                    })
				}else{
                    dispatch({
                        type:'platformSetting/addNotice',
                        payload:{
							title:values.title,
							content:values.content,
							a_tag_url:values.a_tag_url,
							active:values.active,
							level:values.level
                        },
                        callback:(data)=>{
                            onOk && onOk(data)
                        }
                    })
                }
			}
		})
	}
	reset() {
		this.form.resetFields();
	}
	saveForm = (form) => {
		this.form = form;
		if(this.form && this.props.data){
			this.form.setFieldsValue(this.props.data);
		}
	}
	onCancel = () => {
		const { onCancel } = this.props;
		onCancel && onCancel();
	}
	afterClose = () => {
		this.reset();
	}
	render() {
		const { visible }  = this.props;
		return (
			<Modal
				visible = {visible}
				title = '添加公告'
				onOk = {this.onOk}
				onCancel = {this.onCancel}
                afterClose = {this.afterClose}
                maskStyle={{backgroundColor:"rgba(59,59,59,0.4)"}}
			>
				<NoticeForm  ref={this.saveForm} />
			</Modal>
		)
	}
}

export default CreateNotice;