import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';

const TableStyled = styled(Table)`
  margin: 0 auto;
  width: 90%;
  max-width: 900px;
  
  .ant-spin-nested-loading > div > .ant-spin {
    left: 0;
  }
`;

function PeriodList({ columns, data, loading }) {
  return (
    <TableStyled
      rowKey={record => record.Id}
      columns={columns}
      dataSource={data}
      loading={loading}
    />
  );
}

export default PeriodList;
