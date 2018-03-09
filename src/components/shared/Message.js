/* eslint-disable no-unused-vars */
import { message as messageAnt } from 'antd';

function message({ text = '', type = 'info' }) {
  switch (type) {
    case 'success': {
      messageAnt.success(text);
      break;
    }
    case 'error': {
      messageAnt.error(text);
      break;
    }
    case 'warning': {
      messageAnt.warning(text);
      break;
    }
    case 'info':
    default: {
      messageAnt.info(text);
      break;
    }
  }

  return null;
}

export default message;
