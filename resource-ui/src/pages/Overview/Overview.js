import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import ColumnData from '@/components/ColumnData/column-data';
import { Row, Col, Icon, Card } from 'antd';
import { Pie } from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Overview.less';

@connect(({}) => ({}))
class Overview extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <GridContent>
        <Row gutter={16}>
          <Col xl={12} lg={24} sm={24} xs={24}>
            <Card
              title={<FormattedMessage id="none" defaultMessage="阿里云[上海]" />}
              bordered={false}
              className={styles.pieCard}
            >
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    subTitle={<FormattedMessage id="none" defaultMessage="cpu占比" />}
                    total="28%"
                    height={138}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#5DDECF"
                    percent={22}
                    subTitle={<FormattedMessage id="none" defaultMessage="cpu占比" />}
                    total="22%"
                    height={138}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#2FC25B"
                    percent={32}
                    subTitle={<FormattedMessage id="none" defaultMessage="cpu占比" />}
                    total="32%"
                    height={138}
                    lineWidth={2}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={12} lg={24} sm={24} xs={24}>
            <Card
              title={<FormattedMessage id="none" defaultMessage="阿里云[杭州]" />}
              bordered={false}
              className={styles.pieCard}
            >
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    subTitle={<FormattedMessage id="none" defaultMessage="cpu占比" />}
                    total="88%"
                    height={138}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#5DDECF"
                    percent={22}
                    subTitle={<FormattedMessage id="none" defaultMessage="cpu占比" />}
                    total="22%"
                    height={138}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#2FC25B"
                    percent={32}
                    subTitle={<FormattedMessage id="none" defaultMessage="cpu占比" />}
                    total="42%"
                    height={138}
                    lineWidth={2}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col span="12" style={{ paddingRight: 4 }}>
            <Card
              title="报警信息"
              className="card-small"
              className={styles.pieCard}
              style={{ height: 150 }}
            >
              <ColumnData
                data={
                  [
                    // {title: '状态', value: regionUtil.getStatusCn(selectedRegion.status)},
                    // {title: '团队数量', value: selectedRegion.tenant_num}
                  ]
                }
              />
            </Card>
          </Col>
          <Col span="12" style={{ paddingLeft: 4 }}>
            <Card
              title="异常信息"
              className="card-small"
              className={styles.pieCard}
              style={{ height: 150 }}
            >
              <ColumnData
                data={
                  [
                    // {title: '警告', value: this.state.alarm.warning},
                    // {title: '异常', value: this.state.alarm.unusual}
                  ]
                }
              />
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col span="12" style={{ paddingRight: 4 }}>
            <Card
              title="用户数量"
              className="card-small"
              className={styles.pieCard}
              style={{ height: 150 }}
            >
              <ColumnData
                data={
                  [
                    // {title: '状态', value: regionUtil.getStatusCn(selectedRegion.status)},
                    // {title: '团队数量', value: selectedRegion.tenant_num}
                  ]
                }
              />
            </Card>
          </Col>
          <Col span="12" style={{ paddingLeft: 4 }}>
            <Card
              title="团队数量"
              className="card-small"
              className={styles.pieCard}
              style={{ height: 150 }}
            >
              <ColumnData
                data={
                  [
                    // {title: '警告', value: this.state.alarm.warning},
                    // {title: '异常', value: this.state.alarm.unusual}
                  ]
                }
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Overview;
