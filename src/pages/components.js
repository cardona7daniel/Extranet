import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import { DownloadLink, UploadFile } from '../components/shared';

const SectionStyled = styled(Row)`
  -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
  margin: 5px;
  padding: 10px;
  background-color: #f4f4f4;
  width: 100%;
`;

const FilesTypes = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

function Components() {
  return (
    <div>
      <SectionStyled>
        <Col span={12}>
          <DownloadLink href="http://miguelcast.co" text="Descargar plantilla" />
        </Col>
        <Col span={12}>
          <h3>Componente Link de descarga:</h3>
          <div>prop: href(String)</div>
          <div>prop: text(String)</div>
          <div>prop: target(String) valor de defecto = _self</div>
        </Col>
      </SectionStyled>

      <SectionStyled>
        <Col span={12}>
          <UploadFile
            filesTypes={FilesTypes}
            messageErrorType="Debe ser un archivo de Excel."
            action="http://localhost:60544/api/Group/UploadGroupObjectives"
          />
        </Col>
        <Col span={12}>
          <h3>Componente Carga de archivo:</h3>
          <div>prop: filesTypes(Array) con tipos permitidos para la carga</div>
          <div>prop: messageErrorType(String) Error al carcar un tipo no permitido</div>
          <div>prop: action(String) Ruta donde se debe subir el(los) archivos</div>
          <div>
            prop: ?handleUpload(Function) Function que envia los archivos por ajax,
            por defecto ya existe
          </div>
        </Col>
      </SectionStyled>
    </div>
  );
}

export default Components;
