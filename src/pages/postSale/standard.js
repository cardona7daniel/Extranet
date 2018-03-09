import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { Tab } from '../../components/shared';
import Nps from './nps';
import Consolidated from './consolidated';
import ExclusionList from './exclusionList';

const ContentTabs = styled.div`
  margin: 50px auto 0;
  width: 95%;
  border: 1px solid #e9e9e9;
  border-radius: 6px;
  padding: 24px;
  background-color: #fafafa;
  text-align: center;
`;

const dataTabs = [
  {
    index: 1,
    text: 'Exclusiones',
    component: <ExclusionList />,
  },
  {
    index: 2,
    text: 'NPS',
    component: <Nps />,
  },
  {
    index: 3,
    text: 'Cumpl. Consolidado',
    component: <Consolidated />,
  },
];

function Standard() {
  return (
    <ContentTabs>
      <Row>
        <Col span={24}>
          <h2>Criterios para Bono Volumen Posventa</h2>
        </Col>
      </Row>
      <Row>
        <Tab dataTabs={dataTabs} />
      </Row>
    </ContentTabs>
  );
}

export default Standard;
