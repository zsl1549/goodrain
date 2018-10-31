import React, { Component } from 'react';
import { Form, Select, Input, Radio, Modal } from 'antd';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;


// node type list
const nodeType = [{
		value: 'compute',
		text: formatMessage({id:'app.node.role.compute'})
},{
		value: 'manage',
		text: formatMessage({id:'app.node.role.manage'})
}]

@Form.create()
@connect()
class AddNode extends Component {
	constructor(props) {
        super(props);
        this.state = {

        }
	}

	checkPassword = (rule, value, callback) => {
        const { form } = this.props
		const visitType = form.getFieldValue("login_type");
		if (visitType === 'ssh') {
	      callback();
	      return;
	    }
	    if (visitType !== 'ssh' && value) {
	      callback();
	      return;
	    }
	    callback(formatMessage({id:"app.node.form.password.message"}));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { onOk, form, dispatch, regionID } = this.props;
        const { validateFields } = form
        validateFields((err, values) => {
          if (!err && onOk) {
            dispatch({
              type: 'node/addNode',
              payload: {
                regionID,
                ...values
              },
              callback: (response) => {
                if (response && response.code==="0000" && onOk){
                  onOk()
                }
              },
            });
          }else{
            console.log("node add error:",err)
          }
        });
      }

	render() {
		const { form: {getFieldDecorator, getFieldValue}, onCancel } = this.props;
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
        const visitType = getFieldValue('login_type') || 'ssh';
        const formdata = (
          <Form>
            <FormItem
              {...formItemLayout}
              label={formatMessage({id:"app.node.form.type"})}
            >
              {getFieldDecorator('node_type', {
                        rules: [{ required: true, message: formatMessage({id:"app.node.form.type.message"}) }],
                        initialValue:['compute']
                        })(
                          <Select 
                            mode="multiple"
                          >
                            {
                                nodeType.map((item) => (
                                  <Option key={item.value} value={item.value}>{item.text}</Option>
                                ))
                            }
                          </Select>
                        )
            }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="IP"
            >
              {getFieldDecorator('host', {
                                        initialValue:'',
                                        rules: [{ required: true, message: formatMessage({id:"app.node.form.ip.message"}) },{pattern:/^([^0]\d{1,2})\.((\d{1,3})\.){2}\d{1,3}$/, message:'格式不正确'}]
                                    })(
                                      <Input placeholder={formatMessage({id:"app.node.form.ip.message"})} />
                                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({id:"app.node.form.login"})}
            >
              {getFieldDecorator('login_type', {
                                        initialValue: "ssh",
                                        rules: [{ required: true, message: formatMessage({id:"app.node.form.login.message"}) }]
                                    })(
                                      <RadioGroup>
                                        <Radio value="ssh">{formatMessage({id:"app.node.form.login.option.ssh"})}</Radio>
                                        <Radio value="root">{formatMessage({id:"app.node.form.login.option.root"})}</Radio>
                                      </RadioGroup>
                                )}
            </FormItem>
            <FormItem
              style={{display:visitType === 'ssh' ? 'none': ''}}
              {...formItemLayout}
              label={formatMessage({id:"app.node.form.password"})}
            >
              {getFieldDecorator('root_pwd', {
                        initialValue:'',
                        rules: [{ validator: this.checkPassword }]
                    })(
                      <Input type="password" />
                    )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({id:"app.node.form.autoinstall"})}
            >
              {getFieldDecorator('autoinstall', {
                        initialValue:false,
                        rules: [{required: true}]
                    })(
                      <RadioGroup>
                        <Radio value>{formatMessage({id:"app.node.form.autoinstall.option.yes"})}</Radio>
                        <Radio value={false}>{formatMessage({id:"app.node.form.autoinstall.option.no"})}</Radio>
                      </RadioGroup>
                    )}
            </FormItem>
          </Form>
        )
		return (
  <Modal
    title={formatMessage({ id: `app.node.form.title` })}
    onOk={this.handleSubmit}
    visible
    width={600}
    onCancel={onCancel}
  >
    {formdata}
  </Modal>
		)
	}
}

export default AddNode;