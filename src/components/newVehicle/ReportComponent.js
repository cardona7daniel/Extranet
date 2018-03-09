import React from 'react';
import { Select, Button, Row, Col, Spin, Icon } from 'antd';
import styled, { keyframes } from 'styled-components';
import { ContentWrap, TitleTwo, Card, DownloadLink } from '../shared';

const transitionKeyframe = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;

const ColButton = styled(Col) `
  padding-top: 10px;
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

const Transtion = styled.div`
opacity: 1;
animation: ${transitionKeyframe} 1s;
`;


const Option = Select.Option;

const WrapperContent = ({ title, loading, children }) => (
  <Spin spinning={loading}>
    <ContentWrap>
      <TitleTwo text={title} />
      {children}
    </ContentWrap>
  </Spin>
);

function ReportEventualitues(
  { options, onChange, onClick,
    title,
    loading = false,
    idPeriod = null,
    generateLiq,
    urlDownload }) {
  if (!options || options.length === 0) {
    return (
      <WrapperContent title={title} loading={loading}>
        <strong>No hay periodos.</strong>
      </WrapperContent>
    );
  }

  return (
    <WrapperContent title={title} loading={loading}>
      <Row>
        <Col >
          <label htmlFor="period">Periodo: </label>
          <Select
            size="large"
            style={{ width: 200 }}
            id="period"
            onChange={onChange}
            placeholder="Seleccionar"
          >
            {options.map(item => (
              <Option key={item.Id} value={item.Id.toString()}>{item.Name}</Option>
            ))}
          </Select>
        </Col>
        <ColButton>
          <Button type="primary" size="large" onClick={onClick} loading={false} disabled={!(idPeriod > 0)}>
            Generar
          </Button>
        </ColButton>
      </Row>
      <Row>
        <Col span={24}>
          {(loading !== true && generateLiq === true) && (
            <Transtion>
              <Card title="Extranet SOFASA">
                {generateLiq === true ?
                  (
                    <ContentDownload>
                      <IconOk type="check-circle-o" />
                      <p>Documento generado con éxito.</p>
                      <DownloadLink href={urlDownload} text="Descargar" />
                    </ContentDownload>
                  ) : (
                    <ContentDownload>
                      <IconFailed type="close-circle-o" />
                      <p>Error al generar el documento.</p>
                    </ContentDownload>
                  )}
              </Card>
            </Transtion>
          )}
        </Col>
      </Row>
    </WrapperContent>
  );
}

export default ReportEventualitues;
