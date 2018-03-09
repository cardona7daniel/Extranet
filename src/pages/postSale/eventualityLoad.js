import React, { Component } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/es';
import {
  Instructions,
  TitleTwo,
  LoadFile,
} from '../../components/shared';

moment.locale('es');

const ContentWarranty = styled.div`
  margin: 6px auto 0;
  width: 100%;
  border-radius: 6px;
  background-color: #fafafa;
  text-align: center;
`;

const dataInstructions = [
  {
    index: 1,
    text: () => (
      <div>
        <p><b>Descargue la plantilla:</b> haciendo clic en el botón
          {' "Descargar Plantilla"'}.</p>
      </div>
    ),
  },
  {
    index: 2,
    text: () => (
      <div>
        <p><b>Diligencie la plantilla:</b> Al descargar la plantilla, en el Excel se muestran las
          siguientes columnas:</p>
        <p><b>* Columna A: </b>El sistema muestra el código de repuestos del grupo o concesionario
          .</p>
        <p><b>* Columna B: </b>El sistema muestra el nombre de grupo o concesionario.</p>
        <p><b>* Columna C: </b>Usted debe ingresar el valor para la columna de la eventualidad
          según corresponda.</p>
      </div>
    ),
  },
  {
    index: 3,
    text: () => (
      <div>
        <p><b>Cargar la plantilla: </b>Para subir el archivo de eventualidades, adjunte
          el Excel y haga clic en el botón: {'"Cargar Archivo"'}.</p>
      </div>
    ),
  },
];

const note = 'Cada Vez que se vuelva a cargar la plantilla para un periodo, ' +
  'el sistema la reemplazará y dejara los últimos valores que se carguen.';

class EventualityLoad extends Component {
  state = {
    year: null,
    month: null,
  }

  render() {
    const { periodId, onChargeFileEventuality } = this.props;
    const URL_BASE = process.env.REACT_APP_PATH_API_POST_SALES;
    const urlDownload = `${URL_BASE}${process.env.REACT_APP_EVENTUALITY_DOWNLOAD_EXCEL}?periodId=${periodId}`;
    const urlUpLoad = `${URL_BASE}${process.env.REACT_APP_EVENTUALITY_PV_UPLOAD_EXCEL}?periodId=${periodId}`;
    return (
      <ContentWarranty>
        <Row>
          <Col span={24}>
            <TitleTwo text="Carga Masiva de eventualidades" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Instructions dataInstructions={dataInstructions} width="75%" note={note} />
          </Col>
        </Row>
        <LoadFile
          urlDownload={urlDownload}
          urlUpLoad={urlUpLoad}
          blnDate={false}
          onChargeFileEventuality={onChargeFileEventuality}
        />
      </ContentWarranty>
    );
  }
}

export default EventualityLoad;
