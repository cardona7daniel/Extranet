import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';
import requestGenerateNDL from '../../state/derogateLiquidation/action';
import { Card } from '../../components/shared';
// import { Card, DownloadLink } from '../../components/shared';

const ContentDerogate = styled.div`
  text-align: center;
`;

const ContentDownload = styled.p`
  padding: 10px 0 10px 0;
  margin: 0 0 10px 0;
`;

const IconOk = styled(Icon) `
  font-size: 3rem;
  color: #00a854;
`;

const IconFailed = styled(Icon) `
  font-size: 3rem;
  color: #f04134;
`;


class NonDerogateLiquidationGeneration extends Component {
  componentDidMount() {
    const { requestGenerateNDLFn, period } = this.props;
    requestGenerateNDLFn(period.Id);
  }

  render() {
    const { period, generateNDLiquidation, loading } = this.props;
    // const URL_BASE = process.env.REACT_APP_PATH_API;
    // const urlDownload = `${URL_BASE}${process.env
    // .REACT_APP_PRE_SETTLEMENT_DOWNLOAD_EXCEL}?Period=${period.Id}`;
    return (
      <ContentDerogate>
        <Row>
          <Col span={24}>
            <h2>Liquidación Sin Derogación {period && period.Id > 0 ? `periodo: ${period.Name}` : ''}</h2>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {loading !== true && (
              <Card title="Extranet SOFASA">
                {generateNDLiquidation === true ? (
                  <ContentDownload>
                    <IconOk type="check-circle-o" />
                    <p><strong>Liquidación Generada con Éxito.</strong></p>
                    {/* <DownloadLink href={urlDownload} text="Descargar liquidación" /> */}
                  </ContentDownload>
                ) : (
                  <ContentDownload>
                    <IconFailed type="close-circle-o" />
                    <p><strong>Error al generar la Liquidación.</strong></p>
                  </ContentDownload>
                )}
              </Card>
            )}
          </Col>
        </Row>
      </ContentDerogate>
    );
  }
}

const mapStateToProps = state => ({
  period: state.period.period,
  generateNDLiquidation: state.NDLiquidation.generateNDLiquidation,
  loading: state.NDLiquidation.loading,
});

const mapDispatchToProps = dispatch => ({
  requestGenerateNDLFn: (periodId) => {
    dispatch(requestGenerateNDL(periodId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NonDerogateLiquidationGeneration);

