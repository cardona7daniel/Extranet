import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Radio, message, Spin, Button, Popconfirm, Modal } from 'antd';
import styled from 'styled-components';
import {
  TitleTwo,
  DownloadLink,
} from '../../components/shared';
import {
  requestExportLiquidation,
  verifyDataLiquidation,
} from '../../state/nonDerogateLiquidation/action';

const RadioGroup = Radio.Group;

const ContentNonDerogate = styled.div`
  margin: auto 0;
  width: 95%;
  padding-bottom: 16px;
  text-align: center;
`;

const StyleRow = styled(Row)`
  padding-bottom: 2%;
`;

const ContentSpin = styled(Spin)`
  left: 0;
`;

class NonDerogateLiquidationGeneration extends Component {
  state = {
    loadLink: false,
    value: 1,
    saving: false,
    bSaveNonDerogate: false,
  };

  componentDidMount() {
    const { periodId } = this.props;
    this.props.verifyDataLiquidation(periodId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.bVerifyDataLiquidation !== null &&
      nextProps.bVerifyDataLiquidation !== this.props.bVerifyDataLiquidation) {
      if (!nextProps.bVerifyDataLiquidation) {
        this.info();
      }
    }
  }

  info = () => {
    Modal.info({
      title: 'No existen datos para el periodo seleccionado.',
      content: (
        <div>
          <p>El periodo que esta intentando liquidar no tiene datos
            para el rango de fechas seleccionadas,
            por favor intente cambiando las fechas de liquidación</p>
        </div>
      ),
      onOk() {},
    });
  };

  success = () => {
    Modal.success({
      title: 'La información se ha almacenado correctamente...',
      content: (
        <div>
          <p>Se han guardado los datos del periodo de liquidación correctamente...</p>
        </div>
      ),
      onOk() {
        location.reload();
      },
    });
  };

  chooseOption = (e) => {
    const { loadLink } = this.state;
    if (loadLink) {
      this.setState({
        value: e.target.value,
      });
    } else {
      message.warning('Primero debe visualizar la liquidación sin derogación.');
    }
  };
  enableLiquidation = () => {
    this.setState({
      loadLink: true,
      saving: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          saving: false,
        });
      }, 25000);
    });
  };

  generateLiquidation = () => {
    const { periodId } = this.props;
    this.props.requestExportLiquidation(periodId, true, () => {
      this.success();
    });
  };

  render() {
    const { value, saving } = this.state;
    const { loading, bVerifyDataLiquidation } = this.props;
    const URL_BASE = process.env.REACT_APP_PATH_API_POST_SALES;
    const urlDownloadExcel = `${URL_BASE}${process.env.REACT_APP_NON_DEROGATE_LIQ_DOWNLOAD_EXCEL}?periodId=${this.props.periodId}&generateLiquidation=${false}`;
    const text = '¿Está seguro que desea guardar los datos de la liquidación sin derogación?';
    return (
      <ContentSpin spinning={loading || saving}>
        <ContentNonDerogate>
          <Row>
            <Col span={24}>
              <TitleTwo text="Generar Liquidación Bono Volumen Posventa sin derogaciones" />
            </Col>
          </Row>
          <StyleRow>
            <Col span={24}>
              <RadioGroup onChange={this.chooseOption} value={this.state.value}>
                <Radio value={1}>Visualizar Liquidación sin Derogación</Radio>
                <Radio value={2}>Generar Liquidación sin Derogación Final</Radio>
              </RadioGroup>
            </Col>
          </StyleRow>
          <StyleRow>
            <Col span={24}>
              {
                value === 1 ? (
                  <DownloadLink disabled={!bVerifyDataLiquidation} href={urlDownloadExcel} onClick={this.enableLiquidation} text="Exportar a Excel" />
                ) : (
                  <Popconfirm placement="top" title={text} onConfirm={this.generateLiquidation} okText="Guardar" cancelText="Cancelar">
                    <Button>Guardar liquidación</Button>
                  </Popconfirm>
                )
              }
            </Col>
          </StyleRow>
        </ContentNonDerogate>
      </ContentSpin>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.nonDerogateLiquidation.loading,
  bVerifyDataLiquidation: state.nonDerogateLiquidation.bVerifyDataLiquidation,
});

const mapDispatchToProps = dispatch => ({
  requestExportLiquidation: (periodId, generateLiquidation, next) => {
    dispatch(requestExportLiquidation(periodId, generateLiquidation, next));
  },
  verifyDataLiquidation: (periodId) => {
    dispatch(verifyDataLiquidation(periodId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NonDerogateLiquidationGeneration);
