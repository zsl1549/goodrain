import React, { Fragment } from 'react';
import {
  FormattedMessage,
} from 'umi/locale';
import styles from './UserLayout.less';

class UserLayout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header} />
            <div className={styles.desc}><FormattedMessage id="login.welcome" /></div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

export default UserLayout;
