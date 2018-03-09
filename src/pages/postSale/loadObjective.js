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
  margin: 50px auto 0;
  width: 95%;
  border: 1px solid #e9e9e9;
  border-radius: 6px;
  padding: 24px;
  background-color: #fafafa;
  text-align: center;
`;

const dataInstructions = [
  {
    index: 1,
    text: () => (
      <div>
        <p><b>Descargue la plantilla:</b> haciendo clic en el botón
          {' "Descargar Plantilla Objetivos"'}.</p>
      </div>
    ),
  },
  {
    index: 2,
    text: () => (
      <div>
        <p><b>Diligencie la plantilla:</b> al descargar la plantilla, en el Excel se muestran
          los concesionarios o grupos de concesionarios que fueron previamente configurados.
          Usted debe llenar en cada columna el valor en cifra COP del objetivo para cada
          grupo de segmentos. En la columna C {'"Objetivo mes"'} se debe ingresar el
          objetivo del bono volumen y en las demás columnas se mostraran los grupos de
          segmentos.</p>
      </div>
    ),
  },
  {
    index: 3,
    text: () => (
      <div>
        <p><b>Cargar la plantilla:</b> Para cargar la plantilla debe Seleccionar el año y mes
          para el cual aplicaran los valores que cargarán, luego seleccione el Excel y haga
          clic en el botón: {'"Cargar Archivo"'}.</p>
      </div>
    ),
  },
];

const note = 'Cada Vez que se vuelva a cargar la plantilla para un mismo mes y año, ' +
  'el sistema la reemplazará y dejara los últimos valores que se carguen.';

class loadObjective extends Component {
  state = {
    year: null,
    month: null,
  };

  render() {
    const URL_BASE = process.env.REACT_APP_PATH_API_POST_SALES;
    const urlDownload = `${URL_BASE}${process.env.REACT_APP_OBJECTIVE_PV_DOWNLOAD_EXCEL}`;
    const urlUpLoad = `${URL_BASE}${process.env.REACT_APP_OBJECTIVE_PV_UPLOAD_EXCEL}`;
    return (
      <ContentWarranty>
        <Row>
          <Col span={24}>
            <TitleTwo text="Carga Masiva de Objetivos Bono Volumen Posventa" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Instructions dataInstructions={dataInstructions} width="68%" note={note} />
          </Col>
        </Row>
        <LoadFile urlDownload={urlDownload} urlUpLoad={urlUpLoad} title="Fecha Objetivos:" blnDate />
      </ContentWarranty>
    );
  }
}

export default loadObjective;
