import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';
import requestGenerateSettlement from '../../state/preliminarySettlement/action';
import { Card, DownloadLink } from '../../components/shared';

const ContentPreliminary = styled.div`
  text-align: center;
`;

const ContentDownload = styled.p`
  padding: 10px 0 10px 0;
  margin: 0 0 10px 0;
`;

const IconOk = styled(Icon)`
  font-size: 3rem;
  color: #00a854;
`;

const IconFailed = styled(Icon)`
  font-size: 3rem;
  color: #f04134;
`;

class preliminarySettlementGeneration extends Component {
  componentDidMount() {
    const { requestGenerateSettlementFn, period } = this.props;
    requestGenerateSettlementFn(period.Id);
  }

  render() {
    const { period, generateSettlement, loading } = this.props;
    const URL_BASE = process.env.REACT_APP_PATH_API;
    const urlDownload = `${URL_BASE}${process.env.REACT_APP_PRE_SETTLEMENT_DOWNLOAD_EXCEL}?Period=${period.Id}`;
    return (
      <ContentPreliminary>
        <Row>
          <Col span={24}>
            <h2>Liquidación preliminar {period && period.Id > 0 ? `periodo: ${period.Name}` : ''}</h2>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {loading !== true && (
              <Card title="Extranet SOFASA">
                {generateSettlement === true ? (
                  <ContentDownload>
                    <IconOk type="check-circle-o" />
                    <p>Liquidación generada con éxito.</p>
                    <DownloadLink href={urlDownload} text="Descargar liquidación" />
                  </ContentDownload>
                ) : (
                  <ContentDownload>
                    <IconFailed type="close-circle-o" />
                    <p>Error al generar la liquidación.</p>
                  </ContentDownload>
                )}
              </Card>
            )}
          </Col>
        </Row>
      </ContentPreliminary>
    );
  }
}

const mapStateToProps = state => ({
  period: state.period.period,
  generateSettlement: state.preliminarySettlement.generateSettlement,
  loading: state.preliminarySettlement.loading,
});

const mapDispatchToProps = dispatch => ({
  requestGenerateSettlementFn: (periodId) => {
    dispatch(requestGenerateSettlement(periodId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(preliminarySettlementGeneration);
