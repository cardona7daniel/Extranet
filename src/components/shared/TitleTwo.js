import React from 'react';
import styled from 'styled-components';
import { Tooltip, Icon } from 'antd';

const Title = styled.h2.attrs({
  color: props => props.color || '#f7bd01',
  size: props => props.size || '1.5em',
})`
  font-size: ${props => props.size};
  text-align: center;
  padding-bottom: 25px;
  color: ${props => props.color};
`;

const IconSize = styled(Icon)`
  margin-left: 3px;
  font-size: 18px;
  color: #5cade6;
`;

function TitleTwo(props) {
  return (
    <Title color={props.color} size={props.size}>
      {props.text} {props.IconName && props.titleTooltip && (
        <Tooltip title={props.titleTooltip}><IconSize type={props.IconName} /></Tooltip>)}
    </Title>
  );
}

export default TitleTwo;
