import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import {
  Instructions,
  TitleTwo,
  LoadFile,
} from '../../components/shared';

const ContentNps = styled.div`
  margin: 50px auto 0;
  width: 95%;
  padding: 16px;
  text-align: center;
`;

const dataInstructions = [
  {
    index: 1,
    text: () => (
      <div>
        <p><b>Descargue la plantilla:</b> haciendo clic en el boton {'"Descargar Plantilla"'}.</p>
      </div>
    ),
  },
  {
    index: 2,
    text: () => (
      <div>
        <p><b>Diligencie la plantilla de la siguiente forma:</b> Columna A:
          <b> COD Repuestos </b>(se debe ingresar el código de repuestos del grupo concesionario).
            Columna B: <b>%Real 4MM </b>(Se debe ingresar el porcentaje de 4 meses ).</p>
      </div>
    ),
  },
  {
    index: 3,
    text: () => (
      <div>
        <p><b>Cargue la plantilla en el sistema: </b>
          Seleccione el archivo diligenciado y haga clic sobre el botón {'"Cargar Archivo"'}. </p>
      </div>
    ),
  },
];

const note = 'Cada Vez que se vuelva a cargar la plantilla para un mismo mes y año, ' +
  'el sistema la reemplazará y dejara los últimos valores que se carguen.';

function NpsLiq(props) {
  const URL_BASE = process.env.REACT_APP_PATH_API_POST_SALES;
  const urlDownload = `${URL_BASE}${process.env.REACT_APP_NPS_DOWNLOAD_EXCEL}`;
  const urlUpLoad = `${URL_BASE}${process.env.REACT_APP_NPS_PV_UPLOAD_EXCEL}?periodId=${props.periodId}`;
  return (
    <ContentNps>
      <Row>
        <Col span={24}>
          <TitleTwo text="NPS" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Instructions dataInstructions={dataInstructions} width="60%" note={note} />
        </Col>
      </Row>
      <LoadFile
        urlDownload={urlDownload}
        urlUpLoad={urlUpLoad}
        blnDate={false}
        afterCharge={props.afterNps}
        indexStep={props.indexStep}
      />
    </ContentNps>
  );
}

export default NpsLiq;
