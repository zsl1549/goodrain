import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import { formatMessage, FormattedMessage } from 'umi/locale';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'Github',
          title: <Icon type="github" />,
          href: 'https://github.com/goodrain',
          blankTarget: true,
        },
        {
          key: 'rainbond',
          title: formatMessage({id:"footer.version"}),
          href: 'https://www.goodrain.com',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> <FormattedMessage id="footer.copyright" />
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
