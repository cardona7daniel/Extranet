import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Select, Spin } from 'antd';
import styled from 'styled-components';
import {
  requestNamesPeriod,
} from '../../state/nonDerogateLiquidation/action';
import {
  TitleTwo,
  DownloadLink,
} from '../../components/shared';

const Option = Select.Option;

const Content = styled.div`
  margin: 50px auto 0;
  width: 95%;
  border: 1px solid #e9e9e9;
  border-radius: 6px;
  padding: 24px;
  background-color: #fafafa;
  text-align: center;
`;

const ContentSpin = styled(Spin)`
  left: 0;
`;

const ContentSelect = styled(Select)`
  width: 15% !important;
`;

const MarginRow = styled(Row)`
  margin-top: 2%;
`;

class nonDerogateLiquidationReport extends Component {
  state = {
    idPeriod: 0,
  };

  componentDidMount() {
    this.props.requestNamesPeriod();
  }

  choosePeriod = (value) => {
    this.setState({
      idPeriod: value,
    });
  };

  render() {
    const { ltNamesPeriod, loading } = this.props;
    const { idPeriod } = this.state;
    const URL_BASE = process.env.REACT_APP_PATH_API_POST_SALES;
    const urlDownloadExcel = `${URL_BASE}${process.env.REACT_APP_REPORT_NON_DEROGATE_DOWNLOAD_EXCEL}?periodId=${idPeriod}`;
    return (
      <ContentSpin spinning={loading}>
        <Content>
          <Row>
            <Col span={24}>
              <TitleTwo text="Reporte Liquidación sin Derogación Bono Volumen Posventa" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <span>Seleccione un periodo: </span>
              <ContentSelect
                placeholder="Seleccionar"
                onChange={this.choosePeriod}
              >
                {
                  ltNamesPeriod
                    .filter(opt => opt.Flag === false)
                    .map(opt => (
                      <Option key={opt.Id.toString()}>{opt.Name.toString()}</Option>
                    ))
                }
              </ContentSelect>
            </Col>
          </Row>
          { idPeriod !== 0
            ?
            (
              <MarginRow>
                <Col span={24}>
                  <DownloadLink href={urlDownloadExcel} onClick={this.enableLiquidation} text="Exportar a Excel" />
                </Col>
              </MarginRow>
            ) : (
              null
            )
          }
        </Content>
      </ContentSpin>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.nonDerogateLiquidation.loading,
  ltNamesPeriod: state.nonDerogateLiquidation.ltNamesPeriod,
});

const mapDispatchToProps = dispatch => ({
  requestNamesPeriod: () => {
    dispatch(requestNamesPeriod());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(nonDerogateLiquidationReport);
