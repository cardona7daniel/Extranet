import { instancePostSale } from '../instance';

const axios = instancePostSale();

// eslint-disable-next-line import/prefer-default-export
export function getParameterList(type) {
  return axios.get('Parameter/ListType', { params: { type } });
}

// eslint-disable-next-line import/prefer-default-export
export function getParameterColumn() {
  return axios.get('Parameter/ListColumns');
}

// eslint-disable-next-line import/prefer-default-export
export function getParameterColor() {
  return axios.get('Parameter/ListColors');
}
