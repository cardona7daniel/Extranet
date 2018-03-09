import { instancePostSale } from '../instance';

const axios = instancePostSale();

// eslint-disable-next-line import/prefer-default-export
export function getLastPeriod() {
  return axios.get('Period/GetLastPeriod');
}
