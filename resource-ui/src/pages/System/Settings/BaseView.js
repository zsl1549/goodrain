import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Upload, Select, Button ,message} from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
// import { getTimeDistance } from '@/utils/utils';
import apiconfig from "../../../../config/api.config";

const FormItem = Form.Item;
const { Option } = Select;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className={styles.avatar_title}>Logo</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="好雨云帮logo" style={{backgroundColor:"#02213f"}}/>
    </div>
    {console.log(apiconfig.baseUrl)}
    <Upload 
    accept="image/jpg,image/jpeg,image/png"
    action={apiconfig.baseUrl+ 'backend/file/upload'}
    fileList={[]}>
      <div className={styles.button_view}>
        <Button icon="upload">
          <FormattedMessage id="app.settings.basic.avatar" defaultMessage="Change avatar" />
        </Button>
      </div>
    </Upload>

  </Fragment>
);


@connect(({  }) => ({
  
}))
@Form.create()
class BaseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      logoUrl: '',
      enterpriceName:'',
      fileList:[]
    }
  }
  componentDidMount() {
    this.getTitle();
    this.getAvatarURL();
    this.getEnterprice();
  }
  getTitle(){
    this.props.dispatch({
      type:"platformSetting/getTitle",
      callback: data =>{
        this.setState({
          title: data.bean.title
        },()=>{
          const {title} = this.state;
          const { form } = this.props;
          form.setFieldsValue({'title':title})
        })
      }
    })
  }

  getEnterprice(){
    //查询企业名
    this.props.dispatch({
      type:"platformSetting/getEnterprice",
      callback: data =>{
        this.setState({
          enterprise: data.bean.enterprise_alias
        },()=>{
          const {enterprise} = this.state;
          const { form } = this.props;
          form.setFieldsValue({'enterprise':enterprise})
        })
      }
    })
  }

  getAvatarURL() {
    this.props.dispatch({
      type:"platformSetting/getLogo",
      callback: data =>{
        this.setState({logoUrl:'http://'+data.bean.logo})
      }
    })
  }
  handleEdit=()=>{
    const title = this.props.form.getFieldValue('title');
    const enterprice = this.props.form.getFieldValue('enterprise');
    console.log(title,enterprice)
    this.props.dispatch({
      type:"platformSetting/editTitle",
      payload:{
        title,
        enterprice
      },
      callback:(data)=>{
        message.success(data.msg_show || '修改成功',2,()=>{
          
        })
      }
    })
  }

  getViewDom = ref => {
    this.view = ref;
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <FormItem label={formatMessage({ id: 'app.settings.basic.platformTitle' })}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'none' }, {}),
                  },
                ],
              })(<Input/>)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.enterpriseName' })}>
              {getFieldDecorator('enterprise', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'none' }, {}),
                  },
                ],
              })(<Input/>)}
            </FormItem>
            <Button type="primary" onClick={this.handleEdit}>
              <FormattedMessage
                id="app.settings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.state.logoUrl} />
        </div>
      </div>
    );
  }
}

export default BaseView;
