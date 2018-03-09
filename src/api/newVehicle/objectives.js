import { instanceNewVehicle } from '../instance';

const axios = instanceNewVehicle();

// eslint-disable-next-line import/prefer-default-export
export function getExistsObjectives(periodId) {
  return axios.get('Group/GetExistObjectives', { params: { periodId } });
}

