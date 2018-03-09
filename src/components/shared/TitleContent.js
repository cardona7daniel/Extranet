import React from 'react';
import styled from 'styled-components';
import { Tooltip, Icon } from 'antd';

const ContentTitle = styled.div.attrs({
  width: props => props.width || '300px',
  height: props => props.height || '40px',
})`
  margin: 12px;
  display: inline-block;
  width: ${props => props.width};
  border: 1px solid #e9e9e9;
  height: ${props => props.height};
  line-height: ${props => props.height};
  background: #f7bd01;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
`;

const IconSize = styled(Icon)`
  margin-left: 3px;
  font-size: 18px;
`;

function TitleContent(props) {
  return (
    <ContentTitle width={props.width} height={props.height}>
      {props.text} {props.IconName && props.titleTooltip && (
        <Tooltip title={props.titleTooltip}><IconSize type={props.IconName} /></Tooltip>)}
    </ContentTitle>
  );
}

export default TitleContent;
