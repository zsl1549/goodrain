import React, { PureComponent } from 'react';
import { Radio, Input, Modal, Form } from 'antd';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create()
@connect()
class RegionEdit extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      region: props.region,
      mode: props.region ? 'edit' : 'add',
      showssl: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { onOk, form, dispatch } = this.props;
    const { validateFields } = form
    const { mode, region } = this.state
    validateFields((err, values) => {
      if (!err && onOk) {
        dispatch({
          type: mode==='edit'?'region/setRegionInfo':'region/addRegionInfo',
          payload: {
            regionID: region?region.region_id:'',
            ...values
          },
          callback: (response) => {
            if (response && response.code==="0000" && onOk){
              onOk()
            }
          },
        });
      }
    });
  }

  handleURLChange = (e) => {
    if (e.target.value.startsWith("https")) {
      this.setState({showssl: true})
    }else{
      this.setState({showssl: false})
    }
  }

  render() {
    const { mode, region, showssl } = this.state;
    const { onCancel, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };
    return (
      <Modal
        title={formatMessage({ id: `app.region.regionmodal.${mode}` })}
        onOk={this.handleSubmit}
        visible
        width={700}
        onCancel={onCancel}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: `app.region.regionmodal.alias` })}
          >
            {getFieldDecorator('region_alias', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: `app.region.regionmodal.alias.required` }),
                },
              ],
              initialValue: region && region.region_alias,
            })(
              <Input placeholder={formatMessage({ id: `app.region.regionmodal.alias.required` })} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: `app.region.regionmodal.name` })}
          >
            {getFieldDecorator('region_name', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: `app.region.regionmodal.name.message` }),
                },
                {
                  pattern: '^[a-zA-Z0-9-]+$',
                  message: formatMessage({ id: `app.region.regionmodal.name.rule` }),
                },
              ],
              initialValue: region && region.region_name,
            })(
              <Input
                type="text"
                placeholder={formatMessage({ id: `app.region.regionmodal.name.message` })}
                disabled={!!region}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={formatMessage({ id: `app.region.regionmodal.api` })}>
            {getFieldDecorator('url', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: `app.region.regionmodal.api.rule` }),
                },
              ],
              initialValue: region && region.url,
            })(
              <Input
                type="text"
                onChange={this.handleURLChange}
                placeholder={formatMessage({ id: `app.region.regionmodal.api.rule` })}
              />
            )}
          </FormItem>
          {
            showssl&&(
              <div>
                <FormItem
                  {...formItemLayout}
                  label={formatMessage({ id: `app.region.regionmodal.ca` })}
                >
                  {getFieldDecorator('ssl_ca_cert', {
              rules: [
                {
                  required: false,
                  message: formatMessage({ id: `app.region.regionmodal.ca.rule` }),
                },
              ],
              initialValue: region && region.ssl_ca_cert,
            })(<Input placeholder={formatMessage({ id: `app.region.regionmodal.ca.rule` })} />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={formatMessage({ id: `app.region.regionmodal.cert` })}
                >
                  {getFieldDecorator('cert_file', {
            rules: [
              {
                required: false,
                message: formatMessage({ id: `app.region.regionmodal.cert.rule` }),
              },
            ],
            initialValue: region && region.cert_file,
          })(<Input placeholder={formatMessage({ id: `app.region.regionmodal.cert.rule` })} />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={formatMessage({ id: `app.region.regionmodal.key` })}
                >
                  {getFieldDecorator('key_file', {
            rules: [
              {
                required: false,
                message: formatMessage({ id: `app.region.regionmodal.key.rule` }),
              },
            ],
            initialValue: region && region.key_file,
          })(<Input placeholder={formatMessage({ id: `app.region.regionmodal.key.rule` })} />)}
                </FormItem>
              </div>
            )
          }
          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: `app.region.regionmodal.wsurl` })}
          >
            {getFieldDecorator('wsurl', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: `app.region.regionmodal.wsurl.rule` }),
                },
              ],
              initialValue: region && region.wsurl,
            })(
              <Input
                type="text"
                placeholder={formatMessage({ id: `app.region.regionmodal.wsurl.rule` })}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: `app.region.regionmodal.httpdomain` })}
          >
            {getFieldDecorator('httpdomain', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: `app.region.regionmodal.httpdomain.rule` }),
                },
              ],
              initialValue: region && region.httpdomain,
            })(
              <Input
                type="text"
                placeholder={formatMessage({ id: `app.region.regionmodal.httpdomain.rule` })}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: `app.region.regionmodal.tcpdomain` })}
          >
            {getFieldDecorator('tcpdomain', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: `app.region.regionmodal.tcpdomain.rule` }),
                },
              ],
              initialValue: region && region.tcpdomain,
            })(
              <Input
                type="text"
                placeholder={formatMessage({ id: `app.region.regionmodal.tcpdomain.rule` })}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: `app.region.regionmodal.scope` })}
          >
            {getFieldDecorator('scope', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: `app.region.regionmodal.scope.rule` }),
                },
              ],
              initialValue: region ? region.scope : 'private',
            })(
              <RadioGroup>
                <Radio value="private">
                  {formatMessage({ id: `app.region.regionmodal.scope.private` })}
                </Radio>
                <Radio value="public">
                  {formatMessage({ id: `app.region.regionmodal.scope.public` })}
                </Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: `app.region.regionmodal.desc` })}
          >
            {getFieldDecorator('desc', {
              rules: [
                {
                  required: false,
                  message: formatMessage({ id: `app.region.regionmodal.desc.rule` }),
                },
              ],
              initialValue: region && region.desc
            })(
              <Input
                type="textarea"
                placeholder={formatMessage({ id: `app.region.regionmodal.desc.rule` })}
                rows={2}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default RegionEdit;
