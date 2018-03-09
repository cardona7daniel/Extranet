/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import styled from 'styled-components';

const Status = styled(Avatar)`
  vertical-align: middle;
  margin-right: 3px;
  background: ${props => props.color} !important;
`;

Status.PropTypes = {
  color: PropTypes.string,
};

Status.defaultProps = {
  color: '#848484',
};

export default Status;
