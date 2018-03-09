import { message, Modal } from '../../components/shared';

export default function setMessage(text, type, title = '', mode = 'message') {
  if (mode === 'message') {
    message({ text, type });
  } else {
    Modal({ title, text, type });
  }
  return { type };
}

