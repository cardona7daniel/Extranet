import { instancePostSale } from '../instance';

const axios = instancePostSale();

export function getAllRanges() {
  return axios.get('Range/GetRangeConfiguration');
}

export function saveRanges(params) {
  return axios.post('Range/SaveRange', params);
}

// eslint-disable-next-line import/prefer-default-export
export function getDeleteRange(Id) {
  return axios.get('Range/Delete', { params: { Id } });
}
