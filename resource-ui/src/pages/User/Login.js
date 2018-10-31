import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Alert, message } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import { setAuthority } from '@/utils/authority'
import { reloadAuthorized } from '@/utils/Authorized'
import {getPageQuery } from '@/utils/utils'

const { UserName, Password, Submit } = Login;

@connect(({ global, loading }) => ({
  submitting: loading.effects['user/login'],
  isInit: global.isInit,
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    status_code: 0,
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchIsInit',
    });
  }

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'user/login',
        payload: {
          ...values,
          type,
        },
        callback: (item) => {
          console.log(item)
          if (item.code === '0000') {
            setAuthority("admin");
            reloadAuthorized(item.data.bean.user, item.data.bean.token);
            const urlParams = new URL(window.location.href);
            const params = getPageQuery();
            let { redirect } = params;
            if (redirect) {
              const redirectUrlParams = new URL(redirect);
              if (redirectUrlParams.origin === urlParams.origin) {
                redirect = redirect.substr(urlParams.origin.length);
                if (redirect.startsWith('/#')) {
                  redirect = redirect.substr(2);
                }
              } else {
                window.location.href = redirect;
                return;
              }
            }
            dispatch(routerRedux.push({
              pathname: '/',
            }));
          } else {
            this.setState({status_code:item.code})
          }
        }
      });
    }
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting, isInit } = this.props;
    const { type } = this.state;
    const status = this.state.status_code!==0
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          {status&&this.renderMessage(formatMessage({id:'login.userpassfail'}))}
          <UserName name="username" placeholder={formatMessage({id:'login.userform'})} />
          <Password
            name="password"
            placeholder={formatMessage({id:'login.passform'})}
            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
          />
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
          {!isInit ? (
            <div className={styles.other}>
              <Link className={styles.register} to="/User/Register">
                <FormattedMessage id="app.login.signup" />
              </Link>
            </div>
          ) : (
            ''
          )}
        </Login>
      </div>
    );
  }
}

export default LoginPage;
