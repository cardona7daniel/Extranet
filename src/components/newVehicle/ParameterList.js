import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import {
  TitleTwo,
  ContentWrap,
} from '../../components/shared';

const TableStyled = styled(Table)`
  margin: 0 auto;
  max-width: 800px;
  
  .ant-spin-nested-loading > div > .ant-spin {
    left: 0;
  }
`;

function ParameterList({ columns, data, loading }) {
  return (
    <ContentWrap>
      <TitleTwo text="PARÁMETROS GENERALES" />
      <TableStyled
        rowKey={record => record.Id}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </ContentWrap>
  );
}

export default ParameterList;
