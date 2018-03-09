/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Modal as modalAntd } from 'antd';

const modalContent = (title, content) => ({
  title,
  content: (
    <div>{content}</div>
  ),
});

function Modal({ title = '', text = '', type = 'info' }) {
  switch (type) {
    case 'success': {
      modalAntd.success(modalContent(title, text));
      break;
    }
    case 'error': {
      modalAntd.error(modalContent(title, text));
      break;
    }
    case 'warning': {
      modalAntd.warning(modalContent(title, text));
      break;
    }
    case 'info':
    default: {
      modalAntd.info(modalContent(title, text));
      break;
    }
  }
  return null;
}

export default Modal;
