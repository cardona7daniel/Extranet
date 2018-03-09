import React from 'react';
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

const ContentPerformConsolidated = styled.div`
  margin: 50px auto 0;
  width: 95%;
  padding: 24px;
  text-align: center;
`;

const dataInstructions = [
  {
    index: 1,
    text: () => (
      <div>
        <p><b>Diligencie la plantilla: </b> al descargar la plantilla, en el Excel se
          muestran las siguientes columnas:</p>
        <p><b>* Columna A - Código de repuesto: </b>debe poner el código de repuesto
          del grupo de concesionario.</p>
        <p><b>* Columna B - % Realización Consolidación Mes: </b> corresponde al
          porcentaje de consolidado mensual.</p>
      </div>
    ),
  },
  {
    index: 2,
    text: () => (
      <div>
        <p><b>Cargar el archivo: </b>adjunte el Excel diligenciado y haga clic en el
          botón: Cargar Archivo.</p>
      </div>
    ),
  },
];

const note = 'Cada Vez que se vuelva a cargar la plantilla para un mismo mes y año, ' +
  'el sistema la reemplazará y dejara los últimos valores que se carguen.';

function performConsolidated(props) {
  const URL_BASE = process.env.REACT_APP_PATH_API_POST_SALES;
  const urlDownload = `${URL_BASE}${process.env.REACT_APP_CONSOLIDATED_PV_DOWNLOAD_EXCEL}`;
  const urlUpLoad = `${URL_BASE}${process.env.REACT_APP_CONSOLIDATED_PV_UPLOAD_EXCEL}?periodId=${props.periodId}`;
  return (
    <ContentPerformConsolidated>
      <Row>
        <Col span={24}>
          <TitleTwo text="Carga masiva de la realización del consolidado" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Instructions dataInstructions={dataInstructions} width="68%" note={note} />
        </Col>
      </Row>
      <LoadFile
        urlDownload={urlDownload}
        urlUpLoad={urlUpLoad}
        blnDate={false}
        afterCharge={props.afterConsolidated}
        indexStep={props.indexStep}
      />
    </ContentPerformConsolidated>
  );
}

export default performConsolidated;
