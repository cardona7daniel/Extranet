import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Status from './Status';

const Content = styled.div`
  padding: 15px;
`;

const Item = styled.span`
  padding: 0 10px;
  vertical-align: middle;
`;

function InfoStatus({ status }) {
  return (
    <Content>
      {status && status.map(state => (
        <Item key={state.key}>
          <Status
            size="small"
            color={state.color}
          />
          {state.text}
        </Item>
      ))}
    </Content>
  );
}

InfoStatus.PropTypes = {
  status: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default InfoStatus;
