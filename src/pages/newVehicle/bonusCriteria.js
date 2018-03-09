import React from 'react';
import styled from 'styled-components';
import { Tab } from '../../components/shared';
import ExclusionBonusCriteriaList from './exclusionBonusCriteriaList';
import BillingCriteriaBonusCriteriaList from './billingCriteriaBonusCriteriaList';

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
    component: <ExclusionBonusCriteriaList />,
  },
  {
    index: 2,
    text: 'Criterios Facturación',
    component: <BillingCriteriaBonusCriteriaList />,
  },
];

function BonusCriteria() {
  return (
    <ContentTabs>
      <Tab dataTabs={dataTabs} />
    </ContentTabs>
  );
}

export default BonusCriteria;
