/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { Card as CardAntd } from 'antd';

const Card = styled(CardAntd).attrs({
  width: props => props.width || '300px',
  background: props => props.background || 'white',
})`
  margin: 10px;
  display: inline-block;
  width: ${props => props.width};
  border: 1px solid #e9e9e9;
  background-color: ${props => props.background};
`;

export default Card;
