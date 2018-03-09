import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import styled from 'styled-components';

const DownloadLinkStyled = styled.a`
  text-decoration: none;
  font-size: 1rem;
  display: inline-block;
  span {
    padding-left: 5px;
  }
`;

function DownloadLink({ href, disabled, text, target = '_self', onClick = null }) {
  return (
    <DownloadLinkStyled
      href={href}
      alt={text}
      target={target}
      aria-label={text}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon type="download" />
      <span>{text}</span>
    </DownloadLinkStyled>
  );
}

DownloadLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  target: PropTypes.string,
  onClick: PropTypes.func,
};

DownloadLink.defaultProps = {
  target: '_self',
  onClick: null,
};

export default DownloadLink;
