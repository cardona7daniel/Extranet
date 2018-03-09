import { instanceNewVehicle } from '../instance';

const axios = instanceNewVehicle();

export const getParameters = () => (
  axios.get('Parameter/List')
);

export function updateParameter(params) {
  return axios.post('Parameter/Update', {
    ...params,
  });
}
