import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, message, Modal, Table } from 'antd';
import styled from 'styled-components';
import { DownloadLink, UploadFile } from '../../components/shared';
import { FilesTypesUpload, ColumnsErrorLog } from '../../utils/formats';
import * as actions from '../../state/objective/action';

const ContentObjectives = styled.div`
  text-align: center;
`;

const Paragraphs = styled.div`
  width: 35%;
  text-align: center;
  display: inline-block;
  padding: 35px 0 15px 0;
  text-align:left;
  @media (max-width: 1400px) {
    width: 50%;
  }  
`;

const ContentDownload = styled.p`
  padding: 10px 0 10px 0;
  margin: 0 0 10px 0;
`;

const modal = Modal.error;

class Objectives extends Component {
  showLog = (dataSource) => {
    modal({
      title: 'Errores en el cargue de objetivos',
      content: (
        <div>
          <Table dataSource={dataSource} columns={ColumnsErrorLog} />
        </div>
      ),
      okText: 'Regresar',
      width: '90%',
    });
  }

  handleNextSuccess = (result) => {
    const { changeCurrent = null } = this.props;

    if (result) {
      if (result.data.Message.Flag === false) {
        this.showLog(result.data.ModelData);
      } else {
        this.props.existObjectivesSuccess(true);
        if (typeof changeCurrent === 'function') {
          changeCurrent();
        }
        message.success(result.data.Message.Message);
      }
    }
  }

  render() {
    const { period, isPreliminary = false } = this.props;
    const URL_BASE = process.env.REACT_APP_PATH_API;
    const urlDownload = `${URL_BASE}${process.env.REACT_APP_OBJECTIVES_DOWNLOAD_EXCEL}?periodId=${period.Id}&isPreliminary=${isPreliminary}`;
    const urlUpLoad = `${URL_BASE}${process.env.REACT_APP_OBJECTIVES_UPLOAD_EXCEL}?periodId=${period.Id}&isPreliminary=${isPreliminary}`;

    return (
      <ContentObjectives>
        <Row>
          <Col span={24}>
            <h2>Objetivos Concesionarios / Salas</h2>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Paragraphs>
              <p>
                <strong>Recuerde: </strong>
                El archivo debe tener extensión .xls o .xlsx.
                Favor seguir el formato de la plantilla.
              </p>
              <p>
                La plantilla genera los grupos de concesionarios y salas activas y
                trae en blanco los campos que requieren subirse al sistema.
              </p>
              <p>
                <strong>Importante: </strong>
                es necesario que siempre descarguen la plantilla para obtener la última
                actualización de concesionarios.
              </p>
            </Paragraphs>
            <ContentDownload>
              <DownloadLink href={urlDownload} text="Descargar plantilla" />
            </ContentDownload>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <UploadFile
              filesTypes={FilesTypesUpload}
              messageErrorType="Debe ser un archivo de Excel."
              action={urlUpLoad}
              nextSuccess={this.handleNextSuccess}
            />
          </Col>
        </Row>
      </ContentObjectives>
    );
  }
}

const mapStateToProps = state => ({
  period: state.period.period,
});

export default connect(
  mapStateToProps,
  actions,
)(Objectives);
