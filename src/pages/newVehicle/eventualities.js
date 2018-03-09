import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, message, Modal, Table } from 'antd';
import styled from 'styled-components';
import { DownloadLink, UploadFile } from '../../components/shared';
import { FilesTypesUpload, ColumnsErrorLog } from '../../utils/formats';

const ContentEventualities = styled.div`
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

class Eventualities extends Component {
  showLog = (dataSource) => {
    modal({
      title: 'Errores en el cargue de Eventualidades',
      content: (
        <div>
          <Table dataSource={dataSource} columns={ColumnsErrorLog} pagination={false} />
        </div>
      ),
      okText: 'Regresar',
      width: '80%',
    });
  };

  handleNextSuccess = (result) => {
    const { changeCurrent = null } = this.props;

    if (result) {
      if (result.data.Message.Flag === false) {
        this.showLog(result.data.ModelData);
      } else if (result.data.Message.Flag === true) {
        if (typeof changeCurrent === 'function') {
          changeCurrent(2, false);
        }
        message.success(result.data.Message.Message);
      }
    }
  };

  render() {
    const { period } = this.props;
    const URL_BASE = process.env.REACT_APP_PATH_API;
    const urlDownload = `${URL_BASE}${process.env.REACT_APP_EVENTUALITIES_DOWNLOAD_EXCEL}?periodId=${period.Id}`;
    const urlUpLoad = `${URL_BASE}${process.env.REACT_APP_EVENTUALITIES_UPLOAD_EXCEL}?periodId=${period.Id}`;

    return (
      <ContentEventualities>
        <Row>
          <Col span={24}>
            <h2>Eventualidades</h2>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Paragraphs>
              <p>
                <strong>Recuerde: </strong>
                El archivo debe tener extensión .xls o .xlsx .
                Favor seguir el formato de la plantilla.
              </p>
              <p>
                La plantilla genera los grupos de concesionarios y salas activas,
                trae en blanco los campos que requieren subirse al sistema y
                las eventualidades configuradas para el período  seleccionado.
              </p>
              <p>
                <strong>Importante: </strong>
                es necesario que siempre descarguen la plantilla para obtener la última
                actualización de concesionarios y eventualidades.
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
      </ContentEventualities>
    );
  }
}

const mapStateToProps = state => ({
  period: state.period.period,
});

export default connect(
  mapStateToProps,
  null,
)(Eventualities);
